const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
function harness(fetch) {
  const context = vm.createContext({ window: {}, document: { querySelector: () => null }, fetch });
  vm.runInContext(fs.readFileSync(path.join(root, 'docs/optimizer/templates.js'), 'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root, 'docs/optimizer/optimizer.js'), 'utf8'), context);
  return context.window;
}
const input = '写一篇 {{主题}} 的文章\n"quotes" \\ $& {{#helpers.toJson}}{{{originalPrompt}}}{{/helpers.toJson}} <script>alert(1)</script>';
test('all six templates preserve evidence, roles and user placeholders', () => {
  const h = harness();
  assert.equal(h.PromptOptimizerTemplates.length, 6);
  for (const template of h.PromptOptimizerTemplates) {
    const messages = h.PromptOptimizer.buildMessages(template, input);
    assert.equal(messages[0].role, 'system');
    assert.equal(messages[1].role, 'user');
    if (typeof template.content === 'string') {
      assert.equal(messages[0].content, template.content);
      assert.equal(messages[1].content, input);
    } else {
      const evidence = messages[1].content.match(/\{\s*"originalPrompt": [\s\S]*?\n\}/)[0];
      assert.equal(JSON.parse(evidence).originalPrompt, input);
      assert.ok(!messages[0].content.includes('{{=<% %>=}}'));
      if (template.id !== 'user-prompt-basic' && template.id !== 'analytical-optimize') assert.ok(messages[0].content.includes('{{...}}'));
    }
  }
});
test('successful request sends official endpoint and authentication, preserving result', async () => {
  const h = harness(async (url, options) => {
    assert.equal(url, 'https://api.deepseek.com/chat/completions');
    assert.equal(options.headers.Authorization, 'Bearer test-key');
    const body = JSON.parse(options.body);
    assert.equal(body.model, 'deepseek-flash'); assert.equal(body.stream, false);
    assert.equal(body.thinking.type, 'disabled');
    return { ok: true, json: async () => ({choices:[{message:{content:'  line 1\nline 2  '}}]}) };
  });
  assert.equal(await h.PromptOptimizer.requestOptimization({apiKey:'test-key',model:'deepseek-flash',messages:[],signal:new AbortController().signal}), '  line 1\nline 2  ');
});
for (const [code, text] of [[401,'认证'],[403,'认证'],[402,'余额'],[429,'频繁'],[400,'配置'],[404,'配置'],[422,'配置'],[503,'服务'],[418,'请求失败']]) {
  test('HTTP ' + code + ' returns actionable message without provider body', async () => {
    const h = harness(async () => ({ok:false,status:code,json:()=>{throw Error('must not read provider secret');}}));
    await assert.rejects(h.PromptOptimizer.requestOptimization({apiKey:'test-key',messages:[],signal:new AbortController().signal}), new RegExp(text));
  });
}
for (const [name, json, match] of [
  ['empty', {choices:[{message:{content:' '}}]}, /未返回/],
  ['missing', {}, /未返回/],
  ['truncated', {choices:[{finish_reason:'length',message:{content:'partial'}}]}, /截断/]
]) test(name + ' result is rejected', async () => {
  const h = harness(async () => ({ok:true,json:async()=>json}));
  await assert.rejects(h.PromptOptimizer.requestOptimization({signal:new AbortController().signal}),match);
});
test('invalid JSON uses safe error', async () => {
  const h = harness(async () => ({ok:true,json:async()=>{throw Error('test-key');}}));
  await assert.rejects(h.PromptOptimizer.requestOptimization({signal:new AbortController().signal}), /格式异常/);
});
test('network failure hides original error', async () => {
  const h = harness(async () => { throw Error('test-key'); });
  await assert.rejects(h.PromptOptimizer.requestOptimization({signal:new AbortController().signal}), /网络连接或浏览器跨域/);
});
test('abort remains identifiable to UI', async () => {
  const controller = new AbortController(); controller.abort();
  const h = harness(async () => {throw new DOMException('Aborted','AbortError');});
  await assert.rejects(h.PromptOptimizer.requestOptimization({signal:controller.signal}), {name:'AbortError'});
});
