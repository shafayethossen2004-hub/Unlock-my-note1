/* ═══════════════════════════════════════════════════
   WHISPERS OF LOVE 2.0 — PREMIUM SCRIPT
   ═══════════════════════════════════════════════════ */
'use strict';

/* ── CHAPTER META ─────────────────────── */
const CHAPTERS = [
  { id:'ch0', roman:'Chapter I',   name:'The First Spark'    },
  { id:'ch1', roman:'Chapter II',  name:'Sky of Wishes'      },
  { id:'ch2', roman:'Chapter III', name:'The Heart Lock'     },
  { id:'ch3', roman:'Chapter IV',  name:'Garden of Whispers' },
  { id:'ch4', roman:'Chapter V',   name:'Forever & Always'   },
];

/* ── WHISPERS DATA ─────────────────────── */
const WHISPERS = [
  {
    icon: '🌸',
    img: './Images/whisper_1.jpg',
    cap: '"The Sunshine in My Days 🌸"',
    title: 'The Sunshine in My Days',
    text: 'The way your laughter effortlessly lights up even the heaviest darkness in my world.'
  },
  {
    icon: '✨',
    img: './Images/whisper_2.jpg',
    cap: '"My Favorite Constellation ✨"',
    title: 'My Favorite Constellation',
    text: 'How I can look into your eyes and instantly feel at peace, like finding home after a lifetime of searching.'
  },
  {
    icon: '💖',
    img: './Images/whisper_3.jpg',
    cap: '"Warmth in Every Winter ☕"',
    title: 'A Pure & Gentle Heart',
    text: 'The boundless kindness you share so freely, reminding me how soft and precious life can be.'
  },
  {
    icon: '🎶',
    img: './Images/whisper_6.jpg',
    cap: '"Our Sweetest Harmony 🎶"',
    title: 'My Sweetest Faru',
    text: 'Hearing your voice brings a stillness to my soul, transforming ordinary moments into poetry.'
  },
  {
    icon: '🌙',
    img: './Images/whisper_4.jpg',
    cap: '"Comfort in the Silence 🌌"',
    title: 'Comfort Beyond Words',
    text: 'The rare magic of being silent beside you, where every unspoken thought is felt and understood.'
  },
  {
    icon: '💍',
    img: './Images/whisper_5.jpg',
    cap: '"A Lifetime of Tomorrows 💍"',
    title: 'A Lifetime of Tomorrows',
    text: 'Knowing that whatever storms or sunrises the universe brings, I get to face all of them with you.'
  }
];

/* ── WISHES ─────────────────────── */
const WISHES = [
  "May every dawn whisper your name like a prayer.",
  "May our laughter echo through every lifetime.",
  "May the stars count the days we spent together.",
  "May every heartbeat remind you — you are loved.",
  "May the wind carry my kisses to you, always.",
  "May our love bloom fiercer than any wildfire.",
  "May time slow down whenever we hold each other.",
  "May distance only make our hearts grow fonder.",
  "May we be each other's safest home, always.",
  "May the moon sing lullabies only we can hear.",
];

/* ── VOWS ─────────────────────── */
const VOW_TEXT = `I promise to be your sunrise on the darkest mornings,
your calm in every storm, your home in a world of chaos.
I choose you — not just today, but across every
lifetime the stars have yet to write.`;

/* ── POEM LINES ─────────────────────── */
const POEM = [
  "In the quiet between heartbeats, I hear your name  Faru—",
  "A melody older than time, a love that remains.",
  "You are the dawn I did not know I was waiting for,",
  "The chapter I would choose to read forever more.",
];

/* ── STATE ─────────────────────── */
let current  = 0;
let wishCount = 0;
let locked    = true;
let giftOpen  = false;
let vinylPlay = false;
let bgmOn     = false;
let autoPlay  = false;
let autoTimer = null;
let audioCtx  = null;
let ch0Illuminated = false;

/* ── AUDIO ENGINE ─────────────────────── */
function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}
function playNote(freq, dur = .3, type = 'sine', vol = .12) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch(e) { /* silent */ }
}
function playChime(notes = [523.25,659.25,783.99], spacing = .12) {
  notes.forEach((f,i) => setTimeout(() => playNote(f,.4,'sine',.1), i*spacing*1000));
}
function playUnlock() {
  [392,523.25,659.25,783.99,1046.5].forEach((f,i) => setTimeout(() => playNote(f,.25,'triangle',.14), i*80));
}
function playBgm() {
  /* Gentle ambient loop */
  const notes = [261.63, 293.66, 329.63, 392, 329.63, 293.66];
  let i = 0;
  return setInterval(() => {
    if (!bgmOn) return;
    playNote(notes[i % notes.length] * .5, .8, 'sine', .05);
    i++;
  }, 700);
}
let bgmInterval = null;

/* ── DOM UTILS ─────────────────────── */
const $ = id => document.getElementById(id);
/* ═══════════════════════════════════════════════════
   5 UNIQUE TEXT REVEAL ENGINES
   ═══════════════════════════════════════════════════ */

/* 1. Chapter I: Celestial Stardust Word Stagger */
function revealSparkWords(el, text) {
  if (!el) return;
  el.innerHTML = '';
  const wrap = document.createElement('span');
  wrap.className = 'sparkle-word-wrap';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'sparkle-word';
    span.textContent = word;
    span.style.animationDelay = `${i * 0.065}s`;
    wrap.appendChild(span);
  });
  el.appendChild(wrap);
}

/* 2. Chapter II: Golden Starlight Rising Mist */
function revealLanternWave(el, text) {
  if (!el) return;
  el.innerHTML = '';
  const span = document.createElement('span');
  span.className = 'lantern-rise-text';
  span.textContent = text;
  el.appendChild(span);
}

/* 3. Chapter III: Royal Calligraphic Ink Unfold */
function revealCalligraphicInk(el, text) {
  if (!el) return;
  el.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'calligraphy-scroll-text';
  
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  sentences.forEach((sent, i) => {
    const p = document.createElement('p');
    p.className = 'ink-line';
    p.textContent = sent.trim();
    p.style.animationDelay = `${i * 0.75 + 0.1}s`;
    wrap.appendChild(p);
  });
  el.appendChild(wrap);
}

/* 4. Chapter IV: Petal Bloom & 3D Spring Breeze */
function revealPetalUnfurl(el, text) {
  if (!el) return;
  el.innerHTML = '';
  const wrap = document.createElement('span');
  wrap.className = 'petal-bloom-wrap';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'petal-word';
    span.textContent = word;
    span.style.animationDelay = `${i * 0.05}s`;
    wrap.appendChild(span);
  });
  el.appendChild(wrap);
}

/* 5. Chapter V: Aurora Starlight Light-Sweep */
function revealAuroraLight(el, text, delay = 0) {
  if (!el) return;
  el.innerHTML = '';
  setTimeout(() => {
    const span = document.createElement('span');
    span.className = 'aurora-line-reveal';
    span.textContent = text;
    el.appendChild(span);
  }, delay);
}

/* ── CURSOR ─────────────────────── */
const ring = $('cursorRing'), dot = $('cursorDot');
let mx = 0, my = 0, rx = 0, ry = 0;
let lastTrailTime = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  const now = Date.now();
  if (now - lastTrailTime > 120) {
    lastTrailTime = now;
    spawnHeart(mx, my);
  }
});
(function animCursor() {
  rx += (mx - rx) * .18; ry += (my - ry) * .18;
  if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
})();

function spawnHeart(x, y) {
  const existing = document.querySelectorAll('.trail-heart');
  if (existing.length > 6) existing[0].remove();
  const h = document.createElement('div');
  h.className = 'trail-heart';
  h.textContent = ['❤','💕','✦','·'][Math.floor(Math.random()*4)];
  h.style.cssText = `left:${x-7}px;top:${y-7}px;will-change:transform,opacity;`;
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 700);
}

/* Add cursor hover listener on interactive elements */
document.addEventListener('mouseover', e => {
  if (ring && e.target.closest('button, a, input, .key-wrap, .lock-wrap, .gift-box, .track, .chap-dot, .nav-btn, .pill-btn, .foot-btn, .photo-frame')) {
    ring.classList.add('cursor-hover');
  }
});
document.addEventListener('mouseout', e => {
  if (ring && e.target.closest('button, a, input, .key-wrap, .lock-wrap, .gift-box, .track, .chap-dot, .nav-btn, .pill-btn, .foot-btn, .photo-frame')) {
    ring.classList.remove('cursor-hover');
  }
});

/* ═══════════════════════════════════════════════════
   CHAPTER NAVIGATION (DEBOUNCED & GPU ACCELERATED)
   ═══════════════════════════════════════════════════ */
let isNavigating = false;
function gotoChapter(n, skipInit = false) {
  const target = Math.max(0, Math.min(CHAPTERS.length - 1, n));
  if (target === current && !skipInit) return;
  if (isNavigating && !skipInit) return;
  isNavigating = true;
  setTimeout(() => { isNavigating = false; }, 280);

  const old = current;
  current = target;

  /* chapters */
  document.querySelectorAll('.chapter').forEach((el,i) => {
    el.classList.toggle('active', i === current);
  });
  /* dots */
  document.querySelectorAll('.chap-dot').forEach((d,i) => {
    d.classList.toggle('active', i === current);
    d.classList.toggle('done',   i < current);
  });
  /* footer */
  if ($('prevBtn')) $('prevBtn').disabled = current === 0;
  if ($('footChap')) $('footChap').textContent = CHAPTERS[current].roman;
  if ($('footName')) $('footName').textContent = CHAPTERS[current].name;

  if (current === 0 && old !== 0 && old !== undefined) {
    ch0Illuminated = false;
    const ch0Btn = $('ch0Btn');
    if (ch0Btn) {
      ch0Btn.innerHTML = '<i class="fa-solid fa-sparkles"></i> Ignite the Spark ✨';
      ch0Btn.classList.remove('is-continue');
    }
    const qb = $('ch0QuoteBox');
    if (qb) qb.classList.remove('visible', 'pulse-glow');
    const qsub = $('ch0Sub');
    if (qsub) qsub.innerHTML = '';
  }

  if (!skipInit) initChapter(current);
  if (old !== current) playChime();

  if (current === 0 && window.resumeCh0Canvas) window.resumeCh0Canvas();
  if (current === 4 && window.resumeCh4Canvas) window.resumeCh4Canvas();
}

if ($('prevBtn')) $('prevBtn').addEventListener('click', () => gotoChapter(current - 1));

/* In-scene continue buttons */
document.querySelectorAll('.ch-continue-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const next = btn.dataset.next !== undefined ? +btn.dataset.next : current + 1;
    gotoChapter(next);
  });
});

document.querySelectorAll('.chap-dot').forEach(d => {
  d.addEventListener('click', () => gotoChapter(+d.dataset.ch));
});
/* Keyboard */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  gotoChapter(current+1);
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    gotoChapter(current-1);
});
/* Swipe */
let touchX = 0;
document.addEventListener('touchstart', e => touchX = e.touches[0].clientX, {passive:true});
document.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 55) gotoChapter(current + (dx < 0 ? 1 : -1));
}, {passive:true});

/* ── BGM (OPTIONAL) ─────────────────────── */
if ($('bgmBtn')) {
  $('bgmBtn').addEventListener('click', () => {
    bgmOn = !bgmOn;
    if ($('bgmIcon')) $('bgmIcon').className = bgmOn ? 'fa-solid fa-volume-high' : 'fa-solid fa-music';
    $('bgmBtn').classList.toggle('on', bgmOn);
    if (bgmOn) { bgmInterval = playBgm(); }
    else if (bgmInterval) { clearInterval(bgmInterval); }
  });
}

/* ── AUTO PLAY (OPTIONAL) ─────────────────────── */
if ($('autoBtn')) {
  $('autoBtn').addEventListener('click', () => {
    autoPlay = !autoPlay;
    if ($('autoIcon')) $('autoIcon').className = autoPlay ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    $('autoBtn').classList.toggle('on', autoPlay);
    if (autoPlay) { autoTimer = setInterval(() => gotoChapter(current+1), 7000); }
    else { clearInterval(autoTimer); }
  });
}

/* ═══════════════════════════════════════════════════
   CHAPTER 0 — THE FIRST SPARK
   ═══════════════════════════════════════════════════ */
function initCh0() {
  const container = $('ch0Stars');
  const ch0 = $('ch0');
  const sparkOrb = $('sparkOrb');
  const quoteBox = $('ch0QuoteBox');
  const typeEl = $('ch0Sub');
  const ch0Btn = $('ch0Btn');

  /* Ambient floating romantic bokeh / sparks */
  if (container) {
    container.innerHTML = '';
    const sparkColors = ['#f43f5e', '#fb7185', '#d4a017', '#fde047', '#be123c', '#f472b6'];
    for (let i = 0; i < 45; i++) {
      const s = document.createElement('div');
      const sz = Math.random() * 6 + 3;
      const col = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      s.className = 'ch0-spark-particle';
      s.style.cssText = `
        width:${sz}px; height:${sz}px;
        background:${col};
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        box-shadow:0 0 10px ${col};
        animation-duration:${2.5 + Math.random()*3.5}s;
        animation-delay:${Math.random()*3}s;
      `;
      container.appendChild(s);
    }
  }

  /* Spark Shockwave */
  function spawnShockwave(x, y) {
    if (!ch0) return;
    const ring = document.createElement('div');
    ring.className = 'spark-ripple-ring';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    ch0.appendChild(ring);
    setTimeout(() => ring.remove(), 1450);
  }

  /* Floating burst hearts */
  function spawnFloatingHearts(originX, originY) {
    if (!ch0) return;
    const hearts = ['💖', '✨', '🌸', '💫', '💕', '🌹', '✦', '⭐'];
    const count = 12 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const h = document.createElement('div');
      h.className = 'spark-floating-heart';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      h.style.left = originX + 'px';
      h.style.top = originY + 'px';
      const hx = (Math.random() * 220 - 110);
      const hrot = (Math.random() * 60 - 30);
      h.style.setProperty('--shx', `${hx}px`);
      h.style.setProperty('--shrot', `${hrot}deg`);
      h.style.animationDuration = `${1.8 + Math.random() * 1.2}s`;
      h.style.animationDelay = `${i * 45}ms`;
      ch0.appendChild(h);
      setTimeout(() => h.remove(), 3200);
    }
  }

  /* Canvas Celestial Glow */
  const canvas = $('ch0Canvas');
  let ctx = null, w = 0, h = 0;
  let particles = [];

  if (canvas) {
    ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = w = canvas.offsetWidth;
      canvas.height = h = canvas.offsetHeight;
      particles = [];
      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.2 + 0.8,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.4 + 0.1,
          angle: Math.random() * Math.PI * 2
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    let ch0LoopRunning = false;
    window.resumeCh0Canvas = function() {
      if (!ch0LoopRunning && ch0 && ch0.classList.contains('active')) {
        drawCanvas();
      }
    };

    function drawCanvas() {
      if (!ctx || !ch0 || !ch0.classList.contains('active')) {
        ch0LoopRunning = false;
        return;
      }
      ch0LoopRunning = true;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        p.x += Math.sin(p.angle) * 0.25;
        p.angle += 0.02;
        if (p.y < 0) { p.y = h; p.x = Math.random() * w; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha * 0.6})`;
        ctx.fill();
      }

      requestAnimationFrame(drawCanvas);
    }
    drawCanvas();
  }

  const ROMANTIC_PROSE = [
    "In a universe of billions, my eyes found yours — and in that single heartbeat, my forever began.",
    "A gentle spark in the silence, turning ordinary moments into timeless poetry…",
    "From the moment we met, every heartbeat has whispered your name.",
    "You are the light I didn't know I was searching for across lifetimes."
  ];
  let proseIndex = 0;

  function doSparkIgnite(e) {
    getAudioCtx();

    const rect = ch0.getBoundingClientRect();
    let clickX = rect.width / 2;
    let clickY = rect.height * 0.42;

    if (e && e.clientX !== undefined) {
      clickX = e.clientX - rect.left;
      clickY = e.clientY - rect.top;
    }

    /* 1. Orb Pulse Glow */
    if (sparkOrb) {
      sparkOrb.classList.remove('pulse-ignite');
      void sparkOrb.offsetWidth;
      sparkOrb.classList.add('pulse-ignite');
    }

    /* 2. Expanding shockwave ring */
    spawnShockwave(clickX, clickY);

    /* 3. Floating crystal hearts & stars */
    spawnFloatingHearts(clickX, clickY);

    /* 4. Quote Box Glow & Stardust Reveal */
    if (quoteBox) {
      quoteBox.classList.remove('pulse-glow');
      void quoteBox.offsetWidth;
      quoteBox.classList.add('visible', 'pulse-glow');
    }
    const prose = ROMANTIC_PROSE[proseIndex % ROMANTIC_PROSE.length];
    proseIndex++;
    revealSparkWords(typeEl, prose);

    /* 6. Harmonic Crystal Chimes */
    playChime([523.25, 659.25, 783.99, 1046.5, 1318.51], 0.08);

    /* 7. Transform Button */
    ch0Illuminated = true;
    if (ch0Btn) {
      ch0Btn.innerHTML = 'Enter Our Story 🌹 <i class="fa-solid fa-chevron-right"></i>';
      ch0Btn.classList.add('is-continue');
    }
  }

  if (ch0Btn) {
    ch0Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!ch0Illuminated) {
        doSparkIgnite(e);
      } else {
        gotoChapter(1);
      }
    });
  }

  if (sparkOrb) {
    sparkOrb.addEventListener('click', (e) => {
      e.stopPropagation();
      doSparkIgnite(e);
    });
  }

  if (ch0) {
    ch0.addEventListener('click', (e) => {
      if (e.target.closest('#ch0Btn') || e.target.closest('.floating-controls')) return;
      doSparkIgnite(e);
    });
  }
}

/* ═══════════════════════════════════════════════════
   CHAPTER 1 — SKY OF WISHES
   ═══════════════════════════════════════════════════ */
function initCh1() {
  let wc = 0;
  const skyBg       = $('skyBg');
  const wishEl      = $('wishText');
  const countEl     = $('wishCount');
  function triggerSkyRipple(x, y) {
    if (!skyBg) return;
    const ring = document.createElement('div');
    ring.className = 'sky-ripple-ring';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    skyBg.appendChild(ring);
    setTimeout(() => ring.remove(), 1500);
  }

  function triggerSkyGlow(x, y) {
    if (!skyBg) return;
    const glow = document.createElement('div');
    glow.className = 'sky-glow-pulse';
    const pctX = (x / window.innerWidth) * 100;
    const pctY = (y / window.innerHeight) * 100;
    glow.style.setProperty('--glow-x', `${pctX}%`);
    glow.style.setProperty('--glow-y', `${pctY}%`);
    skyBg.appendChild(glow);
    setTimeout(() => glow.remove(), 2500);
  }

  function spawnSparks(x, y) {
    if (!skyBg) return;
    for (let i = 0; i < 28; i++) {
      const sp = document.createElement('div');
      sp.className = 'sky-spark';
      const angle = (i / 28) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const dist = 35 + Math.random() * 95;
      sp.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      sp.style.setProperty('--sy', (Math.sin(angle) * dist - 35) + 'px');
      const sz = (Math.random() * 6 + 3) + 'px';
      sp.style.width = sz;
      sp.style.height = sz;
      sp.style.left = x + 'px';
      sp.style.top = y + 'px';
      sp.style.animationDuration = (0.7 + Math.random() * 0.7) + 's';
      skyBg.appendChild(sp);
      setTimeout(() => sp.remove(), 1500);
    }
  }

  function spawnHeartsAndStars(x, y) {
    if (!skyBg) return;
    const symbols = ['💖', '✨', '⭐', '💫', '🌸', '🏮', '✨'];
    for (let i = 0; i < 7; i++) {
      const h = document.createElement('div');
      h.className = 'floating-heart-spark';
      h.textContent = symbols[i % symbols.length];
      const hx = (Math.random() * 140 - 70) + 'px';
      const hrot = (Math.random() * 40 - 20) + 'deg';
      h.style.setProperty('--hx', hx);
      h.style.setProperty('--hrot', hrot);
      h.style.left = (x + (Math.random() * 40 - 20)) + 'px';
      h.style.top = (y + (Math.random() * 20 - 10)) + 'px';
      h.style.animationDuration = (1.8 + Math.random() * 0.8) + 's';
      skyBg.appendChild(h);
      setTimeout(() => h.remove(), 2600);
    }
  }

  function spawnSingleLantern(targetX = null, isAmbient = false, startBottom = null) {
    if (!skyBg) return;
    const ln = document.createElement('div');
    ln.className = 'lantern-el' + (isAmbient ? ' ambient' : '');
    
    const posX = targetX !== null ? Math.max(4, Math.min(94, targetX)) : (5 + Math.random() * 88);
    const scale = isAmbient ? (0.35 + Math.random() * 0.45) : (0.9 + Math.random() * 0.35);
    const duration = isAmbient ? (9 + Math.random() * 6) : (6.5 + Math.random() * 2.5);
    const driftX = (Math.random() * 140 - 70) + 'px';
    const rotStart = (Math.random() * 10 - 5) + 'deg';
    const rotEnd = (Math.random() * 18 - 9) + 'deg';

    ln.style.left = posX + '%';
    if (startBottom !== null) {
      ln.style.bottom = startBottom + 'px';
    } else {
      ln.style.bottom = (isAmbient ? (Math.random() * 20 - 40) : -20) + 'px';
    }
    ln.style.setProperty('--scale', scale);
    ln.style.setProperty('--drift-x', driftX);
    ln.style.setProperty('--rot-start', rotStart);
    ln.style.setProperty('--rot-end', rotEnd);
    ln.style.animationDuration = duration + 's';

    const lw = isAmbient ? '28px' : '46px';
    const lh = isAmbient ? '38px' : '62px';
    ln.style.setProperty('--lw', lw);
    ln.style.setProperty('--lh', lh);

    ln.innerHTML = `<div class="lantern-body"><div class="lantern-flame"></div></div>`;
    skyBg.appendChild(ln);
    setTimeout(() => ln.remove(), duration * 1000 + 500);
  }

  let lastLanternTime = 0;
  function releaseLantern(e = null) {
    const now = Date.now();
    if (now - lastLanternTime < 240) return;
    lastLanternTime = now;
    getAudioCtx();

    let posX = window.innerWidth * 0.5;
    let posY = window.innerHeight * 0.68;
    let clickXPct = null;

    if (e && e.clientX) {
      posX = e.clientX;
      posY = e.clientY;
      clickXPct = (posX / window.innerWidth) * 100;
    } else {
      const btn = $('lanternBtn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        posX = rect.left + rect.width / 2;
        posY = rect.top + rect.height / 2;
        clickXPct = (posX / window.innerWidth) * 100;
      }
    }

    // 1. Trigger shockwave ripple ring at click/btn origin
    triggerSkyRipple(posX, posY);

    // 2. Sky ambient warm golden-rose glow wave
    triggerSkyGlow(posX, posY);

    // 3. Stardust particle burst
    spawnSparks(posX, posY);

    // 4. Floating romantic hearts & stars
    spawnHeartsAndStars(posX, posY);

    // 5. Major Radiant Lantern launched directly near click
    spawnSingleLantern(clickXPct, false, (window.innerHeight - posY - 20));

    // 7. Constellation of 4-6 companion background lanterns
    const companionCount = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < companionCount; i++) {
      setTimeout(() => {
        const offset = (clickXPct !== null ? (clickXPct + (Math.random() * 50 - 25)) : (Math.random() * 90 + 5));
        spawnSingleLantern(offset, true, -30);
      }, i * 140 + Math.random() * 100);
    }

    // 8. Wish Display Card Glow Pulse & Typewriter
    if (wishDisplay) {
      wishDisplay.classList.remove('pulse-glow');
      void wishDisplay.offsetWidth; // trigger reflow
      wishDisplay.classList.add('pulse-glow');
    }

    // Update Wish text
    const wish = WISHES[wc % WISHES.length];
    if (wishEl) revealLanternWave(wishEl, wish);
    wc++;
    wishCount = wc;

    // 9. Count bump animation
    if (countEl) {
      countEl.textContent = `${wc} wish${wc === 1 ? '' : 'es'} sent to the sky 🏮`;
      countEl.classList.remove('bump');
      void countEl.offsetWidth;
      countEl.classList.add('bump');
    }

    // 10. Multi-tone fairy-tale harp chord
    playChime([523.25, 659.25, 783.99, 1046.5, 1318.51], 0.07);
  }

  if ($('lanternBtn')) {
    $('lanternBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      releaseLantern(e);
    });
  }

  if ($('ch1')) {
    $('ch1').addEventListener('click', (e) => {
      if (e.target.closest('#lanternBtn') || e.target.closest('.ch-continue-btn') || e.target.closest('.floating-controls')) return;
      releaseLantern(e);
    });
  }

  // Ambient gentle floating lanterns continuously in the background
  for (let i = 0; i < 5; i++) {
    setTimeout(() => spawnSingleLantern(null, true, Math.random() * 100), i * 1000);
  }
  setInterval(() => {
    const ch1 = $('ch1');
    if (ch1 && ch1.classList.contains('active')) {
      spawnSingleLantern(null, true, -30);
    }
  }, 2800);
}

/* ═══════════════════════════════════════════════════
   CHAPTER 2 — HEART LOCK
   ═══════════════════════════════════════════════════ */
function initCh2() {
  const lockTop      = $('lockTop');
  const lockWrap     = $('lockWrap');
  const keyWrap      = $('keyWrap');
  const secretScroll = $('secretScroll');
  const scrollBody   = $('scrollBody');
  const lockParts    = $('lockParticles');

  function spawnLockParticles(burstCount = 20) {
    if (!lockParts) return;
    // Golden sparks
    for (let i = 0; i < burstCount; i++) {
      const sp = document.createElement('div');
      sp.className = 'lock-spark';
      const angle = (i / burstCount) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const dist  = 40 + Math.random() * 55;
      const sz    = (Math.random() * 6 + 4) + 'px';
      sp.style.width = sz; sp.style.height = sz;
      sp.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      sp.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      sp.style.left = '50%'; sp.style.top = '50%';
      sp.style.animationDelay = (i * 20) + 'ms';
      lockParts.appendChild(sp);
      setTimeout(() => sp.remove(), 1200);
    }
    // Floating heart sparks
    const heartSymbols = ['💖', '✨', '💕', '⭐', '💫'];
    for (let i = 0; i < 7; i++) {
      const hs = document.createElement('div');
      hs.className = 'lock-heart-spark';
      hs.textContent = heartSymbols[i % heartSymbols.length];
      const angle = (i / 7) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 35 + Math.random() * 45;
      hs.style.setProperty('--hx', (Math.cos(angle) * dist) + 'px');
      hs.style.setProperty('--hy', (Math.sin(angle) * dist - 20) + 'px');
      hs.style.setProperty('--hrot', (Math.random() * 40 - 20) + 'deg');
      hs.style.left = '50%'; hs.style.top = '50%';
      lockParts.appendChild(hs);
      setTimeout(() => hs.remove(), 1600);
    }
  }

  function triggerShockwave() {
    if (!lockParts) return;
    const wave = document.createElement('div');
    wave.className = 'lock-shockwave';
    lockParts.appendChild(wave);
    setTimeout(() => wave.remove(), 1300);
  }

  function unlock() {
    getAudioCtx();
    if (!locked) {
      spawnLockParticles(12);
      playChime([659.25, 783.99, 1046.5, 1318.51], 0.08);
      return;
    }
    locked = false;

    // 1. Key flies into the keyhole
    if (keyWrap) keyWrap.classList.add('flying-to-lock');
    playNote(493.88, 0.25, 'triangle', 0.15); // Key turn click

    // 2. Lock opens and explodes with magic
    setTimeout(() => {
      if (lockTop) lockTop.classList.add('open');
      if (lockWrap) lockWrap.classList.add('unlocked');
      if (keyWrap) keyWrap.classList.add('used');
      
      triggerShockwave();
      spawnLockParticles(28);
      playUnlock();
      playChime([523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98], 0.07);
    }, 450);

    // 3. Secret love letter unfurls
    setTimeout(() => {
      if (secretScroll) secretScroll.classList.add('open');
      if (scrollBody) {
        revealCalligraphicInk(scrollBody, "From the very first glance, my heart recognised yours — a language older than words. You have been the poem I never dared to write and the song I hum without knowing. Every morning I wake grateful that the universe conspired to place you in my world. You are my beginning, my middle, and every beautiful ending I could ever hope for.");
      }
    }, 900);
  }

  if (keyWrap) keyWrap.addEventListener('click', unlock);
  if (lockWrap) lockWrap.addEventListener('click', unlock);
}

/* ═══════════════════════════════════════════════════
   CHAPTER 3 — GARDEN OF WHISPERS
   ═══════════════════════════════════════════════════ */
function initCh3() {
  let activeIndex = 0;
  let unlockedCount = 1;
  const ch3 = $('ch3');
  const iconEl  = $('whisperIcon');
  const titleEl = $('whisperTitle');
  const descEl  = $('whisperDesc');
  const countEl = $('whisperCount');
  const imgEl   = $('whisperImg');
  const capEl   = $('whisperPhotoCap');
  const photoEl = $('whisperPhotoFrame');
  const cardEl  = document.querySelector('.whisper-card');
  const petalsContainer = $('gardenPetals');

  function triggerGardenGlow(x, y) {
    if (!ch3) return;
    const glow = document.createElement('div');
    glow.className = 'garden-glow-pulse';
    const pctX = (x / window.innerWidth) * 100;
    const pctY = (y / window.innerHeight) * 100;
    glow.style.setProperty('--gx', `${pctX}%`);
    glow.style.setProperty('--gy', `${pctY}%`);
    ch3.appendChild(glow);
    setTimeout(() => glow.remove(), 2500);
  }

  function triggerGardenRipple(x, y) {
    if (!ch3) return;
    const ring = document.createElement('div');
    ring.className = 'garden-ripple-ring';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    ch3.appendChild(ring);
    setTimeout(() => ring.remove(), 1500);
  }

  function spawnPetalBurst(originX = null, originY = null) {
    if (!petalsContainer) return;
    const icons = ['🌸', '🌹', '✨', '💕', '🍃', '💫', '🌹', '✨'];
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'petal-particle';
      p.textContent = icons[Math.floor(Math.random() * icons.length)];
      
      const startX = originX !== null ? (originX + (Math.random() * 80 - 40)) : (window.innerWidth * (0.15 + Math.random() * 0.7));
      const startY = originY !== null ? (originY + (Math.random() * 40 - 20)) : (window.innerHeight * 0.85);

      p.style.left = startX + 'px';
      p.style.top = startY + 'px';
      p.style.setProperty('--pdx', (Math.random() * 120 - 60) + 'px');
      p.style.setProperty('--prot', (Math.random() * 360 - 180) + 'deg');
      p.style.animationDuration = (3.2 + Math.random() * 2.5) + 's';
      p.style.fontSize = (16 + Math.random() * 14) + 'px';
      petalsContainer.appendChild(p);
      setTimeout(() => p.remove(), 5800);
    }
  }

  let lastWhisperTime = 0;
  function setWhisper(idx, clickEv = null) {
    const now = Date.now();
    if (now - lastWhisperTime < 240) return;
    lastWhisperTime = now;
    getAudioCtx();
    activeIndex = (idx + WHISPERS.length) % WHISPERS.length;
    const w = WHISPERS[activeIndex];
    if (!w) return;

    let posX = window.innerWidth * 0.5;
    let posY = window.innerHeight * 0.5;
    if (clickEv && clickEv.clientX) {
      posX = clickEv.clientX;
      posY = clickEv.clientY;
    } else if (photoEl) {
      const rect = photoEl.getBoundingClientRect();
      posX = rect.left + rect.width / 2;
      posY = rect.top + rect.height / 2;
    }

    // 1. Ambient Lighting wave across garden
    triggerGardenGlow(posX, posY);

    // 2. Ripple shockwave ring from clicked point
    triggerGardenRipple(posX, posY);

    // 3. Update memory details
    if (iconEl) iconEl.textContent = w.icon;
    if (titleEl) titleEl.textContent = w.title;
    if (descEl) revealPetalUnfurl(descEl, w.text);

    // 5. Photo frame lighting flash and polaroid swap
    if (photoEl) {
      photoEl.classList.remove('flash-glow');
      void photoEl.offsetWidth;
      photoEl.classList.add('flash-glow');
    }

    if (imgEl && w.img) {
      imgEl.style.opacity = '0';
      setTimeout(() => {
        imgEl.src = w.img;
        imgEl.style.opacity = '1';
        if (capEl) capEl.textContent = w.cap;
      }, 180);
    }

    // 6. Card pulse glow
    if (cardEl) {
      cardEl.classList.remove('pulse-glow');
      void cardEl.offsetWidth;
      cardEl.classList.add('pulse-glow');
    }

    document.querySelectorAll('.w-tag').forEach((btn, i) => {
      btn.classList.toggle('active', i === activeIndex);
    });

    unlockedCount = Math.max(unlockedCount, activeIndex + 1);
    if (countEl) countEl.textContent = `${unlockedCount} of ${WHISPERS.length} whispers bloomed 🌹`;

    // 7. Rose petal burst
    spawnPetalBurst(posX, posY);

    // 8. Melodic romantic chime
    playChime([523.25, 659.25, 783.99, 987.77, 1318.51], .07);
  }

  document.querySelectorAll('.w-tag').forEach(btn => {
    btn.addEventListener('click', (e) => setWhisper(+btn.dataset.w, e));
  });

  if (photoEl) {
    photoEl.addEventListener('click', (e) => {
      setWhisper(activeIndex + 1, e);
    });
  }

  if ($('nextWhisperBtn')) {
    $('nextWhisperBtn').addEventListener('click', (e) => {
      setWhisper(activeIndex + 1, e);
    });
  }

  // Continuous background gentle petals
  setInterval(() => {
    if (ch3 && ch3.classList.contains('active')) {
      spawnPetalBurst();
    }
  }, 3500);

  /* Initial spawn */
  spawnPetalBurst();
  setWhisper(0);
}

/* ═══════════════════════════════════════════════════
   CHAPTER 4 — AURORA FINALE
   ═══════════════════════════════════════════════════ */
function initCh4() {
  const canvas = $('fwCanvas');
  const ch4 = $('ch4');
  const confettiWrap = $('finaleParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0;
  const particles = [];
  const rockets = [];
  const shootingStars = [];

  function resize() {
    canvas.width  = w = canvas.offsetWidth;
    canvas.height = h = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* Multi-color Aurora Curtains */
  let auroraT = 0;
  function drawAurora() {
    auroraT += 0.007;
    const auroras = [
      { hue: 330, xOffset: 0.18, height: 0.42, speed: 1.0 },
      { hue: 275, xOffset: 0.48, height: 0.48, speed: 0.8 },
      { hue: 195, xOffset: 0.78, height: 0.44, speed: 1.2 },
      { hue: 45,  xOffset: 0.50, height: 0.35, speed: 0.6 }
    ];

    auroras.forEach((a, i) => {
      const x = w * (a.xOffset + Math.sin(auroraT * a.speed + i) * 0.08);
      const yw = h * a.height;
      const grad = ctx.createLinearGradient(x, 0, x, yw);
      const alpha = 0.065 + Math.sin(auroraT * 0.9 + i * 1.5) * 0.035;
      grad.addColorStop(0, `hsla(${a.hue}, 90%, 65%, ${alpha})`);
      grad.addColorStop(0.5, `hsla(${a.hue + 25}, 85%, 60%, ${alpha * 0.6})`);
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(x, 0, 160 + Math.sin(auroraT + i) * 45, yw, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  /* Shooting Stars / Meteors across the sky */
  class ShootingStar {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w * 0.85;
      this.y = Math.random() * h * 0.35;
      this.len = 110 + Math.random() * 150;
      this.speed = 14 + Math.random() * 10;
      this.angle = Math.PI / 4 + (Math.random() * 0.25 - 0.12);
      this.life = 1;
      this.decay = 0.02 + Math.random() * 0.02;
      this.active = true;
    }
    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.life -= this.decay;
      if (this.life <= 0) this.active = false;
    }
    draw() {
      if (!this.active) return;
      ctx.save();
      const tailX = this.x - Math.cos(this.angle) * (this.len * this.life);
      const tailY = this.y - Math.sin(this.angle) * (this.len * this.life);
      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.life})`);
      grad.addColorStop(0.3, `rgba(253, 224, 71, ${this.life * 0.85})`);
      grad.addColorStop(0.7, `rgba(244, 63, 94, ${this.life * 0.4})`);
      grad.addColorStop(1, 'transparent');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      // Glowing head
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }
  }

  function spawnShootingStar() {
    shootingStars.push(new ShootingStar());
  }

  /* Multi-Pattern Advanced Fireworks Particle System */
  class Particle {
    constructor(x, y, color, pattern = 'starburst', idx = 0, total = 50) {
      this.x = x; this.y = y;
      this.color = color;
      this.pattern = pattern;
      this.life = 1;
      this.trail = [];
      this.strobe = (Math.random() > 0.4);

      if (pattern === 'heart') {
        const t = (idx / total) * Math.PI * 2;
        const hx = 16 * Math.pow(Math.sin(t), 3) * 0.22;
        const hy = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)) * 0.22;
        const spd = 1.35 + Math.random() * 0.5;
        this.vx = hx * spd;
        this.vy = hy * spd;
        this.decay = 0.012 + Math.random() * 0.009;
        this.r = 3.5 + Math.random() * 2.5;
        this.gravity = 0.035;
      } else if (pattern === 'double-heart') {
        const isLeft = (idx % 2 === 0);
        const t = (idx / (total / 2)) * Math.PI * 2;
        const offsetX = isLeft ? -1.8 : 1.8;
        const hx = (16 * Math.pow(Math.sin(t), 3) * 0.16) + offsetX;
        const hy = -(13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)) * 0.16;
        const spd = 1.4 + Math.random() * 0.4;
        this.vx = hx * spd;
        this.vy = hy * spd;
        this.decay = 0.011 + Math.random() * 0.008;
        this.r = 3.2 + Math.random() * 2;
        this.gravity = 0.032;
      } else if (pattern === 'willow' || pattern === 'golden-waterfall') {
        const angle = Math.random() * Math.PI * 2;
        const spd = 1.6 + Math.random() * 3.8;
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd - 1.6;
        this.decay = 0.006 + Math.random() * 0.007; // Long lingering golden trail
        this.r = 2.8 + Math.random() * 2;
        this.gravity = 0.042;
      } else if (pattern === 'saturn-ring') {
        const isCenter = idx < total * 0.35;
        if (isCenter) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 0.8 + Math.random() * 1.8;
          this.vx = Math.cos(angle) * spd;
          this.vy = Math.sin(angle) * spd;
          this.decay = 0.016 + Math.random() * 0.01;
          this.r = 2.8 + Math.random() * 2;
          this.gravity = 0.02;
        } else {
          const angle = (idx / total) * Math.PI * 2;
          const spdX = Math.cos(angle) * 4.2;
          const spdY = Math.sin(angle) * 1.6; // Elliptical ring
          this.vx = spdX;
          this.vy = spdY;
          this.decay = 0.014 + Math.random() * 0.009;
          this.r = 3.2 + Math.random() * 2;
          this.gravity = 0.025;
        }
      } else if (pattern === 'ring') {
        const angle = (idx / total) * Math.PI * 2;
        const spd = 3.2 + Math.random() * 0.4;
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd;
        this.decay = 0.015 + Math.random() * 0.01;
        this.r = 3 + Math.random() * 2;
        this.gravity = 0.03;
      } else {
        // Classic Starburst & Strobe Peony
        const angle = Math.random() * Math.PI * 2;
        const spd = 2.4 + Math.random() * 4.8;
        this.vx = Math.cos(angle) * spd;
        this.vy = Math.sin(angle) * spd - 1.0;
        this.decay = 0.014 + Math.random() * 0.016;
        this.r = 2.5 + Math.random() * 3;
        this.gravity = 0.055;
      }
    }
    update() {
      this.trail.push({ x: this.x, y: this.y, alpha: this.life });
      const maxTrail = (this.pattern === 'willow' || this.pattern === 'golden-waterfall') ? 9 : 5;
      if (this.trail.length > maxTrail) this.trail.shift();

      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.985;
      this.life -= this.decay;
    }
    draw() {
      ctx.save();
      // Draw tail
      this.trail.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, this.r * (idx / this.trail.length)), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        const trailAlpha = (this.pattern === 'willow' || this.pattern === 'golden-waterfall') ? 0.65 : 0.4;
        ctx.globalAlpha = Math.max(0, p.alpha * trailAlpha);
        ctx.fill();
      });

      // Draw head with twinkle
      let currentAlpha = Math.max(0, this.life);
      if (this.strobe && Math.random() > 0.6) {
        currentAlpha = Math.min(1, currentAlpha * 1.5);
      }
      ctx.globalAlpha = currentAlpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  class Rocket {
    constructor(startX, targetX, targetY, color, pattern = null) {
      this.x = startX;
      this.y = h + 10;
      this.targetY = targetY;
      this.color = color;
      this.pattern = pattern;
      const totalDist = h - targetY;
      this.vy = -(6.8 + Math.random() * 4);
      this.vx = (targetX - startX) / (totalDist / Math.abs(this.vy));
      this.alive = true;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y <= this.targetY || this.vy >= 0) {
        this.alive = false;
        createExplosion(this.x, this.y, this.color, this.pattern);
      }
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#fff9d0';
      ctx.fill();
      ctx.restore();
    }
  }

  function createExplosion(x, y, color, pattern = null) {
    if (!pattern) {
      const patterns = ['heart', 'double-heart', 'golden-waterfall', 'saturn-ring', 'willow', 'ring', 'starburst'];
      pattern = patterns[Math.floor(Math.random() * patterns.length)];
    }
    const count = (pattern === 'willow' || pattern === 'golden-waterfall') ? 48 : (pattern === 'double-heart' ? 42 : (pattern === 'heart' ? 36 : 40));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, color, pattern, i, count));
    }
    // Musical Chime
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093];
    const n1 = chord[Math.floor(Math.random() * chord.length)];
    const n2 = chord[Math.floor(Math.random() * chord.length)];
    playChime([n1, n2], 0.08);
  }

  function launchFirework(targetX, targetY, pattern = null, chosenCol = null) {
    getAudioCtx();
    const palette = [
      '#f43f5e', '#fb7185', '#fde047', '#fbbf24',
      '#a855f7', '#60a5fa', '#38bdf8', '#34d399', '#f472b6', '#e11d48', '#fb923c'
    ];
    const col = chosenCol || palette[Math.floor(Math.random() * palette.length)];
    const startX = targetX + (Math.random() * 120 - 60);
    rockets.push(new Rocket(startX, targetX, targetY, col, pattern));
  }

  canvas.addEventListener('click', e => {
    const r = canvas.getBoundingClientRect();
    launchFirework(e.clientX - r.left, e.clientY - r.top);
  });
  canvas.addEventListener('touchstart', e => {
    const r = canvas.getBoundingClientRect();
    Array.from(e.touches).forEach(t => launchFirework(t.clientX - r.left, t.clientY - r.top));
  }, { passive: true });

  /* Interactive Sparkle Trail on pointer move */
  let lastSparkleTime = 0;
  function spawnSparkleTrail(clientX, clientY) {
    const now = Date.now();
    if (now - lastSparkleTime < 80) return;
    lastSparkleTime = now;
    if (!confettiWrap) return;

    const r = confettiWrap.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;

    const sparkles = ['✨', '⭐', '💫', '💖', '🌸', '✨'];
    const spark = document.createElement('div');
    spark.className = 'finale-spark-trail';
    spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    spark.style.setProperty('--stx', (Math.random() * 40 - 20) + 'px');
    spark.style.setProperty('--sty', -(20 + Math.random() * 30) + 'px');
    confettiWrap.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }

  if (ch4) {
    ch4.addEventListener('mousemove', (e) => spawnSparkleTrail(e.clientX, e.clientY));
    ch4.addEventListener('touchmove', (e) => {
      if (e.touches[0]) spawnSparkleTrail(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
  }

  /* 3D Rose Petal Shower */
  function spawnPetalShower(count = 22) {
    if (!confettiWrap) return;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const pt = document.createElement('div');
        pt.className = 'finale-petal';
        pt.style.left = (Math.random() * 94 + 3) + '%';
        pt.style.top = '-20px';
        pt.style.setProperty('--pdx', (Math.random() * 140 - 70) + 'px');
        pt.style.setProperty('--pdy', (h * 0.75 + Math.random() * 200) + 'px');
        pt.style.animationDuration = (3.5 + Math.random() * 2.2) + 's';
        confettiWrap.appendChild(pt);
        setTimeout(() => pt.remove(), 5800);
      }, i * 90);
    }
  }

  /* Fluttering Golden & Rose Butterflies */
  function spawnButterflies(count = 3) {
    if (!confettiWrap) return;
    const butterflySVG = `
      <svg viewBox="0 0 24 24" fill="none" stroke="#fde047" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 12c-2-3-6-4-8-1-2 3-1 6 2 7 3 1 5-2 6-6z" fill="rgba(253,224,71,0.5)"/>
        <path d="M12 12c2-3 6-4 8-1 2 3 1 6-2 7-3 1-5-2-6-6z" fill="rgba(244,63,94,0.5)"/>
        <path d="M12 7v10"/>
      </svg>`;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const bf = document.createElement('div');
        bf.className = 'finale-butterfly';
        bf.innerHTML = butterflySVG;
        bf.style.left = (15 + Math.random() * 70) + '%';
        bf.style.bottom = '10%';
        bf.style.setProperty('--bfx', (Math.random() * 160 - 80) + 'px');
        bf.style.setProperty('--bfy', -(260 + Math.random() * 220) + 'px');
        bf.style.setProperty('--bf-rot', (Math.random() * 40 - 20) + 'deg');
        confettiWrap.appendChild(bf);
        setTimeout(() => bf.remove(), 5800);
      }, i * 400);
    }
  }

  let ch4LoopRunning = false;
  window.resumeCh4Canvas = function() {
    if (!ch4LoopRunning && ch4 && ch4.classList.contains('active')) {
      loop();
    }
  };

  function loop() {
    if (!ctx || !ch4 || !ch4.classList.contains('active')) {
      ch4LoopRunning = false;
      return;
    }
    ch4LoopRunning = true;
    ctx.clearRect(0, 0, w, h);
    drawAurora();

    // Update Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      shootingStars[i].update();
      if (shootingStars[i].active) shootingStars[i].draw();
      else shootingStars.splice(i, 1);
    }

    // Update rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      rockets[i].update();
      if (rockets[i].alive) rockets[i].draw();
      else rockets.splice(i, 1);
    }

    // Update sparks
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }
  loop();

  /* Automatic gentle celebration background */
  let autoFwInterval = setInterval(() => {
    if (ch4 && ch4.classList.contains('active')) {
      const rx = w * (0.15 + Math.random() * 0.7);
      const ry = h * (0.16 + Math.random() * 0.35);
      launchFirework(rx, ry);

      if (Math.random() > 0.45) {
        spawnShootingStar();
      }
    }
  }, 2500);

  /* ── GRAND MULTI-ELEMENT CELEBRATION CASCADE (THROTTLED) ── */
  let lastCelebTime = 0;
  function triggerGrandCelebration() {
    const now = Date.now();
    if (now - lastCelebTime < 450) return;
    lastCelebTime = now;
    getAudioCtx();

    // 1. Screen-wide Golden Glow Wave
    if (ch4) {
      const pulse = document.createElement('div');
      pulse.className = 'finale-grand-pulse';
      ch4.appendChild(pulse);
      setTimeout(() => pulse.remove(), 2100);
    }

    // Clean up older confetti if crowded
    if (confettiWrap && confettiWrap.childElementCount > 35) {
      while (confettiWrap.childElementCount > 15) confettiWrap.firstElementChild.remove();
    }

    // 2. Arc Salvo of Fireworks
    launchFirework(w * 0.5, h * 0.20, 'double-heart', '#f43f5e'); // Center Double Heart
    setTimeout(() => launchFirework(w * 0.20, h * 0.30, 'golden-waterfall', '#fde047'), 180);
    setTimeout(() => launchFirework(w * 0.80, h * 0.30, 'golden-waterfall', '#fbbf24'), 320);
    setTimeout(() => launchFirework(w * 0.35, h * 0.16, 'saturn-ring', '#a855f7'), 480);
    setTimeout(() => launchFirework(w * 0.65, h * 0.16, 'heart', '#fb7185'), 650);

    // 3. Shooting Stars Cross Stream
    spawnShootingStar();
    setTimeout(spawnShootingStar, 350);

    // 4. Falling 3D Rose Petals Shower
    spawnPetalShower(22);

    // 5. Fluttering Golden & Rose Neon Butterflies
    spawnButterflies(3);

    // 6. Falling Confetti & Love Emojis Shower
    if (confettiWrap) {
      const emojis = ['💖', '✨', '🌹', '⭐', '💫', '🎉', '💍', '💕', '🥂', '🌸', '💐'];
      for (let i = 0; i < 30; i++) {
        const cf = document.createElement('div');
        cf.className = 'finale-confetti';
        cf.textContent = emojis[i % emojis.length];
        cf.style.left = (Math.random() * 92 + 4) + '%';
        cf.style.top = (Math.random() * 25 + 5) + '%';
        cf.style.setProperty('--cx', (Math.random() * 160 - 80) + 'px');
        cf.style.setProperty('--cy', (200 + Math.random() * 320) + 'px');
        cf.style.setProperty('--crot', (Math.random() * 720 - 360) + 'deg');
        cf.style.animationDuration = (2.2 + Math.random() * 1.5) + 's';
        cf.style.fontSize = (16 + Math.random() * 16) + 'px';
        confettiWrap.appendChild(cf);
        setTimeout(() => cf.remove(), 3800);
      }

      // 7. Spiraling 3D Golden & Rose Ribbons
      const ribbonColors = ['#fde047', '#f43f5e', '#fbbf24', '#e11d48', '#d4a017'];
      for (let i = 0; i < 14; i++) {
        const rb = document.createElement('div');
        rb.className = 'finale-ribbon';
        rb.style.left = (Math.random() * 94 + 3) + '%';
        rb.style.top = (Math.random() * 20) + '%';
        rb.style.background = ribbonColors[i % ribbonColors.length];
        rb.style.setProperty('--rx', (Math.random() * 140 - 70) + 'px');
        rb.style.setProperty('--ry', (280 + Math.random() * 340) + 'px');
        rb.style.animationDuration = (2.8 + Math.random() * 1.6) + 's';
        confettiWrap.appendChild(rb);
        setTimeout(() => rb.remove(), 4500);
      }

      // 8. Rising Mini Golden Wish Lanterns
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const ln = document.createElement('div');
          ln.className = 'finale-rising-lantern';
          ln.style.left = (8 + Math.random() * 84) + '%';
          ln.style.bottom = '-30px';
          ln.style.setProperty('--flx', (Math.random() * 80 - 40) + 'px');
          ln.style.animationDuration = (7 + Math.random() * 4) + 's';
          ln.innerHTML = `<div class="lantern-body" style="--lw:30px;--lh:40px;"><div class="lantern-flame"></div></div>`;
          confettiWrap.appendChild(ln);
          setTimeout(() => ln.remove(), 11000);
        }, i * 320);
      }
    }

    // 9. Full 8-note Grand Romantic Fanfare Harp Arpeggio
    playChime([523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98, 2093, 2637], 0.055);
  }

  /* Poem lines aurora shimmer reveal */
  POEM.forEach((line, i) => {
    revealAuroraLight($(`pl${i}`), line, i * 1050 + 350);
  });

  /* Initial celebratory burst */
  setTimeout(() => {
    launchFirework(w * 0.5, h * 0.26, 'double-heart', '#f43f5e');
    setTimeout(() => launchFirework(w * 0.25, h * 0.35, 'golden-waterfall', '#fde047'), 400);
    setTimeout(() => launchFirework(w * 0.75, h * 0.35, 'golden-waterfall', '#fbbf24'), 800);
    spawnShootingStar();
  }, 900);

  /* Copy note helper with fallback */
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    ta.remove();
  }

  /* Interactive 3D Realistic Heart & Romance Pill */
  const heartCenter = $('finaleHeartCenter');
  const romancePill = $('finaleRomancePill');

  if (heartCenter) {
    heartCenter.addEventListener('click', (e) => {
      e.stopPropagation();
      const heartSvg = heartCenter.querySelector('.finale-realistic-heart');
      if (heartSvg) {
        heartSvg.classList.remove('ignited');
        void heartSvg.offsetWidth;
        heartSvg.classList.add('ignited');
      }
      triggerGrandCelebration();
    });
  }

  if (romancePill) {
    romancePill.addEventListener('click', (e) => {
      e.stopPropagation();
      const heartSvg = heartCenter ? heartCenter.querySelector('.finale-realistic-heart') : null;
      if (heartSvg) {
        heartSvg.classList.remove('ignited');
        void heartSvg.offsetWidth;
        heartSvg.classList.add('ignited');
      }
      triggerGrandCelebration();
    });
  }

  /* Celebrate Button */
  if ($('celebrateBtn')) {
    $('celebrateBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      const heartSvg = heartCenter ? heartCenter.querySelector('.finale-realistic-heart') : null;
      if (heartSvg) {
        heartSvg.classList.remove('ignited');
        void heartSvg.offsetWidth;
        heartSvg.classList.add('ignited');
      }
      triggerGrandCelebration();
    });
  }

  /* Copy note */
  if ($('copyNoteBtn')) {
    $('copyNoteBtn').addEventListener('click', () => {
      getAudioCtx();
      const to   = $('noteTo') ? $('noteTo').value.trim() || 'My Beloved' : 'My Beloved';
      const from = $('noteFrom') ? $('noteFrom').value.trim() || 'Yours Always' : 'Yours Always';
      const text = `💌 To: ${to}\n\n${POEM.join('\n')}\n\n— ${from} 💕\n\n"Whispers of Love"`;

      const showFeedback = () => {
        const c = $('copyConfirm');
        if (c) {
          c.classList.add('show');
          setTimeout(() => c.classList.remove('show'), 2800);
        }
        triggerGrandCelebration();
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showFeedback).catch(() => {
          fallbackCopy(text);
          showFeedback();
        });
      } else {
        fallbackCopy(text);
        showFeedback();
      }
    });
  }

  if ($('replayBtn')) $('replayBtn').addEventListener('click', () => gotoChapter(0));
}

/* ═══════════════════════════════════════════════════
   CHAPTER INIT DISPATCHER
   ═══════════════════════════════════════════════════ */
const initialised = new Set();
function initChapter(n) {
  if (initialised.has(n)) return;
  initialised.add(n);
  const fns = [initCh0, initCh1, initCh2, initCh3, initCh4];
  if (fns[n]) fns[n]();
}

/* ── BOOT ─────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  gotoChapter(0, true);
  initChapter(0);
});
