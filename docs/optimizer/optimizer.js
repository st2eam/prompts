/* Prompt Field optimizer integration. AGPL-3.0-only; see LICENSE. */
(() => {
  'use strict';
  const STORAGE_KEY = 'prompt-field.deepseek.v1';
  const DEFAULT_MODEL = 'deepseek-flash';
  const ENDPOINT = 'https://api.deepseek.com/chat/completions';
  const JSON_SLOT = '{{#helpers.toJson}}{{{originalPrompt}}}{{/helpers.toJson}}';
  const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const TEMPLATE_TOKENS = new RegExp(escapePattern(JSON_SLOT) + '|' + escapePattern('{{=<% %>=}}') + '([\\s\\S]*?)' + escapePattern('<%={{ }}=%>'), 'g');

  function buildMessages(template, originalPrompt) {
    if (typeof template.content === 'string') {
      return [{ role: 'system', content: template.content }, { role: 'user', content: originalPrompt }];
    }
    return template.content.map(message => ({
      role: message.role,
      // One pass over the template only: never render variables in user input.
      content: message.content.replace(TEMPLATE_TOKENS,
        (token, literal) => token === JSON_SLOT ? JSON.stringify(originalPrompt) : literal)
    }));
  }

  function httpError(status) {
    if (status === 401 || status === 403) return '认证失败，请检查 API Key 或访问权限后重试。';
    if (status === 402) return '账户余额不足，请在 DeepSeek 平台充值后重试。';
    if (status === 429) return '请求过于频繁，请稍后重试。';
    if (status === 400 || status === 404 || status === 422) return '请求配置无效，请检查模型名称或缩短 Prompt 后重试。';
    if (status >= 500) return 'DeepSeek 服务暂时不可用，请稍后重试。';
    return '请求失败，请检查配置后重试。';
  }

  async function requestOptimization({ apiKey, model, messages, signal }) {
    let response;
    try {
      response = await fetch(ENDPOINT, {
        method: 'POST', signal,
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
        body: JSON.stringify({ model, messages, stream: false, thinking: { type: 'disabled' } })
      });
    } catch (error) {
      if (signal.aborted) throw error;
      throw new Error('网络连接或浏览器跨域请求失败，请检查网络后重试。');
    }
    // Never echo provider error bodies: they may contain submitted credentials or input.
    if (!response.ok) throw new Error(httpError(response.status));
    let data;
    try { data = await response.json(); }
    catch (error) {
      if (signal.aborted) throw error;
      throw new Error('接口返回格式异常，请稍后重试。');
    }
    const choice = data?.choices?.[0];
    if (choice?.finish_reason === 'length') throw new Error('优化结果被截断，请缩短 Prompt 后重试。');
    const content = choice?.message?.content;
    if (typeof content !== 'string' || !content.trim()) throw new Error('接口未返回优化结果，请检查模型配置后重试。');
    return content;
  }

  // Small explicit interface for deterministic request/template verification.
  window.PromptOptimizer = Object.freeze({ buildMessages, requestOptimization });
  const root = document.querySelector('#optimizer');
  if (!root) return;
  const $ = id => root.querySelector('#optimizer-' + id);
  const templates = window.PromptOptimizerTemplates;
  let activeRequest = null;

  function status(element, message, error = false) {
    element.textContent = message;
    element.classList.toggle('is-error', error);
  }
  function renderTemplates() {
    const available = templates.filter(template => template.mode === $('mode').value);
    $('template').replaceChildren(...available.map(template => {
      const option = document.createElement('option');
      option.value = template.id; option.textContent = template.name;
      return option;
    }));
    describeTemplate();
  }
  function describeTemplate() {
    $('template-description').textContent = templates.find(template => template.id === $('template').value).description;
  }
  function resetResult() {
    $('output').value = '';
    $('copy').disabled = true;
    $('result-state').textContent = '等待优化';
  }
  function busy(value) {
    $('form').setAttribute('aria-busy', String(value));
    for (const id of ['submit', 'clear', 'input', 'mode', 'template', 'key', 'model', 'config-clear', 'key-toggle']) $(id).disabled = value;
    $('config').querySelector('[type="submit"]').disabled = value;
    $('cancel').hidden = !value;
    $('submit').textContent = value ? '正在优化…' : '开始优化';
  }
  function saveConfig() {
    const apiKey = $('key').value.trim();
    const model = $('model').value.trim() || DEFAULT_MODEL;
    $('key').value = apiKey; $('model').value = model;
    if (!apiKey) {
      status($('config-status'), '请输入 API Key 后保存。', true);
      $('key').focus(); return false;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey, model }));
      $('config-state').textContent = '已保存在当前浏览器';
      status($('config-status'), '配置已保存，下次打开可直接使用。');
    } catch {
      $('config-state').textContent = '仅当前页面可用';
      status($('config-status'), '浏览器不允许保存，配置仅在当前页面使用；刷新后请重新输入。');
    }
    return true;
  }
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored && typeof stored.apiKey === 'string' && stored.apiKey.trim()) {
      $('key').value = stored.apiKey;
      $('model').value = typeof stored.model === 'string' && stored.model.trim() ? stored.model : DEFAULT_MODEL;
      $('config-state').textContent = '已保存在当前浏览器';
    }
  } catch {
    status($('config-status'), '无法读取已保存配置，请重新输入；本次可继续使用。');
  }

  $('mode').addEventListener('change', renderTemplates);
  $('template').addEventListener('change', describeTemplate);
  $('config').addEventListener('submit', event => { event.preventDefault(); saveConfig(); });
  $('key-toggle').addEventListener('click', () => {
    const show = $('key').type === 'password';
    $('key').type = show ? 'text' : 'password';
    $('key-toggle').textContent = show ? '隐藏密钥' : '显示密钥';
    $('key-toggle').setAttribute('aria-pressed', String(show));
  });
  $('config-clear').addEventListener('click', () => {
    $('key').value = ''; $('key').type = 'password'; $('model').value = DEFAULT_MODEL;
    $('key-toggle').textContent = '显示密钥'; $('key-toggle').setAttribute('aria-pressed', 'false');
    $('config-state').textContent = '尚未配置';
    try {
      localStorage.removeItem(STORAGE_KEY);
      status($('config-status'), '配置已清除。');
    } catch {
      status($('config-status'), '当前页面配置已清除；浏览器阻止删除存储，请在浏览器设置中清除本站数据。', true);
    }
  });
  $('clear').addEventListener('click', () => {
    $('input').value = ''; resetResult(); status($('status'), ''); $('input').focus();
  });
  $('cancel').addEventListener('click', () => {
    if (activeRequest) { activeRequest.reason = 'cancel'; activeRequest.controller.abort(); }
  });
  $('copy').addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText($('output').value);
      else {
        $('output').focus(); $('output').select();
        if (!document.execCommand('copy')) throw new Error();
      }
      status($('status'), '优化结果已复制。');
    } catch {
      $('output').focus(); $('output').select();
      status($('status'), '浏览器未允许自动复制，已选中结果，请手动复制。', true);
    }
  });
  $('form').addEventListener('submit', async event => {
    event.preventDefault();
    if (activeRequest) return;
    resetResult();
    const originalPrompt = $('input').value;
    if (!originalPrompt.trim()) {
      status($('status'), '请先输入需要优化的 Prompt。', true); $('input').focus(); return;
    }
    if (!$('key').value.trim()) {
      $('settings').open = true;
      status($('status'), '请先配置你的 DeepSeek API Key。', true); $('key').focus(); return;
    }
    saveConfig();
    const template = templates.find(item => item.id === $('template').value);
    const request = { controller: new AbortController(), reason: null };
    activeRequest = request;
    const timer = setTimeout(() => { request.reason = 'timeout'; request.controller.abort(); }, 120000);
    busy(true); $('result-state').textContent = '正在生成';
    status($('status'), '正在优化，请稍候。你可以取消本次请求。');
    try {
      const result = await requestOptimization({ apiKey: $('key').value.trim(), model: $('model').value.trim() || DEFAULT_MODEL,
        messages: buildMessages(template, originalPrompt), signal: request.controller.signal });
      if (request.controller.signal.aborted) throw new Error();
      $('output').value = result; $('copy').disabled = false;
      $('result-state').textContent = '优化完成'; status($('status'), '优化完成，可以复制结果使用。');
    } catch (error) {
      resetResult();
      $('result-state').textContent = request.reason === 'cancel' ? '已取消' : '未完成';
      const message = request.reason === 'cancel' ? '请求已取消。' : request.reason === 'timeout' ? '请求超过 120 秒，请稍后重试或缩短 Prompt。' : error.message;
      // Final guard against credentials leaking from any unexpected exception.
      const key = $('key').value.trim();
      status($('status'), key ? message.split(key).join('[已隐藏]') : message, request.reason !== 'cancel');
    } finally {
      clearTimeout(timer); activeRequest = null; busy(false);
    }
  });
  renderTemplates();
})();
