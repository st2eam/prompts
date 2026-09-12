const prompts = [
  {
    id: 'photo', number: '01', name: '摄影记忆面板', en: 'PHOTO / ABSTRACT / EDITORIAL',
    description: '让照片保持真实，让抽象面板记住它的空间节奏。', input: '需附图 · 单张照片',
    image: 'photo-abstract.png', tone: 'sage', source: 'https://github.com/ZzzLc0405/photo-abstract-editorial',
    text: `请基于我附上的单张照片生成竖向摄影编辑作品。照片是唯一来源：上方忠实保留原片，只允许等比缩放或轻微裁切，不得重绘、修图、扩图或加滤镜。下方直接拼接均匀无纹理的象牙色抽象面板，没有相框、阴影或撕纸边。先观察原片中 3–6 个决定性的大小、方向、层级、重复与留白关系，再仅用少量照片取色的平面标记重构这些关系；不要描摹、画完整建筑或加入无来源装饰。面板至少保留约 70% 空白。只在面板内放一个基于照片事实的 2–5 词原创英文衬线标题。不要其他文字、Logo 或水印。只返回完成的图像。`
  },
  {
    id: 'distill', number: '02', name: '照片提炼海报', en: 'SCENE / DISTILLATION',
    description: '保留照片的情绪与结构，舍弃摄影像素。', input: '需附图 · 单张照片',
    image: 'scene-distillation.jpg', tone: 'terracotta', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill',
    text: `把我附上的照片仅当作语义参考，不当成成品素材。找出主体、关键空间关系和一组情绪张力，把它们变成源于照片的视觉隐喻。横图做横向 5:3，竖图做竖向 3:5。只保留 2–4 个可辨识的原片线索，删去大部分写实细节；用不规则剪纸色块、干印剪影或断续轮廓组成一个非对称的小型图形群，留出大量安静纸面。纸张和多数形态用中性色，选一个有明确构图作用的高饱和色作为少量强调。文字可有可无，但必须简短且深化图像，不当广告标题。最终只能有原创插画、纸张和文字；绝不嵌入、裁切、描摹或保留摄影像素。不要贴纸、3D、Logo 或水印。返回海报图像和一句简短创作说明。`
  },
  {
    id: 'gathered', number: '03', name: '实景拼贴海报', en: 'GATHERED / SCENES',
    description: '真实摄影为锚，抽象插画成场，撕纸边界让两者相遇。', input: '需附图 · 单张照片',
    image: 'gathered-scenes.jpg', tone: 'olive', source: 'https://github.com/Zeejay0/gathered-scenes-zine-skill',
    text: `用我附上的照片制作竖向 3:5 实景拼贴纸感海报。保留最能识别场景的真实摄影片段约占画面三分之一，主体形状、空间关系、自然颜色和摄影质感应可信，不要重画或替换。其余更大的区域是温暖奶油色纸上的源图衍生插画：只提取 1–2 个关键轮廓，把叶片、人群和纹理等密集细节合并成一两块大形与少量断续笔画，留下大量空白。摄影与纸面交接处必须有不规则、窄而清晰的手撕纤维边缘，无悬浮阴影。让一种鲜明印刷色附着在源图形状上并跨过撕纸边，真正引导视线；不要孤立色块或第二种新颜色。只加一行不超过五个词的低调英文小字。保持平面、安静、非商业；无广告标题、Logo、3D 或水印。只返回图像和一句创作思路。`
  },
  {
    id: 'doodle', number: '04', name: '喜茶风涂鸦海报', en: 'OBJECT / DOODLE',
    description: '保留真实物件，交给一位笨拙的线条工作者。', input: '需附图 · 单个清晰主体',
    image: 'heytea-doodle.jpg', tone: 'cream', source: 'https://github.com/Hchen1218/heytea-style',
    text: `请用我附上的照片制作一张非官方、无字版竖向涂鸦海报。选择照片中最清晰的一个主体，把它作为真实摄影物件保留：形状、材料和颜色应可辨认，不要将整张照片卡通化。将杂乱背景改成几乎空白的暖白色，主体占画面高度约 25%–45%。设计一个简单动作：一位极小的黑线条“工作者”正在攀爬、修理、搬动或观察主体。人物由断开的笨拙记号笔线段组成，歪圆空白头、无五官、短筒身和折线四肢；最多加一件动作必需的小工具。不要精致吉祥物。整张海报无新增文字、数字、标题、Logo 或水印，必要时裁掉原物自带文字。不要喜茶官方标志或暗示官方合作，不要贴纸堆叠或复杂场景。只返回图像。`
  }
];

const grid = document.querySelector('#prompt-grid');
const dialog = document.querySelector('#detail-dialog');
let selected = null;
let lastFocus = null;
let toastTimer;

function showToast(message, error = false) {
  const element = document.querySelector(dialog.open ? '#dialog-toast' : '#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.toggle('is-error', error);
  element.classList.add('is-visible');
  toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3500);
}

async function copyPrompt(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.cssText = 'position:fixed;opacity:0';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      if (!copied) throw new Error('copy failed');
    }
    showToast('已复制 Prompt，可以粘贴到 Agent 输入框');
  } catch {
    showToast('复制失败，请在详情中手动选中 Prompt', true);
  }
}

function openDetail(prompt, trigger) {
  selected = prompt;
  lastFocus = trigger;
  document.querySelector('#dialog-index').textContent = 'PROMPT ' + prompt.number + ' / 04 — VISUAL STUDY';
  document.querySelector('#dialog-title').textContent = prompt.name;
  document.querySelector('#dialog-description').textContent = prompt.description;
  document.querySelector('#dialog-input').textContent = prompt.input;
  const image = document.querySelector('#dialog-image');
  image.src = './images/' + prompt.image;
  image.alt = prompt.name + '：基于用户提供的照片生成';
  document.querySelector('#dialog-image-note').textContent = '同一张照片 · 不同视觉处理';
  document.querySelector('#dialog-source').href = prompt.source;
  document.querySelector('#dialog-prompt').value = prompt.text;
  dialog.showModal();
  document.querySelector('#dialog-close').focus();
}

for (const prompt of prompts) {
  const card = document.createElement('article');
  card.className = 'prompt-card tone-' + prompt.tone;
  card.innerHTML = `<div class="card-image-wrap"><img loading="lazy" decoding="async" src="./images/${prompt.image}" alt=""><span class="card-number">${prompt.number} / 04</span><span class="card-image-label">用户照片 · 风格示例</span></div><div class="card-body"><p class="card-en">${prompt.en}</p><h3>${prompt.name}</h3><p class="card-description">${prompt.description}</p><p class="card-input">${prompt.input}</p><div class="card-actions"><button type="button" data-action="view" data-id="${prompt.id}">查看详情 <span aria-hidden="true">↗</span></button><button type="button" data-action="copy" data-id="${prompt.id}" aria-label="复制${prompt.name} Prompt">复制 Prompt <span aria-hidden="true">⧉</span></button></div></div>`;
  grid.append(card);
}

grid.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const prompt = prompts.find(item => item.id === button.dataset.id);
  if (button.dataset.action === 'copy') copyPrompt(prompt.text);
  else openDetail(prompt, button);
});
document.querySelector('#dialog-copy').addEventListener('click', () => selected && copyPrompt(selected.text));
document.querySelector('#dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.querySelector('#dialog-toast').classList.remove('is-visible');
  lastFocus?.focus();
});
