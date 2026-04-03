/**
 * Gradventure demo — card choices, four stats, six endings, tokens + shop stub.
 */

const STORAGE = {
  tokens: 'gradventure_demo_tokens',
  shopFull: 'gradventure_demo_shop_full',
  shopEnter: 'gradventure_demo_shop_enter',
  endingsSeen: 'gradventure_demo_endings_seen',
};

const STAT_KEYS = ['lang', 'app', 'plan', 'sup'];
const STAT_LABELS = {
  lang: '语言准备',
  app: '申请认知',
  plan: '时间规划',
  sup: '支持网络',
};

/** @type {Array<{ text: string, left: string, right: string, L: Record<string, number>, R: Record<string, number> }>} */
const DEMO_CARDS = [
  {
    text: '大一开学，学长说「雅思大三再考也来得及」，你的态度是？',
    left: '先记下来，自己再查官网要求',
    right: '完全相信，暂不准备语言',
    L: { lang: 4, app: 5, plan: 3, sup: 0 },
    R: { lang: -6, app: -4, plan: -2, sup: 2 },
  },
  {
    text: '学校邮件里有一封交换项目说明会，时间与社团冲突。',
    left: '优先去听说明会',
    right: '先去社团，以后再了解',
    L: { lang: 2, app: 6, plan: 4, sup: 1 },
    R: { lang: 0, app: -5, plan: -3, sup: 3 },
  },
  {
    text: '中介宣传「保证进 Top10」，并要你一次性付清全款。',
    left: '警惕并查合同与退款条款',
    right: '觉得省事就签约',
    L: { lang: 0, app: 8, plan: 2, sup: 0 },
    R: { lang: -2, app: -10, plan: -4, sup: -2 },
  },
  {
    text: '你计划暑假考出语言成绩，但朋友约你长期旅行。',
    left: '压缩旅行，保留考试与复习窗口',
    right: '旅行优先，语言以后再议',
    L: { lang: 6, plan: 6, app: 2, sup: -1 },
    R: { lang: -8, plan: -8, app: -2, sup: 4 },
  },
  {
    text: '成绩单与推荐信还没准备，网申截止还有两周。',
    left: '列清单逐项推进，求助导师',
    right: '先交一版粗糙材料试试',
    L: { lang: 0, app: 5, plan: 7, sup: 5 },
    R: { lang: 0, app: -6, plan: -10, sup: -4 },
  },
  {
    text: '身心压力大，连续失眠，仍想硬撑刷实习。',
    left: '调整节奏，寻求心理咨询或倾诉',
    right: '继续硬扛，证明自己能行',
    L: { lang: -1, app: 2, plan: 4, sup: 8 },
    R: { lang: -2, app: -2, plan: -6, sup: -10 },
  },
  {
    text: '收到多封 offer，其中一所排名高但专业不完全匹配。',
    left: '综合长期职业规划做选择',
    right: '只看排名快速决定',
    L: { lang: 0, app: 6, plan: 5, sup: 2 },
    R: { lang: 0, app: -4, plan: -3, sup: -2 },
  },
  {
    text: '毕业前最后一次复盘：你如何总结自己的申请季？',
    left: '记录得失，愿意帮助学弟学妹',
    right: '不想再提，尽快翻篇',
    L: { lang: 2, app: 4, plan: 3, sup: 6 },
    R: { lang: 0, app: -2, plan: 0, sup: -4 },
  },
];

const ENDINGS = {
  A: {
    id: 'A',
    title: '顺利升学',
    body: '你信息充分、节奏稳健，在关键节点做出了理性选择。接下来的学业阶段，继续保持主动规划与求助意识。',
  },
  B: {
    id: 'B',
    title: 'Gap year / 延期准备',
    body: '你在规划上留有余地，语言或时间线曾出现张力。用间隔年补足背景与语言，同样是常见且有效的路径。',
  },
  C: {
    id: 'C',
    title: '转轨：就业或国内升学',
    body: '申请相关准备长期偏弱，或你主动将重心转向其他路径。无论哪条路，尽早做信息与技能上的对齐。',
  },
  D: {
    id: 'D',
    title: '高强度冲刺型录取',
    body: '语言与申请投入很高，但时间与节奏上偏紧。录取背后，记得补上休息与可持续的节奏。',
  },
  E: {
    id: 'E',
    title: '信息不足踩过坑',
    body: '曾多次依赖片面信息或捷径叙事。以后重大决策前，以官方渠道与合同细节为准，会少走很多弯路。',
  },
  F: {
    id: 'F',
    title: '需要暂停与支援',
    body: '身心或资源条曾处于极端状态。无论是休学、延期还是求助，优先照顾好自己，再谈下一步。',
  },
};

const RUN_TOKEN = 5;
const FIRST_ENDING_BONUS = 3;
const SHOP_FULL_COST = 20;

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function initStats() {
  return { lang: 50, app: 50, plan: 50, sup: 50 };
}

function applyDelta(stats, delta) {
  const next = { ...stats };
  for (const k of STAT_KEYS) {
    if (delta[k] != null) next[k] = clamp(next[k] + delta[k], 0, 100);
  }
  return next;
}

function resolveEnding(stats) {
  const vals = STAT_KEYS.map((k) => stats[k]);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const avg = vals.reduce((a, b) => a + b, 0) / 4;

  if (min <= 20 || max >= 95) return 'F';
  if (stats.app <= 36 && avg < 52) return 'E';
  if (stats.lang < 42 && stats.plan > 62) return 'B';
  if (stats.lang > 68 && stats.app > 68 && stats.plan < 44) return 'D';
  if (avg < 46 || stats.app < 40) return 'C';
  return 'A';
}

function getTokens() {
  try {
    return parseInt(localStorage.getItem(STORAGE.tokens) || '0', 10) || 0;
  } catch {
    return 0;
  }
}

function addTokens(n) {
  const t = Math.max(0, getTokens() + n);
  localStorage.setItem(STORAGE.tokens, String(t));
  return t;
}

function refreshTokenDisplay() {
  const el = document.getElementById('gdHeaderTokens');
  if (el) el.textContent = String(getTokens());
}

function hasShopFull() {
  return localStorage.getItem(STORAGE.shopFull) === '1';
}

function setShopFull() {
  localStorage.setItem(STORAGE.shopFull, '1');
}

function hasShopEnter() {
  return localStorage.getItem(STORAGE.shopEnter) === '1';
}

function setShopEnter() {
  localStorage.setItem(STORAGE.shopEnter, '1');
}

function getEndingsSeen() {
  try {
    const raw = localStorage.getItem(STORAGE.endingsSeen);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function markEndingSeen(id) {
  const seen = getEndingsSeen();
  if (!seen[id]) {
    seen[id] = true;
    localStorage.setItem(STORAGE.endingsSeen, JSON.stringify(seen));
    return true;
  }
  return false;
}

function showScreen(id) {
  document.querySelectorAll('.gd-screen').forEach((el) => {
    el.classList.toggle('is-active', el.id === id);
  });
}

function renderMeters(stats) {
  STAT_KEYS.forEach((k) => {
    const v = stats[k];
    const fill = document.querySelector(`.gd-meter[data-key="${k}"] .gd-meter-fill`);
    const wrap = document.querySelector(`.gd-meter[data-key="${k}"]`);
    if (fill) fill.style.width = `${v}%`;
    if (wrap) {
      wrap.classList.toggle('low', v < 30);
      wrap.classList.toggle('high', v > 75);
    }
  });
}

let state = {
  stats: initStats(),
  index: 0,
  cardEl: null,
  startX: 0,
  currentX: 0,
  dragging: false,
};

function mountCard() {
  const wrap = document.getElementById('gdCardWrap');
  const i = state.index;
  if (i >= DEMO_CARDS.length) {
    finishRun();
    return;
  }
  const c = DEMO_CARDS[i];
  wrap.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'gd-card';
  card.innerHTML = `
    <div>
      <div class="gd-card-badge">大一 · 抉择 ${i + 1} / ${DEMO_CARDS.length}</div>
      <div class="gd-card-text">${c.text}</div>
    </div>
    <div>
      <div class="gd-card-choices">
        <button type="button" class="gd-choice gd-choice-left">← ${c.left}</button>
        <button type="button" class="gd-choice gd-choice-right">${c.right} →</button>
      </div>
      <div class="gd-hint"><span>左滑 / 左侧按钮</span><span>右滑 / 右侧按钮</span></div>
    </div>
  `;
  wrap.appendChild(card);
  state.cardEl = card;

  const choose = (dir) => {
    const delta = dir === 'left' ? c.L : c.R;
    state.stats = applyDelta(state.stats, delta);
    renderMeters(state.stats);
    state.index += 1;
    mountCard();
  };

  card.querySelector('.gd-choice-left')?.addEventListener('click', (e) => {
    e.stopPropagation();
    choose('left');
  });
  card.querySelector('.gd-choice-right')?.addEventListener('click', (e) => {
    e.stopPropagation();
    choose('right');
  });

  let startY = 0;
  card.addEventListener(
    'pointerdown',
    (e) => {
      if (e.target.closest('button')) return;
      state.dragging = true;
      state.startX = e.clientX;
      startY = e.clientY;
      state.currentX = 0;
      card.classList.add('gd-swiping');
      card.setPointerCapture(e.pointerId);
    },
    { passive: true }
  );

  card.addEventListener('pointermove', (e) => {
    if (!state.dragging) return;
    state.currentX = e.clientX - state.startX;
    const rot = state.currentX * 0.05;
    card.style.transform = `translateX(${state.currentX}px) rotate(${rot}deg)`;
  });

  card.addEventListener('pointerup', (e) => {
    if (!state.dragging) return;
    state.dragging = false;
    card.classList.remove('gd-swiping');
    const threshold = 80;
    if (state.currentX < -threshold) {
      card.style.transform = '';
      choose('left');
    } else if (state.currentX > threshold) {
      card.style.transform = '';
      choose('right');
    } else {
      card.style.transform = '';
    }
    state.currentX = 0;
  });

  card.addEventListener('pointercancel', () => {
    state.dragging = false;
    if (state.cardEl) state.cardEl.style.transform = '';
  });
}

function finishRun() {
  const endId = resolveEnding(state.stats);
  const info = ENDINGS[endId];
  let bonus = RUN_TOKEN;
  if (markEndingSeen(endId)) bonus += FIRST_ENDING_BONUS;
  const total = addTokens(bonus);
  setShopEnter();

  document.getElementById('gdOutcomeTag').textContent = `结局 · ${info.title}`;
  document.getElementById('gdOutcomeTitle').textContent = info.title;
  document.getElementById('gdOutcomeBody').textContent = info.body;
  document.getElementById('gdTokenMsg').textContent =
    `本局获得 ${bonus} 点成长点数（含通关基础 ${RUN_TOKEN} 点` +
    (bonus > RUN_TOKEN ? ` + 首次达成该结局 ${FIRST_ENDING_BONUS} 点` : '') +
    `）。累计 ${total} 点。`;

  refreshTokenDisplay();
  showScreen('screen-end');
}

function startRun() {
  state.stats = initStats();
  state.index = 0;
  renderMeters(state.stats);
  refreshTokenDisplay();
  showScreen('screen-play');
  mountCard();
}

function openShop() {
  const tokens = getTokens();
  document.getElementById('gdShopTokens').textContent = String(tokens);
  const full = hasShopFull();
  const rowFull = document.getElementById('gdShopRowFull');
  rowFull.querySelector('.gd-shop-status').textContent = full ? '已解锁' : `未解锁 · ${SHOP_FULL_COST} 点`;
  rowFull.classList.toggle('unlocked', full);
  rowFull.classList.toggle('locked', !full);

  document.getElementById('gdBtnUnlockFull').style.display = full ? 'none' : 'inline-flex';
  document.getElementById('gdMentorPreview').textContent = full
    ? '（Demo）此处将接入 supervisor 推荐筛选与项目数据。'
    : '完整内容需解锁后显示。';

  showScreen('screen-shop');
}

function tryUnlockFull() {
  if (hasShopFull()) return;
  const t = getTokens();
  if (t < SHOP_FULL_COST) {
    alert(`成长点数不足：需要 ${SHOP_FULL_COST} 点，当前 ${t} 点。再多玩几局即可。`);
    return;
  }
  addTokens(-SHOP_FULL_COST);
  setShopFull();
  refreshTokenDisplay();
  openShop();
}

document.getElementById('gdBtnStart')?.addEventListener('click', startRun);
document.getElementById('gdBtnAgain')?.addEventListener('click', startRun);
document.getElementById('gdBtnShop')?.addEventListener('click', openShop);
document.getElementById('gdBtnUnlockFull')?.addEventListener('click', tryUnlockFull);
document.getElementById('gdBackFromShop')?.addEventListener('click', () => showScreen('screen-end'));
document.getElementById('gdBackToStart')?.addEventListener('click', () => showScreen('screen-start'));

document.addEventListener('DOMContentLoaded', () => {
  refreshTokenDisplay();
});
