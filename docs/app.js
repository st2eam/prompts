const prompts = [
  {
    id: 'photo', skillId: 'photo-abstract-editorial', number: '01', name: '摄影记忆面板', en: 'PHOTO / ABSTRACT / EDITORIAL', category: 'image', categoryLabel: '图像生成',
    description: '让照片保持真实，让抽象面板记住它的空间节奏。', input: '需附图 · 单张照片',
    image: 'photo-abstract.png', tone: 'sage', source: 'https://github.com/ZzzLc0405/photo-abstract-editorial',
    skillUrl: 'https://raw.githubusercontent.com/ZzzLc0405/photo-abstract-editorial/main/SKILL.md'
  },
  {
    id: 'distill', skillId: 'scene-distillation-zine-v1-3', number: '02', name: '照片提炼海报', en: 'SCENE / DISTILLATION', category: 'image', categoryLabel: '图像生成',
    description: '保留照片的情绪与结构，舍弃摄影像素。', input: '需附图 · 单张照片',
    image: 'scene-distillation.png', tone: 'terracotta', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill',
    skillUrl: 'https://raw.githubusercontent.com/Zeejay0/gathered-scenes-zine-skill/main/skills/scene-distillation-zine-v1-3/SKILL.md'
  },
  {
    id: 'gathered', skillId: 'scenes-gathered-zine-v1-3', number: '03', name: '实景拼贴海报', en: 'GATHERED / SCENES', category: 'image', categoryLabel: '图像生成',
    description: '真实摄影为锚，抽象插画成场，撕纸边界让两者相遇。', input: '需附图 · 单张照片',
    image: 'gathered-scenes.jpg', tone: 'olive', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill',
    skillUrl: 'https://raw.githubusercontent.com/Zeejay0/gathered-scenes-zine-skill/main/skills/scenes-gathered-zine-v1-3/SKILL.md'
  },
  {
    id: 'print-diptych-poster', skillId: 'print-diptych-poster', number: '07', name: '主题双联版画海报', en: 'IMAGE / DIPTYCH / PRINT', category: 'image', categoryLabel: '图像生成',
    description: '将参考图保留为上半部分，并在下半部分转化为极简纸感版画拼贴。', input: '需附图 · 单张参考图',
    tone: 'blue', image: 'print-diptych-poster.png', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/print-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/print-diptych-poster/SKILL.md'
  },
  {
    id: 'photo-isometric-diptych-poster', skillId: 'photo-isometric-diptych-poster', number: '04', name: '照片等距双联海报', en: 'PHOTO / ISOMETRIC / DIPTYCH', category: 'image', categoryLabel: '图像生成',
    description: '上半部保留真实照片，下半部将主体提炼为来源色彩的极简等距微缩插画。', input: '需附图 · 每张照片独立输出',
    tone: 'cream', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-isometric-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-isometric-diptych-poster/SKILL.md'
  },
  {
    id: 'photo-impressionist-impasto-diptych', skillId: 'photo-impressionist-impasto-diptych', number: '08', name: '照片印象派厚涂双联海报', en: 'PHOTO / IMPASTO / IMPRESSION', category: 'image', categoryLabel: '图像生成',
    description: '上半部保留无字原片，下半部以原场景重绘温暖的印象派厚涂油画。', input: '需附图 · 每张照片独立输出',
    tone: 'sand', image: 'photo-impressionist-impasto-diptych.png', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-impressionist-impasto-diptych/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-impressionist-impasto-diptych/SKILL.md'
  },
  {
    id: 'photo-editorial-paper-diptych', skillId: 'photo-editorial-paper-diptych', number: '09', name: '照片纸雕编辑双联海报', en: 'PHOTO / PAPER / EDITORIAL', category: 'image', categoryLabel: '图像生成',
    description: '每张照片单独输出：上半部保留真实原片，下半部用分层纸雕重建主体。', input: '需附图 · 每张照片独立输出',
    tone: 'cream', source: 'https://github.com/st2eam/prompts/blob/main/skills/photo-editorial-paper-diptych/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/skills/photo-editorial-paper-diptych/SKILL.md'
  },
  {
    id: 'photo-watercolor-diptych-poster', skillId: 'photo-watercolor-diptych-poster', number: '10', name: '城市风景淡彩水彩双联海报', en: 'CITY / LANDSCAPE / WATERCOLOR', category: 'image', categoryLabel: '图像生成',
    description: '保留上半部真实城市或风景原片，下半部提炼为居中的淡彩水彩插画。', input: '需附图 · 城市或风景照片',
    tone: 'sage', source: 'https://github.com/st2eam/prompts/blob/main/.agents/skills/photo-watercolor-diptych-poster/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/.agents/skills/photo-watercolor-diptych-poster/SKILL.md'
  },
  {
    id: 'new-project', skillId: 'new-project', number: '05', name: 'AI 原生前端项目', en: 'ENGINEERING / FRONTEND / PROJECT', category: 'engineering', categoryLabel: '项目开发',
    description: '从业务简介开始，建立可维护、可扩展、适合 AI 协作的前端项目。', input: '无需附图 · 新建项目',
    tone: 'blue', source: 'https://github.com/st2eam/prompts/blob/main/skills/new-project/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/skills/new-project/SKILL.md'
  },
  {
    id: 'wechat-mini-program', skillId: 'wechat-mini-program', number: '06', name: '微信小程序与 H5', en: 'ENGINEERING / WECHAT / CROSS-PLATFORM', category: 'engineering', categoryLabel: '跨端开发',
    description: '为微信小程序与 H5 共同设计清晰的架构、能力边界与交付流程。', input: '无需附图 · 跨端项目',
    tone: 'sand', source: 'https://github.com/st2eam/prompts/blob/main/skills/wechat-mini-program/SKILL.md',
    skillUrl: 'https://raw.githubusercontent.com/st2eam/prompts/main/skills/wechat-mini-program/SKILL.md'
  }
];

const grid = document.querySelector('#prompt-grid');
const dialog = document.querySelector('#detail-dialog');
const filterBar = document.querySelector('#prompt-filters');
const collectionCount = document.querySelector('#collection-count');
const totalCount = document.querySelector('#total-count');
const imageCount = document.querySelector('#image-count');
const engineeringCount = document.querySelector('#engineering-count');
const searchInput = document.querySelector('#skill-search');
const searchClear = document.querySelector('#search-clear');
const searchStatus = document.querySelector('#search-status');
const emptyState = document.querySelector('#empty-state');
const clearAll = document.querySelector('#clear-all');
const dialogCopy = document.querySelector('#dialog-copy');
const dialogPrompt = document.querySelector('#dialog-prompt');
let selected = null;
let lastFocus = null;
let toastTimer;
let detailRequestId = 0;
let activeFilter = 'all';
let searchTerm = '';
const skillCache = new Map();

function showToast(message, error = false) {
  const element = document.querySelector(dialog.open ? '#dialog-toast' : '#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.toggle('is-error', error);
  element.classList.add('is-visible');
  toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3500);
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
  const field = document.createElement('textarea');
  field.value = text;
  field.style.cssText = 'position:fixed;opacity:0';
  document.body.append(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('copy failed');
}

async function copySkill(prompt) {
  showToast('正在读取原始 SKILL.md…');
  try {
    await copyText(await loadSkill(prompt));
    showToast('已复制原始 SKILL.md，可以粘贴到 Agent 输入框');
  } catch {
    showToast('无法读取原始 SKILL.md，请打开来源链接手动复制', true);
  }
}

async function copySkillId(prompt) {
  try {
    await copyText(prompt.skillId);
    showToast('已复制 skill id：' + prompt.skillId);
  } catch {
    showToast('无法复制 skill id，请手动选择文本', true);
  }
}

function renderPlaceholderMarkup(prompt) {
  return '<div class="placeholder-sheet">' +
    '<div class="placeholder-fold" aria-hidden="true"></div>' +
    '<div class="placeholder-header"><span class="placeholder-pip"></span><span>SKILL INDEX</span><span class="placeholder-index">/' + prompt.number + '</span></div>' +
    '<div class="placeholder-name">SKILL<span>.md</span></div>' +
    '<div class="placeholder-rules" aria-hidden="true"><span></span><span></span><span></span></div>' +
    '<div class="placeholder-stamp">SOURCE<br><strong>READY</strong></div>' +
    '<div class="placeholder-footer"><span>' + prompt.categoryLabel.toUpperCase() + '</span><span>NO PREVIEW</span></div>' +
    '</div>';
}

function renderSkillVisual(prompt) {
  if (prompt.image) {
    return '<img loading="lazy" decoding="async" src="./images/' + prompt.image + '" alt="' + prompt.name + '示例">';
  }
  return '<div class="card-skill-art" aria-hidden="true">' + renderPlaceholderMarkup(prompt) + '</div><span class="card-image-label">' + prompt.categoryLabel + ' · 原始文件</span>';
}

function getVisiblePrompts() {
  const query = searchTerm.trim().toLowerCase();
  return prompts.filter(prompt => {
    const matchesFilter = activeFilter === 'all' || prompt.category === activeFilter;
    const searchable = [prompt.skillId, prompt.name, prompt.en, prompt.categoryLabel, prompt.description, prompt.input].join(' ').toLowerCase();
    return matchesFilter && (!query || searchable.includes(query));
  });
}

function renderCards() {
  const visible = getVisiblePrompts();
  grid.innerHTML = visible.map(prompt => {
    const cardType = prompt.image ? '' : ' card-no-image';
    return '<article class="prompt-card tone-' + prompt.tone + cardType + '">' +
      '<div class="card-image-wrap">' + renderSkillVisual(prompt) + '<span class="card-number">' + prompt.number + ' / ' + String(prompts.length).padStart(2, '0') + '</span></div>' +
      '<div class="card-body"><div class="card-heading"><p class="card-en">' + prompt.en + '</p><span class="card-category">' + prompt.categoryLabel + '</span></div><h3>' + prompt.name + '</h3><div class="card-skill-id"><span><small>SKILL ID</small><code title="' + prompt.skillId + '">' + prompt.skillId + '</code></span><button type="button" data-action="copy-id" data-id="' + prompt.id + '" aria-label="复制 skill id ' + prompt.skillId + '">复制 ID</button></div><p class="card-description">' + prompt.description + '</p>' +
      '<div class="card-meta"><span>' + prompt.input + '</span><a href="' + prompt.source + '" target="_blank" rel="noopener noreferrer">来源 ↗</a></div>' +
      '<div class="card-actions"><button class="view-action" type="button" data-action="view" data-id="' + prompt.id + '">查看原文 <span aria-hidden="true">↗</span></button><button class="copy-action" type="button" data-action="copy" data-id="' + prompt.id + '" aria-label="复制' + prompt.name + '原始 SKILL">复制原始 SKILL <span aria-hidden="true">⧉</span></button></div></div></article>';
  }).join('');
  const hasResults = visible.length > 0;
  grid.hidden = !hasResults;
  emptyState.hidden = hasResults;
  collectionCount.textContent = visible.length + ' / ' + String(prompts.length).padStart(2, '0') + ' 条技能';
  if (searchTerm) {
    searchStatus.textContent = '找到 ' + visible.length + ' 条匹配技能';
  } else if (activeFilter === 'all') {
    searchStatus.textContent = '显示全部技能';
  } else {
    searchStatus.textContent = '显示“' + (activeFilter === 'image' ? '图像生成' : '工程技能') + '”';
  }
}

function openDetail(prompt, trigger) {
  selected = prompt;
  lastFocus = trigger;
  detailRequestId += 1;
  document.querySelector('#dialog-index').textContent = 'SKILL ' + prompt.number + ' / ' + String(prompts.length).padStart(2, '0') + ' — ' + prompt.categoryLabel.toUpperCase();
  document.querySelector('#dialog-title').textContent = prompt.name;
  document.querySelector('#dialog-description').textContent = prompt.description;
  document.querySelector('#dialog-input').textContent = prompt.input;
  const image = document.querySelector('#dialog-image');
  const placeholder = document.querySelector('#dialog-placeholder');
  const visual = document.querySelector('.dialog-visual');
  if (prompt.image) {
    visual.classList.remove('dialog-no-image');
    image.hidden = false;
    placeholder.hidden = true;
    placeholder.innerHTML = '';
    image.src = './images/' + prompt.image;
    image.alt = prompt.name + '完整示例';

  } else {
    visual.classList.add('dialog-no-image');
    image.hidden = true;
    placeholder.hidden = false;
    placeholder.innerHTML = renderPlaceholderMarkup(prompt);
    image.removeAttribute('src');
    image.alt = '';

  }
  document.querySelector('#dialog-source').href = prompt.source;
  dialogPrompt.value = '正在读取原始 SKILL.md…';
  dialogPrompt.setAttribute('aria-busy', 'true');
  dialogCopy.disabled = true;
  dialog.showModal();
  document.querySelector('#dialog-close').focus();
  const requestId = detailRequestId;
  loadSkill(prompt).then(source => {
    if (requestId !== detailRequestId) return;
    dialogPrompt.value = source;
    dialogPrompt.setAttribute('aria-busy', 'false');
    dialogCopy.disabled = false;
  }).catch(() => {
    if (requestId !== detailRequestId) return;
    dialogPrompt.value = '原始 SKILL.md 读取失败，请通过右上方来源链接打开原文。';
    dialogPrompt.setAttribute('aria-busy', 'false');
  });
}

function renderFilters() {
  const filters = [
    ['all', '全部', prompts.length],
    ['image', '图像生成', prompts.filter(prompt => prompt.category === 'image').length],
    ['engineering', '工程技能', prompts.filter(prompt => prompt.category === 'engineering').length]
  ];
  filterBar.innerHTML = filters.map(([value, label, count], index) => '<button type="button" class="filter' + (index === 0 ? ' is-active' : '') + '" data-filter="' + value + '">' + label + '<span>' + String(count).padStart(2, '0') + '</span></button>').join('');
  totalCount.textContent = String(prompts.length).padStart(2, '0') + ' 条技能';
  imageCount.textContent = String(prompts.filter(prompt => prompt.category === 'image').length).padStart(2, '0');
  engineeringCount.textContent = String(prompts.filter(prompt => prompt.category === 'engineering').length).padStart(2, '0');
}

renderFilters();
renderCards();

filterBar.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  activeFilter = button.dataset.filter;
  filterBar.querySelector('.is-active')?.classList.remove('is-active');
  button.classList.add('is-active');
  renderCards();
});

searchInput.addEventListener('input', event => {
  searchTerm = event.target.value;
  searchClear.hidden = !searchTerm;
  renderCards();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchTerm = '';
  searchClear.hidden = true;
  searchInput.focus();
  renderCards();
});

clearAll.addEventListener('click', () => {
  activeFilter = 'all';
  searchTerm = '';
  searchInput.value = '';
  searchClear.hidden = true;
  filterBar.querySelector('.is-active')?.classList.remove('is-active');
  filterBar.querySelector('[data-filter="all"]').classList.add('is-active');
  renderCards();
  searchInput.focus();
});

grid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const prompt = prompts.find(item => item.id === button.dataset.id);
  if (!prompt) return;
  if (button.dataset.action === 'copy') copySkill(prompt);
  else if (button.dataset.action === 'copy-id') copySkillId(prompt);
  else openDetail(prompt, button);
});

dialogCopy.addEventListener('click', () => selected && copySkill(selected));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  detailRequestId += 1;
  document.querySelector('#dialog-toast').classList.remove('is-visible');
  lastFocus?.focus();
});
