const prompts = [
  {
    id: 'photo', skillId: 'photo-abstract-editorial', name: '摄影记忆面板', en: 'PHOTO / ABSTRACT / EDITORIAL', category: 'image', categoryLabel: '图像生成',
    description: '让照片保持真实，让抽象面板记住它的空间节奏。', input: '需附图 · 单张照片',
    image: 'photo-abstract.jpg', tone: 'sage', source: 'https://github.com/ZzzLc0405/photo-abstract-editorial/blob/main/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/ZzzLc0405/photo-abstract-editorial/main/SKILL.md'
  },
  {
    id: 'distill', skillId: 'scene-distillation-zine-v1-3', name: '照片提炼海报', en: 'SCENE / DISTILLATION', category: 'image', categoryLabel: '图像生成',
    description: '保留照片的情绪与结构，舍弃摄影像素。', input: '需附图 · 单张照片',
    image: 'scene-distillation.jpg', tone: 'terracotta', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill/blob/main/skills/scene-distillation-zine-v1-3/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/Zeejay0/gathered-scenes-zine-skill/main/skills/scene-distillation-zine-v1-3/SKILL.md'
  },
  {
    id: 'gathered', skillId: 'scenes-gathered-zine-v1-3', name: '实景拼贴海报', en: 'GATHERED / SCENES', category: 'image', categoryLabel: '图像生成',
    description: '真实摄影为锚，抽象插画成场，撕纸边界让两者相遇。', input: '需附图 · 单张照片',
    image: 'gathered-scenes.jpg', tone: 'olive', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill/blob/main/skills/scenes-gathered-zine-v1-3/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/Zeejay0/gathered-scenes-zine-skill/main/skills/scenes-gathered-zine-v1-3/SKILL.md'
  },
  {
    id: 'print-diptych-poster', skillId: 'print-diptych-poster', name: '主题双联版画海报', en: 'IMAGE / DIPTYCH / PRINT', category: 'image', categoryLabel: '图像生成',
    description: '将参考图保留为上半部分，并在下半部分转化为极简纸感版画拼贴。', input: '需附图 · 单张参考图',
    tone: 'blue', image: 'print-diptych-poster.jpg', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/print-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/print-diptych-poster/SKILL.md'
  },
  {
    id: 'photo-isometric-diptych-poster', skillId: 'photo-isometric-diptych-poster', name: '照片等距双联海报', en: 'PHOTO / ISOMETRIC / DIPTYCH', category: 'image', categoryLabel: '图像生成',
    description: '上半部保留真实照片，下半部将主体提炼为来源色彩的极简等距微缩插画。', input: '需附图 · 每张照片独立输出',
    tone: 'cream', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-isometric-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-isometric-diptych-poster/SKILL.md'
  },
  {
    id: 'photo-impressionist-impasto-diptych', skillId: 'photo-impressionist-impasto-diptych', name: '照片印象派厚涂双联海报', en: 'PHOTO / IMPASTO / IMPRESSION', category: 'image', categoryLabel: '图像生成',
    description: '上半部保留无字原片，下半部以原场景重绘温暖的印象派厚涂油画。', input: '需附图 · 每张照片独立输出',
    tone: 'sand', image: 'photo-impressionist-impasto-diptych.jpg', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-impressionist-impasto-diptych/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-impressionist-impasto-diptych/SKILL.md'
  },
  {
    id: 'photo-editorial-paper-diptych', skillId: 'photo-editorial-paper-diptych', name: '照片纸雕编辑双联海报', en: 'PHOTO / PAPER / EDITORIAL', category: 'image', categoryLabel: '图像生成',
    description: '每张照片单独输出：上半部保留真实原片，下半部用分层纸雕重建主体。', input: '需附图 · 每张照片独立输出',
    image: 'photo-editorial-paper-diptych.jpg',
    tone: 'cream', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-editorial-paper-diptych/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-editorial-paper-diptych/SKILL.md'
  },
  {
    id: 'photo-watercolor-diptych-poster', skillId: 'photo-watercolor-diptych-poster', name: '城市风景淡彩水彩双联海报', en: 'CITY / LANDSCAPE / WATERCOLOR', category: 'image', categoryLabel: '图像生成',
    description: '保留上半部真实城市或风景原片，下半部提炼为居中的淡彩水彩插画。', input: '需附图 · 城市或风景照片',
    tone: 'sage', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-watercolor-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-watercolor-diptych-poster/SKILL.md'
  },
  {
    id: 'xxd-panel-066', skillId: 'xxd-panel-066', name: 'XXD Panel 066 视觉面板', en: 'IMAGE / PANEL / RASTER', category: 'image', categoryLabel: '图像生成',
    description: '以原始风格简报为唯一美学依据，将单张照片或图片目录转为 Panel 066 栅格艺术作品。', input: '需附图 · 单张照片或图片目录',
    image: 'xxd-panel-066.jpg', imageAlt: 'XXD Panel 066 风格预览：深蓝夜色中的镇江阁手绘插画',
    tone: 'olive', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/xxd-panel-066/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/xxd-panel-066/SKILL.md'
  },
  {
    id: 'black-white-crayon-infographics', skillId: 'black-white-crayon-infographics', name: '黑白蜡笔信息图', en: 'CRAYON / INFOGRAPHIC / SERIES', category: 'image', categoryLabel: '图像生成',
    description: '把一个主题讲成至少六张连贯的黑白蜡笔手绘信息图。', input: '输入主题 · 无需附图',
    image: 'black-white-crayon-infographics.png', thumbnail: 'black-white-crayon-infographics-thumb.webp', imageAlt: '黑白蜡笔信息图风格预览', tone: 'cream', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/black-white-crayon-infographics/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/black-white-crayon-infographics/SKILL.md'
  },
  {
    id: 'photo-minimal-geometric-diptych', skillId: 'photo-minimal-geometric-diptych', name: '照片极简几何双联海报', en: 'PHOTO / GEOMETRIC / MINIMAL', category: 'image', categoryLabel: '图像生成',
    description: '上下严格均分：上半部保留真实摄影，下半部以几何色块、细线与留白提炼同一主体。', input: '需附图 · 每张照片独立输出',
    image: 'photo-minimal-geometric-diptych.jpg', imageAlt: '紫发角色与蓝色水涡的上下双联海报，下半幅为几何抽象',
    tone: 'sage', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-minimal-geometric-diptych/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-minimal-geometric-diptych/SKILL.md'
  },
  {
    id: 'new-project', skillId: 'new-project', name: 'AI 原生前端项目', en: 'ENGINEERING / FRONTEND / PROJECT', category: 'engineering', categoryLabel: '项目开发',
    description: '从业务简介开始，建立可维护、可扩展、适合 AI 协作的前端项目。', input: '无需附图 · 新建项目',
    tone: 'blue', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/new-project/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/new-project/SKILL.md'
  },
  {
    id: 'wechat-mini-program', skillId: 'wechat-mini-program', name: '微信小程序与 H5', en: 'ENGINEERING / WECHAT / CROSS-PLATFORM', category: 'engineering', categoryLabel: '跨端开发',
    description: '为微信小程序与 H5 共同设计清晰的架构、能力边界与交付流程。', input: '无需附图 · 跨端项目',
    tone: 'sand', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/wechat-mini-program/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/wechat-mini-program/SKILL.md'
  }
];

const $ = id => document.getElementById(id);
const grid = $('prompt-grid');
const filterBar = $('prompt-filters');
const collectionCount = $('collection-count');
const searchInput = $('skill-search');
const searchClear = $('search-clear');
const emptyState = $('empty-state');
const dialog = $('detail-dialog');
const dialogPrompt = $('dialog-prompt');
const dialogCopy = $('dialog-copy');
const dialogRetry = $('dialog-retry');
const dialogManual = $('dialog-manual');
const example = $('dialog-example');
const exampleImage = $('dialog-image');
const filters = new Map([['all', '全部'], ['image', '图像生成'], ['engineering', '工程技能']]);
const skillCache = new Map();
let selected = null;
let detailSource = null;
let lastFocus = null;
let detailRequestId = 0;
let activeFilter = 'all';

function feedback(element, message, error = false) {
  element.textContent = message;
  element.classList.toggle('is-error', error);
}

async function loadSkill(prompt) {
  if (skillCache.has(prompt.id)) return skillCache.get(prompt.id);
  const request = fetch(prompt.skillUrl, { cache: 'no-store' }).then(async response => {
    if (!response.ok) throw new Error('SKILL.md request failed: ' + response.status);
    const source = await response.text();
    if (!source.trim() || /<html[\s>]/i.test(source.slice(0, 200))) throw new Error('SKILL.md is unavailable');
    return source;
  });
  skillCache.set(prompt.id, request);
  try {
    return await request;
  } catch (error) {
    skillCache.delete(prompt.id);
    throw error;
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const previous = document.activeElement;
  const field = document.createElement('textarea');
  field.value = text;
  field.readOnly = true;
  field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  (dialog.open ? dialog : document.body).append(field);
  try {
    field.select();
    if (!document.execCommand('copy')) throw new Error('copy failed');
  } finally {
    field.remove();
    previous?.focus({ preventScroll: true });
  }
}

const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = value => value.replace(/[&<>"']/g, char => entities[char]);

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = prompts.filter(prompt => {
    const matchesFilter = activeFilter === 'all' || prompt.category === activeFilter;
    const searchable = [prompt.skillId, prompt.name, prompt.en, prompt.categoryLabel, filters.get(prompt.category), prompt.description, prompt.input].join(' ').toLowerCase();
    return matchesFilter && searchable.includes(query);
  }).sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
  grid.innerHTML = visible.map((prompt, index) => {
    const id = escapeHtml(prompt.id);
    const name = escapeHtml(prompt.name);
    const preview = prompt.image ? '<div class="card-image-wrap"><img loading="' + (index === 0 ? 'eager' : 'lazy') + '" decoding="async" src="./images/' + escapeHtml(prompt.thumbnail || prompt.image) + '" alt="' + escapeHtml(prompt.imageAlt || prompt.name + '示例') + '"></div>' : '';
    return '<article class="prompt-card tone-' + escapeHtml(prompt.tone) + '"><div class="card-content"><h3>' + name + '</h3><p>' + escapeHtml(prompt.description) + '</p><p class="skill-input">' + escapeHtml(prompt.input) + '</p></div>' + preview +
      '<div class="card-footer"><div class="card-actions"><button class="button button-primary" type="button" data-action="copy" data-id="' + id + '" aria-label="复制 SKILL.md：' + name + '">复制 SKILL.md</button><button class="button button-secondary" type="button" data-action="view" data-id="' + id + '" aria-label="查看原文：' + name + '">查看原文</button></div>' +
      '<p class="feedback" role="status" aria-atomic="true"></p><button class="button button-secondary card-recovery" type="button" data-action="manual" data-id="' + id + '" hidden></button></div></article>';
  }).join('');
  const hasResults = visible.length > 0;
  grid.hidden = !hasResults;
  emptyState.hidden = hasResults;
  const count = visible.length + ' 条技能';
  if (collectionCount.textContent !== count) collectionCount.textContent = count;
}

function updateFilters() {
  for (const button of filterBar.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.filter === activeFilter));
  }
}

function updateResults() {
  searchClear.hidden = !searchInput.value;
  renderCards();
}

async function copyFromCard(prompt, trigger) {
  if (trigger.getAttribute('aria-disabled') === 'true') return;
  const footer = trigger.closest('.card-footer');
  const message = footer.querySelector('.feedback');
  const recovery = footer.querySelector('.card-recovery');
  const recover = (text, action, label) => {
    feedback(message, text, true);
    recovery.dataset.action = action;
    recovery.textContent = label;
    recovery.hidden = false;
  };
  trigger.setAttribute('aria-disabled', 'true');
  recovery.hidden = true;
  feedback(message, '正在读取原文…');
  try {
    let source;
    try {
      source = await loadSkill(prompt);
    } catch {
      recover('原文读取失败。', 'view', '重试或打开来源');
      return;
    }
    if (!trigger.isConnected) return;
    try {
      await copyText(source);
      feedback(message, '已复制 SKILL.md');
    } catch {
      recover('浏览器未允许自动复制。', 'manual', '手动复制');
    }
  } finally {
    trigger.removeAttribute('aria-disabled');
  }
}

function selectSource() {
  dialogPrompt.focus();
  dialogPrompt.select();
  feedback($('dialog-status'), '已选中原文，请手动复制。');
}

async function readDetail(prompt, manual = false) {
  const requestId = ++detailRequestId;
  const current = () => dialog.open && requestId === detailRequestId;
  const status = $('dialog-status');
  dialogRetry.setAttribute('aria-disabled', 'true');
  dialogCopy.disabled = true;
  feedback(status, '正在读取原文…');
  try {
    const source = await loadSkill(prompt);
    if (!current()) return;
    const restoreRetry = document.activeElement === dialogRetry;
    detailSource = source;
    dialogPrompt.value = source;
    $('dialog-reader').hidden = false;
    dialogCopy.disabled = false;
    dialogRetry.hidden = true;
    feedback(status, '');
    if (manual) selectSource();
    else if (restoreRetry) dialogCopy.focus();
  } catch {
    if (!current()) return;
    dialogRetry.hidden = false;
    feedback(status, '原文读取失败。请重试或打开 GitHub 原文。', true);
  } finally {
    if (current()) dialogRetry.removeAttribute('aria-disabled');
  }
}

function openDetail(prompt, trigger, manual = false) {
  selected = prompt;
  detailSource = null;
  lastFocus = trigger;
  $('dialog-title').textContent = prompt.name;
  $('dialog-description').textContent = prompt.description;
  $('dialog-input').textContent = prompt.input;
  $('dialog-source').href = prompt.source;
  $('dialog-skill-id').textContent = prompt.skillId;
  example.open = false;
  example.hidden = !prompt.image;
  exampleImage.removeAttribute('src');
  exampleImage.alt = prompt.imageAlt || prompt.name + '完整示例';
  dialogPrompt.value = '';
  $('dialog-reader').hidden = true;
  dialogRetry.hidden = true;
  dialogManual.hidden = true;
  dialogCopy.removeAttribute('aria-disabled');
  dialog.showModal();
  dialog.scrollTop = 0;
  readDetail(prompt, manual);
}

filterBar.innerHTML = Array.from(filters, ([value, label]) => '<button type="button" class="filter" data-filter="' + value + '">' + label + '</button>').join('');
updateFilters();
updateResults();

filterBar.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button || activeFilter === button.dataset.filter) return;
  activeFilter = button.dataset.filter;
  updateFilters();
  renderCards();
});

searchInput.addEventListener('input', updateResults);
function clearSearch() {
  searchInput.value = '';
  searchInput.focus();
  updateResults();
}
searchClear.addEventListener('click', clearSearch);
$('clear-all').addEventListener('click', () => {
  activeFilter = 'all';
  updateFilters();
  clearSearch();
});

grid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const prompt = prompts.find(item => item.id === button.dataset.id);
  if (!prompt) return;
  if (button.dataset.action === 'copy') copyFromCard(prompt, button);
  else openDetail(prompt, button, button.dataset.action === 'manual');
});

example.addEventListener('toggle', () => {
  if (dialog.open && example.open && selected?.image && !exampleImage.hasAttribute('src')) {
    exampleImage.src = './images/' + selected.image;
  }
});
dialogRetry.addEventListener('click', () => {
  if (selected && dialogRetry.getAttribute('aria-disabled') !== 'true') readDetail(selected);
});
dialogManual.addEventListener('click', selectSource);
dialogCopy.addEventListener('click', async () => {
  if (detailSource === null || dialogCopy.getAttribute('aria-disabled') === 'true') return;
  const requestId = detailRequestId;
  const status = $('dialog-status');
  dialogCopy.setAttribute('aria-disabled', 'true');
  try {
    await copyText(detailSource);
    if (dialog.open && requestId === detailRequestId) {
      if (document.activeElement === dialogManual) dialogCopy.focus();
      dialogManual.hidden = true;
      feedback(status, '已复制 SKILL.md');
    }
  } catch {
    if (dialog.open && requestId === detailRequestId) {
      dialogManual.hidden = false;
      feedback(status, '浏览器未允许自动复制。', true);
    }
  } finally {
    if (dialog.open && requestId === detailRequestId) dialogCopy.removeAttribute('aria-disabled');
  }
});
$('dialog-copy-id').addEventListener('click', async () => {
  if (!selected) return;
  const requestId = detailRequestId;
  const status = $('dialog-status');
  try {
    await copyText(selected.skillId);
    if (dialog.open && requestId === detailRequestId) feedback(status, '已复制 ID');
  } catch {
    if (dialog.open && requestId === detailRequestId) {
      const range = document.createRange();
      range.selectNodeContents($('dialog-skill-id'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      feedback(status, '已选中 ID，请手动复制。');
    }
  }
});
$('dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  if (dialog.open) return;
  detailRequestId += 1;
  selected = null;
  detailSource = null;
  (lastFocus?.isConnected ? lastFocus : searchInput).focus();
  lastFocus = null;
});
