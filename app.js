/**
 * Quran Quest: The Three Surahs Challenge
 * Master Application Controller & Interactive Quiz Engine
 */

// =============================================================================
// 1. SOUND EFFECTS SYNTHESIZER (Web Audio API - 100% Reliable & Offline)
// =============================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem("quran_quest_muted") === "true";
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, startTime = 0, gainLevel = 0.15) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + startTime);
      osc.stop(this.ctx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio playback note:", e);
    }
  }

  playClick() {
    this.playTone(600, "sine", 0.06, 0, 0.08);
  }

  playCorrect() {
    // Joyful melodic ascending chime (C5 -> E5 -> G5 -> C6)
    this.playTone(523.25, "sine", 0.12, 0, 0.15);
    this.playTone(659.25, "sine", 0.14, 0.08, 0.15);
    this.playTone(783.99, "sine", 0.16, 0.16, 0.18);
    this.playTone(1046.50, "triangle", 0.35, 0.24, 0.2);
  }

  playPartial() {
    this.playTone(440, "sine", 0.15, 0, 0.12);
    this.playTone(554.37, "sine", 0.2, 0.1, 0.12);
  }

  playIncorrect() {
    this.playTone(320, "triangle", 0.18, 0, 0.12);
    this.playTone(260, "triangle", 0.25, 0.14, 0.12);
  }

  playHint() {
    this.playTone(880, "sine", 0.15, 0, 0.1);
    this.playTone(1174.66, "sine", 0.2, 0.12, 0.1);
  }

  playLevelComplete() {
    // Grand cheerful fanfare
    const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1046.50];
    const delays = [0, 0.12, 0.24, 0.38, 0.52, 0.68];
    notes.forEach((n, idx) => {
      this.playTone(n, "triangle", 0.3, delays[idx], 0.18);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("quran_quest_muted", this.isMuted);
    return this.isMuted;
  }
}

// =============================================================================
// 2. CONFETTI CELEBRATION ENGINE
// =============================================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.animId = null;
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 70) {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    const colors = ["#0d9488", "#f59e0b", "#059669", "#0284c7", "#fde047", "#10b981"];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.008,
        shape: Math.random() > 0.4 ? "rect" : "star"
      });
    }

    if (!this.animId) {
      this.loop();
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.rSpeed;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      if (p.shape === "rect") {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        // Star particle
        this.ctx.beginPath();
        for (let s = 0; s < 5; s++) {
          this.ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size);
          this.ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 2));
        }
        this.ctx.closePath();
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.animId = null;
    }
  }
}

// =============================================================================
// 3. MAIN QUIZ APPLICATION STATE & CONTROLLER
// =============================================================================
class QuranQuestApp {
  constructor() {
    this.sounds = new SoundEngine();
    this.confetti = new ConfettiEngine("confetti-canvas");

    this.state = {
      studentName: "Young Scholar",
      avatar: "🌟",
      currentLevelIdx: 0,
      currentQuestionIdx: 0,
      levelScores: [0, 0, 0, 0],
      totalPointsEarned: 0,
      maxPossiblePoints: 0,
      records: [], // Detailed log of every answered question
      badgesUnlocked: [],
      levelAnsweredCount: 0
    };

    // Active question interaction scratch state
    this.activeInteraction = null;

    this.calcMaxPoints();
    this.initDOM();
    this.bindEvents();
    this.updateAudioButtonState();
  }

  calcMaxPoints() {
    let total = 0;
    QUIZ_DATA.levels.forEach(lvl => {
      lvl.questions.forEach(q => {
        total += q.points;
      });
    });
    this.state.maxPossiblePoints = total;
  }

  initDOM() {
    this.elements = {
      header: document.getElementById("app-header"),
      headerLogo: document.getElementById("header-logo"),
      headerStats: document.getElementById("header-stats"),
      headerLevelBadge: document.getElementById("header-level-badge"),
      statLevelIcon: document.getElementById("stat-level-icon"),
      statLevelText: document.getElementById("stat-level-text"),
      headerScoreText: document.getElementById("header-score-text"),
      headerStudentTag: document.getElementById("header-student-tag"),
      headerStudentAvatar: document.getElementById("header-student-avatar"),
      headerStudentName: document.getElementById("header-student-name"),
      audioToggleBtn: document.getElementById("audio-toggle-btn"),
      audioIcon: document.getElementById("audio-icon"),
      roadmapBtn: document.getElementById("roadmap-btn"),
      headerProgressBar: document.getElementById("header-progress-bar"),
      progressStepLabel: document.getElementById("progress-step-label"),
      progressPercentLabel: document.getElementById("progress-percent-label"),
      progressFill: document.getElementById("progress-fill"),

      // Views
      welcomeScreen: document.getElementById("welcome-screen"),
      levelIntroScreen: document.getElementById("level-intro-screen"),
      levelIntroCard: document.getElementById("level-intro-card"),
      questionScreen: document.getElementById("question-screen"),
      questionContainer: document.getElementById("question-container"),
      levelRecapScreen: document.getElementById("level-recap-screen"),
      levelRecapCard: document.getElementById("level-recap-card"),
      finalResultsScreen: document.getElementById("final-results-screen"),
      finalResultsCard: document.getElementById("final-results-card"),

      // Modals
      hintModal: document.getElementById("hint-modal"),
      hintModalText: document.getElementById("hint-modal-text"),
      hintBookRef: document.getElementById("hint-book-ref"),
      closeHintBtn: document.getElementById("close-hint-btn"),
      gotItHintBtn: document.getElementById("got-it-hint-btn"),

      certificateModal: document.getElementById("certificate-modal"),
      closeCertBtn: document.getElementById("close-cert-btn"),
      dismissCertBtn: document.getElementById("dismiss-cert-btn"),
      printCertBtn: document.getElementById("print-cert-btn"),
      certStudentName: document.getElementById("cert-student-name"),
      certScoreBadge: document.getElementById("cert-score-badge"),
      certDateText: document.getElementById("cert-date-text"),

      reviewModal: document.getElementById("review-modal"),
      closeReviewBtn: document.getElementById("close-review-btn"),
      dismissReviewBtn: document.getElementById("dismiss-review-btn"),
      reviewListContainer: document.getElementById("review-list-container"),
      countAll: document.getElementById("count-all"),
      countCorrect: document.getElementById("count-correct"),
      countIncorrect: document.getElementById("count-incorrect"),

      // Form Controls
      studentNameInput: document.getElementById("student-name-input"),
      avatarPicker: document.getElementById("avatar-picker"),
      startQuestBtn: document.getElementById("start-quest-btn")
    };
  }

  bindEvents() {
    // Header Logo Return to Home / Roadmap
    this.elements.headerLogo.addEventListener("click", () => {
      this.sounds.playClick();
      if (confirm("Would you like to return to the Quran Quest Welcome Screen? Your overall points will be kept!")) {
        this.showScreen("welcomeScreen");
        this.elements.headerStats.style.display = "none";
        this.elements.headerProgressBar.style.display = "none";
        this.elements.roadmapBtn.style.display = "none";
      }
    });

    // Roadmap button
    this.elements.roadmapBtn.addEventListener("click", () => {
      this.sounds.playClick();
      this.showScreen("welcomeScreen");
    });

    // Avatar Selection
    this.elements.avatarPicker.addEventListener("click", (e) => {
      const btn = e.target.closest(".avatar-choice");
      if (!btn) return;
      this.sounds.playClick();
      this.elements.avatarPicker.querySelectorAll(".avatar-choice").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      this.state.avatar = btn.getAttribute("data-avatar");
    });

    // Audio Toggle
    this.elements.audioToggleBtn.addEventListener("click", () => {
      const isMuted = this.sounds.toggleMute();
      this.updateAudioButtonState();
      if (!isMuted) this.sounds.playClick();
    });

    // Start Quest Button
    this.elements.startQuestBtn.addEventListener("click", () => {
      this.sounds.playClick();
      const rawName = this.elements.studentNameInput.value.trim();
      this.state.studentName = rawName || "Young Scholar";
      this.elements.headerStudentName.textContent = this.state.studentName;
      this.elements.headerStudentAvatar.textContent = this.state.avatar;

      this.elements.headerStats.style.display = "flex";
      this.elements.headerProgressBar.style.display = "block";
      this.elements.roadmapBtn.style.display = "flex";

      this.startLevel(0);
    });

    // Hint Modal Dismissals
    this.elements.closeHintBtn.addEventListener("click", () => this.hideHintModal());
    this.elements.gotItHintBtn.addEventListener("click", () => this.hideHintModal());
    this.elements.hintModal.addEventListener("click", (e) => {
      if (e.target === this.elements.hintModal) this.hideHintModal();
    });

    // Certificate Modal Dismissals & Print
    this.elements.closeCertBtn.addEventListener("click", () => this.hideCertModal());
    this.elements.dismissCertBtn.addEventListener("click", () => this.hideCertModal());
    this.elements.printCertBtn.addEventListener("click", () => {
      this.sounds.playClick();
      window.print();
    });

    // Review Modal Dismissals & Filter tabs
    this.elements.closeReviewBtn.addEventListener("click", () => this.hideReviewModal());
    this.elements.dismissReviewBtn.addEventListener("click", () => this.hideReviewModal());
    document.querySelectorAll(".filter-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        this.sounds.playClick();
        document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        this.filterReviewItems(tab.dataset.filter);
      });
    });

    // Roadmap cards clickable from welcome screen
    document.querySelectorAll(".roadmap-card").forEach(card => {
      card.addEventListener("click", () => {
        const lvlNum = parseInt(card.dataset.level, 10) - 1;
        const rawName = this.elements.studentNameInput.value.trim();
        this.state.studentName = rawName || "Young Scholar";
        this.elements.headerStudentName.textContent = this.state.studentName;
        this.elements.headerStudentAvatar.textContent = this.state.avatar;
        this.elements.headerStats.style.display = "flex";
        this.elements.headerProgressBar.style.display = "block";
        this.elements.roadmapBtn.style.display = "flex";
        this.startLevel(lvlNum);
      });
    });
  }

  updateAudioButtonState() {
    if (this.sounds.isMuted) {
      this.elements.audioIcon.textContent = "🔇";
      this.elements.audioToggleBtn.title = "Unmute Sound";
    } else {
      this.elements.audioIcon.textContent = "🔊";
      this.elements.audioToggleBtn.title = "Mute Sound";
    }
  }

  showScreen(screenKey) {
    const screens = [
      this.elements.welcomeScreen,
      this.elements.levelIntroScreen,
      this.elements.questionScreen,
      this.elements.levelRecapScreen,
      this.elements.finalResultsScreen
    ];
    screens.forEach(s => s.classList.remove("active-view"));
    this.elements[screenKey].classList.add("active-view");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===========================================================================
  // LEVEL LIFECYCLE
  // ===========================================================================
  startLevel(levelIdx) {
    this.state.currentLevelIdx = levelIdx;
    this.state.currentQuestionIdx = 0;
    this.state.levelAnsweredCount = 0;

    const levelData = QUIZ_DATA.levels[levelIdx];
    this.elements.statLevelIcon.textContent = levelData.badgeIcon;
    this.elements.statLevelText.textContent = `Level ${levelData.levelNumber}: ${levelData.title}`;

    this.renderLevelIntro(levelData);
    this.showScreen("levelIntroScreen");
  }

  renderLevelIntro(levelData) {
    const card = this.elements.levelIntroCard;
    const isMaster = levelData.id === "master";

    card.innerHTML = `
      <div class="intro-badge-top" style="background: ${levelData.colorTheme}20; color: ${levelData.colorTheme};">
        <span>${levelData.badgeIcon}</span>
        <span>Stage ${levelData.levelNumber} of 4</span>
      </div>

      <div class="intro-arabic-title">${levelData.titleArabic}</div>
      <h2 class="intro-english-title">${levelData.title}</h2>

      <div class="intro-meta-grid">
        <span class="meta-chip">📖 Meaning: <strong>${levelData.meaning}</strong></span>
        <span class="meta-chip">🔢 Verses: <strong>${levelData.versesCount}</strong></span>
        <span class="meta-chip">📍 Revealed: <strong>${levelData.revelationCity}</strong></span>
        <span class="meta-chip">🏆 Badge Reward: <strong>${levelData.badgeName}</strong></span>
      </div>

      <div class="intro-summary-box">
        <p>${levelData.intro.summary}</p>
      </div>

      <div class="intro-verses-box">
        <div class="intro-verses-heading">Key Verses & Teachings:</div>
        ${levelData.intro.keyVerses.map(v => `
          <div class="intro-verse-row">
            <span class="verse-ar">${v.ar}</span>
            <span class="verse-en">${v.en}</span>
          </div>
        `).join("")}
      </div>

      <div class="start-action-row">
        <button class="primary-btn glow-btn" id="start-level-action-btn">
          <span>🚀 Start ${levelData.title}!</span>
        </button>
      </div>
    `;

    document.getElementById("start-level-action-btn").addEventListener("click", () => {
      this.sounds.playClick();
      this.loadQuestion(0);
    });
  }

  updateProgressBar() {
    const level = QUIZ_DATA.levels[this.state.currentLevelIdx];
    const totalQ = level.questions.length;
    const currentQ = this.state.currentQuestionIdx + 1;
    const percent = Math.round(((currentQ - 1) / totalQ) * 100);

    this.elements.progressStepLabel.textContent = `Question ${currentQ} of ${totalQ} (${level.title})`;
    this.elements.progressPercentLabel.textContent = `${percent}%`;
    this.elements.progressFill.style.width = `${percent}%`;
    this.elements.headerScoreText.textContent = `${this.state.totalPointsEarned} pts`;
  }

  loadQuestion(qIdx) {
    this.state.currentQuestionIdx = qIdx;
    const level = QUIZ_DATA.levels[this.state.currentLevelIdx];
    const question = level.questions[qIdx];

    this.updateProgressBar();
    this.renderQuestion(question, level);
    this.showScreen("questionScreen");
  }

  // ===========================================================================
  // QUESTION RENDERERS
  // ===========================================================================
  renderQuestion(question, level) {
    const container = this.elements.questionContainer;
    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "question-card";

    // Top metadata
    let typeBadgeLabel = "Question";
    if (question.type === "one-word") typeBadgeLabel = "✍️ One-Word Answer";
    else if (question.type === "matching") typeBadgeLabel = "🧩 Drag-and-Drop Matching";
    else if (question.type === "fill-blank") typeBadgeLabel = "📝 Fill in the Blanks";
    else if (question.type === "ordering") typeBadgeLabel = "🔢 Order the Sequence";

    const metaBar = `
      <div class="question-meta-bar">
        <div class="question-type-badge">${typeBadgeLabel}</div>
        <div class="points-badge">+${question.points} Points</div>
      </div>
      <h2 class="question-prompt">${question.prompt}</h2>
    `;
    card.innerHTML = metaBar;

    // Interaction Body based on Type
    const interactionBody = document.createElement("div");
    interactionBody.className = "interaction-body";

    if (question.type === "one-word") {
      this.renderOneWordInteraction(interactionBody, question);
    } else if (question.type === "matching") {
      this.renderMatchingInteraction(interactionBody, question);
    } else if (question.type === "fill-blank") {
      this.renderFillBlankInteraction(interactionBody, question);
    } else if (question.type === "ordering") {
      this.renderOrderingInteraction(interactionBody, question);
    }

    card.appendChild(interactionBody);

    // Bottom Action Bar: Hint & Submit
    const actionsRow = document.createElement("div");
    actionsRow.className = "question-actions-row";
    actionsRow.id = "question-actions-row";

    actionsRow.innerHTML = `
      <button class="hint-trigger-btn" id="btn-show-hint">
        <span>💡</span>
        <span>Teacher's Clue</span>
      </button>
      <button class="check-answer-btn" id="btn-submit-answer">
        <span>Check Answer</span>
        <span>➔</span>
      </button>
    `;

    card.appendChild(actionsRow);
    container.appendChild(card);

    // Event handlers for bottom bar
    document.getElementById("btn-show-hint").addEventListener("click", () => {
      this.sounds.playHint();
      this.showHintModal(question.hint, question.bookReference);
    });

    document.getElementById("btn-submit-answer").addEventListener("click", () => {
      this.verifyAnswer(question);
    });
  }

  // A. ONE-WORD TEXT INPUT RENDERER
  renderOneWordInteraction(container, question) {
    const wrap = document.createElement("div");
    wrap.className = "one-word-interaction";
    wrap.innerHTML = `
      <div class="input-action-row">
        <input type="text" class="large-answer-input" id="one-word-input" placeholder="${question.placeholder || 'Type your answer here...'}" autocomplete="off" />
      </div>
    `;
    container.appendChild(wrap);

    setTimeout(() => {
      const input = document.getElementById("one-word-input");
      if (input) {
        input.focus();
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            this.verifyAnswer(question);
          }
        });
      }
    }, 100);
  }

  // B. DRAG-AND-DROP & TAP-TO-MATCH RENDERER
  renderMatchingInteraction(container, question) {
    const wrap = document.createElement("div");
    wrap.className = "matching-interaction";

    // Instructions banner for desktop drag + touch tap
    wrap.innerHTML = `
      <div class="matching-instructions-hint">
        <span>💡 Tap or Drag an item on the left, then connect it to its match on the right.</span>
      </div>
      <div class="matching-grid">
        <div class="matching-column left-col" id="match-col-left">
          <div class="col-header">Items</div>
        </div>
        <div class="matching-column right-col" id="match-col-right">
          <div class="col-header">Meanings / Answers</div>
        </div>
      </div>
      <div class="matching-action-bar">
        <button class="reset-match-btn" id="reset-match-btn">🔄 Reset Pairings</button>
      </div>
    `;
    container.appendChild(wrap);

    // Prepare shuffled right items
    const rightItems = question.pairs.map(p => ({ id: p.id, text: p.right }));
    if (question.distractors) {
      question.distractors.forEach((d, idx) => {
        rightItems.push({ id: `dist_${idx}`, text: d });
      });
    }
    // Shuffle right items
    for (let i = rightItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rightItems[i], rightItems[j]] = [rightItems[j], rightItems[i]];
    }

    this.activeInteraction = {
      type: "matching",
      pairs: question.pairs,
      userMatches: {}, // leftId -> rightId
      selectedLeft: null,
      selectedRight: null
    };

    const leftCol = wrap.querySelector("#match-col-left");
    const rightCol = wrap.querySelector("#match-col-right");

    // Render left items (draggables & clickables)
    question.pairs.forEach(pair => {
      const item = document.createElement("div");
      item.className = "match-item match-left-item";
      item.id = `left-${pair.id}`;
      item.setAttribute("data-id", pair.id);
      item.setAttribute("draggable", "true");
      item.innerHTML = `<span class="item-text">${pair.left}</span><span class="match-indicator">○</span>`;

      // Drag event
      item.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", pair.id);
        item.classList.add("dragging");
      });
      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
      });

      // Click to select event (for mobile & touch)
      item.addEventListener("click", () => {
        this.sounds.playClick();
        this.handleMatchingClick("left", pair.id);
      });

      leftCol.appendChild(item);
    });

    // Render right items (drop targets & clickables)
    rightItems.forEach(ritem => {
      const item = document.createElement("div");
      item.className = "match-item match-right-item";
      item.id = `right-${ritem.id}`;
      item.setAttribute("data-id", ritem.id);

      item.innerHTML = `<span class="item-text">${ritem.text}</span><span class="match-indicator">○</span>`;

      // Drop events
      item.addEventListener("dragover", (e) => {
        e.preventDefault();
        item.classList.add("drag-over");
      });
      item.addEventListener("dragleave", () => {
        item.classList.remove("drag-over");
      });
      item.addEventListener("drop", (e) => {
        e.preventDefault();
        item.classList.remove("drag-over");
        const leftId = e.dataTransfer.getData("text/plain");
        if (leftId) {
          this.pairMatchingItems(leftId, ritem.id);
        }
      });

      // Click to match event
      item.addEventListener("click", () => {
        this.sounds.playClick();
        this.handleMatchingClick("right", ritem.id);
      });

      rightCol.appendChild(item);
    });

    // Reset button
    wrap.querySelector("#reset-match-btn").addEventListener("click", () => {
      this.sounds.playClick();
      this.resetMatchingActivity();
    });
  }

  handleMatchingClick(side, id) {
    const act = this.activeInteraction;
    if (!act || act.type !== "matching") return;

    if (side === "left") {
      // Toggle or select left item
      document.querySelectorAll(".match-left-item").forEach(el => el.classList.remove("selected"));
      if (act.selectedLeft === id) {
        act.selectedLeft = null;
      } else {
        act.selectedLeft = id;
        document.getElementById(`left-${id}`).classList.add("selected");
        // If a right item was already selected, pair them!
        if (act.selectedRight) {
          this.pairMatchingItems(act.selectedLeft, act.selectedRight);
        }
      }
    } else {
      // Select right item
      document.querySelectorAll(".match-right-item").forEach(el => el.classList.remove("selected"));
      if (act.selectedRight === id) {
        act.selectedRight = null;
      } else {
        act.selectedRight = id;
        document.getElementById(`right-${id}`).classList.add("selected");
        // If a left item was already selected, pair them!
        if (act.selectedLeft) {
          this.pairMatchingItems(act.selectedLeft, act.selectedRight);
        }
      }
    }
  }

  pairMatchingItems(leftId, rightId) {
    const act = this.activeInteraction;
    if (!act) return;

    // Check if rightId was previously paired with another left item; remove if so
    for (const [k, v] of Object.entries(act.userMatches)) {
      if (v === rightId) delete act.userMatches[k];
    }
    act.userMatches[leftId] = rightId;

    // Clear selection highlights
    act.selectedLeft = null;
    act.selectedRight = null;
    document.querySelectorAll(".match-item").forEach(el => el.classList.remove("selected"));

    this.renderMatchingPairsVisual();
  }

  renderMatchingPairsVisual() {
    const act = this.activeInteraction;
    if (!act) return;

    // Reset indicator on all items
    document.querySelectorAll(".match-item").forEach(el => {
      el.classList.remove("paired");
      const ind = el.querySelector(".match-indicator");
      if (ind) ind.textContent = "○";
    });

    const colors = ["#0d9488", "#0284c7", "#d97706", "#7c3aed", "#059669"];
    let pairIdx = 0;

    for (const [leftId, rightId] of Object.entries(act.userMatches)) {
      const leftEl = document.getElementById(`left-${leftId}`);
      const rightEl = document.getElementById(`right-${rightId}`);
      const badgeChar = String.fromCharCode(65 + (pairIdx % 26)); // A, B, C, D...
      pairIdx++;

      if (leftEl) {
        leftEl.classList.add("paired");
        const ind = leftEl.querySelector(".match-indicator");
        if (ind) ind.textContent = `● [${badgeChar}]`;
      }
      if (rightEl) {
        rightEl.classList.add("paired");
        const ind = rightEl.querySelector(".match-indicator");
        if (ind) ind.textContent = `● [${badgeChar}]`;
      }
    }
  }

  resetMatchingActivity() {
    const act = this.activeInteraction;
    if (!act) return;
    act.userMatches = {};
    act.selectedLeft = null;
    act.selectedRight = null;
    document.querySelectorAll(".match-item").forEach(el => {
      el.classList.remove("paired", "selected");
      const ind = el.querySelector(".match-indicator");
      if (ind) ind.textContent = "○";
    });
  }

  // C. FILL IN THE BLANKS RENDERER
  renderFillBlankInteraction(container, question) {
    const wrap = document.createElement("div");
    wrap.className = "fill-blank-interaction";

    // Build the sentence block
    let sentenceHtml = `<div class="blank-sentence-block">`;
    let slotCounter = 0;

    question.segments.forEach((seg, idx) => {
      if (seg.input) {
        sentenceHtml += `<input type="text" class="blank-slot-input" id="blank-input-${slotCounter}" data-slot="${slotCounter}" placeholder="[blank]" autocomplete="off" />`;
        slotCounter++;
      } else {
        sentenceHtml += `<span>${seg.text.replace(/\n/g, "<br>")}</span>`;
      }
    });
    sentenceHtml += `</div>`;

    // Word Bank
    if (question.wordBank && question.wordBank.length > 0) {
      sentenceHtml += `
        <div class="word-bank-box">
          <div class="word-bank-title">Word Bank (Click to Insert into Active Blank):</div>
          <div class="word-bank-chips" id="word-bank-chips">
            ${question.wordBank.map(w => `<button type="button" class="bank-chip" data-word="${w}">${w}</button>`).join("")}
          </div>
        </div>
      `;
    }

    wrap.innerHTML = sentenceHtml;
    container.appendChild(wrap);

    this.activeInteraction = {
      type: "fill-blank",
      totalSlots: slotCounter,
      activeSlotIdx: 0
    };

    // Keep track of active slot focus
    const inputs = wrap.querySelectorAll(".blank-slot-input");
    inputs.forEach((input, idx) => {
      input.addEventListener("focus", () => {
        this.activeInteraction.activeSlotIdx = idx;
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && idx === inputs.length - 1) {
          this.verifyAnswer(question);
        }
      });
    });

    // Word bank chip click inserts into currently active slot
    const chipsContainer = wrap.querySelector("#word-bank-chips");
    if (chipsContainer) {
      chipsContainer.addEventListener("click", (e) => {
        const chip = e.target.closest(".bank-chip");
        if (!chip) return;
        this.sounds.playClick();
        const word = chip.dataset.word;
        const curIdx = this.activeInteraction.activeSlotIdx;
        const targetInput = document.getElementById(`blank-input-${curIdx}`);
        if (targetInput) {
          targetInput.value = word;
          // Advance to next slot if available
          if (curIdx + 1 < slotCounter) {
            this.activeInteraction.activeSlotIdx = curIdx + 1;
            const nextInput = document.getElementById(`blank-input-${curIdx + 1}`);
            if (nextInput) nextInput.focus();
          }
        }
      });
    }

    setTimeout(() => {
      if (inputs.length > 0) inputs[0].focus();
    }, 100);
  }

  // D. ORDERING / SEQUENCING RENDERER
  renderOrderingInteraction(container, question) {
    const wrap = document.createElement("div");
    wrap.className = "ordering-interaction";

    // Shuffle initial items
    const shuffledItems = [...question.items];
    for (let i = shuffledItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
    }

    wrap.innerHTML = `
      <div class="matching-instructions-hint">
        <span>💡 Use the Up ▲ and Down ▼ arrows or drag the cards into their correct sequence.</span>
      </div>
      <div class="order-list" id="order-list"></div>
    `;
    container.appendChild(wrap);

    this.activeInteraction = {
      type: "ordering",
      itemsOrder: shuffledItems.map(i => i.id)
    };

    this.renderOrderListItems(wrap.querySelector("#order-list"), question.items);
  }

  renderOrderListItems(listContainer, allItems) {
    listContainer.innerHTML = "";
    const itemMap = new Map(allItems.map(i => [i.id, i.text]));
    const currentOrder = this.activeInteraction.itemsOrder;

    currentOrder.forEach((id, idx) => {
      const card = document.createElement("div");
      card.className = "order-item-card";
      card.id = `order-${id}`;
      card.setAttribute("draggable", "true");

      card.innerHTML = `
        <span class="order-badge" style="background:#e0f2fe; color:#0284c7; padding:2px 8px; border-radius:6px; font-weight:700; font-size:0.85rem;">#${idx + 1}</span>
        <span class="order-item-text">${itemMap.get(id)}</span>
        <div class="order-controls">
          <button class="order-btn btn-up" data-idx="${idx}" ${idx === 0 ? "disabled" : ""} title="Move Up">▲</button>
          <button class="order-btn btn-down" data-idx="${idx}" ${idx === currentOrder.length - 1 ? "disabled" : ""} title="Move Down">▼</button>
        </div>
      `;

      // Up button
      card.querySelector(".btn-up").addEventListener("click", () => {
        this.sounds.playClick();
        if (idx > 0) {
          [currentOrder[idx - 1], currentOrder[idx]] = [currentOrder[idx], currentOrder[idx - 1]];
          this.renderOrderListItems(listContainer, allItems);
        }
      });

      // Down button
      card.querySelector(".btn-down").addEventListener("click", () => {
        this.sounds.playClick();
        if (idx < currentOrder.length - 1) {
          [currentOrder[idx], currentOrder[idx + 1]] = [currentOrder[idx + 1], currentOrder[idx]];
          this.renderOrderListItems(listContainer, allItems);
        }
      });

      // Drag and drop ordering
      card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", idx);
        card.classList.add("dragging");
      });
      card.addEventListener("dragend", () => card.classList.remove("dragging"));
      card.addEventListener("dragover", (e) => e.preventDefault());
      card.addEventListener("drop", (e) => {
        e.preventDefault();
        const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
        if (!isNaN(fromIdx) && fromIdx !== idx) {
          const moved = currentOrder.splice(fromIdx, 1)[0];
          currentOrder.splice(idx, 0, moved);
          this.renderOrderListItems(listContainer, allItems);
        }
      });

      listContainer.appendChild(card);
    });
  }

  // ===========================================================================
  // ANSWER VERIFICATION
  // ===========================================================================
  normalize(str) {
    if (!str) return "";
    return str
      .trim()
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s+/g, " ");
  }

  verifyAnswer(question) {
    let isCorrect = false;
    let isPartial = false;
    let earnedPoints = 0;
    let userSubmissionText = "";
    let correctSolutionText = "";

    // 1. One-Word Type
    if (question.type === "one-word") {
      const input = document.getElementById("one-word-input");
      const userVal = input ? input.value.trim() : "";
      userSubmissionText = userVal || "(Blank)";
      const normUser = this.normalize(userVal);

      isCorrect = question.acceptedAnswers.some(ans => this.normalize(ans) === normUser);
      if (isCorrect) {
        earnedPoints = question.points;
      }
      correctSolutionText = question.acceptedAnswers[0];
    }

    // 2. Matching Type
    else if (question.type === "matching") {
      const act = this.activeInteraction;
      let matchedCount = 0;
      const totalPairs = question.pairs.length;
      const pairsLog = [];

      question.pairs.forEach(pair => {
        const userChoice = act ? act.userMatches[pair.id] : null;
        if (userChoice === pair.id) {
          matchedCount++;
          pairsLog.push(`${pair.left} ➔ ${pair.right} (✓)`);
        } else {
          pairsLog.push(`${pair.left} ➔ Missed (✗)`);
        }
      });

      userSubmissionText = pairsLog.join(", ");
      correctSolutionText = question.pairs.map(p => `${p.left} = ${p.right}`).join("; ");

      if (matchedCount === totalPairs) {
        isCorrect = true;
        earnedPoints = question.points;
      } else if (matchedCount > 0) {
        isPartial = true;
        earnedPoints = Math.round((matchedCount / totalPairs) * question.points);
      }
    }

    // 3. Fill-in-the-Blanks Type
    else if (question.type === "fill-blank") {
      const inputs = document.querySelectorAll(".blank-slot-input");
      const blankSegments = question.segments.filter(s => s.input);
      let correctSlots = 0;
      const userEntries = [];

      inputs.forEach((input, idx) => {
        const userEntry = input.value.trim();
        userEntries.push(userEntry || "___");
        const normEntry = this.normalize(userEntry);
        const expected = blankSegments[idx];

        let slotMatch = false;
        if (expected && expected.acceptable) {
          slotMatch = expected.acceptable.some(a => this.normalize(a) === normEntry);
        } else if (expected) {
          slotMatch = this.normalize(expected.answer) === normEntry;
        }

        if (slotMatch) correctSlots++;
      });

      userSubmissionText = userEntries.join(" | ");
      correctSolutionText = blankSegments.map(s => s.answer).join(", ");

      if (correctSlots === blankSegments.length) {
        isCorrect = true;
        earnedPoints = question.points;
      } else if (correctSlots > 0) {
        isPartial = true;
        earnedPoints = Math.round((correctSlots / blankSegments.length) * question.points);
      }
    }

    // 4. Ordering Type
    else if (question.type === "ordering") {
      const userOrder = this.activeInteraction ? this.activeInteraction.itemsOrder : [];
      userSubmissionText = userOrder.join(" ➔ ");
      correctSolutionText = question.correctOrder.join(" ➔ ");

      isCorrect = userOrder.every((val, idx) => val === question.correctOrder[idx]);
      if (isCorrect) {
        earnedPoints = question.points;
      }
    }

    // Record Result
    this.state.totalPointsEarned += earnedPoints;
    this.state.levelScores[this.state.currentLevelIdx] += earnedPoints;
    this.state.records.push({
      levelId: QUIZ_DATA.levels[this.state.currentLevelIdx].id,
      levelTitle: QUIZ_DATA.levels[this.state.currentLevelIdx].title,
      questionId: question.id,
      questionTitle: question.title,
      prompt: question.prompt,
      userSubmission: userSubmissionText,
      correctSolution: correctSolutionText,
      isCorrect,
      isPartial,
      earnedPoints,
      maxPoints: question.points,
      explanation: question.explanation,
      bookReference: question.bookReference
    });

    this.renderFeedbackBox(isCorrect, isPartial, earnedPoints, question);
  }

  renderFeedbackBox(isCorrect, isPartial, earnedPoints, question) {
    // Disable submit button & input fields
    const actionsRow = document.getElementById("question-actions-row");
    if (actionsRow) actionsRow.style.display = "none";

    // Play appropriate sound and confetti
    if (isCorrect) {
      this.sounds.playCorrect();
      this.confetti.burst(65);
    } else if (isPartial) {
      this.sounds.playPartial();
      this.confetti.burst(30);
    } else {
      this.sounds.playIncorrect();
    }

    const card = this.elements.questionContainer.querySelector(".question-card");
    const feedbackBox = document.createElement("div");

    let statusClass = "incorrect";
    let statusIcon = "❌";
    let statusTitle = "Keep trying! Here is the textbook explanation:";

    if (isCorrect) {
      statusClass = "correct";
      statusIcon = "🎉";
      statusTitle = "Masha'Allah! Absolutely Correct!";
    } else if (isPartial) {
      statusClass = "partial";
      statusIcon = "⭐";
      statusTitle = "Good Effort! You earned partial credit!";
    }

    feedbackBox.className = `feedback-box ${statusClass}`;
    feedbackBox.innerHTML = `
      <div class="feedback-header">
        <span class="feedback-icon">${statusIcon}</span>
        <span class="feedback-title">${statusTitle}</span>
      </div>
      <div class="feedback-explanation">
        <p>${question.explanation}</p>
      </div>
      <div class="feedback-book-quote">
        📖 Reference: <strong>${question.bookReference}</strong> • Marks: +${earnedPoints} / ${question.points}
      </div>
      <div class="feedback-next-action">
        <button class="next-question-btn" id="btn-next-question">
          <span>Continue</span>
          <span>➔</span>
        </button>
      </div>
    `;

    card.appendChild(feedbackBox);

    document.getElementById("btn-next-question").addEventListener("click", () => {
      this.sounds.playClick();
      this.advanceToNextStep();
    });
  }

  advanceToNextStep() {
    const level = QUIZ_DATA.levels[this.state.currentLevelIdx];
    const nextQIdx = this.state.currentQuestionIdx + 1;

    if (nextQIdx < level.questions.length) {
      this.loadQuestion(nextQIdx);
    } else {
      // Completed level!
      this.completeLevel(level);
    }
  }

  completeLevel(level) {
    this.sounds.playLevelComplete();
    this.confetti.burst(100);

    // Calculate level percentage
    let levelMax = 0;
    level.questions.forEach(q => levelMax += q.points);
    const earned = this.state.levelScores[this.state.currentLevelIdx];
    const percent = Math.round((earned / levelMax) * 100);

    // Stars earned (1 to 3)
    let stars = 1;
    if (percent >= 85) stars = 3;
    else if (percent >= 60) stars = 2;

    // Unlock badge
    if (!this.state.badgesUnlocked.includes(level.badgeName)) {
      this.state.badgesUnlocked.push(level.badgeName);
    }

    this.renderLevelRecap(level, earned, levelMax, percent, stars);
    this.showScreen("levelRecapScreen");
  }

  renderLevelRecap(level, earned, max, percent, stars) {
    const recap = this.elements.levelRecapCard;
    const isLastLevel = this.state.currentLevelIdx === QUIZ_DATA.levels.length - 1;

    let starHtml = "";
    for (let i = 1; i <= 3; i++) {
      if (i <= stars) {
        starHtml += `<span class="star-icon earned">★</span>`;
      } else {
        starHtml += `<span class="star-icon empty">☆</span>`;
      }
    }

    recap.innerHTML = `
      <div class="recap-stars-row">${starHtml}</div>
      <h2 class="recap-title">${level.title} Complete!</h2>
      <p class="recap-subtitle">Alhamdulillah! Level ${level.levelNumber} Completed</p>

      <div class="badge-unlocked-card">
        <span class="unlocked-icon">${level.badgeIcon}</span>
        <div class="unlocked-text-group">
          <div class="unlocked-label">New Badge Unlocked!</div>
          <div class="unlocked-name">${level.badgeName}</div>
        </div>
      </div>

      <div class="recap-score-grid">
        <div class="recap-stat-box">
          <div class="recap-stat-val">${earned}</div>
          <div class="recap-stat-lbl">Points Earned</div>
        </div>
        <div class="recap-stat-box">
          <div class="recap-stat-val">${percent}%</div>
          <div class="recap-stat-lbl">Accuracy</div>
        </div>
        <div class="recap-stat-box">
          <div class="recap-stat-val">${level.questions.length}</div>
          <div class="recap-stat-lbl">Questions</div>
        </div>
      </div>

      <div class="recap-actions-row">
        <button class="secondary-btn" id="recap-retake-btn">
          <span>🔄 Retake Level</span>
        </button>
        <button class="primary-btn glow-btn" id="recap-next-btn">
          <span>${isLastLevel ? "🏆 View Final Master Results" : "Next Level ➔"}</span>
        </button>
      </div>
    `;

    document.getElementById("recap-retake-btn").addEventListener("click", () => {
      this.sounds.playClick();
      // Remove records from this level to reset
      this.state.records = this.state.records.filter(r => r.levelId !== level.id);
      this.state.totalPointsEarned -= this.state.levelScores[this.state.currentLevelIdx];
      this.state.levelScores[this.state.currentLevelIdx] = 0;
      this.startLevel(this.state.currentLevelIdx);
    });

    document.getElementById("recap-next-btn").addEventListener("click", () => {
      this.sounds.playClick();
      if (isLastLevel) {
        this.showFinalResults();
      } else {
        this.startLevel(this.state.currentLevelIdx + 1);
      }
    });
  }

  // ===========================================================================
  // MASTER FINAL RESULTS & CERTIFICATE
  // ===========================================================================
  showFinalResults() {
    this.sounds.playLevelComplete();
    this.confetti.burst(150);

    const card = this.elements.finalResultsCard;
    const totalEarned = this.state.totalPointsEarned;
    const totalMax = this.state.maxPossiblePoints;
    const overallPercentage = Math.round((totalEarned / totalMax) * 100);

    // Tier message requirement from prompt:
    // 90–100%: Quran Quest Champion! Excellent work!
    // 75–89%: Amazing effort! You are learning so well!
    // 50–74%: Good job! Keep practising and improving!
    // Below 50%: Keep going! Try again and become a Quran Quest Champion!
    let tierTitle = "";
    let tierSub = "";

    if (overallPercentage >= 90) {
      tierTitle = "Quran Quest Champion! Excellent work!";
      tierSub = "Masha'Allah! You have demonstrated exceptional mastery across Surah Az-Zalzalah, Surah Al-Qadr, and Surah At-Tin!";
    } else if (overallPercentage >= 75) {
      tierTitle = "Amazing effort! You are learning so well!";
      tierSub = "Great achievement! You have understood the major facts, vocabulary, and teachings from the textbook.";
    } else if (overallPercentage >= 50) {
      tierTitle = "Good job! Keep practising and improving!";
      tierSub = "You have a solid foundation! Review your answers and try again to become a Quran Quest Champion!";
    } else {
      tierTitle = "Keep going! Try again and become a Quran Quest Champion!";
      tierSub = "Every attempt is a step closer to knowledge. Review the book references and take on the challenge once more!";
    }

    const totalQuestions = this.state.records.length;
    const correctCount = this.state.records.filter(r => r.isCorrect).length;
    const partialCount = this.state.records.filter(r => r.isPartial).length;
    const incorrectCount = this.state.records.filter(r => !r.isCorrect && !r.isPartial).length;

    card.innerHTML = `
      <div class="final-trophy-emblem">🏆</div>
      <div class="bismillah-banner">
        <span class="bismillah-text">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</span>
        <span class="bismillah-trans">Praise be to Allah, Lord of all the worlds</span>
      </div>

      <div class="final-score-circle">
        <span class="final-percent">${overallPercentage}%</span>
        <span class="final-pts">${totalEarned} / ${totalMax} pts</span>
      </div>

      <h1 class="final-tier-message">${tierTitle}</h1>
      <p class="final-tier-sub">${tierSub}</p>

      <div class="badges-earned-shelf">
        <div class="shelf-title">Quest Badges Collected (${this.state.badgesUnlocked.length} / 4)</div>
        <div class="shelf-grid">
          <div class="badge-tile">
            <span class="badge-tile-icon">⚡</span>
            <span class="badge-tile-name">Earthquake Scholar</span>
          </div>
          <div class="badge-tile">
            <span class="badge-tile-icon">🌙</span>
            <span class="badge-tile-name">Night of Decree</span>
          </div>
          <div class="badge-tile">
            <span class="badge-tile-icon">🌿</span>
            <span class="badge-tile-name">Mount Sinai</span>
          </div>
          <div class="badge-tile">
            <span class="badge-tile-icon">🏆</span>
            <span class="badge-tile-name">Grand Champion</span>
          </div>
        </div>
      </div>

      <div class="final-stats-strip">
        <div class="f-stat-box">
          <div class="f-stat-num">${totalQuestions}</div>
          <div class="f-stat-label">Total Questions</div>
        </div>
        <div class="f-stat-box" style="border-color:#86efac;">
          <div class="f-stat-num" style="color:#15803d;">${correctCount}</div>
          <div class="f-stat-label">Fully Correct</div>
        </div>
        <div class="f-stat-box" style="border-color:#fde047;">
          <div class="f-stat-num" style="color:#b45309;">${partialCount}</div>
          <div class="f-stat-label">Partial Credit</div>
        </div>
        <div class="f-stat-box" style="border-color:#fecdd3;">
          <div class="f-stat-num" style="color:#be123c;">${incorrectCount}</div>
          <div class="f-stat-label">Needs Practice</div>
        </div>
      </div>

      <div class="final-actions-deck">
        <button class="primary-btn glow-btn" id="btn-open-certificate">
          <span>🎓 View Achievement Certificate</span>
        </button>
        <button class="secondary-btn" id="btn-open-review">
          <span>📋 Review My Answers</span>
        </button>
        <button class="secondary-btn" id="btn-restart-quest">
          <span>🔄 Play Again</span>
        </button>
      </div>
    `;

    document.getElementById("btn-open-certificate").addEventListener("click", () => {
      this.sounds.playClick();
      this.showCertificateModal(overallPercentage, tierTitle);
    });

    document.getElementById("btn-open-review").addEventListener("click", () => {
      this.sounds.playClick();
      this.showReviewModal();
    });

    document.getElementById("btn-restart-quest").addEventListener("click", () => {
      this.sounds.playClick();
      if (confirm("Restart Quran Quest from Level 1?")) {
        this.state.totalPointsEarned = 0;
        this.state.levelScores = [0, 0, 0, 0];
        this.state.records = [];
        this.state.badgesUnlocked = [];
        this.startLevel(0);
      }
    });

    this.showScreen("finalResultsScreen");
  }

  // ===========================================================================
  // MODALS IMPLEMENTATION
  // ===========================================================================
  showHintModal(hintText, bookRef) {
    this.elements.hintModalText.textContent = hintText;
    this.elements.hintBookRef.textContent = `📖 Book Reference: ${bookRef}`;
    this.elements.hintModal.classList.add("show");
  }

  hideHintModal() {
    this.sounds.playClick();
    this.elements.hintModal.classList.remove("show");
  }

  showCertificateModal(percent, tier) {
    this.confetti.burst(80);
    this.elements.certStudentName.textContent = this.state.studentName;
    this.elements.certScoreBadge.textContent = `Final Score: ${percent}% • ${tier.split("!")[0]}`;

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.elements.certDateText.textContent = new Date().toLocaleDateString(undefined, dateOptions);

    this.elements.certificateModal.classList.add("show");
  }

  hideCertModal() {
    this.sounds.playClick();
    this.elements.certificateModal.classList.remove("show");
  }

  showReviewModal() {
    const records = this.state.records;
    const correctRecords = records.filter(r => r.isCorrect);
    const incorrectRecords = records.filter(r => !r.isCorrect);

    this.elements.countAll.textContent = records.length;
    this.elements.countCorrect.textContent = correctRecords.length;
    this.elements.countIncorrect.textContent = incorrectRecords.length;

    this.filterReviewItems("all");
    this.elements.reviewModal.classList.add("show");
  }

  filterReviewItems(filter) {
    const container = this.elements.reviewListContainer;
    container.innerHTML = "";

    let items = this.state.records;
    if (filter === "correct") {
      items = items.filter(r => r.isCorrect);
    } else if (filter === "incorrect") {
      items = items.filter(r => !r.isCorrect);
    }

    if (items.length === 0) {
      container.innerHTML = `<p style="text-align:center; color:#64748b; padding:20px;">No questions in this filter.</p>`;
      return;
    }

    items.forEach((r, idx) => {
      const card = document.createElement("div");
      card.className = `review-card ${r.isCorrect ? "correct" : "incorrect"}`;
      card.innerHTML = `
        <div class="review-q-title">
          ${idx + 1}. [${r.levelTitle}] ${r.prompt}
        </div>
        <div class="review-answer-row">
          <strong>Your Answer:</strong> <span style="color: ${r.isCorrect ? '#15803d' : '#be123c'};">${r.userSubmission}</span>
        </div>
        ${!r.isCorrect ? `
          <div class="review-answer-row">
            <strong>Textbook Answer:</strong> <span style="color: #0f375f; font-weight:700;">${r.correctSolution}</span>
          </div>
        ` : ""}
        <div class="review-answer-row" style="color:#475569; font-size:0.86rem; margin-top:4px;">
          <em>${r.explanation}</em>
        </div>
        <div class="review-ref">
          📖 Reference: ${r.bookReference} • Marks: ${r.earnedPoints} / ${r.maxPoints}
        </div>
      `;
      container.appendChild(card);
    });
  }

  hideReviewModal() {
    this.sounds.playClick();
    this.elements.reviewModal.classList.remove("show");
  }
}

// Instantiate application when DOM loads
document.addEventListener("DOMContentLoaded", () => {
  window.QuranQuest = new QuranQuestApp();
});
