// ================================================================
//   CipherQuest – Caesar Cipher Guessing Game
//   Full Game Logic in JavaScript
//   Concepts: Functions, Arrays, Loops, Conditionals, Strings,
//             ASCII (charCodeAt/fromCharCode), Modulo Arithmetic
// ================================================================

// ----------------------------------------------------------------
// 1. WORD LIST WITH HINTS
// ----------------------------------------------------------------
const WORD_LIST = [
  { word: "APPLE",   hint: "It is a fruit that keeps the doctor away" },
  { word: "HOUSE",   hint: "A place where people live" },
  { word: "TRAIN",   hint: "A long transport vehicle that runs on rails" },
  { word: "TIGER",   hint: "A wild striped big cat" },
  { word: "HELLO",   hint: "A common greeting word" },
  { word: "SCHOOL",  hint: "A place where students come to study" },
  { word: "WATER",   hint: "Essential liquid for life, H2O" },
  { word: "CLOCK",   hint: "A device that shows the time" },
  { word: "MUSIC",   hint: "The art of sound and rhythm" },
  { word: "BREAD",   hint: "A baked food item made from flour" },
  { word: "EARTH",   hint: "The planet we all live on" },
  { word: "OCEAN",   hint: "A vast body of salt water" },
  { word: "PLANE",   hint: "A vehicle that flies through the sky" },
  { word: "QUEEN",   hint: "A female ruler of a kingdom" },
  { word: "LIGHT",   hint: "It comes from the sun and bulbs" },
];

// ----------------------------------------------------------------
// 2. GAME CONFIGURATION
// ----------------------------------------------------------------
const CONFIG = {
  totalRounds   : 5,
  shiftValue    : 3,    // Caesar Cipher shift
  pointsCorrect : 10,
  pointsWrong   : 5,
};

// ----------------------------------------------------------------
// 3. GAME STATE
// ----------------------------------------------------------------
let state = {
  round         : 0,
  score         : 0,
  correctCount  : 0,
  wrongCount    : 0,
  usedIndices   : [],
  currentWord   : "",
  currentHint   : "",
  currentCipher : "",
  hintShown     : false,
  history       : [],       // [{word, guess, correct}]
};

// ----------------------------------------------------------------
// 4. CAESAR CIPHER FUNCTIONS
//    Formula: E(x) = (x + shift) mod 26
//    Uses charCodeAt() instead of Python's ord()
//    Uses String.fromCharCode() instead of Python's chr()
// ----------------------------------------------------------------
function encryptCaesar(word, shift) {
  let encrypted = "";
  for (let i = 0; i < word.length; i++) {
    const charCode  = word.charCodeAt(i);        // ASCII value
    const position  = charCode - 65;             // Convert to 0-25
    const shifted   = (position + shift) % 26;   // Apply shift + wrap
    const newChar   = String.fromCharCode(shifted + 65); // Back to letter
    encrypted += newChar;
  }
  return encrypted;
}

function decryptCaesar(word, shift) {
  let decrypted = "";
  for (let i = 0; i < word.length; i++) {
    const charCode  = word.charCodeAt(i);
    const position  = charCode - 65;
    const original  = ((position - shift) % 26 + 26) % 26; // +26 handles negatives
    decrypted += String.fromCharCode(original + 65);
  }
  return decrypted;
}

// ----------------------------------------------------------------
// 5. SCREEN NAVIGATION HELPERS
// ----------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showHomeScreen()  { showScreen('screen-home');  }
function showLearnScreen() { showScreen('screen-learn'); }

// ----------------------------------------------------------------
// 6. START GAME
// ----------------------------------------------------------------
function startGame() {
  // Reset state
  state.round        = 0;
  state.score        = 0;
  state.correctCount = 0;
  state.wrongCount   = 0;
  state.usedIndices  = [];
  state.history      = [];
  showScreen('screen-game');
  loadRound();
}

// ----------------------------------------------------------------
// 7. LOAD A ROUND
// ----------------------------------------------------------------
function loadRound() {
  state.round++;
  state.hintShown = false;

  // Pick a random unused word
  let idx;
  do { idx = Math.floor(Math.random() * WORD_LIST.length); }
  while (state.usedIndices.includes(idx));
  state.usedIndices.push(idx);

  const entry = WORD_LIST[idx];
  state.currentWord   = entry.word;
  state.currentHint   = entry.hint;
  state.currentCipher = encryptCaesar(entry.word, CONFIG.shiftValue);

  // Update UI elements
  document.getElementById('round-display').textContent =
    `${state.round} / ${CONFIG.totalRounds}`;
  document.getElementById('score-display').textContent = state.score;

  // Progress bar
  const pct = ((state.round - 1) / CONFIG.totalRounds) * 100;
  document.getElementById('progress-fill').style.width = pct + '%';

  // Render cipher letters with staggered animation
  const container = document.getElementById('cipher-word-display');
  container.innerHTML = '';
  for (let i = 0; i < state.currentCipher.length; i++) {
    const span = document.createElement('span');
    span.className = 'cletter';
    span.style.animationDelay = (i * 0.08) + 's';
    span.textContent = state.currentCipher[i];
    container.appendChild(span);
  }

  // Reset hint
  const hintBox = document.getElementById('hint-box');
  hintBox.classList.add('hidden');
  document.getElementById('hint-text').textContent = state.currentHint;
  document.getElementById('btn-hint').textContent = '💡 Show Hint';

  // Reset input & feedback
  const guessInput = document.getElementById('guess-input');
  guessInput.value = '';
  guessInput.disabled = false;
  document.getElementById('btn-submit').disabled = false;
  document.getElementById('feedback-box').classList.add('hidden');
  guessInput.focus();
}

// ----------------------------------------------------------------
// 8. TOGGLE HINT
// ----------------------------------------------------------------
function toggleHint() {
  const hintBox = document.getElementById('hint-box');
  const btn     = document.getElementById('btn-hint');
  state.hintShown = !state.hintShown;
  hintBox.classList.toggle('hidden', !state.hintShown);
  btn.textContent = state.hintShown ? '🙈 Hide Hint' : '💡 Show Hint';
}

// ----------------------------------------------------------------
// 9. HANDLE ENTER KEY
// ----------------------------------------------------------------
function handleEnter(event) {
  if (event.key === 'Enter') submitGuess();
}

// ----------------------------------------------------------------
// 10. SUBMIT GUESS
// ----------------------------------------------------------------
function submitGuess() {
  const input  = document.getElementById('guess-input');
  const guess  = input.value.trim().toUpperCase();   // .toUpperCase() for fair comparison

  if (!guess) {
    input.style.borderColor = 'var(--red)';
    setTimeout(() => { input.style.borderColor = ''; }, 800);
    return;
  }

  const correct = (guess === state.currentWord);

  // Update score
  if (correct) {
    state.score        += CONFIG.pointsCorrect;
    state.correctCount += 1;
  } else {
    state.score = Math.max(0, state.score - CONFIG.pointsWrong); // Floor at 0
    state.wrongCount += 1;
  }

  // Save history
  state.history.push({ word: state.currentWord, guess, correct });

  // Update score display
  document.getElementById('score-display').textContent = state.score;

  // Show feedback
  const fbBox  = document.getElementById('feedback-box');
  const fbIcon = document.getElementById('feedback-icon');
  const fbText = document.getElementById('feedback-text');
  const fbSub  = document.getElementById('feedback-sub');

  fbBox.classList.remove('hidden');

  if (correct) {
    fbIcon.textContent = '✅';
    fbText.textContent = 'Correct Answer!';
    fbText.style.color = 'var(--green)';
    fbSub.textContent  = `+${CONFIG.pointsCorrect} points added! The word was: ${state.currentWord}`;
  } else {
    fbIcon.textContent = '❌';
    fbText.textContent = 'Wrong Answer!';
    fbText.style.color = 'var(--red)';
    fbSub.textContent  = `−${CONFIG.pointsWrong} points. The correct word was: ${state.currentWord}`;
  }

  // Show Next / Finish button text
  const btnNext = document.getElementById('btn-next');
  btnNext.textContent = state.round < CONFIG.totalRounds ? 'Next Round →' : 'See Results 🏆';

  // Disable input
  input.disabled = true;
  document.getElementById('btn-submit').disabled = true;
}

// ----------------------------------------------------------------
// 11. NEXT ROUND
// ----------------------------------------------------------------
function nextRound() {
  if (state.round < CONFIG.totalRounds) {
    loadRound();
  } else {
    showResultScreen();
  }
}

// ----------------------------------------------------------------
// 12. RESULT SCREEN
// ----------------------------------------------------------------
function showResultScreen() {
  showScreen('screen-result');

  const maxScore  = CONFIG.totalRounds * CONFIG.pointsCorrect; // 50
  const pct       = state.score / maxScore;

  // Emoji & Grade
  let emoji, grade;
  if (pct === 1)          { emoji = '🏆'; grade = 'PERFECT! Outstanding!'; }
  else if (pct >= 0.8)    { emoji = '🎉'; grade = 'Excellent Work!'; }
  else if (pct >= 0.6)    { emoji = '😊'; grade = 'Good Job!'; }
  else if (pct >= 0.4)    { emoji = '😐'; grade = 'Keep Practicing!'; }
  else                    { emoji = '😢'; grade = 'Better Luck Next Time!'; }

  document.getElementById('result-emoji').textContent  = emoji;
  document.getElementById('result-grade').textContent  = grade;
  document.getElementById('ring-score').textContent    = state.score;

  // Animate ring
  // circumference = 2 * π * r = 2 * 3.14159 * 50 ≈ 314
  const circumference = 314;
  const offset = circumference - (pct * circumference);
  setTimeout(() => {
    document.getElementById('ring-fill').style.strokeDashoffset = offset;
  }, 200);

  // Breakdown
  const bd = document.getElementById('result-breakdown');
  bd.innerHTML = `
    <div class="rb-item correct"><strong>${state.correctCount}</strong> Correct</div>
    <div class="rb-item wrong"><strong>${state.wrongCount}</strong> Wrong</div>
    <div class="rb-item"><strong>${state.score}/${maxScore}</strong> Score</div>
  `;

  // Add SVG gradient (only once)
  if (!document.getElementById('ringGradDef')) {
    const svg = document.querySelector('.ring-svg');
    svg.insertAdjacentHTML('afterbegin', `
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#f6c90e"/>
        </linearGradient>
      </defs>
    `);
    svg.setAttribute('id', 'ringGradDef');
  }

  // Confetti for good scores
  if (pct >= 0.6) launchConfetti();
}

// ----------------------------------------------------------------
// 13. CONFETTI ANIMATION
// ----------------------------------------------------------------
function launchConfetti() {
  const canvas  = document.getElementById('confetti-canvas');
  const ctx     = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces  = [];
  const colors  = ['#63b3ed','#f6c90e','#68d391','#9f7aea','#fc8181','#fff'];
  const count   = 120;

  for (let i = 0; i < count; i++) {
    pieces.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * -canvas.height,
      w:    6 + Math.random() * 8,
      h:    4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot:  Math.random() * 360,
      vx:   (Math.random() - 0.5) * 3,
      vy:   2 + Math.random() * 4,
      vr:   (Math.random() - 0.5) * 5,
    });
  }

  let frames = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x  += p.vx;
      p.y  += p.vy;
      p.rot += p.vr;
    });
    frames++;
    if (frames < 180) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ----------------------------------------------------------------
// 14. INTERACTIVE ENCODER (Learn Screen)
// ----------------------------------------------------------------
function tryEncode() {
  const raw   = document.getElementById('try-input').value.toUpperCase().replace(/[^A-Z]/g, '');
  const shift = parseInt(document.getElementById('try-shift').value) || 3;
  const out   = document.getElementById('try-output');
  out.textContent = raw ? encryptCaesar(raw, shift) : '—';
}

// ----------------------------------------------------------------
// 15. DEMO ANIMATION ON HOME SCREEN
// ----------------------------------------------------------------
(function animateDemo() {
  const words = ['HELLO','APPLE','TIGER','TRAIN','QUEEN'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % words.length;
    const word = words[idx];
    const enc  = encryptCaesar(word, 3);
    const origSpans = document.querySelectorAll('#demo-original span');
    const encSpans  = document.querySelectorAll('#demo-encrypted span');

    // Pad / trim to 5 characters for the fixed 5-letter display
    const w5 = (word + '     ').slice(0, 5);
    const e5 = (enc  + '     ').slice(0, 5);

    origSpans.forEach((s, i) => { s.textContent = w5[i]; });
    encSpans.forEach((s, i)  => { s.textContent = e5[i]; });
  }, 2000);
})();
