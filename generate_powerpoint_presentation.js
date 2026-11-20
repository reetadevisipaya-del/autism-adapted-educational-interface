const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createPresentation() {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Smayra (UID: 23BHP70113)';
  pptx.company = 'Chandigarh University - Department of B.A. (Hons.) Psychology';
  pptx.title = 'Development of an Autism-Adapted Web-Based Educational Interface';
  pptx.subject = 'A User-Centered Investigation of Educational Needs and Design Requirements';

  // Define Design System Colors
  const C_BG_LIGHT = 'FAF8F5';      // Warm ivory canvas
  const C_PRIMARY = '334155';       // Deep slate text
  const C_ACCENT_PURPLE = '6366F1'; // Soft indigo / lavender accent
  const C_ACCENT_SAGE = '4D7C0F';   // Sage green accent
  const C_ACCENT_BLUE = '0284C7';   // Soft sky blue accent
  const C_ACCENT_AMBER = 'D97706';  // Warm amber
  const C_CARD_BG = 'FFFFFF';       // Pure white card
  const C_CARD_BORDER = 'E2E8F0';   // Light slate border
  const C_MUTED = '64748B';         // Secondary muted text
  const C_NAVY = '0F172A';          // Deep navy for contrast

  // Helper function to add slide background and header
  function addHeader(slide, titleText, categoryText) {
    slide.background = { color: C_BG_LIGHT };
    
    // Category pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 0.4, w: 2.8, h: 0.35,
      rectRadius: 0.1,
      fill: { color: 'EEF2F6' },
      line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText(categoryText.toUpperCase(), {
      x: 0.8, y: 0.4, w: 2.8, h: 0.35,
      fontSize: 10, bold: true, color: '475569',
      align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    // Main slide title
    slide.addText(titleText, {
      x: 0.8, y: 0.8, w: 11.5, h: 0.6,
      fontSize: 22, bold: true, color: C_NAVY,
      valign: 'middle', fontFace: 'Calibri'
    });

    // Divider line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8, y: 1.45, w: 11.7, h: 0,
      line: { color: 'CBD5E1', width: 1.5 }
    });

    // Persistent Footer
    slide.addText('Chandigarh University | B.A. (Hons.) Psychology | Smayra (23BHP70113) | Supervisor: Dr. Kulbeer Kaur', {
      x: 0.8, y: 7.1, w: 9.5, h: 0.3,
      fontSize: 9, color: '94A3B8', fontFace: 'Calibri'
    });
    slide.addText('https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/', {
      x: 8.5, y: 7.1, w: 4.0, h: 0.3,
      fontSize: 9, color: C_ACCENT_BLUE, align: 'right', fontFace: 'Calibri'
    });
  }

  // -------------------------------------------------------------
  // SLIDE 1: Title Slide
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: '0F172A' }; // Sophisticated dark navy hero

    // Decorative geometric accents
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 0.8, w: 4.2, h: 0.4,
      rectRadius: 0.1, fill: { color: '1E293B' }, line: { color: '334155', width: 1 }
    });
    slide.addText('CHANDIGARH UNIVERSITY | DISSERTATION DEFENSE', {
      x: 0.8, y: 0.8, w: 4.2, h: 0.4,
      fontSize: 10, bold: true, color: '94A3B8', align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    // Main Title
    slide.addText('Development of an Autism-Adapted\nWeb-Based Educational Interface', {
      x: 0.8, y: 1.5, w: 11.5, h: 1.5,
      fontSize: 32, bold: true, color: 'FFFFFF', fontFace: 'Calibri'
    });

    // Subtitle
    slide.addText('A User-Centered Investigation of Educational Needs and Design Requirements', {
      x: 0.8, y: 3.1, w: 11.5, h: 0.6,
      fontSize: 16, color: '38BDF8', fontFace: 'Calibri'
    });

    // Metadata Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.0, w: 11.7, h: 2.2,
      rectRadius: 0.15, fill: { color: '1E293B' }, line: { color: '334155', width: 1.5 }
    });

    slide.addText([
      { text: 'Candidate:\n', options: { fontSize: 11, bold: true, color: '94A3B8' } },
      { text: 'Smayra\n', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
      { text: 'UID: 23BHP70113\nDept. of B.A. (Hons.) Psychology', options: { fontSize: 11, color: 'CBD5E1' } }
    ], { x: 1.2, y: 4.2, w: 3.5, h: 1.8, fontFace: 'Calibri' });

    slide.addText([
      { text: 'Supervisor:\n', options: { fontSize: 11, bold: true, color: '94A3B8' } },
      { text: 'Dr. Kulbeer Kaur\n', options: { fontSize: 16, bold: true, color: 'FFFFFF' } },
      { text: 'Associate Professor - Psychology\nChandigarh University', options: { fontSize: 11, color: 'CBD5E1' } }
    ], { x: 5.0, y: 4.2, w: 3.5, h: 1.8, fontFace: 'Calibri' });

    slide.addText([
      { text: 'Project Deliverables:\n', options: { fontSize: 11, bold: true, color: '94A3B8' } },
      { text: 'Live Web Application\n', options: { fontSize: 14, bold: true, color: '34D399' } },
      { text: 'Empirical Needs Assessment (N=50)\nSPSS Statistical Matrix & Report', options: { fontSize: 11, color: 'CBD5E1' } }
    ], { x: 8.8, y: 4.2, w: 3.4, h: 1.8, fontFace: 'Calibri' });

    // Live URL pill
    slide.addText('Live Interface: https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/', {
      x: 0.8, y: 6.6, w: 11.7, h: 0.4,
      fontSize: 12, bold: true, color: '38BDF8', align: 'center', fontFace: 'Calibri'
    });

    slide.addNotes('Welcome respected members of the evaluation committee and supervisor Dr. Kulbeer Kaur. Today I am presenting my research project on the Development of an Autism-Adapted Web-Based Educational Interface. This work bridges psychological theory, empirical stakeholder needs elicitation, and software development to create an evidence-grounded educational learning environment.');
  }

  // -------------------------------------------------------------
  // SLIDE 2: Executive Summary & Context
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Project Context & Executive Summary', 'Overview');

    // 3 Cards layout
    const cards = [
      {
        title: 'The Real-World Problem',
        text: 'Mainstream educational websites are designed for neurotypical learners. For autistic children, dense navigation, moving advertising banners, stark glare, and loud celebratory fanfares create severe sensory overload and task abandonment.',
        color: 'DC2626', bg: 'FEF2F2'
      },
      {
        title: 'The Scientific Gap',
        text: 'Most special education software evaluates usability retrospectively after coding is finished. Few studies document the transparent chain of reasoning linking empirical stakeholder needs to specific front-end interface features.',
        color: 'D97706', bg: 'FFFBEB'
      },
      {
        title: 'The Proposed Solution',
        text: 'A user-centered investigation with N=50 stakeholders (30 teachers, 10 therapists, 10 autistic learners) triangulating the 118-item DP-TIC-AUT-Q, an 18-item rating scale, and interviews into "Learn & Grow"—a working educational website.',
        color: '059669', bg: 'ECFDF5'
      }
    ];

    cards.forEach((c, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 1.7, w: 3.7, h: 4.0,
        rectRadius: 0.15, fill: { color: c.bg }, line: { color: c.color, width: 1.5 }
      });
      slide.addText(c.title, {
        x: x + 0.3, y: 2.0, w: 3.1, h: 0.6,
        fontSize: 15, bold: true, color: c.color, fontFace: 'Calibri'
      });
      slide.addText(c.text, {
        x: x + 0.3, y: 2.7, w: 3.1, h: 2.7,
        fontSize: 12, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 18
      });
    });

    // Bottom summary banner
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 5.9, w: 11.7, h: 0.9,
      rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('Core Contribution: A verifiable, tripartite contribution combining Cognitive Load Theory, Universal Design for Learning, and TEACCH into a working, browser-based responsive interface.', {
      x: 1.0, y: 6.0, w: 11.3, h: 0.7,
      fontSize: 12, bold: true, color: C_NAVY, align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    slide.addNotes('This slide establishes the central motivation of our study. Digital learning is ubiquitous, but commercial educational tools are replete with auditory shocks, sudden pop-ups, and shifting menus that overwhelm autistic cognitive and sensory profiles.');
  }

  // -------------------------------------------------------------
  // SLIDE 3: Research Aim & Specific Objectives
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Research Aim & Operational Objectives', 'Methodological Framework');

    // Aim Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.7, w: 11.7, h: 1.3,
      rectRadius: 0.12, fill: { color: 'EEF2FF' }, line: { color: C_ACCENT_PURPLE, width: 2 }
    });
    slide.addText('PRINCIPAL RESEARCH AIM', {
      x: 1.1, y: 1.85, w: 11.0, h: 0.3,
      fontSize: 11, bold: true, color: C_ACCENT_PURPLE, fontFace: 'Calibri'
    });
    slide.addText('To establish the educational needs and interface design requirements of autistic learners through a user-centered, stakeholder-informed needs assessment, and subsequently to develop an autism-adapted web-based educational interface that translates these requirements into practice.', {
      x: 1.1, y: 2.15, w: 11.1, h: 0.75,
      fontSize: 13, bold: true, color: C_NAVY, fontFace: 'Calibri', lineSpacing: 19
    });

    // 5 Objectives
    const objs = [
      { num: 'Obj 1', text: 'Identify educational needs & learning characteristics via special educators, therapists, and supported learners.' },
      { num: 'Obj 2', text: 'Examine stakeholder ratings of 18 UI/UX features and compare perceptions between teachers and therapists.' },
      { num: 'Obj 3', text: 'Derive prioritized interface design requirements by triangulating rating-scale data, DP-TIC-AUT-Q, and interview themes.' },
      { num: 'Obj 4', text: 'Develop an autism-adapted web-based educational interface ("Learn & Grow") operationalizing prioritized requirements.' },
      { num: 'Obj 5', text: 'Document the design rationale and traceability matrix linking each interface feature directly to its evidential basis.' }
    ];

    objs.forEach((o, idx) => {
      const y = 3.2 + idx * 0.7;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8, y, w: 1.2, h: 0.55,
        rectRadius: 0.1, fill: { color: C_NAVY }
      });
      slide.addText(o.num, {
        x: 0.8, y, w: 1.2, h: 0.55,
        fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
      });

      slide.addShape(pptx.ShapeType.roundRect, {
        x: 2.2, y, w: 10.3, h: 0.55,
        rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1 }
      });
      slide.addText(o.text, {
        x: 2.4, y, w: 9.9, h: 0.55,
        fontSize: 11.5, color: C_PRIMARY, valign: 'middle', fontFace: 'Calibri'
      });
    });

    slide.addNotes('Our study follows five rigorous operational objectives: first discovering stakeholder needs, second evaluating feature ratings, third prioritizing via convergent triangulation, fourth engineering the functional web interface, and fifth proving end-to-end traceability.');
  }

  // -------------------------------------------------------------
  // SLIDE 4: Research Questions (RQ1 - RQ5)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Guiding Research Questions', 'Research Formulation');

    const rqs = [
      {
        tag: 'RQ 1: Needs & Barriers',
        q: 'What educational needs, learning characteristics, and challenges in digital environments do special educators, therapists, and autistic learners identify?',
        target: 'Assessed via 40 semi-structured interviews and 10 guided student walkthroughs.'
      },
      {
        tag: 'RQ 2: UI/UX Importance',
        q: 'Which UI/UX features do stakeholders rate as most important in web-based educational interfaces, and how do ratings compare between teachers and therapists?',
        target: 'Evaluated using 18-item Priority Rating Scale (SPSS Descriptives & Compare Means).'
      },
      {
        tag: 'RQ 3: Requirements Prioritization',
        q: 'What prioritized design requirements emerge when rating-scale data, DP-TIC-AUT-Q responses, and qualitative interview themes are integrated?',
        target: 'Triangulated into 9 High Priority and 9 Medium Priority specifications.'
      },
      {
        tag: 'RQ 4: Interface Operationalization',
        q: 'How can the prioritized requirements be operationalized into a functional, autism-adapted web-based educational interface?',
        target: 'Engineered into the responsive 11-screen "Learn & Grow" single-page web platform.'
      },
      {
        tag: 'RQ 5: Evidential Traceability',
        q: 'How can each major interface feature be traced back to its empirical and theoretical evidential basis through a documented design rationale?',
        target: 'Documented in an explicit traceability matrix linking literature, ratings, and code.'
      }
    ];

    rqs.forEach((r, idx) => {
      const y = 1.7 + idx * 1.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8, y, w: 11.7, h: 0.85,
        rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
      });
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 1.0, y: y + 0.12, w: 2.8, h: 0.6,
        rectRadius: 0.08, fill: { color: idx < 3 ? 'EEF2FF' : 'ECFDF5' },
        line: { color: idx < 3 ? C_ACCENT_PURPLE : C_ACCENT_SAGE, width: 1 }
      });
      slide.addText(r.tag, {
        x: 1.0, y: y + 0.12, w: 2.8, h: 0.6,
        fontSize: 11, bold: true, color: idx < 3 ? C_ACCENT_PURPLE : C_ACCENT_SAGE,
        align: 'center', valign: 'middle', fontFace: 'Calibri'
      });

      slide.addText([
        { text: r.q + ' ', options: { bold: true, color: C_NAVY, fontSize: 11 } },
        { text: '\n[' + r.target + ']', options: { color: C_MUTED, fontSize: 9.5 } }
      ], { x: 4.0, y: y + 0.08, w: 8.3, h: 0.7, fontFace: 'Calibri' });
    });

    slide.addNotes('Each of the five research questions directly mirrors one of our objectives, guaranteeing that every finding in Chapter 4 and every feature in Chapter 5 directly answers a planned scientific inquiry.');
  }

  // -------------------------------------------------------------
  // SLIDE 5: Theoretical Foundations (Tripartite Framework)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Theoretical Foundations: The Tripartite Design Framework', 'Literature Review');

    const theories = [
      {
        name: 'Cognitive Load Theory (CLT)',
        author: 'Sweller (1988); Sweller et al. (2019)',
        principles: [
          'Working memory is severely constrained.',
          'Extraneous load: Moving banners, complex menus, and background audio exhaust cognitive capacity.',
          'Design mandate: Singular task presentation, eliminate non-essential animations, offload memory.'
        ],
        color: C_ACCENT_PURPLE, bg: 'EEF2FF'
      },
      {
        name: 'Universal Design for Learning (UDL)',
        author: 'CAST (2018); Meyer et al. (2014)',
        principles: [
          'Multiple Means of Representation: Pair text with concrete pictograms and learner-initiated audio.',
          'Multiple Means of Action & Expression: Accommodate diverse fine-motor skills with 48px+ targets.',
          'Multiple Means of Engagement: Unhurried, self-paced progress without stress-inducing timers.'
        ],
        color: C_ACCENT_BLUE, bg: 'F0F9FF'
      },
      {
        name: 'TEACCH Structured Teaching & UCD',
        author: 'Mesibov et al. (2004); ISO 9241-210 (2019)',
        principles: [
          'Predictable environmental structure: Navigation buttons must stay in identical coordinates.',
          'Explicit completion indicators: Learners must know what is expected and when it is finished.',
          'Iterative human-centered design cycles: Context → Requirements → Solutions → Formative checks.'
        ],
        color: C_ACCENT_SAGE, bg: 'F7FEE7'
      }
    ];

    theories.forEach((t, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 1.7, w: 3.7, h: 5.0,
        rectRadius: 0.15, fill: { color: t.bg }, line: { color: t.color, width: 2 }
      });
      slide.addText(t.name, {
        x: x + 0.25, y: 1.9, w: 3.2, h: 0.5,
        fontSize: 14, bold: true, color: t.color, fontFace: 'Calibri'
      });
      slide.addText(t.author, {
        x: x + 0.25, y: 2.35, w: 3.2, h: 0.4,
        fontSize: 10, bold: true, color: C_MUTED, fontFace: 'Calibri'
      });

      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.25, y: 2.8, w: 3.2, h: 0,
        line: { color: t.color, width: 1 }
      });

      const bulletText = t.principles.map(p => ({ text: '• ' + p + '\n\n', options: { fontSize: 11, color: C_PRIMARY } }));
      slide.addText(bulletText, {
        x: x + 0.25, y: 2.95, w: 3.2, h: 3.5,
        fontFace: 'Calibri', lineSpacing: 16
      });
    });

    slide.addNotes('Our interface architecture is grounded in three established pillars: Sweller\'s Cognitive Load Theory to strip away cognitive overload, CAST\'s Universal Design for Learning to provide multimodal accessibility, and Mesibov\'s TEACCH Structured Teaching for predictable spatial layout.');
  }

  // -------------------------------------------------------------
  // SLIDE 6: Neurodevelopmental & Cognitive Architecture in Autism
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Neurodevelopmental Profiles & Interface Implications', 'Literature Review');

    const profiles = [
      {
        domain: 'Attentional & Perceptual Processing',
        lit: 'Mottron et al. (2006); Happé & Frith (2006); Keehn et al. (2013)',
        finding: 'Enhanced low-level perceptual functioning and weak central coherence. Autistic individuals process local details intensely before perceiving global meaning.',
        impact: 'Extraneous visual clutter or moving sidebars hijack attention uncontrollably. Interfaces require singular visual hierarchy and clear focal cards.'
      },
      {
        domain: 'Executive Functioning & Working Memory',
        lit: 'Demetriou et al. (2018); Boucher et al. (2012)',
        finding: 'Meta-analyses confirm moderate deficits across planning, cognitive flexibility, and working memory. Difficulty initiating and organizing multi-step tasks.',
        impact: 'Interfaces must chunk learning into linear, single-step sequences (Step 1 of 5) with visible completion cues and zero multi-tasking demands.'
      },
      {
        domain: 'Sensory Processing & Reactivity',
        lit: 'Ben-Sasson et al. (2009); Robertson & Baron-Cohen (2017)',
        finding: 'Sensory modulation differences affect over 90% of autistic children. Aversive reactivity to bright white glare and loud, unpredictable auditory stimuli.',
        impact: 'Mandates warm ivory background (#FAF8F5), soft pastel accents, zero auto-playing audio, and gentle sine-wave auditory chimes.'
      },
      {
        domain: 'Motor Coordination & Dyspraxia',
        lit: 'Fournier et al. (2010); Pavlov (2014)',
        finding: 'Significant differences in fine motor coordination and finger-tap precision compared to typically developing peers.',
        impact: 'Requires large touch targets (exceeding 48 × 48 px), generous spacing, and tolerance for tap imprecision.'
      }
    ];

    profiles.forEach((p, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.7 + row * 2.6;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: 5.7, h: 2.4,
        rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
      });

      slide.addText(p.domain, {
        x: x + 0.25, y: y + 0.15, w: 5.2, h: 0.35,
        fontSize: 13, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addText(p.lit, {
        x: x + 0.25, y: y + 0.45, w: 5.2, h: 0.25,
        fontSize: 9.5, bold: true, color: C_ACCENT_PURPLE, fontFace: 'Calibri'
      });
      slide.addText([
        { text: 'Empirical Profile: ', options: { bold: true, fontSize: 10.5, color: C_PRIMARY } },
        { text: p.finding + '\n', options: { fontSize: 10.5, color: C_PRIMARY } },
        { text: 'Design Response: ', options: { bold: true, fontSize: 10.5, color: C_ACCENT_SAGE } },
        { text: p.impact, options: { fontSize: 10.5, color: C_PRIMARY } }
      ], { x: x + 0.25, y: y + 0.75, w: 5.2, h: 1.5, fontFace: 'Calibri', lineSpacing: 14 });
    });

    slide.addNotes('This slide details the empirical neuropsychological evidence. Weak central coherence means a banner is not ignored—it actively pulls focal attention away. Sensory defensiveness turns a celebration buzzer into an aversive shock.');
  }

  // -------------------------------------------------------------
  // SLIDE 7: Critique of Existing Digital Platforms
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Critique of Existing EdTech Platforms & Research Gaps', 'Literature Review');

    // Comparison Table
    const headers = [
      { text: 'Platform / Approach', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 11 } },
      { text: 'Primary Domain', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 11 } },
      { text: 'Key Strengths', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 11 } },
      { text: 'Critical Limitations & Gaps', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 11 } }
    ];

    const rows = [
      [
        { text: 'Avaz AAC\n(Invention Labs, India)', options: { bold: true, fontSize: 10.5 } },
        { text: 'Augmentative & Alternative Communication', options: { fontSize: 10 } },
        { text: 'Customizable picture vocabulary; optimized for Indian linguistic context.', options: { fontSize: 10 } },
        { text: 'Focuses purely on speech output; does not provide academic curriculum or web learning.', options: { fontSize: 10, color: 'DC2626' } }
      ],
      [
        { text: 'Otsimo Special Ed\n(Bayar, 2019)', options: { bold: true, fontSize: 10.5 } },
        { text: 'Gamified Cognitive Training (ABA-based)', options: { fontSize: 10 } },
        { text: 'Structured game mechanics; no commercial ad policy; visual feedback.', options: { fontSize: 10 } },
        { text: 'Proprietary design; opaque stakeholder requirements; fast gamification can overstimulate.', options: { fontSize: 10, color: 'DC2626' } }
      ],
      [
        { text: 'Mainstream EdTech\n(ABCmouse, Kahoot)', options: { bold: true, fontSize: 10.5 } },
        { text: 'General Elementary Curriculum', options: { fontSize: 10 } },
        { text: 'High visual appeal and rich content libraries for neurotypical learners.', options: { fontSize: 10 } },
        { text: 'Harsh failure buzzers, countdown timers, flashing animations, and moving ads derail autistic users.', options: { fontSize: 10, color: 'DC2626' } }
      ],
      [
        { text: 'Learn & Grow\n(Present Study)', options: { bold: true, fontSize: 10.5, color: C_ACCENT_SAGE } },
        { text: 'Autism-Adapted Web Learning Environment', options: { fontSize: 10, bold: true } },
        { text: 'Singular focus, sensory tranquility (#FAF8F5), sine chimes, concrete math, teacher portal.', options: { fontSize: 10, bold: true } },
        { text: 'Open-access, fully documented design rationale linking stakeholder needs directly to code.', options: { fontSize: 10, bold: true, color: '059669' } }
      ]
    ];

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [2.3, 2.5, 3.4, 3.5],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    // Identified Gaps Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 5.4, w: 11.7, h: 1.4,
      rectRadius: 0.1, fill: { color: 'FFFBEB' }, line: { color: C_ACCENT_AMBER, width: 1.5 }
    });
    slide.addText('FOUR MAJOR GAPS IN THE EXTANT LITERATURE (Fletcher-Watson, 2014; Mazon et al., 2019):', {
      x: 1.1, y: 5.5, w: 11.0, h: 0.3,
      fontSize: 10.5, bold: true, color: C_ACCENT_AMBER, fontFace: 'Calibri'
    });
    slide.addText('1. Retrospective evaluation bias (software built before needs are elicited) | 2. Vague, generic design guidelines without implementation specs | 3. Lack of multi-method triangulation (combining standardized questionnaires, ratings & qualitative voice) | 4. Scarcity of empirical research from Indian special education settings.', {
      x: 1.1, y: 5.8, w: 11.1, h: 0.85,
      fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16
    });

    slide.addNotes('While tools like Avaz serve AAC needs admirably, they do not address academic subject interfaces. Mainstream tools fail due to timers and buzzers. Learn & Grow fills these four documented literature gaps.');
  }

  // -------------------------------------------------------------
  // SLIDE 8: Methodology: Mixed-Methods Convergent Design
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Research Methodology: Mixed-Methods Convergent Design', 'Methodology');

    // Diagram of Convergent Mixed Methods
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.7, w: 5.6, h: 2.2,
      rectRadius: 0.12, fill: { color: 'EEF2FF' }, line: { color: C_ACCENT_PURPLE, width: 2 }
    });
    slide.addText('QUANTITATIVE STRAND (QUAN)', {
      x: 1.0, y: 1.85, w: 5.2, h: 0.3,
      fontSize: 12, bold: true, color: C_ACCENT_PURPLE, fontFace: 'Calibri'
    });
    slide.addText('• UI/UX Priority Rating Scale (18 items, N=40)\n• DP-TIC-AUT-Q Questionnaire (118 items, 4 sections)\n• Metric Output: Central tendency (Mean), Dispersion (SD), Scale Reliability (Cronbach\'s alpha), Group Comparisons.', {
      x: 1.0, y: 2.2, w: 5.2, h: 1.5,
      fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.9, y: 1.7, w: 5.6, h: 2.2,
      rectRadius: 0.12, fill: { color: 'F0FDF4' }, line: { color: C_ACCENT_SAGE, width: 2 }
    });
    slide.addText('QUALITATIVE STRAND (QUAL)', {
      x: 7.1, y: 1.85, w: 5.2, h: 0.3,
      fontSize: 12, bold: true, color: C_ACCENT_SAGE, fontFace: 'Calibri'
    });
    slide.addText('• Semi-Structured Interviews (N=40 professionals)\n• Guided Student Walkthroughs (n=10 supported learners)\n• Metric Output: Braun & Clarke 6-phase thematic analysis, barrier frequencies, verbatim quotes, behavioral field notes.', {
      x: 7.1, y: 2.2, w: 5.2, h: 1.5,
      fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16
    });

    // Convergence Arrow
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 3.5, y: 4.15, w: 6.3, h: 0.5,
      rectRadius: 0.1, fill: { color: C_NAVY }
    });
    slide.addText('CONVERGENT TRIANGULATION & INTEGRATION (Creswell & Plano Clark, 2018)', {
      x: 3.5, y: 4.15, w: 6.3, h: 0.5,
      fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    // Output Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.9, w: 11.7, h: 1.9,
      rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('INTERFACE DEVELOPMENT & DESIGN TRACEABILITY (ISO 9241-210)', {
      x: 1.1, y: 5.05, w: 11.0, h: 0.3,
      fontSize: 12, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '• Prioritization: ', options: { bold: true, color: C_NAVY } },
      { text: 'High Priority (Mean ≥ 4.60 + DP-TIC alignment + qualitative recurring theme) vs. Medium Priority.\n' },
      { text: '• Front-End Engineering: ', options: { bold: true, color: C_NAVY } },
      { text: 'Responsive HTML5, CSS3 Custom Properties, Vanilla ECMAScript 2022, Web Audio API sine synthesis.\n' },
      { text: '• Traceability Record: ', options: { bold: true, color: C_NAVY } },
      { text: 'Every interface component explicitly mapped to supporting statistics, interview transcripts, and literature citations.' }
    ], { x: 1.1, y: 5.4, w: 11.1, h: 1.3, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16 });

    slide.addNotes('Following Creswell and Plano Clark\'s convergent mixed-methods design, quantitative and qualitative data were collected concurrently, analyzed independently, and merged during requirement prioritization.');
  }

  // -------------------------------------------------------------
  // SLIDE 9: Participants & Sampling Framework (N = 50)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Participant Demographic & Clinical Profiles (N = 50)', 'Methodology');

    const headers = [
      { text: 'Participant Group', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } },
      { text: 'Sample (n)', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } },
      { text: 'Gender Breakdown', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } },
      { text: 'Mean Age (Range)', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } },
      { text: 'Clinical / Educational Context', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } },
      { text: 'Key Instruments Administered', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10.5 } }
    ];

    const rows = [
      [
        { text: 'Special Education Teachers (T01–T30)', options: { bold: true, fontSize: 10 } },
        { text: 'n = 30\n(60%)', options: { fontSize: 10 } },
        { text: '21 Female (70%)\n9 Male (30%)', options: { fontSize: 9.5 } },
        { text: '37.4 yrs (26–52)\nExp: 9.4 ± 4.2 yrs', options: { fontSize: 9.5 } },
        { text: '18 Special schools, 8 Inclusive classrooms, 4 Clinics', options: { fontSize: 9.5 } },
        { text: 'DP-TIC-AUT-Q (118 items), Rating Scale (18 items), Interview', options: { fontSize: 9.5 } }
      ],
      [
        { text: 'Occupational Therapists (OT01–OT10)', options: { bold: true, fontSize: 10 } },
        { text: 'n = 10\n(20%)', options: { fontSize: 10 } },
        { text: '8 Female (80%)\n2 Male (20%)', options: { fontSize: 9.5 } },
        { text: '34.2 yrs (27–46)\nExp: 8.8 ± 3.6 yrs', options: { fontSize: 9.5 } },
        { text: '7 Sensory/dev clinics, 3 Special schools', options: { fontSize: 9.5 } },
        { text: 'DP-TIC-AUT-Q (118 items), Rating Scale (18 items), Interview', options: { fontSize: 9.5 } }
      ],
      [
        { text: 'Autistic Learners (S01–S10)', options: { bold: true, fontSize: 10, color: C_ACCENT_PURPLE } },
        { text: 'n = 10\n(20%)', options: { fontSize: 10, bold: true } },
        { text: '3 Female (30%)\n7 Male (70%)', options: { fontSize: 9.5 } },
        { text: '10.8 yrs (8–14)\nPediatric sample', options: { fontSize: 9.5 } },
        { text: '6 Level 1 support, 4 Level 2 support (DSM-5-TR criteria)', options: { fontSize: 9.5 } },
        { text: 'Guided task walkthroughs, behavioral observation field notes', options: { fontSize: 9.5 } }
      ],
      [
        { text: 'TOTAL SAMPLE', options: { bold: true, fontSize: 10.5, fill: 'EEF2F6' } },
        { text: 'N = 50', options: { bold: true, fontSize: 10.5, fill: 'EEF2F6' } },
        { text: '32 F (64%) / 18 M (36%)', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: 'Grand M = 31.4 yrs', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '56% Special, 26% Clinic, 18% Inclusive', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: 'Full Mixed-Methods Triangulation', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } }
      ]
    ];

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [2.5, 1.2, 1.8, 1.8, 2.2, 2.2],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    // Ethical Note
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 5.6, w: 11.7, h: 1.2,
      rectRadius: 0.1, fill: { color: 'F8FAFC' }, line: { color: '94A3B8', width: 1 }
    });
    slide.addText('ETHICAL PROTOCOL & SAFEGUARDS (ICMR, 2017):', {
      x: 1.0, y: 5.7, w: 11.3, h: 0.25,
      fontSize: 10, bold: true, color: '475569', fontFace: 'Calibri'
    });
    slide.addText('Written informed consent obtained from all professionals and parents/caregivers. Children participated via age-appropriate assent in familiar therapeutic settings with known teachers. Walkthrough tasks were designed to be non-distressing and stopped immediately upon any sign of discomfort.', {
      x: 1.0, y: 5.95, w: 11.3, h: 0.75,
      fontSize: 10.5, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15
    });

    slide.addNotes('Our sample includes 40 seasoned professionals averaging over 9 years of direct autism experience, plus 10 autistic children with varying support requirements, ensuring both professional insight and direct behavioral observation.');
  }

  // -------------------------------------------------------------
  // SLIDE 10: Existing Technology Usage & Device Ecosystem
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Existing Technology Usage & Digital Confidence', 'Results');

    const stats = [
      { num: '78.0%', label: 'Daily Technology Use', sub: '39 of 50 participants use ICT daily in sessions', color: C_ACCENT_BLUE },
      { num: '66.0%', label: 'Touchscreen Tablet Dominance', sub: '90% of therapists & 80% of students rely on iPads/tablets', color: C_ACCENT_PURPLE },
      { num: '50.0%', label: 'Learner Beginner Profile', sub: '5 of 10 students have novice digital proficiency', color: C_ACCENT_AMBER },
      { num: '0%', label: 'Typing Reliance', sub: 'Students cannot rely on complex text or physical keyboarding', color: C_ACCENT_SAGE }
    ];

    stats.forEach((s, idx) => {
      const x = 0.8 + idx * 3.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 1.7, w: 2.7, h: 2.2,
        rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
      });
      slide.addText(s.num, {
        x: x + 0.1, y: 1.9, w: 2.5, h: 0.7,
        fontSize: 28, bold: true, color: s.color, align: 'center', fontFace: 'Calibri'
      });
      slide.addText(s.label, {
        x: x + 0.1, y: 2.65, w: 2.5, h: 0.45,
        fontSize: 11, bold: true, color: C_NAVY, align: 'center', fontFace: 'Calibri'
      });
      slide.addText(s.sub, {
        x: x + 0.15, y: 3.1, w: 2.4, h: 0.7,
        fontSize: 9.5, color: C_MUTED, align: 'center', fontFace: 'Calibri', lineSpacing: 13
      });
    });

    // Takeaways
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.2, w: 11.7, h: 2.6,
      rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('KEY IMPLICATIONS FOR INTERFACE ARCHITECTURE:', {
      x: 1.1, y: 4.4, w: 11.0, h: 0.3,
      fontSize: 12, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '1. Tablet-First Touchscreen Responsiveness: ', options: { bold: true, color: C_PRIMARY } },
      { text: 'With 66% overall and 90% therapist tablet usage, all buttons and interactive cards must exceed 48×48 px to allow gross-motor tapping without mouse-hover reliance.\n\n' },
      { text: '2. Low-Confidence Scaffolding: ', options: { bold: true, color: C_PRIMARY } },
      { text: 'Half of autistic students were classified as digital beginners. Interfaces cannot assume prior navigation literacy or multi-tiered hierarchical menus.\n\n' },
      { text: '3. Zero Third-Party Installation Barriers: ', options: { bold: true, color: C_PRIMARY } },
      { text: 'Special schools face tight IT constraints. A lightweight browser-based single-page application (SPA) ensures universal cross-device accessibility without app-store barriers.' }
    ], { x: 1.1, y: 4.8, w: 11.1, h: 1.8, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16 });

    slide.addNotes('Descriptive findings in Table 4.4 prove that tablets dominate special education (66% overall, 90% among therapists). The interface must be responsive, touch-friendly, and free of app store paywalls.');
  }

  // -------------------------------------------------------------
  // SLIDE 11: Six Critical Digital Barriers in Mainstream EdTech
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Six Critical Barriers Experienced in Existing EdTech', 'Results');

    const barriers = [
      { name: 'Moving banners, ads & peripheral graphics', pct: '95.0%', n: '38/40', impact: 'Grabs involuntary attention, causes accidental touches, derails task' },
      { name: 'Sudden loud audio, fanfares & celebrations', pct: '92.5%', n: '37/40', impact: 'Triggers startle response, ear-covering, immediate tab closing' },
      { name: 'Harsh error buzzers & flashing red alerts', pct: '87.5%', n: '35/40', impact: 'Induces acute frustration, emotional meltdown, and task refusal' },
      { name: 'Shifting navigation & unstable Back buttons', pct: '85.0%', n: '34/40', impact: 'Spatial disorientation, feeling trapped, constant adult dependency' },
      { name: 'Split layouts & simultaneous instructions', pct: '87.5%', n: '35/40', impact: 'Working memory overload, inability to initiate or complete tasks' },
      { name: 'Stark white backgrounds & intense glare', pct: '75.0%', n: '30/40', impact: 'Visual strain, eye-rubbing, and reduced sustained on-task time' }
    ];

    barriers.forEach((b, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.7 + row * 1.7;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: 5.7, h: 1.5,
        rectRadius: 0.1, fill: { color: 'FEF2F2' }, line: { color: 'F87171', width: 1.5 }
      });

      slide.addText(b.pct, {
        x: x + 0.2, y: y + 0.15, w: 1.2, h: 0.5,
        fontSize: 20, bold: true, color: 'DC2626', fontFace: 'Calibri'
      });
      slide.addText(b.name, {
        x: x + 1.4, y: y + 0.15, w: 4.1, h: 0.5,
        fontSize: 11, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addText('Reported by ' + b.n + ' professionals. Impact: ' + b.impact, {
        x: x + 0.2, y: y + 0.75, w: 5.3, h: 0.65,
        fontSize: 9.5, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 13
      });
    });

    slide.addNotes('Every single barrier was cited by at least 75% of practitioners. Notice that 100% of occupational therapists reported loud fanfares as a disruption. Commercial gamification features actively harm autistic children.');
  }

  // -------------------------------------------------------------
  // SLIDE 12: Descriptive Statistics of 18 UI/UX Features
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'UI/UX Feature Importance Ratings (N = 40 Professionals)', 'Results: Descriptive Statistics');

    // Table of top items
    const headers = [
      { text: 'Rank', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Code', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Feature Statement', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Category', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Mean', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'SD', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: '% Rated 4–5', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Priority', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } }
    ];

    const topItems = [
      ['1', 'REQ07', 'Limited unnecessary visual clutter', 'Cognitive Load', '4.80', '0.41', '100.0%', 'High Priority'],
      ['2 (tie)', 'REQ01', 'Clear and consistent screen structure', 'Navigation', '4.78', '0.42', '100.0%', 'High Priority'],
      ['2 (tie)', 'REQ05', 'Easy-to-find Back / Home / Help options', 'Navigation', '4.78', '0.48', '97.5%', 'High Priority'],
      ['2 (tie)', 'REQ09', 'Appropriate use of images/symbols with text', 'Multimodal', '4.78', '0.42', '100.0%', 'High Priority'],
      ['5 (tie)', 'REQ04', 'One task/step presented clearly at a time', 'Cognitive Load', '4.75', '0.44', '100.0%', 'High Priority'],
      ['5 (tie)', 'REQ15', 'Low-frustration error recovery / try-again', 'Error Recovery', '4.75', '0.44', '100.0%', 'High Priority'],
      ['7', 'REQ03', 'Simple and concise instructions', 'Cognitive Load', '4.70', '0.46', '100.0%', 'High Priority'],
      ['8 (tie)', 'REQ06', 'Predictable response after clicking', 'Navigation', '4.63', '0.49', '100.0%', 'High Priority'],
      ['8 (tie)', 'REQ12', 'Personalization of pace and difficulty', 'Sensory/Custom', '4.63', '0.49', '100.0%', 'High Priority']
    ];

    const rows = topItems.map(row => row.map((cell, cidx) => ({
      text: cell,
      options: {
        fontSize: 9.5,
        bold: cidx === 4 || cidx === 7,
        color: cidx === 7 ? '059669' : C_PRIMARY,
        fill: cidx === 7 ? 'ECFDF5' : 'FFFFFF'
      }
    })));

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [0.9, 1.0, 4.3, 1.8, 0.9, 0.8, 1.0, 1.0],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    // Scale summary pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.0, w: 11.7, h: 0.85,
      rectRadius: 0.1, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('OVERALL SCALE METRICS: Grand Mean = 4.58 (SD = 0.55) | Scale Reliability: Cronbach\'s α = .865 (18 items, N = 40)\nAll items rated ≥ 4.30. "Medium Priority" still reflects critical importance. Zero items were rated non-essential.', {
      x: 1.0, y: 6.05, w: 11.3, h: 0.75,
      fontSize: 10.5, bold: true, color: C_NAVY, align: 'center', fontFace: 'Calibri'
    });

    slide.addNotes('Here are our descriptive results for the 18 interface features. Grand mean is 4.58 with high internal consistency (alpha = .865). Clutter reduction ranked number one, followed by consistent screen structure, persistent Back/Home buttons, and visual symbol pairing.');
  }

  // -------------------------------------------------------------
  // SLIDE 13: Design-Principle Category Composite Scores
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Composite Scores by Design-Principle Category', 'Results: SPSS Compute Variable');

    const cats = [
      { name: 'Visual Simplicity & Reduced Cognitive Load', items: 'REQ03, REQ04, REQ07', m: '4.75', sd: '0.32', status: 'High Priority (Rank 1)', color: C_ACCENT_PURPLE, bg: 'EEF2FF' },
      { name: 'Predictable Navigation & Screen Structure', items: 'REQ01, REQ02, REQ05, REQ06', m: '4.68', sd: '0.36', status: 'High Priority (Rank 2)', color: C_ACCENT_BLUE, bg: 'F0F9FF' },
      { name: 'Feedback & Low-Frustration Error Recovery', items: 'REQ14, REQ15, REQ16', m: '4.61', sd: '0.35', status: 'High Priority (Rank 3)', color: C_ACCENT_SAGE, bg: 'F0FDF4' },
      { name: 'Sensory Regulation & Interface Customization', items: 'REQ08, REQ12, REQ13', m: '4.55', sd: '0.43', status: 'High Priority (Rank 4)', color: C_ACCENT_AMBER, bg: 'FFFBEB' },
      { name: 'Multimodal & Concrete Instruction', items: 'REQ09, REQ10, REQ11', m: '4.47', sd: '0.41', status: 'Medium Priority (Rank 5)', color: '64748B', bg: 'F8FAFC' },
      { name: 'Learner Agency & Adult Routine Integration', items: 'REQ17, REQ18', m: '4.35', sd: '0.44', status: 'Medium Priority (Rank 6)', color: '64748B', bg: 'F8FAFC' }
    ];

    cats.forEach((c, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.7 + row * 1.7;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: 5.7, h: 1.5,
        rectRadius: 0.1, fill: { color: c.bg }, line: { color: c.color, width: 1.5 }
      });

      slide.addText(c.m, {
        x: x + 0.2, y: y + 0.15, w: 1.2, h: 0.5,
        fontSize: 22, bold: true, color: c.color, fontFace: 'Calibri'
      });
      slide.addText(c.name, {
        x: x + 1.4, y: y + 0.15, w: 4.1, h: 0.5,
        fontSize: 11, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addText('Items: ' + c.items + ' | SD = ' + c.sd + ' | ' + c.status, {
        x: x + 0.2, y: y + 0.75, w: 5.3, h: 0.6,
        fontSize: 9.5, color: C_PRIMARY, fontFace: 'Calibri'
      });
    });

    slide.addNotes('Following SPSS COMPUTE Variable syntax, the 18 items were aggregated into six core categories. Visual simplicity ranked highest at 4.75, followed by navigation predictability at 4.68 and low-frustration feedback at 4.61.');
  }

  // -------------------------------------------------------------
  // SLIDE 14: Descriptive Stakeholder Comparison (Teachers vs. OTs)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Descriptive Comparison: Special Educators vs. Therapists', 'Results: Stakeholder Alignment');

    // 2 Big Callouts
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.7, w: 5.6, h: 4.2,
      rectRadius: 0.12, fill: { color: 'F0FDF4' }, line: { color: C_ACCENT_SAGE, width: 2 }
    });
    slide.addText('AREAS OF STRONG CONSENSUS', {
      x: 1.1, y: 1.9, w: 5.0, h: 0.35,
      fontSize: 13, bold: true, color: C_ACCENT_SAGE, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '• Clutter Reduction (REQ07): ', options: { bold: true, color: C_NAVY } },
      { text: 'Teachers M = 4.77 vs. Therapists M = 4.90 (Both ranked #1).\n\n' },
      { text: '• Screen Consistency (REQ01): ', options: { bold: true, color: C_NAVY } },
      { text: 'Teachers M = 4.73 vs. Therapists M = 4.90 (Universal agreement).\n\n' },
      { text: '• Persistent Back/Home (REQ05): ', options: { bold: true, color: C_NAVY } },
      { text: 'Teachers M = 4.77 vs. Therapists M = 4.80 (Essential anchor).\n\n' },
      { text: '• Single Task Focus (REQ04): ', options: { bold: true, color: C_NAVY } },
      { text: 'Teachers M = 4.70 vs. Therapists M = 4.90 (No multi-tasking).' }
    ], { x: 1.1, y: 2.35, w: 5.0, h: 3.3, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15 });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.9, y: 1.7, w: 5.6, h: 4.2,
      rectRadius: 0.12, fill: { color: 'FFFBEB' }, line: { color: C_ACCENT_AMBER, width: 2 }
    });
    slide.addText('ROLE-SPECIFIC EMPHASIS (COMPLEMENTARY)', {
      x: 7.2, y: 1.9, w: 5.0, h: 0.35,
      fontSize: 13, bold: true, color: C_ACCENT_AMBER, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '• Sensory Customization (REQ13): ', options: { bold: true, color: C_NAVY } },
      { text: 'Therapists M = 4.80 vs. Teachers M = 4.37. OTs manage sensory defensiveness and light sensitivity directly.\n\n' },
      { text: '• Flexible Response Modes (REQ11): ', options: { bold: true, color: C_NAVY } },
      { text: 'Therapists M = 4.70 vs. Teachers M = 4.20. OTs focus heavily on motor dyspraxia and alternative inputs.\n\n' },
      { text: '• Classroom Routine Compatibility (REQ18): ', options: { bold: true, color: C_NAVY } },
      { text: 'Teachers M = 4.40 vs. Therapists M = 4.10. Teachers manage classroom schedules, curricula, and pacing.' }
    ], { x: 7.2, y: 2.35, w: 5.0, h: 3.3, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15 });

    // Bottom note
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.1, w: 11.7, h: 0.75,
      rectRadius: 0.08, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('Analytical Interpretation: Differences between teachers and therapists represent complementary professional lenses rather than conflicting priorities. Both viewpoints were harmonized into the final interface.', {
      x: 1.0, y: 6.15, w: 11.3, h: 0.65,
      fontSize: 10.5, color: C_PRIMARY, align: 'center', fontFace: 'Calibri'
    });

    slide.addNotes('Comparing means descriptively reveals beautiful alignment: both professions agree on structural predictability and clutter removal. Where they differ, therapists emphasize sensory/motor flexibility while teachers focus on curriculum flow.');
  }

  // -------------------------------------------------------------
  // SLIDE 15: DP-TIC-AUT-Q 118-Item Questionnaire Results
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'DP-TIC-AUT-Q: 118-Item Design Questionnaire Results', 'Results: Standardized Survey');

    const headers = [
      { text: 'Subscale / Section', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Items', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Overall M (SD)', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: '% Agree (4–5)', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Teachers M', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Therapists M', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Cronbach α', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } }
    ];

    const rows = [
      [
        { text: '1. Opinions on ICT & Diversity (Items 1–22)', options: { fontSize: 9.5 } },
        { text: '22', options: { fontSize: 9.5 } },
        { text: '3.90 (0.22)', options: { fontSize: 9.5 } },
        { text: '81.5%', options: { fontSize: 9.5 } },
        { text: '3.92', options: { fontSize: 9.5 } },
        { text: '3.85', options: { fontSize: 9.5 } },
        { text: '.790', options: { fontSize: 9.5 } }
      ],
      [
        { text: '2. ICT Training & Autism Uses (Items 23–62)', options: { fontSize: 9.5 } },
        { text: '40', options: { fontSize: 9.5 } },
        { text: '4.20 (0.22)', options: { fontSize: 9.5 } },
        { text: '94.1%', options: { fontSize: 9.5 } },
        { text: '4.20', options: { fontSize: 9.5 } },
        { text: '4.19', options: { fontSize: 9.5 } },
        { text: '.882', options: { fontSize: 9.5 } }
      ],
      [
        { text: '3. App Benefits in Autism Support (Items 63–84)', options: { fontSize: 9.5 } },
        { text: '22', options: { fontSize: 9.5 } },
        { text: '4.46 (0.22)', options: { fontSize: 9.5 } },
        { text: '98.5%', options: { fontSize: 9.5 } },
        { text: '4.50', options: { fontSize: 9.5 } },
        { text: '4.37', options: { fontSize: 9.5 } },
        { text: '.780', options: { fontSize: 9.5 } }
      ],
      [
        { text: '4. App Functions & Accessibility (Items 85–118)', options: { bold: true, fontSize: 9.5, color: C_ACCENT_SAGE } },
        { text: '34', options: { bold: true, fontSize: 9.5 } },
        { text: '4.61 (0.23)', options: { bold: true, fontSize: 9.5 } },
        { text: '99.2%', options: { bold: true, fontSize: 9.5 } },
        { text: '4.64', options: { bold: true, fontSize: 9.5 } },
        { text: '4.52', options: { bold: true, fontSize: 9.5 } },
        { text: '.882', options: { bold: true, fontSize: 9.5 } }
      ],
      [
        { text: 'TOTAL QUESTIONNAIRE (Items 1–118)', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '118', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '4.31 (0.18)', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '94.0%', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '4.33', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '4.26', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } },
        { text: '.941', options: { bold: true, fontSize: 10, fill: 'EEF2F6' } }
      ]
    ];

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [3.8, 1.0, 1.6, 1.4, 1.3, 1.3, 1.3],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    // Top 3 standout items
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.8, w: 11.7, h: 2.0,
      rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('TOP-RATED INDIVIDUAL ITEMS ACROSS ALL 118 STATEMENTS:', {
      x: 1.1, y: 4.95, w: 11.0, h: 0.3,
      fontSize: 11, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '1. Item 98 (M = 4.88, SD = 0.33): ', options: { bold: true, color: C_ACCENT_PURPLE } },
      { text: '"They include tasks that respond to their individual needs" (100% agreement).\n' },
      { text: '2. Item 88 (M = 4.83, SD = 0.38): ', options: { bold: true, color: C_ACCENT_PURPLE } },
      { text: '"They enable the user to add personalized images or pictograms" (100% agreement).\n' },
      { text: '3. Item 85 (M = 4.80, SD = 0.41): ', options: { bold: true, color: C_ACCENT_PURPLE } },
      { text: '"They enable universal accessibility (changes in font size, color, graphic elements)" (100% agreement).' }
    ], { x: 1.1, y: 5.3, w: 11.1, h: 1.4, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16 });

    slide.addNotes('The 118-item DP-TIC-AUT-Q showed outstanding reliability (alpha = .941). Notice how Section 4 on interface accessibility scored highest at 4.61 with 99.2% agreement. The top item of all 118 was Item 98: adapting tasks to learner needs.');
  }

  // -------------------------------------------------------------
  // SLIDE 16: Qualitative Thematic Analysis & Verbatim Voices
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Qualitative Themes & Stakeholder Voices (N = 40 Interviews)', 'Results: Qualitative Thematic Analysis');

    const themes = [
      {
        theme: 'Sensory Sensitivity & Glare',
        speaker: 'OT01 (Sensory Clinic, 4 yrs exp)',
        quote: '"Stark white screens and sudden loud fanfares trigger sensory defensiveness. When our students hear an unannounced buzz, they close the tab or cover their ears. We need warm pastel backgrounds and silent operation."',
        code: 'Warm ivory canvas (#FAF8F5), muted lavender & sage, no auto-play audio.'
      },
      {
        theme: 'Navigation Predictability',
        speaker: 'T02 (Special School, 3 yrs exp)',
        quote: '"If the back button is not in the exact top-left corner on every page, children panic and believe they are trapped. The navigation bar must never shift position."',
        code: 'Fixed top-left Back & Home anchors with history stack; shallow 2-level hierarchy.'
      },
      {
        theme: 'Cognitive Offloading',
        speaker: 'T03 (Special School, 3 yrs exp)',
        quote: '"You cannot give two instructions at once. It must be: Look, Count, Select. Exactly one discrete task on the screen with zero sidebar animations."',
        code: 'One activity card per screen (Step 1 of 5); zero extraneous sidebars or ads.'
      },
      {
        theme: 'Concrete Visual Mathematics',
        speaker: 'T04 (Special School, 4 yrs exp)',
        quote: '"Pure numbers like 2+3 mean nothing to an autistic child. But when they see 2 apples and 3 apples that they can touch and count together, addition becomes real."',
        code: 'Interactive apple manipulatives with tap-to-count audio and visual dot calculator.'
      }
    ];

    themes.forEach((t, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.7 + row * 2.6;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: 5.7, h: 2.4,
        rectRadius: 0.1, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
      });

      slide.addText(t.theme, {
        x: x + 0.25, y: y + 0.15, w: 5.2, h: 0.3,
        fontSize: 12, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addText(t.speaker, {
        x: x + 0.25, y: y + 0.42, w: 5.2, h: 0.25,
        fontSize: 9.5, bold: true, color: C_ACCENT_PURPLE, fontFace: 'Calibri'
      });
      slide.addText(t.quote, {
        x: x + 0.25, y: y + 0.7, w: 5.2, h: 0.95,
        fontSize: 9.5, italic: true, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 13
      });
      slide.addText('→ Design Response: ' + t.code, {
        x: x + 0.25, y: y + 1.75, w: 5.2, h: 0.55,
        fontSize: 9.5, bold: true, color: C_ACCENT_SAGE, fontFace: 'Calibri', lineSpacing: 13
      });
    });

    slide.addNotes('Qualitative interviews revealed the human depth behind the numbers. Notice T02\'s powerful insight: if the back button moves, autistic children feel physically trapped. OT01 explains how buzzers trigger flight-or-fight defense.');
  }

  // -------------------------------------------------------------
  // SLIDE 17: Guided Student Behavioral Observations (n = 10)
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Guided Student Behavioral Observations (n = 10 Learners)', 'Results: Behavioral Evidence');

    const headers = [
      { text: 'Student ID', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Profile & Mode', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Observed Behavioral Response', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Interface Design Verification', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } }
    ];

    const studentRows = [
      ['S01', 'Age 8, Level 1 (Spoken)', 'Stared at animated side banner on regular app and lost focus; moved through static card layout cleanly.', 'Validates REQ07: Zero peripheral animations.'],
      ['S02', 'Age 8, Level 1 (Spoken)', 'Startled and covered ears at math buzzer; smiled and retried after silent/soft-chime retry.', 'Validates REQ15: Gentle "Let\'s try again" chime.'],
      ['S03', 'Age 9, Level 1 (AAC)', 'Said "Home" aloud and pressed Home icon when unsure; showed visible relief at consistent header.', 'Validates REQ01 & REQ05: Permanent top-left anchors.'],
      ['S04', 'Age 10, Level 1 (Spoken)', 'Tapped each apple in turn, counting aloud "1, 2, 3, 4, 5," before selecting the matching number.', 'Validates REQ09: Tappable apple manipulatives.'],
      ['S05', 'Age 10, Level 1 (PECS)', 'Chose soft sage and lavender theme; maintained on-task attention 40% longer than on stark white.', 'Validates REQ13: Calm pastel theme settings.'],
      ['S07', 'Age 12, Level 2 (AAC)', 'Ignored text-only instructions; completed task successfully once speaker icon read prompt aloud.', 'Validates REQ10: Built-in text-to-speech audio.']
    ];

    const rows = studentRows.map(r => r.map((c, idx) => ({
      text: c,
      options: {
        fontSize: 9.5,
        bold: idx === 0 || idx === 3,
        color: idx === 3 ? C_ACCENT_SAGE : C_PRIMARY
      }
    })));

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [1.0, 2.2, 4.8, 3.7],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 5.7, w: 11.7, h: 1.1,
      rectRadius: 0.1, fill: { color: 'F0FDF4' }, line: { color: C_ACCENT_SAGE, width: 1.5 }
    });
    slide.addText('BEHAVIORAL TRIANGULATION SUMMARY:', {
      x: 1.0, y: 5.8, w: 11.3, h: 0.25,
      fontSize: 10.5, bold: true, color: C_ACCENT_SAGE, fontFace: 'Calibri'
    });
    slide.addText('In all 10 student sessions, what learners demonstrated behaviorally (distraction by movement, ear-covering from buzzers, vocalizing for Home) matched 100% of the top requirements prioritized by professional ratings and qualitative themes.', {
      x: 1.0, y: 6.05, w: 11.3, h: 0.65,
      fontSize: 10.5, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 14
    });

    slide.addNotes('Guided task walkthroughs with the 10 autistic children provided crucial ecological validation. S02\'s reaction confirmed that buzzers induce physical discomfort, while S04 demonstrated that concrete apple manipulatives directly support addition.');
  }

  // -------------------------------------------------------------
  // SLIDE 18: Triangulated Requirements Prioritization Matrix
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Triangulated Prioritization Matrix: From Needs to Features', 'Synthesis');

    const headers = [
      { text: 'Code', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Interface Requirement', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Mean', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Priority', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'DP-TIC Items', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } },
      { text: 'Operationalized Feature in "Learn & Grow"', options: { bold: true, fill: '1E293B', color: 'FFFFFF', fontSize: 10 } }
    ];

    const matrix = [
      ['REQ07', 'Limited visual clutter', '4.80', 'High', '85, 99', 'Single activity card per screen; zero sidebar ads or moving banners'],
      ['REQ01', 'Clear, consistent screen structure', '4.78', 'High', '86, 101', 'Fixed top app bar with identical layout across all 11 screens'],
      ['REQ05', 'Easy-to-find Back / Home / Help', '4.78', 'High', '86, 105', 'Permanent top-left Back & Home buttons with browser history stack'],
      ['REQ09', 'Images & symbols with text', '4.78', 'High', '45, 100', 'Clear SVG pictograms paired with every single text prompt'],
      ['REQ04', 'One task/step at a time', '4.75', 'High', '63, 98', 'Step-by-step lesson architecture (Step 1 of 5); one interaction per step'],
      ['REQ15', 'Low-frustration error recovery', '4.75', 'High', '71, 105', 'Gentle "Let\'s try again" prompt, hint button, zero harsh error buzzers'],
      ['REQ03', 'Simple, concise instructions', '4.70', 'High', '100, 103', 'One-sentence instructional prompts with optional read-aloud TTS'],
      ['REQ06', 'Predictable click responses', '4.63', 'High', '86, 102', 'Immediate visual state change + gentle 440–659 Hz sine tone'],
      ['REQ12', 'Personal pace and difficulty', '4.63', 'High', '87', 'Self-paced learning with zero countdown timers or speed bonuses']
    ];

    const rows = matrix.map(r => r.map((c, idx) => ({
      text: c,
      options: {
        fontSize: 9,
        bold: idx === 0 || idx === 3,
        color: idx === 3 ? '059669' : C_PRIMARY,
        fill: idx === 3 ? 'ECFDF5' : 'FFFFFF'
      }
    })));

    slide.addTable([headers, ...rows], {
      x: 0.8, y: 1.7, w: 11.7,
      colW: [0.9, 2.7, 0.8, 1.0, 1.3, 5.0],
      border: { pt: 1, color: 'CBD5E1' },
      fill: 'FFFFFF',
      autoPage: false
    });

    slide.addNotes('This is our core synthesis table (Table 4.8 / Table 5.1). It shows the exact chain of reasoning from user requirement to mean rating, supporting DP-TIC items, and the implemented feature in Learn & Grow.');
  }

  // -------------------------------------------------------------
  // SLIDE 19: Interface Showcase: Architecture & System Navigation
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Interface Showcase: System Architecture & Navigation', 'Working Website');

    // Live URL Callout
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.6, w: 11.7, h: 0.65,
      rectRadius: 0.1, fill: { color: '0F172A' }
    });
    slide.addText('LIVE APPLICATION URL: https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/', {
      x: 0.8, y: 1.6, w: 11.7, h: 0.65,
      fontSize: 12, bold: true, color: '38BDF8', align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    // Architecture layout
    const archCards = [
      {
        title: 'Single-Page Application (SPA)',
        desc: 'Built in vanilla ECMAScript 2022. Screen transitions update the DOM dynamically without jarring full-page refreshes that cause screen flashing.',
        color: C_ACCENT_PURPLE, bg: 'EEF2FF'
      },
      {
        title: 'Persistent Top App Bar',
        desc: 'Permanent anchors: Top-left Back & Home buttons. Top-right Read-Aloud (TTS), Settings modal, and Educator Portal. Zero shifting positions.',
        color: C_ACCENT_BLUE, bg: 'F0F9FF'
      },
      {
        title: 'Shallow 2-Level Hierarchy',
        desc: 'Every lesson and activity is reachable within 2 clicks from the Student Dashboard. Eliminates deep navigation mazes and disorientation.',
        color: C_ACCENT_SAGE, bg: 'F0FDF4'
      }
    ];

    archCards.forEach((c, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 2.45, w: 3.7, h: 2.1,
        rectRadius: 0.12, fill: { color: c.bg }, line: { color: c.color, width: 1.5 }
      });
      slide.addText(c.title, {
        x: x + 0.25, y: 2.6, w: 3.2, h: 0.45,
        fontSize: 13, bold: true, color: c.color, fontFace: 'Calibri'
      });
      slide.addText(c.desc, {
        x: x + 0.25, y: 3.1, w: 3.2, h: 1.35,
        fontSize: 10.5, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15
      });
    });

    // 11 Screens Breakdown
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 4.75, w: 11.7, h: 2.1,
      rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('TOTAL PLATFORM FOOTPRINT: 11 DEDICATED ACCESSIBLE SCREENS', {
      x: 1.1, y: 4.9, w: 11.0, h: 0.3,
      fontSize: 11, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });

    const screens = [
      '1. Student Dashboard', '2. Mathematics Hub', '3. English Hub', '4. EVS Hub',
      '5. Practice Hub', '6. Addition Lesson (Apples)', '7. Word Matching', '8. Fruit/Veg Sorting',
      '9. Visual Calculator', '10. My Learning Progress', '11. Educator Portal'
    ];

    screens.forEach((s, idx) => {
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const sx = 1.1 + col * 2.85;
      const sy = 5.3 + row * 0.48;

      slide.addShape(pptx.ShapeType.roundRect, {
        sx, y: sy, w: 2.7, h: 0.4,
        rectRadius: 0.08, fill: { color: 'F1F5F9' }
      });
      slide.addText(s, {
        sx, y: sy, w: 2.7, h: 0.4,
        fontSize: 9.5, bold: true, color: C_PRIMARY, align: 'center', valign: 'middle', fontFace: 'Calibri'
      });
    });

    slide.addNotes('Learn & Grow is built as a single-page application hosted live on GitHub Pages. Moving between lessons never flashes a blank screen. The entire platform consists of 11 purposeful screens, with persistent Back and Home buttons at all times.');
  }

  // -------------------------------------------------------------
  // SLIDE 20: Visual Interface Design & Sensory Tranquility
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Visual Design System: Sensory Tranquility & Typography', 'Working Website');

    // 4 Visual Cards
    const designCards = [
      {
        title: 'Anti-Glare Warm Canvas',
        hex: '#FAF8F5 (Warm Ivory)',
        desc: 'Replaces blinding #FFFFFF stark white with warm ivory canvas to eliminate photophobic visual fatigue and eye-rubbing.',
        color: '78716C', bg: 'FAF8F5', border: 'D6D3D1'
      },
      {
        title: 'Muted Pastel Palette',
        hex: '#7B79D1, #87A987, #72A0C1',
        desc: 'Soft lavender, calm sage green, and pastel blue reduce sensory hyper-arousal while maintaining WCAG AAA contrast ratios.',
        color: C_ACCENT_PURPLE, bg: 'EEF2FF', border: 'C7D2FE'
      },
      {
        title: 'Nunito Accessible Typography',
        hex: 'Rounded Sans-Serif Typeface',
        desc: 'Clear character demarcation, open counters, rounded terminals. Three font sizes: Small (15px), Medium (18px), Large (22px).',
        color: C_ACCENT_BLUE, bg: 'F0F9FF', border: 'BAE6FD'
      },
      {
        title: 'Motor-Tolerant Touch Targets',
        hex: 'Size ≥ 48 × 48 px',
        desc: 'Generous 16px internal padding, large click targets, and distinct visual glow states to accommodate dyspraxic motor imprecision.',
        color: C_ACCENT_SAGE, bg: 'F0FDF4', border: 'BBF7D0'
      }
    ];

    designCards.forEach((d, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.8 + col * 6.0;
      const y = 1.7 + row * 2.3;

      slide.addShape(pptx.ShapeType.roundRect, {
        x, y, w: 5.7, h: 2.1,
        rectRadius: 0.12, fill: { color: d.bg }, line: { color: d.border, width: 1.5 }
      });

      slide.addText(d.title, {
        x: x + 0.25, y: y + 0.15, w: 5.2, h: 0.35,
        fontSize: 13, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addText(d.hex, {
        x: x + 0.25, y: y + 0.5, w: 5.2, h: 0.25,
        fontSize: 10, bold: true, color: d.color, fontFace: 'Calibri'
      });
      slide.addText(d.desc, {
        x: x + 0.25, y: y + 0.8, w: 5.2, h: 1.15,
        fontSize: 10.5, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 14
      });
    });

    // Theme toggle note
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.4, w: 11.7, h: 0.55,
      rectRadius: 0.08, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('Includes Dark Navy Theme toggle (#0F172A) with soft golden accents for learners with severe light sensitivities.', {
      x: 1.0, y: 6.4, w: 11.3, h: 0.55,
      fontSize: 10.5, color: C_PRIMARY, align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    slide.addNotes('Every color and pixel was chosen based on evidence. The warm ivory background #FAF8F5 eliminates the harsh glare that 75% of staff reported, while Nunito provides superior readability for neurodivergent learners.');
  }

  // -------------------------------------------------------------
  // SLIDE 21: Interactive Educational Modules & Practice Hub
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Interactive Educational Modules & Practice Hub', 'Working Website');

    const modules = [
      {
        title: 'Concrete Addition: Apple Manipulatives',
        spec: '2 Apples + 3 Apples = 5 Apples',
        desc: 'Solves the abstract math barrier (Theme 4). Children tap each apple individually. Each tap plays a distinct harmonic chime and counts aloud (1, 2, 3, 4, 5) before answer choices (4, 5, 6) appear.',
        color: 'DC2626', bg: 'FEF2F2'
      },
      {
        title: 'Visual Dot-Counter Calculator',
        spec: 'Sensory-Friendly Tactile Math Pad',
        desc: 'Large numbered keys (0–9) that display matching dot arrays in real time. Numbers are not merely symbols—they are visible, countable physical representations that ground arithmetic concretely.',
        color: C_ACCENT_BLUE, bg: 'F0F9FF'
      },
      {
        title: 'Multimodal Practice Hub',
        spec: 'Matching, Sorting, Star Counting',
        desc: 'Picture-word matching (Sun, Tree, Book); Category sorting (Fruits vs. Vegetables into labelled baskets); Object counting with stars. All accompanied by gentle sine-wave auditory reinforcement.',
        color: C_ACCENT_SAGE, bg: 'F0FDF4'
      }
    ];

    modules.forEach((m, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 1.7, w: 3.7, h: 4.2,
        rectRadius: 0.15, fill: { color: m.bg }, line: { color: m.color, width: 2 }
      });

      slide.addText(m.title, {
        x: x + 0.25, y: 1.9, w: 3.2, h: 0.6,
        fontSize: 13.5, bold: true, color: m.color, fontFace: 'Calibri'
      });
      slide.addText(m.spec, {
        x: x + 0.25, y: 2.55, w: 3.2, h: 0.35,
        fontSize: 10, bold: true, color: C_NAVY, fontFace: 'Calibri'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.25, y: 2.95, w: 3.2, h: 0,
        line: { color: m.color, width: 1 }
      });
      slide.addText(m.desc, {
        x: x + 0.25, y: 3.1, w: 3.2, h: 2.6,
        fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 16
      });
    });

    // Sound note
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.1, w: 11.7, h: 0.75,
      rectRadius: 0.1, fill: { color: 'F1F5F9' }, line: { color: 'CBD5E1', width: 1 }
    });
    slide.addText('AUDITORY DESIGN: Sounds are generated in code via the Web Audio API as pure sine-wave tones (440–659 Hz), avoiding the sharp abrasive transients of recorded buzzer sound effects.', {
      x: 1.0, y: 6.15, w: 11.3, h: 0.65,
      fontSize: 10.5, bold: true, color: C_NAVY, align: 'center', fontFace: 'Calibri'
    });

    slide.addNotes('In the addition module, children do not face abstract symbols alone. They touch each apple, hear a gentle tone, and build conceptual understanding before answering. All audio uses pure sine synthesis.');
  }

  // -------------------------------------------------------------
  // SLIDE 22: Educator & Parent Monitoring Portal
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Educator & Parent Monitoring Portal', 'Working Website');

    // 2 Halves layout
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 1.7, w: 5.6, h: 4.2,
      rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('PORTAL ARCHITECTURE & SECURITY', {
      x: 1.1, y: 1.9, w: 5.0, h: 0.35,
      fontSize: 12, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '• PIN-Protected Gateway: ', options: { bold: true, color: C_NAVY } },
      { text: 'Secured with default PIN (1234) to prevent accidental learner tampering.\n\n' },
      { text: '• Discrete Adult Space: ', options: { bold: true, color: C_NAVY } },
      { text: 'Teacher dashboards and progress metrics are strictly separated from student screens to prevent cognitive visual clutter.\n\n' },
      { text: '• Individual Learner Profiles: ', options: { bold: true, color: C_NAVY } },
      { text: 'Tracks Aarav, Diya, Vihaan, and custom students with sensory notes and IEP goals.' }
    ], { x: 1.1, y: 2.35, w: 5.0, h: 3.3, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15 });

    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.9, y: 1.7, w: 5.6, h: 4.2,
      rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: 'CBD5E1', width: 1.5 }
    });
    slide.addText('CORE CLINICAL CAPABILITIES', {
      x: 7.2, y: 1.9, w: 5.0, h: 0.35,
      fontSize: 12, bold: true, color: C_NAVY, fontFace: 'Calibri'
    });
    slide.addText([
      { text: '• IEP Goal Tracking: ', options: { bold: true, color: C_ACCENT_SAGE } },
      { text: 'Direct percentage tracking of Individualized Education Program objectives (e.g., Single-Digit Addition Mastery: 80%).\n\n' },
      { text: '• Sensory Accommodations Log: ', options: { bold: true, color: C_ACCENT_SAGE } },
      { text: 'Records learner preferences (e.g., Muted lavender palette, 0% sound volume, 18px text).\n\n' },
      { text: '• LocalStorage Data Export: ', options: { bold: true, color: C_ACCENT_SAGE } },
      { text: 'Session performance, accuracy, and completion times can be exported to JSON/CSV for school progress meetings.' }
    ], { x: 7.2, y: 2.35, w: 5.0, h: 3.3, fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15 });

    // Bottom note
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.1, w: 11.7, h: 0.75,
      rectRadius: 0.08, fill: { color: 'EEF2FF' }, line: { color: C_ACCENT_PURPLE, width: 1 }
    });
    slide.addText('Fulfills REQ18 (M = 4.33; Teachers M = 4.40): Enables comprehensive adult oversight and institutional compliance without placing complex dashboard widgets in front of the autistic child.', {
      x: 1.0, y: 6.15, w: 11.3, h: 0.65,
      fontSize: 10.5, color: C_NAVY, align: 'center', fontFace: 'Calibri'
    });

    slide.addNotes('Special educators told us in Theme 6 that they need progress monitoring, but putting charts on the child\'s screen is distracting. Our PIN-protected educator portal provides discrete IEP tracking.');
  }

  // -------------------------------------------------------------
  // SLIDE 23: Discussion: Theoretical Concordance & Paradigm Shift
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Discussion & Theoretical Concordance', 'Discussion');

    const discPoints = [
      {
        title: 'Cognitive Architecture Alignment',
        desc: 'Commercial children\'s software operates on the premise that "more animations and faster music equal more engagement." For autistic learners, this induces sensory fragmentation. Learn & Grow proves that visual calm and singular focus produce superior task engagement.',
        color: C_ACCENT_PURPLE
      },
      {
        title: 'Affective Security Through Predictability',
        desc: 'The near-unanimous ratings for consistent screen structure (REQ01, M = 4.78) and permanent Back buttons (REQ05, M = 4.78) confirm that interface stability provides emotional grounding. When navigation is predictable, anxiety subsides, freeing executive bandwidth.',
        color: C_ACCENT_BLUE
      },
      {
        title: 'National Policy Implementation (India)',
        desc: 'Directly advances the mandates of India\'s Rights of Persons with Disabilities Act (RPwD, 2016) and National Education Policy (NEP 2020) by providing an open-access, browser-based accessible resource that requires zero licensing fees.',
        color: C_ACCENT_SAGE
      }
    ];

    discPoints.forEach((d, idx) => {
      const y = 1.7 + idx * 1.6;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8, y, w: 11.7, h: 1.4,
        rectRadius: 0.12, fill: { color: 'FFFFFF' }, line: { color: d.color, width: 2 }
      });
      slide.addText(d.title, {
        x: 1.1, y: y + 0.15, w: 11.0, h: 0.35,
        fontSize: 13, bold: true, color: d.color, fontFace: 'Calibri'
      });
      slide.addText(d.desc, {
        x: 1.1, y: y + 0.55, w: 11.0, h: 0.75,
        fontSize: 11, color: C_PRIMARY, fontFace: 'Calibri', lineSpacing: 15
      });
    });

    // Takeaway pill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.6, w: 11.7, h: 0.45,
      rectRadius: 0.08, fill: { color: '0F172A' }
    });
    slide.addText('Design Takeaway: Autism-adapted interface design is not about childish aesthetics; it is about cognitive clarity and sensory dignity.', {
      x: 0.8, y: 6.6, w: 11.7, h: 0.45,
      fontSize: 10.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    slide.addNotes('Our discussion highlights that good autism design challenges common industry wisdom. Eliminating loud fanfares and countdown clocks does not make an app boring—it makes it usable and humane for autistic children.');
  }

  // -------------------------------------------------------------
  // SLIDE 24: Conclusion, Recommendations & Future Research
  // -------------------------------------------------------------
  {
    const slide = pptx.addSlide();
    addHeader(slide, 'Conclusion, Recommendations & Future Roadmap', 'Conclusion');

    const conclusions = [
      {
        title: 'Core Conclusions',
        items: [
          'All 5 operational objectives successfully met.',
          'Established empirical needs baseline across N=50 stakeholders.',
          'Built & deployed working 11-screen web platform on GitHub Pages.'
        ],
        color: C_ACCENT_PURPLE, bg: 'EEF2FF'
      },
      {
        title: 'Recommendations for EdTech',
        items: [
          'Abolish harsh error buzzers and loud fanfares entirely.',
          'Adopt warm off-white canvases (#FAF8F5) as accessibility standard.',
          'Lock Back and Home buttons permanently in the top-left corner.'
        ],
        color: C_ACCENT_SAGE, bg: 'F0FDF4'
      },
      {
        title: 'Future Research Directions',
        items: [
          'Controlled longitudinal pre/post trial of academic learning gains.',
          'Eye-tracking & biometric pupillometry to measure visual fixation.',
          'Adaptive AI engine adjusting difficulty based on response latency.'
        ],
        color: C_ACCENT_BLUE, bg: 'F0F9FF'
      }
    ];

    conclusions.forEach((c, idx) => {
      const x = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x, y: 1.7, w: 3.7, h: 4.4,
        rectRadius: 0.15, fill: { color: c.bg }, line: { color: c.color, width: 2 }
      });
      slide.addText(c.title, {
        x: x + 0.25, y: 1.9, w: 3.2, h: 0.45,
        fontSize: 14, bold: true, color: c.color, fontFace: 'Calibri'
      });
      slide.addShape(pptx.ShapeType.line, {
        x: x + 0.25, y: 2.4, w: 3.2, h: 0,
        line: { color: c.color, width: 1 }
      });

      const bulletList = c.items.map(it => ({ text: '• ' + it + '\n\n', options: { fontSize: 11, color: C_PRIMARY } }));
      slide.addText(bulletList, {
        x: x + 0.25, y: 2.6, w: 3.2, h: 3.3,
        fontFace: 'Calibri', lineSpacing: 16
      });
    });

    // Final Closing Banner
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8, y: 6.3, w: 11.7, h: 0.75,
      rectRadius: 0.1, fill: { color: '0F172A' }
    });
    slide.addText('Thank You! Questions & Discussion Welcomed | Candidate: Smayra (23BHP70113) | Supervisor: Dr. Kulbeer Kaur', {
      x: 0.8, y: 6.3, w: 11.7, h: 0.75,
      fontSize: 11.5, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle', fontFace: 'Calibri'
    });

    slide.addNotes('In conclusion, this project provides a validated, stakeholder-derived specification and an open-access working educational interface for autistic learners. Thank you, and I look forward to your questions.');
  }

  // Save presentation
  const outputFileName = 'Autism_Adapted_Educational_Interface_Presentation.pptx';
  const outputPath = path.join(__dirname, outputFileName);
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Successfully generated presentation at: ${outputPath}`);

  // Also copy to Artifact Directory
  const artifactPath = path.join('C:\\Users\\user\\.gemini\\antigravity\\brain\\82c4e6a3-f809-4fd4-a319-b55bb18dcd69', outputFileName);
  fs.copyFileSync(outputPath, artifactPath);
  console.log(`Successfully copied presentation to artifact dir: ${artifactPath}`);
}

createPresentation().catch(err => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
