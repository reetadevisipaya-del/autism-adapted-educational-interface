/**
 * LEARN & GROW: Autism-Adapted Educational Interface
 * Client Application Logic
 * Grounded in User-Centered Needs Assessment (ISO 9241-210)
 */

class AutismApp {
  constructor() {
    this.currentView = 'dashboard';
    this.historyStack = ['dashboard'];
    this.soundEnabled = true;
    this.reducedMotion = true;
    this.speechSynth = window.speechSynthesis;
    
    // Calculator State
    this.calcValue = '0';
    this.calcPrev = null;
    this.calcOp = null;

    // Matching Activity State
    this.selectedMatchPic = null;
    this.selectedMatchWord = null;
    this.matchedPairsCount = 0;

    // Sorting Activity State
    this.selectedSortElement = null;
    this.sortedCount = 0;

    this.initDOM();
  }

  initDOM() {
    // Nav Buttons
    this.backBtn = document.getElementById('navBackBtn');
    this.homeBtn = document.getElementById('navHomeBtn');
    this.ttsBtn = document.getElementById('ttsSpeakBtn');
    this.settingsBtn = document.getElementById('openSettingsBtn');
    this.teacherBtn = document.getElementById('openTeacherBtn');
    this.headerTitle = document.getElementById('appHeaderTitle');
    this.breadcrumbTag = document.getElementById('breadcrumbTag');

    // Modals
    this.settingsModal = document.getElementById('settingsModal');

    // Event Listeners
    this.backBtn.addEventListener('click', () => this.goBack());
    this.homeBtn.addEventListener('click', () => this.navigateTo('dashboard'));
    this.ttsBtn.addEventListener('click', () => this.speakCurrentInstruction());
    this.settingsBtn.addEventListener('click', () => this.openSettings());
    this.teacherBtn.addEventListener('click', () => this.navigateTo('teacher-portal'));

    // Make apples in lesson tap-to-count
    document.querySelectorAll('.apple-item').forEach((apple, idx) => {
      apple.addEventListener('click', () => {
        apple.classList.toggle('tapped');
        this.playGentleChime(400 + idx * 50);
        this.speakText(`Apple ${idx + 1}`);
      });
    });

    console.log('Autism-Adapted Educational Interface Initialized.');
  }

  // ==========================================
  // NAVIGATION & VIEW CONTROLLER
  // ==========================================
  navigateTo(viewId, pushHistory = true) {
    if (viewId === this.currentView) return;

    // Hide all views
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));

    let targetSection = null;
    let title = 'Learn & Grow';
    let breadcrumb = 'Student Dashboard';

    switch (viewId) {
      case 'dashboard':
        targetSection = document.getElementById('viewDashboard');
        breadcrumb = 'Student Dashboard';
        break;
      case 'subject-math':
        targetSection = document.getElementById('viewSubjectMath');
        title = 'Mathematics';
        breadcrumb = 'Subjects / Mathematics';
        break;
      case 'subject-english':
        targetSection = document.getElementById('viewSubjectEnglish');
        title = 'English';
        breadcrumb = 'Subjects / English';
        break;
      case 'subject-evs':
        targetSection = document.getElementById('viewSubjectEvs');
        title = 'Environmental Studies';
        breadcrumb = 'Subjects / EVS';
        break;
      case 'activities-hub':
        targetSection = document.getElementById('viewActivitiesHub');
        title = 'Activities & Games';
        breadcrumb = 'Practice Activities';
        break;
      case 'lesson-view':
        targetSection = document.getElementById('viewLesson');
        title = 'Addition Lesson';
        breadcrumb = 'Mathematics / Addition / Step 1';
        break;
      case 'act-matching':
        targetSection = document.getElementById('viewMatchingActivity');
        title = 'Picture Matching';
        breadcrumb = 'Activities / Word Matching';
        break;
      case 'act-sorting':
        targetSection = document.getElementById('viewSortingActivity');
        title = 'Category Sorting';
        breadcrumb = 'Activities / Fruit & Veggie Sorting';
        break;
      case 'view-calculator':
        targetSection = document.getElementById('viewCalculator');
        title = 'Visual Calculator';
        breadcrumb = 'Tools / Visual Calculator';
        break;
      case 'my-learning':
        targetSection = document.getElementById('viewMyLearning');
        title = 'My Learning Journey';
        breadcrumb = 'Progress & Continuation';
        break;
      case 'teacher-portal':
        targetSection = document.getElementById('viewTeacherPortal');
        title = 'Educator Portal';
        breadcrumb = 'Teacher & Parent Administration';
        break;
    }

    if (targetSection) {
      targetSection.classList.add('active');
      this.currentView = viewId;
      this.headerTitle.textContent = title;
      this.breadcrumbTag.textContent = breadcrumb;

      if (pushHistory) {
        this.historyStack.push(viewId);
      }

      // Show/hide Back button
      if (this.historyStack.length > 1 && viewId !== 'dashboard') {
        this.backBtn.style.display = 'inline-flex';
      } else {
        this.backBtn.style.display = 'none';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goBack() {
    if (this.historyStack.length > 1) {
      this.historyStack.pop(); // remove current
      const prevView = this.historyStack[this.historyStack.length - 1];
      this.navigateTo(prevView, false);
    } else {
      this.navigateTo('dashboard', false);
    }
  }

  // ==========================================
  // LESSON CONTROLLER (ADDITION)
  // ==========================================
  startLesson(lessonId) {
    this.navigateTo('lesson-view');
  }

  checkAnswer(selectedNumber) {
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackMsg = document.getElementById('feedbackMessage');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const appleResultBox = document.getElementById('appleResultBox');

    feedbackBox.style.display = 'flex';

    if (selectedNumber === 5) {
      // Correct!
      feedbackBox.className = 'feedback-box';
      feedbackIcon.textContent = '🌟';
      feedbackTitle.textContent = "That's correct! Super counting!";
      feedbackMsg.textContent = '2 apples + 3 apples = 5 apples altogether.';
      appleResultBox.innerHTML = '<span style="font-size: 2.2rem; font-weight:800; color: #2F9E58;">5 🍎</span>';
      this.playGentleChime(523.25); // C5
      this.speakText("That's correct! Two apples plus three apples make five apples altogether. Great job!");
    } else {
      // Try again (non-punitive)
      feedbackBox.className = 'feedback-box try-again';
      feedbackIcon.textContent = '💡';
      feedbackTitle.textContent = "Let's count together!";
      feedbackMsg.textContent = `You picked ${selectedNumber}. Try tapping each apple on the screen to count them one by one.`;
      this.speakText(`You selected ${selectedNumber}. Let's count each apple together. You can do it!`);
    }
  }

  hintLesson() {
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackMsg = document.getElementById('feedbackMessage');
    const feedbackIcon = document.getElementById('feedbackIcon');

    feedbackBox.style.display = 'flex';
    feedbackBox.className = 'feedback-box try-again';
    feedbackIcon.textContent = '🍎';
    feedbackTitle.textContent = 'Helpful Hint:';
    feedbackMsg.textContent = 'Count the first group: 1, 2. Now keep counting the next group: 3, 4, 5! There are 5 apples!';
    this.speakText('Count the first group: one, two. Now keep counting: three, four, five! There are five apples altogether.');
  }

  nextLessonStep() {
    alert('Great progress! You completed Step 1 of Addition. Step 2 will continue with groups of toys.');
    this.navigateTo('subject-math');
  }

  // ==========================================
  // INTERACTIVE MATCHING ACTIVITY
  // ==========================================
  startActivity(actId) {
    if (actId === 'matching') this.navigateTo('act-matching');
    else if (actId === 'sorting') this.navigateTo('act-sorting');
    else if (actId === 'counting') this.navigateTo('lesson-view');
  }

  selectMatchItem(element, type) {
    if (element.classList.contains('matched')) return;

    if (type === 'pic') {
      document.querySelectorAll('#colPictures .match-card').forEach(c => c.classList.remove('selected'));
      element.classList.add('selected');
      this.selectedMatchPic = element;
      this.speakText(element.querySelector('.match-name').textContent);
    } else {
      document.querySelectorAll('#colWords .match-card').forEach(c => c.classList.remove('selected'));
      element.classList.add('selected');
      this.selectedMatchWord = element;
      this.speakText(element.querySelector('.word-text').textContent);
    }

    if (this.selectedMatchPic && this.selectedMatchWord) {
      const picKey = this.selectedMatchPic.dataset.match;
      const wordKey = this.selectedMatchWord.dataset.match;

      if (picKey === wordKey) {
        // Matched!
        this.selectedMatchPic.classList.remove('selected');
        this.selectedMatchWord.classList.remove('selected');
        this.selectedMatchPic.classList.add('matched');
        this.selectedMatchWord.classList.add('matched');
        this.matchedPairsCount++;
        this.playGentleChime(587.33); // D5
        this.speakText(`Correct! That is ${picKey}!`);

        this.selectedMatchPic = null;
        this.selectedMatchWord = null;

        if (this.matchedPairsCount === 3) {
          document.getElementById('matchingFeedback').style.display = 'flex';
          this.speakText('Wonderful! You matched all the words and pictures correctly!');
        }
      } else {
        // Did not match
        setTimeout(() => {
          if (this.selectedMatchPic) this.selectedMatchPic.classList.remove('selected');
          if (this.selectedMatchWord) this.selectedMatchWord.classList.remove('selected');
          this.selectedMatchPic = null;
          this.selectedMatchWord = null;
        }, 600);
      }
    }
  }

  resetMatching() {
    this.matchedPairsCount = 0;
    this.selectedMatchPic = null;
    this.selectedMatchWord = null;
    document.querySelectorAll('.match-card').forEach(c => {
      c.classList.remove('selected', 'matched');
    });
    document.getElementById('matchingFeedback').style.display = 'none';
  }

  // ==========================================
  // INTERACTIVE SORTING ACTIVITY
  // ==========================================
  selectSortItem(element) {
    if (element.classList.contains('placed')) return;
    document.querySelectorAll('.sort-item-card').forEach(i => i.classList.remove('selected'));
    element.classList.add('selected');
    this.selectedSortElement = element;
    this.speakText(element.textContent.trim());
  }

  placeInBasket(basketType) {
    if (!this.selectedSortElement) {
      this.speakText('First click an item above, then click a basket.');
      return;
    }

    const itemCategory = this.selectedSortElement.dataset.category;

    if (itemCategory === basketType) {
      // Correct Basket
      const basketContents = basketType === 'fruit' ? document.getElementById('contentsFruit') : document.getElementById('contentsVeggie');
      const emptyHint = basketContents.querySelector('.empty-hint');
      if (emptyHint) emptyHint.style.display = 'none';

      const tag = document.createElement('span');
      tag.className = 'sort-item-card placed';
      tag.style.margin = '4px';
      tag.innerHTML = this.selectedSortElement.innerHTML;
      basketContents.appendChild(tag);

      this.selectedSortElement.classList.remove('selected');
      this.selectedSortElement.classList.add('placed');
      this.selectedSortElement = null;
      this.sortedCount++;

      this.playGentleChime(659.25); // E5
      this.speakText('Great sorting! It goes right into this basket.');

      if (this.sortedCount === 4) {
        document.getElementById('sortingFeedback').style.display = 'flex';
        this.speakText('Awesome work! You sorted all the fruits and vegetables correctly!');
      }
    } else {
      // Gentle hint
      this.speakText('Let us think again. Does this item belong with fruits or vegetables?');
    }
  }

  resetSorting() {
    this.sortedCount = 0;
    this.selectedSortElement = null;
    document.querySelectorAll('.sort-item-card').forEach(i => {
      i.classList.remove('selected', 'placed');
    });
    document.getElementById('contentsFruit').innerHTML = '<span class="empty-hint">Drop fruits here</span>';
    document.getElementById('contentsVeggie').innerHTML = '<span class="empty-hint">Drop vegetables here</span>';
    document.getElementById('sortingFeedback').style.display = 'none';
  }

  // ==========================================
  // VISUAL CALCULATOR
  // ==========================================
  openVirtualCalculator() {
    this.navigateTo('view-calculator');
  }

  calcInput(char) {
    if (this.calcValue === '0' && !isNaN(char)) {
      this.calcValue = char;
    } else {
      this.calcValue += char;
    }
    this.updateCalcUI();
    this.playGentleChime(440);
  }

  calcClear() {
    this.calcValue = '0';
    this.updateCalcUI();
  }

  calcBack() {
    if (this.calcValue.length > 1) {
      this.calcValue = this.calcValue.slice(0, -1);
    } else {
      this.calcValue = '0';
    }
    this.updateCalcUI();
  }

  calcEquals() {
    try {
      // Safe arithmetic evaluation for + and -
      const sanitized = this.calcValue.replace(/[^0-9+\-]/g, '');
      const result = eval(sanitized);
      this.calcValue = String(result);
      this.updateCalcUI();
      this.playGentleChime(523.25);
      this.speakText(`The answer is ${result}`);
    } catch (e) {
      this.calcValue = '0';
      this.updateCalcUI();
    }
  }

  calcSpeak() {
    this.speakText(`The calculator shows ${this.calcValue}`);
  }

  updateCalcUI() {
    const display = document.getElementById('calcDisplay');
    const dotsContainer = document.getElementById('calcDotsContainer');
    display.textContent = this.calcValue;

    // Generate visual dots for current numeric value (capped at 20 for visual clarity)
    const num = parseInt(this.calcValue, 10);
    dotsContainer.innerHTML = '';
    if (!isNaN(num) && num > 0 && num <= 30) {
      for (let i = 0; i < num; i++) {
        const dot = document.createElement('span');
        dot.className = 'calc-dot';
        dotsContainer.appendChild(dot);
      }
    }
  }

  // ==========================================
  // PERSONALIZATION & SETTINGS
  // ==========================================
  openSettings() {
    this.settingsModal.style.display = 'flex';
  }

  closeSettings() {
    this.settingsModal.style.display = 'none';
  }

  setTextSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
    document.querySelectorAll('.setting-row:first-child .btn-toggle').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
  }

  setTheme(themeName) {
    document.body.classList.remove('theme-lavender', 'theme-sage', 'theme-blue', 'theme-contrast');
    document.body.classList.add(themeName);
    document.querySelectorAll('.btn-theme-swatch').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('soundToggleBtn');
    btn.textContent = `Sound: ${this.soundEnabled ? 'ON' : 'OFF'}`;
    btn.classList.toggle('active', this.soundEnabled);
  }

  toggleMotion() {
    this.reducedMotion = !this.reducedMotion;
    const btn = document.getElementById('motionToggleBtn');
    btn.textContent = `Motion: ${this.reducedMotion ? 'Reduced' : 'Normal'}`;
    btn.classList.toggle('active', this.reducedMotion);
  }

  // ==========================================
  // AUDIO & SPEECH SYNTHESIS (CALM & GENTLE)
  // ==========================================
  playGentleChime(freq = 440) {
    if (!this.soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Soft pure sine wave
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      // AudioContext unavailable
    }
  }

  speakText(text) {
    if (!this.speechSynth) return;
    this.speechSynth.cancel(); // Stop prior audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Unhurried, deliberate rate for autism comprehension
    utterance.pitch = 1.05; // Calm, friendly pitch
    this.speechSynth.speak(utterance);
  }

  speakCurrentInstruction() {
    const activeView = document.querySelector('.view-section.active');
    if (!activeView) return;

    let textToSpeak = 'Welcome to Learn and Grow.';
    const instructionEl = activeView.querySelector('.instruction-text, .sub-instruction, .welcome-text p');
    if (instructionEl) {
      textToSpeak = instructionEl.textContent;
    }
    this.speakText(textToSpeak);
  }
}

// Instantiate on load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AutismApp();
});
