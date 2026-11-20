/**
 * LEARN & GROW: Autism-Adapted Educational Interface
 * Client Application Logic & Multi-Subject Dynamic Lesson Engine
 * Grounded in User-Centered Needs Assessment (ISO 9241-210 & DP-TIC-AUT-Q)
 */

// ============================================================================
// CURRICULUM LESSON REGISTRY
// Autism-friendly structured lessons across Mathematics, English & EVS
// ============================================================================
const LESSONS_DATA = {
  'math-addition': {
    id: 'math-addition',
    subject: 'subject-math',
    subjectName: 'Mathematics',
    title: 'Addition Adventures',
    icon: '➕',
    steps: [
      {
        stepNum: 1,
        headline: "Let's learn addition with apples!",
        icon: "🍎",
        instruction: "Addition means putting groups together. Tap each apple to count them!",
        demoType: 'addition-groups',
        group1: { count: 2, item: '🍎', label: '2 Red Apples' },
        group2: { count: 3, item: '🍏', label: '3 Green Apples' },
        prompt: "How many apples are there altogether?",
        options: [4, 5, 6],
        correctAnswer: 5,
        hint: "Count the first group: 1, 2. Now count the next group: 3, 4, 5! There are 5 apples!",
        successMessage: "Super counting! 2 red apples + 3 green apples = 5 apples altogether! 🌟"
      },
      {
        stepNum: 2,
        headline: "Add shiny golden stars!",
        icon: "⭐",
        instruction: "Put 1 star together with 3 stars. Tap each star to count along!",
        demoType: 'addition-groups',
        group1: { count: 1, item: '⭐', label: '1 Star' },
        group2: { count: 3, item: '🌟', label: '3 Stars' },
        prompt: "1 star + 3 stars = how many stars in all?",
        options: [3, 4, 5],
        correctAnswer: 4,
        hint: "Start with 1, then keep going: 2, 3, 4! That makes 4 stars!",
        successMessage: "Brilliant work! 1 star plus 3 stars makes 4 stars altogether! ⭐"
      },
      {
        stepNum: 3,
        headline: "Friendly flutter butterflies!",
        icon: "🦋",
        instruction: "4 blue butterflies meet 2 orange butterflies. How many are in the garden?",
        demoType: 'addition-groups',
        group1: { count: 4, item: '🦋', label: '4 Butterflies' },
        group2: { count: 2, item: '🦋', label: '2 Butterflies' },
        prompt: "4 + 2 = how many butterflies?",
        options: [5, 6, 7],
        correctAnswer: 6,
        hint: "Count them: 1, 2, 3, 4... then 5, 6! There are 6 butterflies!",
        successMessage: "Great job! 4 butterflies + 2 butterflies = 6 butterflies! 🦋"
      },
      {
        stepNum: 4,
        headline: "Colorful party balloons!",
        icon: "🎈",
        instruction: "3 red balloons and 3 yellow balloons floating together. Tap each balloon!",
        demoType: 'addition-groups',
        group1: { count: 3, item: '🎈', label: '3 Balloons' },
        group2: { count: 3, item: '🎈', label: '3 Balloons' },
        prompt: "What is 3 + 3 balloons?",
        options: [5, 6, 7],
        correctAnswer: 6,
        hint: "Count 1, 2, 3, then 4, 5, 6! Three plus three makes six!",
        successMessage: "You did it! 3 balloons plus 3 balloons equals 6! High five! 🎈"
      }
    ]
  },

  'math-counting': {
    id: 'math-counting',
    subject: 'subject-math',
    subjectName: 'Mathematics',
    title: 'Counting Practice',
    icon: '🔢',
    steps: [
      {
        stepNum: 1,
        headline: "Counting little frogs on lily pads!",
        icon: "🐸",
        instruction: "Tap each frog to hear it ribbit and count up to find the total!",
        demoType: 'counting-field',
        items: ['🐸', '🐸', '🐸'],
        itemName: 'Frog',
        prompt: "How many frogs are sitting on the lily pads?",
        options: [2, 3, 4],
        correctAnswer: 3,
        hint: "Tap them one by one: one, two, three frogs!",
        successMessage: "Ribbit! That's right! There are 3 friendly green frogs! 🐸"
      },
      {
        stepNum: 2,
        headline: "Count swimming fish in the pond!",
        icon: "🐟",
        instruction: "Look at the colorful fish swimming. Tap each fish as it swims by!",
        demoType: 'counting-field',
        items: ['🐟', '🐠', '🐡', '🐟', '🐠'],
        itemName: 'Fish',
        prompt: "How many fish are swimming in the pond?",
        options: [4, 5, 6],
        correctAnswer: 5,
        hint: "Let's count: 1, 2, 3, 4, 5! Exactly 5 fish!",
        successMessage: "Splendid! You counted 5 swimming fish! 🐟"
      },
      {
        stepNum: 3,
        headline: "Count the shiny diamonds!",
        icon: "💎",
        instruction: "Sparkly diamonds are lined up. Tap each one to count together!",
        demoType: 'counting-field',
        items: ['💎', '💎', '💎', '💎', '💎', '💎', '💎'],
        itemName: 'Diamond',
        prompt: "How many diamonds do you see?",
        options: [6, 7, 8],
        correctAnswer: 7,
        hint: "Count carefully: 1, 2, 3, 4, 5, 6, 7! There are 7 diamonds!",
        successMessage: "Sparkling success! There are 7 shiny diamonds! 💎"
      },
      {
        stepNum: 4,
        headline: "Sweet juicy strawberries!",
        icon: "🍓",
        instruction: "Fresh strawberries in the bowl. Tap each strawberry to count it!",
        demoType: 'counting-field',
        items: ['🍓', '🍓', '🍓', '🍓'],
        itemName: 'Strawberry',
        prompt: "How many strawberries are there?",
        options: [3, 4, 5],
        correctAnswer: 4,
        hint: "One, two, three, four strawberries!",
        successMessage: "Yummy! 4 sweet strawberries counted perfectly! 🍓"
      }
    ]
  },

  'math-shapes': {
    id: 'math-shapes',
    subject: 'subject-math',
    subjectName: 'Mathematics',
    title: 'Shape Explorer',
    icon: '🔺',
    steps: [
      {
        stepNum: 1,
        headline: "Meet the round Circle!",
        icon: "⭕",
        instruction: "A circle is round and smooth with no sharp corners. Tap the circle!",
        demoType: 'shape-showcase',
        shapeEmoji: '⭕',
        shapeName: 'Circle',
        shapeDesc: 'Round and curved with 0 corners',
        prompt: "Which shape has no corners and rolls smoothly?",
        options: ['Circle ⭕', 'Square 🟩', 'Triangle 🔺'],
        correctAnswer: 'Circle ⭕',
        hint: "Look for the shape that looks like a ball or clock!",
        successMessage: "Spot on! A circle has no corners and is perfectly round! ⭕"
      },
      {
        stepNum: 2,
        headline: "Discover the 3-sided Triangle!",
        icon: "🔺",
        instruction: "A triangle has 3 straight sides and 3 pointed corners.",
        demoType: 'shape-showcase',
        shapeEmoji: '🔺',
        shapeName: 'Triangle',
        shapeDesc: '3 straight sides and 3 pointy corners',
        prompt: "How many sides does a triangle have?",
        options: ['3 Sides', '4 Sides', '5 Sides'],
        correctAnswer: '3 Sides',
        hint: "Count the three corners: 1, 2, 3! Tri means three!",
        successMessage: "Wonderful! Every triangle has exactly 3 sides and 3 corners! 🔺"
      },
      {
        stepNum: 3,
        headline: "Explore the sturdy Square!",
        icon: "🟩",
        instruction: "A square has 4 straight sides that are all the exact same length.",
        demoType: 'shape-showcase',
        shapeEmoji: '🟩',
        shapeName: 'Square',
        shapeDesc: '4 equal sides and 4 square corners',
        prompt: "Which everyday object has the shape of a square?",
        options: ['Picture Frame 🖼️', 'Round Ball ⚽', 'Watermelon 🍉'],
        correctAnswer: 'Picture Frame 🖼️',
        hint: "Look for an object with four equal straight sides!",
        successMessage: "Excellent! A picture frame has four equal sides just like a square! 🟩"
      },
      {
        stepNum: 4,
        headline: "Real-world shape matching: Pizza!",
        icon: "🍕",
        instruction: "A delicious slice of pizza has 3 pointed corners and 3 sides.",
        demoType: 'shape-showcase',
        shapeEmoji: '🍕',
        shapeName: 'Pizza Slice',
        shapeDesc: 'Shaped like a pointed slice',
        prompt: "What shape does this pizza slice look like?",
        options: ['Triangle 🔺', 'Circle ⭕', 'Star ⭐'],
        correctAnswer: 'Triangle 🔺',
        hint: "It has 3 sides and 3 pointy corners, just like a triangle!",
        successMessage: "Delicious thinking! A pizza slice is shaped like a triangle! 🍕"
      }
    ]
  },

  'eng-words': {
    id: 'eng-words',
    subject: 'subject-english',
    subjectName: 'English',
    title: 'Phonics & Words',
    icon: '📝',
    steps: [
      {
        stepNum: 1,
        headline: "Sound out the word: CAT",
        icon: "🐱",
        instruction: "Tap each letter block to hear the phonetic sound: /k/ - /æ/ - /t/ -> CAT!",
        demoType: 'phonics-blocks',
        word: 'CAT',
        letters: [
          { char: 'C', sound: '/k/ as in Cup' },
          { char: 'A', sound: '/æ/ as in Apple' },
          { char: 'T', sound: '/t/ as in Top' }
        ],
        prompt: "When we blend C - A - T together, what animal is it?",
        options: ['Cat 🐱', 'Dog 🐶', 'Fish 🐟'],
        correctAnswer: 'Cat 🐱',
        hint: "Blend the sounds: /k/ ... /æ/ ... /t/ -> CAT! Meow!",
        successMessage: "Meow! That's right! C-A-T spells Cat! Great phonics reading! 🐱"
      },
      {
        stepNum: 2,
        headline: "Sound out the word: DOG",
        icon: "🐶",
        instruction: "Tap each letter block to hear the sounds: /d/ - /ɒ/ - /g/ -> DOG!",
        demoType: 'phonics-blocks',
        word: 'DOG',
        letters: [
          { char: 'D', sound: '/d/ as in Door' },
          { char: 'O', sound: '/ɒ/ as in Orange' },
          { char: 'G', sound: '/g/ as in Garden' }
        ],
        prompt: "What friendly pet says woof and is spelled D - O - G?",
        options: ['Dog 🐶', 'Rabbit 🐰', 'Bird 🐦'],
        correctAnswer: 'Dog 🐶',
        hint: "Blend the sounds: /d/ ... /ɒ/ ... /g/ -> DOG! Woof woof!",
        successMessage: "Woof woof! Exactly right! D-O-G spells Dog! 🐶"
      },
      {
        stepNum: 3,
        headline: "Sound out the word: SUN",
        icon: "☀️",
        instruction: "Tap each letter block to hear the sounds: /s/ - /ʌ/ - /n/ -> SUN!",
        demoType: 'phonics-blocks',
        word: 'SUN',
        letters: [
          { char: 'S', sound: '/s/ as in Star' },
          { char: 'U', sound: '/ʌ/ as in Up' },
          { char: 'N', sound: '/n/ as in Nest' }
        ],
        prompt: "What shines bright and warm in the sky during the day?",
        options: ['Sun ☀️', 'Cloud ☁️', 'Moon 🌙'],
        correctAnswer: 'Sun ☀️',
        hint: "Blend the sounds: /s/ ... /ʌ/ ... /n/ -> SUN!",
        successMessage: "Warm and bright! S-U-N spells Sun! You are a reading superstar! ☀️"
      },
      {
        stepNum: 4,
        headline: "Sound out the word: BOOK",
        icon: "📖",
        instruction: "Tap each letter block: B - O - O - K -> BOOK! We read exciting stories!",
        demoType: 'phonics-blocks',
        word: 'BOOK',
        letters: [
          { char: 'B', sound: '/b/ as in Ball' },
          { char: 'O', sound: '/ʊ/ as in Look' },
          { char: 'O', sound: '/ʊ/ as in Book' },
          { char: 'K', sound: '/k/ as in Kite' }
        ],
        prompt: "What do we open to read fun stories and see pictures?",
        options: ['Book 📖', 'Hat 🎩', 'Cup ☕'],
        correctAnswer: 'Book 📖',
        hint: "It has pages full of words and pictures that we read!",
        successMessage: "Fantastic! B-O-O-K spells Book! You read all the words! 📖"
      }
    ]
  },

  'eng-alphabet': {
    id: 'eng-alphabet',
    subject: 'subject-english',
    subjectName: 'English',
    title: 'Letter Exploration',
    icon: '🔤',
    steps: [
      {
        stepNum: 1,
        headline: "The letter 'A' makes the /æ/ sound!",
        icon: "🍎",
        instruction: "Look at capital 'A' and lowercase 'a'. Tap the letter to hear its sound!",
        demoType: 'letter-card',
        bigLetter: 'A a',
        letterSound: '/æ/ sound',
        prompt: "Which tasty red fruit starts with the letter 'A'?",
        options: ['Apple 🍎', 'Banana 🍌', 'Orange 🍊'],
        correctAnswer: 'Apple 🍎',
        hint: "'A' is for /æ/ ... /æ/ ... Apple!",
        successMessage: "Crunchy and sweet! A is for Apple! Great job! 🍎"
      },
      {
        stepNum: 2,
        headline: "The letter 'F' makes the /f/ sound!",
        icon: "🐟",
        instruction: "Look at capital 'F' and lowercase 'f'. Tap the letter to listen!",
        demoType: 'letter-card',
        bigLetter: 'F f',
        letterSound: '/f/ sound',
        prompt: "Which animal that swims in water starts with the letter 'F'?",
        options: ['Fish 🐟', 'Cat 🐱', 'Duck 🦆'],
        correctAnswer: 'Fish 🐟',
        hint: "'F' is for /f/ ... /f/ ... Fish!",
        successMessage: "Splendid! F is for Fish! Swimming right along! 🐟"
      },
      {
        stepNum: 3,
        headline: "The letter 'S' makes the /s/ sound!",
        icon: "⭐",
        instruction: "Look at curvy 'S' and 's'. It sounds like a gentle whisper: /s/!",
        demoType: 'letter-card',
        bigLetter: 'S s',
        letterSound: '/s/ sound',
        prompt: "What shines up in the night sky and starts with 'S'?",
        options: ['Star ⭐', 'Moon 🌙', 'Tree 🌳'],
        correctAnswer: 'Star ⭐',
        hint: "'S' is for /s/ ... /s/ ... Star!",
        successMessage: "Twinkle twinkle! S is for Star! 🌟"
      },
      {
        stepNum: 4,
        headline: "The letter 'T' makes the /t/ sound!",
        icon: "🌳",
        instruction: "Look at tall letter 'T' and 't'. It makes a clear tap sound: /t/!",
        demoType: 'letter-card',
        bigLetter: 'T t',
        letterSound: '/t/ sound',
        prompt: "What tall plant with green leaves and wood starts with 'T'?",
        options: ['Tree 🌳', 'Flower 🌸', 'Grass 🌾'],
        correctAnswer: 'Tree 🌳',
        hint: "'T' is for /t/ ... /t/ ... Tree!",
        successMessage: "Standing tall! T is for Tree! Alphabet mastery unlocked! 🌳"
      }
    ]
  },

  'evs-living': {
    id: 'evs-living',
    subject: 'subject-evs',
    subjectName: 'Environmental Studies',
    title: 'Living vs Non-Living',
    icon: '🌱',
    steps: [
      {
        stepNum: 1,
        headline: "Is a Puppy living or non-living?",
        icon: "🐶",
        instruction: "A puppy eats healthy food, drinks water, breathes fresh air, and grows bigger!",
        demoType: 'evs-card',
        itemEmoji: '🐶',
        itemTitle: 'Playful Puppy',
        itemTraits: ['Breathes air', 'Needs food & water', 'Grows bigger'],
        prompt: "Is a puppy a living thing or a non-living thing?",
        options: ['Living Thing 🌱', 'Non-Living Thing 🪨'],
        correctAnswer: 'Living Thing 🌱',
        hint: "Because puppies eat, breathe, and grow, they are alive!",
        successMessage: "Correct! A puppy is a living thing because it breathes and grows! 🐶"
      },
      {
        stepNum: 2,
        headline: "Is a Toy Car living or non-living?",
        icon: "🚗",
        instruction: "A toy car is made of plastic or metal. It does not eat food and does not grow.",
        demoType: 'evs-card',
        itemEmoji: '🚗',
        itemTitle: 'Toy Car',
        itemTraits: ['Made of plastic', 'Does not eat', 'Does not grow'],
        prompt: "Is a toy car a living thing or a non-living thing?",
        options: ['Living Thing 🌱', 'Non-Living Thing 🪨'],
        correctAnswer: 'Non-Living Thing 🪨',
        hint: "Toy cars do not need water, food, or sleep. They are non-living!",
        successMessage: "Exactly right! A toy car is a non-living object! 🚗"
      },
      {
        stepNum: 3,
        headline: "Is a Sunflower living or non-living?",
        icon: "🌻",
        instruction: "A sunflower drinks water through its roots and turns towards the warm sun to grow!",
        demoType: 'evs-card',
        itemEmoji: '🌻',
        itemTitle: 'Bright Sunflower',
        itemTraits: ['Drinks water', 'Needs sunlight', 'Grows tall from seed'],
        prompt: "Is a sunflower plant living or non-living?",
        options: ['Living Thing 🌱', 'Non-Living Thing 🪨'],
        correctAnswer: 'Living Thing 🌱',
        hint: "Plants are alive! They take in water and sunshine to grow tall!",
        successMessage: "Wonderful scientific thinking! Plants are living things! 🌻"
      },
      {
        stepNum: 4,
        headline: "Is a Garden Stone living or non-living?",
        icon: "🪨",
        instruction: "A stone sits quietly in the garden. It does not move by itself, breathe, or grow.",
        demoType: 'evs-card',
        itemEmoji: '🪨',
        itemTitle: 'Garden Stone',
        itemTraits: ['Made of rock', 'Does not breathe', 'Does not grow'],
        prompt: "Is a stone a living thing or a non-living thing?",
        options: ['Living Thing 🌱', 'Non-Living Thing 🪨'],
        correctAnswer: 'Non-Living Thing 🪨',
        hint: "A stone is natural rock, but it does not need food or grow!",
        successMessage: "Super! A stone is non-living! You are an environmental scientist! 🪨"
      }
    ]
  },

  'evs-plants': {
    id: 'evs-plants',
    subject: 'subject-evs',
    subjectName: 'Environmental Studies',
    title: 'Parts of a Plant',
    icon: '🌿',
    steps: [
      {
        stepNum: 1,
        headline: "The Underground Roots 🌱",
        icon: "🌱",
        instruction: "Roots grow deep in the cool soil. They hold the plant firmly and drink water.",
        demoType: 'plant-part',
        partEmoji: '🌱',
        partTitle: 'Roots',
        partRole: 'Anchor the plant & absorb moisture from soil',
        prompt: "Which part of the plant grows underground to drink water?",
        options: ['Roots 🌱', 'Leaves 🍃', 'Flower 🌸'],
        correctAnswer: 'Roots 🌱',
        hint: "Look underground beneath the soil where water is found!",
        successMessage: "Terrific! Roots hold the plant and drink up fresh water! 🌱"
      },
      {
        stepNum: 2,
        headline: "The Green Leaves 🍃",
        icon: "🍃",
        instruction: "Leaves are green and spread out wide to catch sunlight and make plant food.",
        demoType: 'plant-part',
        partEmoji: '🍃',
        partTitle: 'Green Leaves',
        partRole: 'Catch sunlight to make food (Photosynthesis)',
        prompt: "Which plant part catches sunlight to make food?",
        options: ['Leaves 🍃', 'Stem 🎋', 'Seed 🌰'],
        correctAnswer: 'Leaves 🍃',
        hint: "They are flat and green to catch lots of sunny light!",
        successMessage: "Spot on! Leaves catch sunshine to make healthy food for the plant! 🍃"
      },
      {
        stepNum: 3,
        headline: "The Sturdy Stem 🎋",
        icon: "🎋",
        instruction: "The stem stands tall like a straw, carrying water from the roots up to the leaves.",
        demoType: 'plant-part',
        partEmoji: '🎋',
        partTitle: 'Plant Stem',
        partRole: 'Supports the plant and carries water upwards',
        prompt: "Which part stands tall like a straw carrying water upward?",
        options: ['Stem 🎋', 'Flower 🌸', 'Soil 🟫'],
        correctAnswer: 'Stem 🎋',
        hint: "It acts like a green elevator or straw carrying water up!",
        successMessage: "Great job! The stem carries water and helps the plant stand tall! 🎋"
      },
      {
        stepNum: 4,
        headline: "The Colorful Flower 🌸",
        icon: "🌸",
        instruction: "Flowers have bright colorful petals that smell sweet and attract honeybees and butterflies.",
        demoType: 'plant-part',
        partEmoji: '🌸',
        partTitle: 'Colorful Flower',
        partRole: 'Attracts pollinator bees & makes new seeds',
        prompt: "Which colorful part smells sweet and helps make new seeds?",
        options: ['Flower 🌸', 'Root 🌱', 'Bark 🪵'],
        correctAnswer: 'Flower 🌸',
        hint: "It has pretty petals and smells lovely in the garden!",
        successMessage: "Marvelous! The flower blooms beautifully and makes seeds! 🌸"
      }
    ]
  }
};

// ============================================================================
// MAIN APPLICATION CONTROLLER
// ============================================================================
class AutismApp {
  constructor() {
    this.currentView = 'dashboard';
    this.historyStack = ['dashboard'];
    this.soundEnabled = true;
    this.reducedMotion = true;
    this.speechSynth = window.speechSynthesis;

    // Active Lesson State
    this.currentLessonId = 'math-addition';
    this.currentStepIndex = 0;
    this.tappedManipulatives = new Set();
    this.completedLessons = this.loadCompletedLessons();

    // Calculator State
    this.calcValue = '0';

    // Matching Activity State
    this.selectedMatchPic = null;
    this.selectedMatchWord = null;
    this.matchedPairsCount = 0;

    // Sorting Activity State
    this.selectedSortElement = null;
    this.sortedCount = 0;

    this.initDOM();
  }

  loadCompletedLessons() {
    try {
      const stored = localStorage.getItem('learn_grow_progress');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      // localStorage disabled or private browsing
    }
    return ['math-addition'];
  }

  saveCompletedLesson(lessonId) {
    if (!this.completedLessons.includes(lessonId)) {
      this.completedLessons.push(lessonId);
      try {
        localStorage.setItem('learn_grow_progress', JSON.stringify(this.completedLessons));
      } catch (e) {}
    }
    this.updateProgressUI();
  }

  initDOM() {
    // Navigation Buttons
    this.backBtn = document.getElementById('navBackBtn');
    this.homeBtn = document.getElementById('navHomeBtn');
    this.ttsBtn = document.getElementById('ttsSpeakBtn');
    this.settingsBtn = document.getElementById('openSettingsBtn');
    this.teacherBtn = document.getElementById('openTeacherBtn');
    this.headerTitle = document.getElementById('appHeaderTitle');
    this.breadcrumbTag = document.getElementById('breadcrumbTag');

    // Modals
    this.settingsModal = document.getElementById('settingsModal');

    // Navigation Event Listeners
    if (this.backBtn) this.backBtn.addEventListener('click', () => this.goBack());
    if (this.homeBtn) this.homeBtn.addEventListener('click', () => this.navigateTo('dashboard'));
    if (this.ttsBtn) this.ttsBtn.addEventListener('click', () => this.speakCurrentInstruction());
    if (this.settingsBtn) this.settingsBtn.addEventListener('click', () => this.openSettings());
    if (this.teacherBtn) this.teacherBtn.addEventListener('click', () => this.navigateTo('teacher-portal'));

    this.updateProgressUI();
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
        const lesson = LESSONS_DATA[this.currentLessonId] || LESSONS_DATA['math-addition'];
        title = lesson.title;
        breadcrumb = `${lesson.subjectName} / ${lesson.title} / Step ${this.currentStepIndex + 1}`;
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
      if (this.headerTitle) this.headerTitle.textContent = title;
      if (this.breadcrumbTag) this.breadcrumbTag.textContent = breadcrumb;

      if (pushHistory) {
        this.historyStack.push(viewId);
      }

      // Show/hide Back button
      if (this.backBtn) {
        if (this.historyStack.length > 1 && viewId !== 'dashboard') {
          this.backBtn.style.display = 'inline-flex';
        } else {
          this.backBtn.style.display = 'none';
        }
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
  // DYNAMIC MULTI-SUBJECT LESSON CONTROLLER
  // ==========================================
  startLesson(lessonId) {
    if (!LESSONS_DATA[lessonId]) {
      console.warn(`Lesson "${lessonId}" not recognized. Defaulting to math-addition.`);
      lessonId = 'math-addition';
    }

    this.currentLessonId = lessonId;
    this.currentStepIndex = 0;
    this.tappedManipulatives.clear();

    const lessonCard = document.getElementById('lessonCard');
    const completeCard = document.getElementById('lessonCompleteCard');
    if (lessonCard) lessonCard.style.display = 'block';
    if (completeCard) completeCard.style.display = 'none';

    this.navigateTo('lesson-view');
    this.renderCurrentLessonStep();
  }

  renderCurrentLessonStep() {
    const lesson = LESSONS_DATA[this.currentLessonId];
    if (!lesson) return;

    const currentStep = lesson.steps[this.currentStepIndex];
    if (!currentStep) return;

    // Reset tap set
    this.tappedManipulatives.clear();

    // 1. Step Indicator & Header
    const stepInd = document.getElementById('lessonStepIndicator');
    const titleEl = document.getElementById('lessonTitle');
    const instIcon = document.getElementById('lessonInstIcon');
    const instText = document.getElementById('lessonInstruction');
    const choicePrompt = document.getElementById('lessonChoicePrompt');
    const demoArea = document.getElementById('demoArea');
    const optionsRow = document.getElementById('lessonOptionsRow');
    const feedbackBox = document.getElementById('feedbackBox');

    if (stepInd) stepInd.textContent = `Step ${currentStep.stepNum} of ${lesson.steps.length}`;
    if (titleEl) titleEl.textContent = currentStep.headline;
    if (instIcon) instIcon.textContent = currentStep.icon;
    if (instText) instText.textContent = currentStep.instruction;
    if (choicePrompt) choicePrompt.textContent = currentStep.prompt;

    // Hide feedback box initially
    if (feedbackBox) {
      feedbackBox.style.display = 'none';
      feedbackBox.className = 'feedback-box';
    }

    // Update breadcrumb
    if (this.breadcrumbTag) {
      this.breadcrumbTag.textContent = `${lesson.subjectName} / ${lesson.title} / Step ${currentStep.stepNum}`;
    }

    // 2. Render Demo Area Based on Demo Type
    if (demoArea) {
      demoArea.innerHTML = '';
      if (currentStep.demoType === 'addition-groups') {
        demoArea.appendChild(this.buildAdditionGroupsDemo(currentStep));
      } else if (currentStep.demoType === 'counting-field') {
        demoArea.appendChild(this.buildCountingFieldDemo(currentStep));
      } else if (currentStep.demoType === 'shape-showcase') {
        demoArea.appendChild(this.buildShapeShowcaseDemo(currentStep));
      } else if (currentStep.demoType === 'phonics-blocks') {
        demoArea.appendChild(this.buildPhonicsBlocksDemo(currentStep));
      } else if (currentStep.demoType === 'letter-card') {
        demoArea.appendChild(this.buildLetterCardDemo(currentStep));
      } else if (currentStep.demoType === 'evs-card') {
        demoArea.appendChild(this.buildEvsCardDemo(currentStep));
      } else if (currentStep.demoType === 'plant-part') {
        demoArea.appendChild(this.buildPlantPartDemo(currentStep));
      }
    }

    // 3. Render Multiple-Choice Options
    if (optionsRow) {
      optionsRow.innerHTML = '';
      currentStep.options.forEach(opt => {
        const btn = document.createElement('button');
        const isTextChoice = typeof opt === 'string' && opt.length > 2;
        btn.className = `choice-btn ${isTextChoice ? 'text-choice' : ''}`;
        btn.textContent = String(opt);
        btn.onclick = () => this.checkAnswer(opt);
        optionsRow.appendChild(btn);
      });
    }

    // Play initial calm chime and speak instruction
    this.playGentleChime(440);
  }

  // --- DEMO AREA BUILDERS (CONCRETE MANIPULATIVES) ---
  buildAdditionGroupsDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'addition-visual-container';
    wrap.style.cssText = 'display:flex; justify-content:center; align-items:center; gap:1.2rem; flex-wrap:wrap; margin:1.2rem 0;';

    // Group 1
    const g1Box = document.createElement('div');
    g1Box.className = 'concrete-group-card';
    g1Box.style.cssText = 'background:var(--bg-card); border:2px solid var(--border-subtle); border-radius:18px; padding:1.2rem; text-align:center; min-width:130px;';
    const g1Items = document.createElement('div');
    g1Items.style.cssText = 'display:flex; gap:0.5rem; justify-content:center; font-size:2.4rem; flex-wrap:wrap;';
    for (let i = 0; i < step.group1.count; i++) {
      const itemSpan = document.createElement('span');
      itemSpan.className = 'apple-item counting-item';
      itemSpan.textContent = step.group1.item;
      itemSpan.title = `Tap to count ${i + 1}`;
      itemSpan.onclick = () => this.tapManipulative(itemSpan, i + 1, step.group1.item);
      g1Items.appendChild(itemSpan);
    }
    const g1Lbl = document.createElement('p');
    g1Lbl.style.cssText = 'font-weight:700; color:var(--text-muted); margin-top:0.5rem; font-size:0.95rem;';
    g1Lbl.textContent = step.group1.label;
    g1Box.appendChild(g1Items);
    g1Box.appendChild(g1Lbl);

    // Plus Sign
    const plusSpan = document.createElement('div');
    plusSpan.style.cssText = 'font-size:2.5rem; font-weight:900; color:var(--primary); user-select:none;';
    plusSpan.textContent = '➕';

    // Group 2
    const g2Box = document.createElement('div');
    g2Box.className = 'concrete-group-card';
    g2Box.style.cssText = 'background:var(--bg-card); border:2px solid var(--border-subtle); border-radius:18px; padding:1.2rem; text-align:center; min-width:130px;';
    const g2Items = document.createElement('div');
    g2Items.style.cssText = 'display:flex; gap:0.5rem; justify-content:center; font-size:2.4rem; flex-wrap:wrap;';
    for (let i = 0; i < step.group2.count; i++) {
      const itemSpan = document.createElement('span');
      itemSpan.className = 'apple-item counting-item';
      itemSpan.textContent = step.group2.item;
      const runningCount = step.group1.count + i + 1;
      itemSpan.title = `Tap to count ${runningCount}`;
      itemSpan.onclick = () => this.tapManipulative(itemSpan, runningCount, step.group2.item);
      g2Items.appendChild(itemSpan);
    }
    const g2Lbl = document.createElement('p');
    g2Lbl.style.cssText = 'font-weight:700; color:var(--text-muted); margin-top:0.5rem; font-size:0.95rem;';
    g2Lbl.textContent = step.group2.label;
    g2Box.appendChild(g2Items);
    g2Box.appendChild(g2Lbl);

    // Equals Sign
    const eqSpan = document.createElement('div');
    eqSpan.style.cssText = 'font-size:2.5rem; font-weight:900; color:var(--primary); user-select:none;';
    eqSpan.textContent = '🟰';

    // Result Mystery Box
    const resBox = document.createElement('div');
    resBox.id = 'lessonResultBox';
    resBox.style.cssText = 'background:var(--bg-card); border:2px dashed var(--primary); border-radius:18px; padding:1.2rem; min-width:110px; min-height:85px; display:flex; align-items:center; justify-content:center; font-size:2rem; font-weight:800; color:var(--primary);';
    resBox.textContent = '❓';

    wrap.appendChild(g1Box);
    wrap.appendChild(plusSpan);
    wrap.appendChild(g2Box);
    wrap.appendChild(eqSpan);
    wrap.appendChild(resBox);
    return wrap;
  }

  buildCountingFieldDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'counting-field';

    step.items.forEach((icon, idx) => {
      const itemSpan = document.createElement('span');
      itemSpan.className = 'counting-item';
      itemSpan.textContent = icon;
      itemSpan.title = `Tap to count ${idx + 1}`;
      itemSpan.onclick = () => this.tapManipulative(itemSpan, idx + 1, step.itemName);
      wrap.appendChild(itemSpan);
    });

    return wrap;
  }

  buildShapeShowcaseDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'shape-display-card';

    const emojiEl = document.createElement('span');
    emojiEl.className = 'shape-emoji-large';
    emojiEl.textContent = step.shapeEmoji;
    emojiEl.style.cursor = 'pointer';
    emojiEl.onclick = () => {
      this.playGentleChime(523.25);
      this.speakText(step.shapeName);
    };

    const nameEl = document.createElement('h3');
    nameEl.style.cssText = 'font-size:1.5rem; font-weight:800; color:var(--text-main); margin:0;';
    nameEl.textContent = step.shapeName;

    const descEl = document.createElement('p');
    descEl.style.cssText = 'font-size:1.05rem; color:var(--text-muted); margin:0;';
    descEl.textContent = step.shapeDesc;

    wrap.appendChild(emojiEl);
    wrap.appendChild(nameEl);
    wrap.appendChild(descEl);
    return wrap;
  }

  buildPhonicsBlocksDemo(step) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'text-align:center; margin:1rem 0;';

    const lettersRow = document.createElement('div');
    lettersRow.className = 'phonics-letters-row';

    step.letters.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'phonics-letter-card';
      card.title = `Tap to hear ${item.char}`;
      card.onclick = () => this.tapPhoneme(card, item.char, item.sound, idx);

      const glyph = document.createElement('span');
      glyph.className = 'letter-glyph';
      glyph.textContent = item.char;

      const tag = document.createElement('span');
      tag.className = 'letter-sound-tag';
      tag.textContent = item.sound.split(' ')[0]; // short phoneme

      card.appendChild(glyph);
      card.appendChild(tag);
      lettersRow.appendChild(card);
    });

    const tip = document.createElement('p');
    tip.style.cssText = 'font-size:0.95rem; color:var(--text-muted); margin-top:0.5rem;';
    tip.textContent = '👆 Tap each letter box above to hear its sound!';

    wrap.appendChild(lettersRow);
    wrap.appendChild(tip);
    return wrap;
  }

  buildLetterCardDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'shape-display-card';

    const bigText = document.createElement('span');
    bigText.style.cssText = 'font-size:4.2rem; font-weight:900; color:var(--primary); line-height:1; cursor:pointer;';
    bigText.textContent = step.bigLetter;
    bigText.onclick = () => {
      this.playGentleChime(587.33);
      this.speakText(`The letter ${step.bigLetter}. ${step.letterSound}`);
    };

    const soundEl = document.createElement('p');
    soundEl.style.cssText = 'font-size:1.15rem; font-weight:700; color:var(--text-muted); margin-top:0.4rem;';
    soundEl.textContent = `Phonics Sound: ${step.letterSound}`;

    wrap.appendChild(bigText);
    wrap.appendChild(soundEl);
    return wrap;
  }

  buildEvsCardDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'shape-display-card';

    const emojiEl = document.createElement('span');
    emojiEl.style.cssText = 'font-size:4.2rem; line-height:1; cursor:pointer;';
    emojiEl.textContent = step.itemEmoji;
    emojiEl.onclick = () => {
      this.playGentleChime(523.25);
      this.speakText(step.itemTitle);
    };

    const titleEl = document.createElement('h3');
    titleEl.style.cssText = 'font-size:1.5rem; font-weight:800; color:var(--text-main); margin:0.4rem 0 0.6rem;';
    titleEl.textContent = step.itemTitle;

    const list = document.createElement('div');
    list.style.cssText = 'display:flex; gap:0.6rem; flex-wrap:wrap; justify-content:center;';
    step.itemTraits.forEach(trait => {
      const badge = document.createElement('span');
      badge.style.cssText = 'background:var(--bg-page); border:1px solid var(--border-subtle); padding:4px 10px; border-radius:12px; font-size:0.9rem; font-weight:600; color:var(--text-main);';
      badge.textContent = `✓ ${trait}`;
      list.appendChild(badge);
    });

    wrap.appendChild(emojiEl);
    wrap.appendChild(titleEl);
    wrap.appendChild(list);
    return wrap;
  }

  buildPlantPartDemo(step) {
    const wrap = document.createElement('div');
    wrap.className = 'shape-display-card';

    const emojiEl = document.createElement('span');
    emojiEl.style.cssText = 'font-size:4.2rem; line-height:1; cursor:pointer;';
    emojiEl.textContent = step.partEmoji;
    emojiEl.onclick = () => {
      this.playGentleChime(587.33);
      this.speakText(step.partTitle);
    };

    const titleEl = document.createElement('h3');
    titleEl.style.cssText = 'font-size:1.5rem; font-weight:800; color:var(--text-main); margin:0.4rem 0;';
    titleEl.textContent = step.partTitle;

    const roleEl = document.createElement('p');
    roleEl.style.cssText = 'font-size:1.05rem; color:var(--text-muted); margin:0; text-align:center; max-width:380px;';
    roleEl.textContent = step.partRole;

    wrap.appendChild(emojiEl);
    wrap.appendChild(titleEl);
    wrap.appendChild(roleEl);
    return wrap;
  }

  // --- INTERACTION HANDLERS ---
  tapManipulative(el, countNum, itemName = 'item') {
    el.classList.toggle('tapped');
    const isNowTapped = el.classList.contains('tapped');
    if (isNowTapped) {
      this.tappedManipulatives.add(countNum);
      this.playGentleChime(420 + countNum * 40);
      this.speakText(`${countNum}`);
    } else {
      this.tappedManipulatives.delete(countNum);
    }
  }

  tapPhoneme(cardEl, letter, soundDescription, idx) {
    document.querySelectorAll('.phonics-letter-card').forEach(c => c.classList.remove('tapped'));
    cardEl.classList.add('tapped');
    this.playGentleChime(480 + idx * 50);
    this.speakText(soundDescription);
  }

  checkAnswer(selectedValue) {
    const lesson = LESSONS_DATA[this.currentLessonId];
    if (!lesson) return;
    const currentStep = lesson.steps[this.currentStepIndex];
    if (!currentStep) return;

    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackMsg = document.getElementById('feedbackMessage');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const actionBtn = document.getElementById('feedbackActionBtn');
    const resBox = document.getElementById('lessonResultBox');

    if (!feedbackBox) return;
    feedbackBox.style.display = 'flex';

    const isMatch = String(selectedValue).trim().toLowerCase() === String(currentStep.correctAnswer).trim().toLowerCase();

    if (isMatch) {
      // Correct!
      feedbackBox.className = 'feedback-box';
      if (feedbackIcon) feedbackIcon.textContent = '🌟';
      if (feedbackTitle) feedbackTitle.textContent = "That's correct! Super work!";
      if (feedbackMsg) feedbackMsg.textContent = currentStep.successMessage;

      if (resBox) {
        resBox.innerHTML = `<span style="color:#2F9E58; font-weight:800;">${selectedValue} ✓</span>`;
      }

      if (actionBtn) {
        const isLastStep = this.currentStepIndex === lesson.steps.length - 1;
        actionBtn.textContent = isLastStep ? "Finish Lesson ⭐" : "Next Step ➡";
        actionBtn.style.display = 'inline-flex';
      }

      this.playGentleChime(587.33); // High D5
      this.speakText(`Correct! ${currentStep.successMessage}`);
    } else {
      // Gentle Try-Again (Non-Punitive)
      feedbackBox.className = 'feedback-box try-again';
      if (feedbackIcon) feedbackIcon.textContent = '💡';
      if (feedbackTitle) feedbackTitle.textContent = "Let's try together!";
      if (feedbackMsg) feedbackMsg.textContent = `You picked "${selectedValue}". ${currentStep.hint}`;

      if (actionBtn) {
        actionBtn.style.display = 'none'; // Require correct or retry
      }

      this.playGentleChime(392.00); // G4 gentle tone
      this.speakText(`Let's think together. ${currentStep.hint}`);
    }
  }

  hintLesson() {
    const lesson = LESSONS_DATA[this.currentLessonId];
    if (!lesson) return;
    const currentStep = lesson.steps[this.currentStepIndex];
    if (!currentStep) return;

    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackMsg = document.getElementById('feedbackMessage');
    const feedbackIcon = document.getElementById('feedbackIcon');

    if (!feedbackBox) return;
    feedbackBox.style.display = 'flex';
    feedbackBox.className = 'feedback-box try-again';
    if (feedbackIcon) feedbackIcon.textContent = '💡';
    if (feedbackTitle) feedbackTitle.textContent = 'Helpful Hint:';
    if (feedbackMsg) feedbackMsg.textContent = currentStep.hint;

    this.playGentleChime(440);
    this.speakText(`Helpful hint: ${currentStep.hint}`);
  }

  nextLessonStep() {
    const lesson = LESSONS_DATA[this.currentLessonId];
    if (!lesson) return;

    if (this.currentStepIndex < lesson.steps.length - 1) {
      this.currentStepIndex++;
      this.renderCurrentLessonStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all steps of this lesson!
      this.triggerLessonCompletion();
    }
  }

  triggerLessonCompletion() {
    const lesson = LESSONS_DATA[this.currentLessonId];
    if (!lesson) return;

    this.saveCompletedLesson(this.currentLessonId);

    const lessonCard = document.getElementById('lessonCard');
    const completeCard = document.getElementById('lessonCompleteCard');
    const title = document.getElementById('celebrationTitle');
    const sub = document.getElementById('celebrationSubtitle');
    const nextBtn = document.getElementById('btnNextLesson');

    if (lessonCard) lessonCard.style.display = 'none';
    if (completeCard) completeCard.style.display = 'block';

    if (title) title.textContent = `Super Job! You Finished ${lesson.title}!`;
    if (sub) sub.textContent = `You completed all ${lesson.steps.length} interactive steps with flying colors. A golden star has been added to your journey!`;

    // Determine next topic
    const topicKeys = Object.keys(LESSONS_DATA);
    const currIdx = topicKeys.indexOf(this.currentLessonId);
    const nextKey = topicKeys[(currIdx + 1) % topicKeys.length];
    if (nextBtn) {
      nextBtn.textContent = `Next Topic: ${LESSONS_DATA[nextKey].title} ➡`;
      nextBtn.onclick = () => this.startLesson(nextKey);
    }

    // Play celebration chord
    this.playCelebrationMelody();
    this.speakText(`Congratulations! You completed all steps of ${lesson.title}! You earned a shining golden star!`);
  }

  finishLessonAction(action) {
    if (action === 'subjects') {
      const lesson = LESSONS_DATA[this.currentLessonId];
      const targetSub = lesson ? lesson.subject : 'subject-math';
      this.navigateTo(targetSub);
    } else if (action === 'next') {
      const topicKeys = Object.keys(LESSONS_DATA);
      const currIdx = topicKeys.indexOf(this.currentLessonId);
      const nextKey = topicKeys[(currIdx + 1) % topicKeys.length];
      this.startLesson(nextKey);
    }
  }

  playCelebrationMelody() {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playGentleChime(freq), idx * 160);
    });
  }

  updateProgressUI() {
    // Update continue button and badges if present
    const continueBtn = document.querySelector('.continue-action-card button');
    if (continueBtn && this.completedLessons.length > 0) {
      const lastDone = this.completedLessons[this.completedLessons.length - 1];
      const lessonInfo = LESSONS_DATA[lastDone] || LESSONS_DATA['math-addition'];
      continueBtn.textContent = `Continue ${lessonInfo.title} ➡`;
      continueBtn.onclick = () => this.startLesson(lastDone);
    }
  }

  // ==========================================
  // INTERACTIVE MATCHING ACTIVITY
  // ==========================================
  startActivity(actId) {
    if (actId === 'matching') this.navigateTo('act-matching');
    else if (actId === 'sorting') this.navigateTo('act-sorting');
    else if (actId === 'counting') this.startLesson('math-counting');
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
          const feedback = document.getElementById('matchingFeedback');
          if (feedback) feedback.style.display = 'flex';
          this.playCelebrationMelody();
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
    const feedback = document.getElementById('matchingFeedback');
    if (feedback) feedback.style.display = 'none';
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
        const feedback = document.getElementById('sortingFeedback');
        if (feedback) feedback.style.display = 'flex';
        this.playCelebrationMelody();
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
    const fruitBasket = document.getElementById('contentsFruit');
    const veggieBasket = document.getElementById('contentsVeggie');
    if (fruitBasket) fruitBasket.innerHTML = '<span class="empty-hint">Drop fruits here</span>';
    if (veggieBasket) veggieBasket.innerHTML = '<span class="empty-hint">Drop vegetables here</span>';
    const feedback = document.getElementById('sortingFeedback');
    if (feedback) feedback.style.display = 'none';
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
    if (display) display.textContent = this.calcValue;

    if (dotsContainer) {
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
  }

  // ==========================================
  // PERSONALIZATION & SETTINGS
  // ==========================================
  openSettings() {
    if (this.settingsModal) this.settingsModal.style.display = 'flex';
  }

  closeSettings() {
    if (this.settingsModal) this.settingsModal.style.display = 'none';
  }

  setTextSize(size) {
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${size}`);
    document.querySelectorAll('.setting-row:first-child .btn-toggle').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
  }

  setTheme(themeName) {
    document.body.classList.remove('theme-lavender', 'theme-sage', 'theme-blue', 'theme-contrast');
    document.body.classList.add(themeName);
    document.querySelectorAll('.btn-theme-swatch').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.textContent = `Sound: ${this.soundEnabled ? 'ON' : 'OFF'}`;
      btn.classList.toggle('active', this.soundEnabled);
    }
  }

  toggleMotion() {
    this.reducedMotion = !this.reducedMotion;
    const btn = document.getElementById('motionToggleBtn');
    if (btn) {
      btn.textContent = `Motion: ${this.reducedMotion ? 'Reduced' : 'Normal'}`;
      btn.classList.toggle('active', this.reducedMotion);
    }
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
