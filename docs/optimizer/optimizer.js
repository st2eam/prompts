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
  let currentMode = 'user';
  let currentTemplateId = '';
  let isBusy = false;
  let isTemplateMenuOpen = false;
  let activeTemplateOptionId = '';
  let ignoreNextTriggerClick = false;
  let copyFeedbackTimer = null;

  const settingsEl = $('settings');
  const settingsToggle = $('settings-toggle');
  const settingsPanel = $('settings-panel');
  const configState = $('config-state');
  const modeGroup = $('mode');
  const modeButtons = Array.from(modeGroup.querySelectorAll('[role="radio"]'));
  const templateRoot = $('template');
  const templateTrigger = $('template-trigger');
  const templateValue = $('template-value');
  const templateListbox = $('template-listbox');
  const inputCard = $('input-card');
  const inputCount = $('input-count');
  const resultState = $('result-state');
  const keyToggle = $('key-toggle');
  const keyToggleLabel = $('key-toggle-label');
  const copyButton = $('copy');
  const copyLabel = $('copy-label');

  function status(element, message, error = false) {
    element.textContent = message;
    element.classList.toggle('is-error', error);
  }

  function setConfigBadge(text, state) {
    configState.textContent = text;
    configState.dataset.state = state;
  }

  function setSettingsOpen(open) {
    const next = Boolean(open);
    settingsEl.dataset.open = String(next);
    settingsToggle.setAttribute('aria-expanded', String(next));
    settingsPanel.hidden = !next;
  }

  function setInputInvalid(invalid) {
    $('input').setAttribute('aria-invalid', String(invalid));
    inputCard.classList.toggle('is-invalid', invalid);
  }

  function setKeyInvalid(invalid) {
    $('key').setAttribute('aria-invalid', String(invalid));
    $('key').closest('.ds-input-group')?.classList.toggle('is-invalid', invalid);
  }

  function updateInputMeta() {
    inputCount.textContent = $('input').value.length + ' 字';
  }

  function syncKeyToggleUI(show) {
    $('key').type = show ? 'text' : 'password';
    keyToggle.setAttribute('aria-pressed', String(show));
    keyToggle.setAttribute('aria-label', show ? '隐藏密钥' : '显示密钥');
    keyToggleLabel.textContent = show ? '隐藏密钥' : '显示密钥';
    keyToggle.querySelector('.ds-eye-show').toggleAttribute('hidden', show);
    keyToggle.querySelector('.ds-eye-hide').toggleAttribute('hidden', !show);
  }

  function resetCopyFeedback() {
    clearTimeout(copyFeedbackTimer);
    copyButton.classList.remove('is-copied');
    copyButton.querySelector('.ds-copy-icon').toggleAttribute('hidden', false);
    copyButton.querySelector('.ds-check-icon').toggleAttribute('hidden', true);
    copyLabel.textContent = '复制结果';
  }

  function getAvailableTemplates() {
    return templates.filter(template => template.mode === currentMode);
  }

  function getOptionElements() {
    return Array.from(templateListbox.querySelectorAll('[role="option"]'));
  }

  function setActiveTemplateOption(optionEl) {
    for (const item of getOptionElements()) item.classList.remove('is-active');
    if (optionEl) {
      optionEl.classList.add('is-active');
      activeTemplateOptionId = optionEl.id;
      templateTrigger.setAttribute('aria-activedescendant', optionEl.id);
      optionEl.scrollIntoView({ block: 'nearest' });
    } else {
      activeTemplateOptionId = '';
      templateTrigger.removeAttribute('aria-activedescendant');
    }
  }

  function setTemplateMenuOpen(open, returnFocus = false) {
    if (open && isBusy) return;
    isTemplateMenuOpen = Boolean(open);
    templateRoot.classList.toggle('is-open', isTemplateMenuOpen);
    templateTrigger.setAttribute('aria-expanded', String(isTemplateMenuOpen));
    templateListbox.hidden = !isTemplateMenuOpen;
    if (isTemplateMenuOpen) {
      const selected = templateListbox.querySelector('[aria-selected="true"]') || getOptionElements()[0];
      setActiveTemplateOption(selected);
    } else {
      setActiveTemplateOption(null);
      if (returnFocus) templateTrigger.focus();
    }
  }

  function selectTemplate(templateId) {
    const available = getAvailableTemplates();
    const chosen = available.find(template => template.id === templateId) || available[0];
    if (!chosen) return;
    currentTemplateId = chosen.id;
    templateValue.textContent = chosen.name;
    $('template-description').textContent = chosen.description;
    for (const option of getOptionElements()) {
      const selected = option.dataset.value === currentTemplateId;
      option.setAttribute('aria-selected', String(selected));
      const check = option.querySelector('.ds-select-check');
      if (check) check.toggleAttribute('hidden', !selected);
    }
  }

  function renderTemplates() {
    const available = getAvailableTemplates();
    templateListbox.replaceChildren(...available.map(template => {
      const option = document.createElement('li');
      option.className = 'ds-select-option';
      option.id = 'optimizer-template-opt-' + template.id;
      option.setAttribute('role', 'option');
      option.dataset.value = template.id;
      option.setAttribute('aria-selected', 'false');

      const main = document.createElement('span');
      main.className = 'ds-select-option-main';
      const title = document.createElement('span');
      title.className = 'ds-select-option-title';
      title.textContent = template.name;
      const desc = document.createElement('span');
      desc.className = 'ds-select-option-desc';
      desc.textContent = template.description;
      main.append(title, desc);

      const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      check.setAttribute('class', 'ds-select-check');
      check.setAttribute('width', '16');
      check.setAttribute('height', '16');
      check.setAttribute('viewBox', '0 0 24 24');
      check.setAttribute('fill', 'none');
      check.setAttribute('stroke', 'currentColor');
      check.setAttribute('stroke-width', '2');
      check.setAttribute('stroke-linecap', 'round');
      check.setAttribute('stroke-linejoin', 'round');
      check.setAttribute('aria-hidden', 'true');
      check.setAttribute('hidden', '');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M20 6 9 17l-5-5');
      check.append(path);

      option.append(main, check);
      return option;
    }));
    selectTemplate(available[0]?.id);
  }

  function setMode(nextMode, moveFocus = false) {
    if (isBusy || (nextMode !== 'user' && nextMode !== 'system')) return;
    currentMode = nextMode;
    for (const btn of modeButtons) {
      const checked = btn.dataset.value === currentMode;
      btn.setAttribute('aria-checked', String(checked));
      btn.tabIndex = checked ? 0 : -1;
      if (checked && moveFocus) btn.focus();
    }
    setTemplateMenuOpen(false);
    renderTemplates();
  }

  function setResult(value) {
    $('output').value = value;
    $('output').tabIndex = value ? 0 : -1;
    copyButton.disabled = !value;
    if (!value) {
      resetCopyFeedback();
      resultState.textContent = '未生成';
      resultState.dataset.state = 'idle';
    } else {
      resultState.textContent = '已生成';
      resultState.dataset.state = 'done';
    }
    status($('copy-status'), '');
  }

  function busy(value) {
    isBusy = Boolean(value);
    const focused = document.activeElement;
    if (isBusy) setTemplateMenuOpen(false);
    $('form').setAttribute('aria-busy', String(isBusy));
    for (const id of ['submit', 'clear', 'input', 'key', 'model', 'config-clear', 'key-toggle']) $(id).disabled = isBusy;
    templateTrigger.disabled = isBusy;
    for (const btn of modeButtons) btn.disabled = isBusy;
    $('config').querySelector('[type="submit"]').disabled = isBusy;
    $('cancel').hidden = !isBusy;
    if (isBusy) {
      resultState.textContent = '生成中';
      resultState.dataset.state = 'loading';
    } else if (!$('output').value) {
      resultState.textContent = '未生成';
      resultState.dataset.state = 'idle';
    } else {
      resultState.textContent = '已生成';
      resultState.dataset.state = 'done';
    }
    if (isBusy && focused === $('submit')) $('cancel').focus();
    if (!isBusy && focused === $('cancel')) $('submit').focus();
  }

  function saveConfig() {
    const apiKey = $('key').value.trim();
    const model = $('model').value.trim() || DEFAULT_MODEL;
    $('key').value = apiKey; $('model').value = model;
    if (!apiKey) {
      setKeyInvalid(true);
      status($('config-status'), '请输入 API Key 后保存。', true);
      $('key').focus(); return false;
    }
    setKeyInvalid(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ apiKey, model }));
      setConfigBadge('已保存', 'saved');
      status($('config-status'), '配置已保存。');
    } catch {
      setConfigBadge('仅当前页', 'session');
      status($('config-status'), '浏览器不允许保存。可在当前页面继续使用。', true);
    }
    return true;
  }

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored && typeof stored.apiKey === 'string' && stored.apiKey.trim()) {
      $('key').value = stored.apiKey;
      $('model').value = typeof stored.model === 'string' && stored.model.trim() ? stored.model : DEFAULT_MODEL;
      setConfigBadge('已保存', 'saved');
    }
  } catch {
    status($('config-status'), '无法读取已保存配置，请重新输入；本次可继续使用。');
  }

  settingsToggle.addEventListener('click', () => {
    setSettingsOpen(settingsEl.dataset.open !== 'true');
  });

  modeGroup.addEventListener('click', event => {
    const btn = event.target.closest('[role="radio"]');
    if (btn) setMode(btn.dataset.value);
  });

  modeGroup.addEventListener('keydown', event => {
    const index = modeButtons.findIndex(btn => btn.dataset.value === currentMode);
    if (index === -1) return;
    let nextIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % modeButtons.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + modeButtons.length) % modeButtons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = modeButtons.length - 1;
    if (nextIndex !== -1) {
      event.preventDefault();
      setMode(modeButtons[nextIndex].dataset.value, true);
    }
  });

  templateTrigger.addEventListener('click', () => {
    if (ignoreNextTriggerClick) {
      ignoreNextTriggerClick = false;
      return;
    }
    setTemplateMenuOpen(!isTemplateMenuOpen);
  });

  templateTrigger.addEventListener('keydown', event => {
    const options = getOptionElements();
    if (!options.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isTemplateMenuOpen) {
        setTemplateMenuOpen(true);
        return;
      }
      const currentIdx = options.findIndex(item => item.id === activeTemplateOptionId);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIdx = currentIdx === -1 ? 0 : (currentIdx + delta + options.length) % options.length;
      setActiveTemplateOption(options[nextIdx]);
    } else if (event.key === 'Home' && isTemplateMenuOpen) {
      event.preventDefault();
      setActiveTemplateOption(options[0]);
    } else if (event.key === 'End' && isTemplateMenuOpen) {
      event.preventDefault();
      setActiveTemplateOption(options[options.length - 1]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      ignoreNextTriggerClick = true;
      setTimeout(() => { ignoreNextTriggerClick = false; }, 0);
      if (!isTemplateMenuOpen) {
        setTemplateMenuOpen(true);
      } else {
        const active = options.find(item => item.id === activeTemplateOptionId);
        if (active) selectTemplate(active.dataset.value);
        setTemplateMenuOpen(false);
      }
    } else if (event.key === 'Escape' && isTemplateMenuOpen) {
      event.preventDefault();
      setTemplateMenuOpen(false);
    } else if (event.key === 'Tab' && isTemplateMenuOpen) {
      setTemplateMenuOpen(false);
    }
  });

  templateTrigger.addEventListener('keyup', event => {
    if (event.key === ' ' || event.key === 'Enter') event.preventDefault();
  });

  templateListbox.addEventListener('mousemove', event => {
    const option = event.target.closest('[role="option"]');
    if (option && option.id !== activeTemplateOptionId) setActiveTemplateOption(option);
  });

  templateListbox.addEventListener('click', event => {
    const option = event.target.closest('[role="option"]');
    if (!option) return;
    selectTemplate(option.dataset.value);
    setTemplateMenuOpen(false, true);
  });

  document.addEventListener('click', event => {
    if (isTemplateMenuOpen && !templateRoot.contains(event.target)) {
      setTemplateMenuOpen(false);
    }
  });

  $('input').addEventListener('input', () => {
    updateInputMeta();
    if ($('input').value.trim()) {
      setInputInvalid(false);
      if ($('status').classList.contains('is-error')) status($('status'), '');
    }
  });

  $('key').addEventListener('input', () => {
    if ($('key').value.trim()) {
      setKeyInvalid(false);
      if ($('config-status').classList.contains('is-error')) status($('config-status'), '');
      if ($('status').classList.contains('is-error')) status($('status'), '');
    }
  });

  $('config').addEventListener('submit', event => { event.preventDefault(); saveConfig(); });
  keyToggle.addEventListener('click', () => {
    syncKeyToggleUI($('key').type === 'password');
  });
  $('config-clear').addEventListener('click', () => {
    $('key').value = ''; $('model').value = DEFAULT_MODEL;
    syncKeyToggleUI(false);
    setKeyInvalid(false);
    setConfigBadge('未配置', 'empty');
    try {
      localStorage.removeItem(STORAGE_KEY);
      status($('config-status'), '配置已清除。');
    } catch {
      status($('config-status'), '当前页面配置已清除；浏览器阻止删除存储，请在浏览器设置中清除本站数据。', true);
    }
  });
  $('clear').addEventListener('click', () => {
    $('input').value = '';
    updateInputMeta();
    setInputInvalid(false);
    setResult('');
    status($('status'), '');
    $('input').focus();
  });
  function abortRequest(request, reason) {
    if (!request || request.controller.signal.aborted) return;
    request.reason = reason;
    request.controller.abort();
  }
  $('cancel').addEventListener('click', () => abortRequest(activeRequest, 'cancel'));
  copyButton.addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText($('output').value);
      else {
        $('output').focus(); $('output').select();
        if (!document.execCommand('copy')) throw new Error();
      }
      copyButton.classList.add('is-copied');
      copyButton.querySelector('.ds-copy-icon').toggleAttribute('hidden', true);
      copyButton.querySelector('.ds-check-icon').toggleAttribute('hidden', false);
      copyLabel.textContent = '已复制';
      clearTimeout(copyFeedbackTimer);
      copyFeedbackTimer = setTimeout(resetCopyFeedback, 2000);
      status($('copy-status'), '已复制结果。');
    } catch {
      $('output').focus(); $('output').select();
      status($('copy-status'), '已选中结果，请手动复制。', true);
    }
  });
  $('form').addEventListener('submit', async event => {
    event.preventDefault();
    if (activeRequest) return;
    const originalPrompt = $('input').value;
    if (!originalPrompt.trim()) {
      setInputInvalid(true);
      status($('status'), '请输入需要优化的提示词。', true); $('input').focus(); return;
    }
    setInputInvalid(false);
    const apiKey = $('key').value.trim();
    if (!apiKey) {
      setSettingsOpen(true);
      setKeyInvalid(true);
      status($('status'), '请输入 DeepSeek API Key。', true); $('key').focus(); return;
    }
    setKeyInvalid(false);
    const model = $('model').value.trim() || DEFAULT_MODEL;
    const template = templates.find(item => item.id === currentTemplateId);
    const request = { controller: new AbortController(), reason: null };
    activeRequest = request;
    const timer = setTimeout(() => abortRequest(request, 'timeout'), 120000);
    busy(true);
    status($('status'), '正在优化…');
    try {
      const result = await requestOptimization({ apiKey, model,
        messages: buildMessages(template, originalPrompt), signal: request.controller.signal });
      if (request.controller.signal.aborted) throw new Error();
      setResult(result);
      status($('status'), '优化完成。');
    } catch (error) {
      const message = request.reason === 'cancel' ? '请求已取消。' : request.reason === 'timeout' ? '请求超过 120 秒，请稍后重试或缩短提示词。' : error.message || '优化失败，请重试。';
      // Never repeat the submitted key in a status message.
      status($('status'), message.split(apiKey).join('[已隐藏]'), request.reason !== 'cancel');
    } finally {
      clearTimeout(timer); activeRequest = null; busy(false);
    }
  });
  setResult('');
  renderTemplates();
  updateInputMeta();
})();
