const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

let chromium;
try { ({ chromium } = require('playwright')); }
catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND' || !error.message.startsWith("Cannot find module 'playwright'")) throw error;
}

const options = { skip: chromium ? false : 'Optional: install Playwright and Chromium to run browser tests.', timeout: 45_000 };
const origin = 'https://prompt-field.test';
const root = path.resolve(__dirname, '../docs');
const original = ' \n# Original SKILL.md\n\nUnmodified source.\n\n';

async function setup(t, { width = 1440, height = 900, touch = false } = {}) {
  const browser = await chromium.launch();
  t.after(() => browser.close());
  const page = await browser.newPage({ viewport: { width, height }, hasTouch: touch, reducedMotion: 'reduce' });
  const pageErrors = [];
  const missingAssets = [];
  const assets = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  await page.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin || !url.pathname.startsWith('/prompts/')) return route.abort();
    const file = path.resolve(root, url.pathname.slice('/prompts/'.length) || 'index.html');
    if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
      missingAssets.push(url.pathname);
      return route.fulfill({ status: 404 });
    }
    assets.push(path.basename(file));
    return route.fulfill({ path: file });
  });
  await page.addInitScript(source => {
    const state = window.uiMock = { copies: [], denied: false, sourceCalls: [], storageWrites: 0, blockStorage: false, auth: [], mode: 'success', result: 'First result' };
    const write = Storage.prototype.setItem;
    Storage.prototype.setItem = function (...args) {
      state.storageWrites += 1;
      if (state.blockStorage) throw new Error('Storage denied');
      return write.apply(this, args);
    };
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => {
      if (state.denied) throw new Error('Clipboard denied');
      state.copies.push(text);
    } } });
    window.fetch = async (url, request) => {
      if (url.startsWith('https://raw.githubusercontent.com/')) {
        state.sourceCalls.push(url);
        if (state.failSource) return new Response('', { status: 503 });
        if (state.holdSource) await new Promise(resolve => { state.finishSource = resolve; });
        return new Response(source);
      }
      if (url === 'https://api.deepseek.com/chat/completions') {
        state.auth.push(request.headers.Authorization);
        if (state.mode === 'pending') await new Promise((_, reject) => {
          request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true });
        });
        if (state.mode === 'failure') return new Response('', { status: 503 });
        return Response.json({ choices: [{ message: { content: state.result } }] });
      }
      throw new Error('Unexpected URL: ' + url);
    };
  }, original);
  await page.goto(origin + '/prompts/');
  t.after(() => {
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(missingAssets, []);
  });
  return { page, assets };
}

async function waitText(page, selector, text) {
  await page.waitForFunction(({ selector, text }) => document.querySelector(selector)?.textContent.includes(text), { selector, text });
}

async function snapshots(page, name) {
  const dest = process.env.UI_SCREENSHOTS;
  if (dest) await page.screenshot({ path: path.join(dest, name + '.png') });
}

const focused = page => page.evaluate(() => document.activeElement.id);
const card = (page, skill, action) => page.locator(`[data-id="${skill}"][data-action="${action}"]`);

test('catalog layout, search, active filters and empty-state recovery', options, async t => {
  const { page } = await setup(t, { width: 390, height: 844, touch: true });
  await waitText(page, '#collection-count', '13 条技能');
  assert.equal(await page.evaluate(() => {
    const el = document.querySelector('#collection');
    return document.querySelector('main').firstElementChild.id === 'optimizer' && el.contains(document.querySelector('#skill-search')) && el.contains(document.querySelector('#prompt-grid'));
  }), true);
  const skillOrder = await page.locator('#prompt-grid [data-action="copy"]').evaluateAll(buttons => buttons.map(button => button.dataset.id));
  assert.deepEqual(skillOrder, [
    'photo', 'distill', 'gathered', 'print-diptych-poster', 'photo-impressionist-impasto-diptych', 'photo-editorial-paper-diptych',
    'xxd-panel-066', 'black-white-crayon-infographics', 'photo-minimal-geometric-diptych',
    'photo-isometric-diptych-poster', 'photo-watercolor-diptych-poster', 'new-project', 'wechat-mini-program'
  ]);
  for (const [width, columns] of [[320, 1], [390, 1], [640, 1], [641, 2], [900, 2], [901, 2], [1099, 2], [1100, 3], [1440, 3]]) {
    await page.setViewportSize({ width, height: 844 });
    assert.equal(await page.locator('#prompt-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length), columns);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow at ${width}`);
    assert.equal(await page.locator('.topnav a[href="#collection"]').isVisible(), true);
    if (process.env.UI_SCREENSHOTS && (width === 390 || width === 1440)) {
      await page.locator('.topnav a[href="#collection"]').click();
      await page.locator('.prompt-card img').first().evaluate(img => img.decode());
      await snapshots(page, 'catalog-' + width);
    }
  }
  await page.setViewportSize({ width: 320, height: 480 });
  await page.locator('html').evaluate(el => { el.style.fontSize = '200%'; });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'overflow with 200% text sizing');
  await page.locator('html').evaluate(el => { el.style.fontSize = ''; });
  await page.setViewportSize({ width: 390, height: 844 });
  const search = page.getByRole('searchbox', { name: '搜索技能' });
  await search.fill('工程技能');
  await waitText(page, '#collection-count', '2 条技能');
  await page.getByRole('button', { name: '图像生成' }).tap();
  assert.equal(await page.getByRole('button', { name: '图像生成' }).getAttribute('aria-pressed'), 'true');
  await waitText(page, '#collection-count', '0 条技能');
  await page.getByRole('button', { name: '重置搜索' }).tap();
  await waitText(page, '#collection-count', '13 条技能');
  assert.equal(await focused(page), 'skill-search');
  assert.equal(await search.inputValue(), '');
  assert.equal(await page.getByRole('button', { name: '全部' }).getAttribute('aria-pressed'), 'true');
  await search.fill('水彩');
  assert.equal(await page.locator('#prompt-grid img').count(), 0);
  assert.equal(await page.locator('#search-clear').evaluate(el => el.getBoundingClientRect().width), 44);
});

test('original source, exact clipboard text, lazy example, failure and focus recovery', options, async t => {
  const { page, assets } = await setup(t, { width: 390, height: 844 });
  const search = page.locator('#skill-search');
  await page.evaluate(() => { uiMock.holdSource = true; });
  await card(page, 'photo', 'copy').click();
  await waitText(page, '#prompt-grid .feedback', '读取原文');
  await page.evaluate(() => { uiMock.holdSource = false; uiMock.finishSource(); });
  await waitText(page, '#prompt-grid .feedback', '已复制');
  assert.deepEqual(await page.evaluate(() => uiMock.copies), [original]);
  await page.evaluate(() => { uiMock.denied = true; });
  await card(page, 'photo', 'copy').click();
  const recovery = card(page, 'photo', 'manual');
  await recovery.click();
  await page.waitForFunction(() => document.activeElement.id === 'dialog-prompt');
  assert.equal(await page.locator('#dialog-prompt').evaluate(el => el.selectionEnd - el.selectionStart), original.length);
  assert.equal(await page.locator('#dialog-source').getAttribute('href'), 'https://github.com/ZzzLc0405/photo-abstract-editorial/blob/main/SKILL.md');
  assert.equal(await page.evaluate(() => uiMock.sourceCalls.length), 1);
  assert.equal(await page.locator('#dialog-close').evaluate(el => el.getBoundingClientRect().height), 44);
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.activeElement.matches('.card-recovery'));
  await page.evaluate(() => { uiMock.failSource = true; });
  await card(page, 'distill', 'view').click();
  await waitText(page, '#dialog-status', '原文读取失败');
  assert.equal(await page.locator('#dialog-prompt').inputValue(), '');
  await page.evaluate(() => { uiMock.failSource = false; });
  await page.locator('#dialog-retry').press('Enter');
  await page.waitForFunction(() => document.activeElement.id === 'dialog-copy');
  await page.locator('#dialog-copy').click();
  await page.locator('#dialog-manual').click();
  assert.equal(await focused(page), 'dialog-prompt');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.activeElement.dataset.id === 'distill');
  await page.evaluate(() => { uiMock.holdSource = true; });
  await card(page, 'gathered', 'view').click();
  await waitText(page, '#dialog-status', '读取原文');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('dialog').open);
  await card(page, 'photo', 'view').click();
  await page.evaluate(() => { uiMock.holdSource = false; uiMock.finishSource(); });
  assert.equal(await page.locator('#dialog-title').textContent(), '摄影记忆面板');
  await page.keyboard.press('Escape');
  await search.fill('黑白蜡笔');
  await page.locator('img[src$="-thumb.webp"]').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('img[src$="-thumb.webp"]').naturalWidth > 0);
  await card(page, 'black-white-crayon-infographics', 'view').click();
  await page.waitForFunction(() => !document.querySelector('#dialog-copy').disabled);
  await snapshots(page, 'detail-390');
  assert.equal(assets.includes('black-white-crayon-infographics.png'), false);
  await page.getByText('查看示例', { exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#dialog-image').naturalWidth > 0);
  assert.equal(assets.includes('black-white-crayon-infographics.png'), true);
});

test('optimizer groups its controls and supports keyboard template selection', options, async t => {
  const { page } = await setup(t);
  const template = page.getByRole('combobox', { name: /优化模板/ });
  const settings = page.getByRole('button', { name: 'DeepSeek 配置' });
  const count = page.locator('#optimizer-input-count');
  assert.equal(await count.isVisible(), false);
  assert.equal(await page.locator('#optimizer-clear').isDisabled(), true);
  assert.equal(await page.evaluate(() => {
    const input = document.querySelector('#optimizer-input').getBoundingClientRect();
    const output = document.querySelector('#optimizer-output').getBoundingClientRect();
    return input.y === output.y && input.height === output.height;
  }), true);
  await snapshots(page, 'optimizer-default-desktop');
  await page.getByRole('radio', { name: '用户提示词' }).press('ArrowRight');
  assert.equal(await page.getByRole('radio', { name: '系统提示词' }).getAttribute('aria-checked'), 'true');
  await template.press('ArrowDown');
  assert.equal(await template.getAttribute('aria-expanded'), 'true');
  await template.press('End');
  const lastOption = page.getByRole('option').last();
  const lastTitle = await lastOption.locator('.ds-select-option-title').textContent();
  assert.equal(await template.getAttribute('aria-activedescendant'), await lastOption.getAttribute('id'));
  await template.press('Enter');
  assert.match(await template.textContent(), new RegExp(lastTitle));
  assert.equal(await template.getAttribute('aria-expanded'), 'false');
  assert.equal(await focused(page), 'optimizer-template-trigger');
  await page.locator('#optimizer-input').fill('测试');
  assert.equal(await count.textContent(), '2 字');
  assert.equal(await page.locator('#optimizer-clear').isEnabled(), true);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await snapshots(page, 'optimizer-default-mobile');
  for (const width of [320, 390, 641]) {
    await page.setViewportSize({ width, height: 620 });
    await page.locator('html').evaluate(el => { el.style.fontSize = '200%'; });
    await settings.click();
    assert.equal(await settings.getAttribute('aria-expanded'), 'true');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `expanded settings overflow at ${width}`);
    await settings.click();
    await template.press('ArrowDown');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `template menu overflow at ${width}`);
    await template.press('Escape');
  }
});

test('optimizer only saves on request and keeps output through validation, cancel, timeout and errors', options, async t => {
  const { page } = await setup(t);
  const id = name => page.locator('#optimizer-' + name);
  const status = text => waitText(page, '#optimizer-status', text);
  await id('submit').press('Enter');
  await status('请输入需要优化');
  assert.equal(await focused(page), 'optimizer-input');
  await id('input').fill('A prompt to improve');
  await id('submit').press('Enter');
  await status('API Key');
  assert.equal(await focused(page), 'optimizer-key');
  await id('key').fill('mock-key');
  await id('submit').press('Enter');
  await status('优化完成');
  assert.deepEqual(await page.evaluate(() => ({ writes: uiMock.storageWrites, auth: uiMock.auth, keys: localStorage.length })), { writes: 0, auth: ['Bearer mock-key'], keys: 0 });
  await id('input').fill('');
  await id('submit').press('Enter');
  await status('请输入需要优化');
  assert.equal(await id('output').inputValue(), 'First result');
  await id('input').fill('Try again');
  await page.evaluate(() => { uiMock.mode = 'pending'; });
  await id('submit').press('Enter');
  await status('正在优化');
  assert.equal(await focused(page), 'optimizer-cancel');
  assert.equal(await id('output').inputValue(), 'First result');
  await id('copy').click();
  await waitText(page, '#optimizer-copy-status', '已复制');
  assert.deepEqual(await page.evaluate(() => uiMock.copies), ['First result']);
  await id('cancel').press('Enter');
  await status('请求已取消');
  assert.equal(await focused(page), 'optimizer-submit');
  await page.clock.install();
  await id('submit').press('Enter');
  await status('正在优化');
  await page.clock.fastForward(120_000);
  await status('超过 120 秒');
  await page.evaluate(() => { uiMock.mode = 'failure'; });
  await id('submit').press('Enter');
  await status('暂时不可用');
  assert.equal(await id('output').inputValue(), 'First result');
  await page.evaluate(() => { uiMock.mode = 'success'; uiMock.result = 'New result'; uiMock.blockStorage = true; });
  await page.getByRole('button', { name: '保存配置' }).click();
  await waitText(page, '#optimizer-config-status', '不允许保存');
  await id('submit').press('Enter');
  await status('优化完成');
  assert.equal(await id('output').inputValue(), 'New result');
  await page.evaluate(() => { uiMock.blockStorage = false; });
  await page.getByRole('button', { name: '保存配置' }).click();
  await waitText(page, '#optimizer-config-status', '已保存');
  await page.reload();
  await page.getByText('DeepSeek 配置', { exact: true }).click();
  assert.equal(await id('key').inputValue(), 'mock-key');
  await id('config-clear').click();
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  await page.locator('.topnav a[href="#optimizer"]').click();
  assert.equal(await page.evaluate(() => document.querySelector('#optimizer-title').getBoundingClientRect().top >= document.querySelector('.topbar').getBoundingClientRect().bottom), true);
  await snapshots(page, 'optimizer-1440');
});
