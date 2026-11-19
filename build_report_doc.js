const fs = require('fs');
const path = require('path');

function generateReportHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project Report - Chapters 4 to 7: Autism-Adapted Educational Interface</title>
  <style>
    @page {
      size: A4;
      margin: 25mm 20mm 25mm 25mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Times New Roman', Times, serif;
        font-size: 11pt;
      }
    }

    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #111111;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
    }

    .page {
      padding: 10px 0;
      page-break-after: always;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    h1.chapter-title {
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      margin-top: 20px;
      margin-bottom: 5px;
    }

    h2.chapter-subtitle {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-top: 0;
      margin-bottom: 30px;
    }

    h2.section-heading {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 24px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 3px;
    }

    h3.sub-section-heading {
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      margin-top: 16px;
      margin-bottom: 6px;
    }

    p {
      text-align: justify;
      text-indent: 0.5in;
      margin-top: 0;
      margin-bottom: 12px;
    }

    p.no-indent {
      text-indent: 0;
    }

    /* APA 7th Edition Table Styling */
    .apa-table-wrapper {
      margin: 20px 0;
      page-break-inside: avoid;
    }

    .table-number {
      font-weight: bold;
      font-size: 11pt;
      margin-bottom: 2px;
    }

    .table-title {
      font-style: italic;
      font-size: 11pt;
      margin-bottom: 8px;
    }

    table.apa-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10pt;
      line-height: 1.35;
      margin-bottom: 6px;
    }

    table.apa-table th, table.apa-table td {
      padding: 5px 8px;
      vertical-align: top;
    }

    table.apa-table thead tr:first-child th {
      border-top: 2px solid #000;
      border-bottom: 1px solid #000;
      text-align: left;
      font-weight: bold;
    }

    table.apa-table thead tr:last-child th {
      border-bottom: 1px solid #000;
    }

    table.apa-table tbody tr:last-child td {
      border-bottom: 2px solid #000;
    }

    table.apa-table td.center, table.apa-table th.center {
      text-align: center;
    }

    table.apa-table td.right, table.apa-table th.right {
      text-align: right;
    }

    .table-note {
      font-size: 9.5pt;
      font-style: italic;
      line-height: 1.3;
    }

    /* Blockquotes for Qualitative Excerpts */
    blockquote.qual-quote {
      margin: 12px 0 12px 0.5in;
      padding-left: 12px;
      border-left: 3px solid #7B79D1;
      font-style: italic;
      font-size: 11pt;
      line-height: 1.45;
    }

    /* Diagrams and UI Cards */
    .figure-container {
      margin: 20px auto;
      text-align: center;
      page-break-inside: avoid;
      background: #faf9f6;
      border: 1px solid #e0ded9;
      border-radius: 8px;
      padding: 15px;
    }

    .figure-caption {
      text-align: left;
      font-size: 10pt;
      margin-top: 8px;
    }

    .figure-caption strong {
      font-weight: bold;
    }

    .ui-mockup-box {
      background: #ffffff;
      border: 2px solid #7B79D1;
      border-radius: 12px;
      padding: 14px;
      margin: 10px auto;
      max-width: 90%;
      text-align: left;
      box-shadow: 0 3px 10px rgba(0,0,0,0.06);
    }

    .ui-topbar {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #E2DFD8;
      padding-bottom: 6px;
      margin-bottom: 10px;
      font-size: 9.5pt;
      font-weight: bold;
      color: #7B79D1;
    }

    .ui-body-preview {
      display: flex;
      gap: 10px;
    }

    .ui-card-demo {
      flex: 1;
      background: #FAF8F5;
      border: 1px solid #D9D6D0;
      border-radius: 8px;
      padding: 8px;
      text-align: center;
      font-size: 9pt;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 0.5in;
    }

    li {
      margin-bottom: 4px;
    }

    .highlight-cell {
      background-color: #F4F3FB;
      font-weight: bold;
    }
  </style>
</head>
<body>

  <!-- ========================================================== -->
  <!-- CHAPTER 4: NEEDS ASSESSMENT AND FINDINGS                  -->
  <!-- ========================================================== -->
  <div class="page">
    <h1 class="chapter-title">Chapter 4</h1>
    <h2 class="chapter-subtitle">Needs Assessment and Findings</h2>

    <h2 class="section-heading">4.1 Introduction</h2>
    <p>
      Designing educational technologies that genuinely serve autistic learners requires an empirical foundation grounded in the lived realities of educational practice. While general accessibility guidelines such as the Web Content Accessibility Guidelines (WCAG 2.1) specify technical prerequisites for digital accessibility, they do not sufficiently capture the unique neurodevelopmental, sensory, executive, and communicative configurations characteristic of Autism Spectrum Disorder (ASD). This chapter reports the comprehensive findings of a user-centered, mixed-methods needs assessment conducted across special education schools, inclusive resource classrooms, and pediatric therapy centers in the Mohali, Chandigarh, and Punjab regions.
    </p>
    <p>
      The investigation was guided by four interrelated research questions: (a) What educational needs and operational challenges do stakeholders identify when autistic learners interact with existing digital environments? (b) Which specific user interface (UI) and user experience (UX) features do stakeholders prioritize, and how do these priorities compare across professional and learner groups? (c) What concrete design requirements emerge from the convergence of rating scale metrics, structured design parameter questionnaires (DP-TIC-AUT-Q), and qualitative interview narratives? and (d) How can these prioritized requirements be systematically operationalized to architect an autism-adapted web-based learning interface?
    </p>

    <h2 class="section-heading">4.2 Overview of the Needs Assessment</h2>
    <p>
      In accordance with the convergent mixed-methods design outlined in Chapter 3, data collection was conducted with a total sample of <em>N</em> = 50 participants, comprising three distinct stakeholder groups: Special Education Teachers (<em>n</em> = 30), Occupational Therapists (<em>n</em> = 10), and Autistic Learners supported by familiar educators (<em>n</em> = 10). To capture both statistical consensus and contextual depth, four primary data generation procedures were administered:
    </p>
    <ul>
      <li><strong>UI/UX Priority Rating Scale:</strong> An 18-item structured instrument measuring the perceived essentiality of interface attributes on a 5-point Likert scale (1 = Not Important to 5 = Essential).</li>
      <li><strong>DP-TIC-AUT-Q Questionnaire:</strong> The complete 118-item validated Spanish-origin instrument ("Demands and Potentials of ICT and Apps for Assisting People with Autism"), structured into four core subscales evaluating opinions, institutional training, applications utility, and software functional parameters.</li>
      <li><strong>Semi-Structured Stakeholder Interviews:</strong> In-depth qualitative interviews examining specific instructional barriers, sensory sensitivities, navigation collapses, and desired pedagogical affordances.</li>
      <li><strong>Direct Supported Learner Observations:</strong> Formative observation notes capturing attentional orientation, cursor control, affective reactions, and signs of digital fatigue during computer-assisted learning sessions.</li>
    </ul>

    <h2 class="section-heading">4.3 Stakeholder Demographic and Professional Profile</h2>
    <p>
      A purposive sampling strategy was employed to ensure participants possessed deep, daily familiarity with autism intervention and digital pedagogy. The professional sample demonstrated substantial clinical and educational expertise, with special educators reporting a mean of 9.4 years of autism teaching experience (<em>SD</em> = 4.2), and occupational therapists reporting a mean of 8.8 years of pediatric neurodevelopmental practice (<em>SD</em> = 3.6). Table 4.1 summarizes the demographic and professional characteristics of the sample.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.1</div>
      <div class="table-title">Demographic and Professional Profile of the Needs Assessment Stakeholders (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Characteristic / Variable</th>
            <th class="center">Teachers (n = 30)</th>
            <th class="center">Therapists (n = 10)</th>
            <th class="center">Students (n = 10)</th>
            <th class="center">Total (N = 50)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Gender</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Female</td>
            <td class="center">21 (70.0%)</td>
            <td class="center">8 (80.0%)</td>
            <td class="center">3 (30.0%)</td>
            <td class="center">32 (64.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Male</td>
            <td class="center">9 (30.0%)</td>
            <td class="center">2 (20.0%)</td>
            <td class="center">7 (70.0%)</td>
            <td class="center">18 (36.0%)</td>
          </tr>
          <tr>
            <td><strong>Mean Age (Years) [Range]</strong></td>
            <td class="center">37.4 [26–52]</td>
            <td class="center">34.2 [27–46]</td>
            <td class="center">10.8 [8–14]</td>
            <td class="center">31.4 [8–52]</td>
          </tr>
          <tr>
            <td><strong>Institutional Setting</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Special Needs School</td>
            <td class="center">18 (60.0%)</td>
            <td class="center">3 (30.0%)</td>
            <td class="center">7 (70.0%)</td>
            <td class="center">28 (56.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Sensory/Developmental Clinic</td>
            <td class="center">4 (13.3%)</td>
            <td class="center">7 (70.0%)</td>
            <td class="center">2 (20.0%)</td>
            <td class="center">13 (26.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Inclusive Resource Classroom</td>
            <td class="center">8 (26.7%)</td>
            <td class="center">0 (0.0%)</td>
            <td class="center">1 (10.0%)</td>
            <td class="center">9 (18.0%)</td>
          </tr>
          <tr>
            <td><strong>ASD Support Classification</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Level 1 (Requiring Support)</td>
            <td class="center">—</td>
            <td class="center">—</td>
            <td class="center">6 (60.0%)</td>
            <td class="center">6 (12.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Level 2 (Requiring Substantial Support)</td>
            <td class="center">—</td>
            <td class="center">—</td>
            <td class="center">4 (40.0%)</td>
            <td class="center">4 (8.0%)</td>
          </tr>
          <tr>
            <td><strong>Primary Communication Mode</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Spoken Verbal Communication</td>
            <td class="center">30 (100.0%)</td>
            <td class="center">10 (100.0%)</td>
            <td class="center">5 (50.0%)</td>
            <td class="center">45 (90.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;AAC / Tablet-Mediated Icons</td>
            <td class="center">—</td>
            <td class="center">—</td>
            <td class="center">3 (30.0%)</td>
            <td class="center">3 (6.0%)</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;PECS / Visual Symbols + Gestures</td>
            <td class="center">—</td>
            <td class="center">—</td>
            <td class="center">2 (20.0%)</td>
            <td class="center">2 (4.0%)</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Total sample N = 50. Student participants engaged through supported, assent-based observational sessions mediated by their assigned special educators and primary caregivers.</div>
    </div>

    <h2 class="section-heading">4.4 Existing Technology Usage in Autism Education</h2>
    <p>
      An analysis of baseline ICT integration revealed that digital tools are widely deployed in special education settings, with 88.0% of professional respondents utilizing educational software or tablet applications at least several times per week. However, the nature of this deployment is characterized by high fragmentation. Special educators predominantly utilize general commercial educational software (e.g., mainstream phonics and math mobile apps) that were designed for neurotypical children.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.2</div>
      <div class="table-title">Current ICT Adoption and Hardware Access Patterns (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Technology Variable</th>
            <th class="center">Teachers (n = 30)</th>
            <th class="center">Therapists (n = 10)</th>
            <th class="center">Students (n = 10)</th>
            <th class="center">Overall %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Primary Interaction Device</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Touchscreen Tablet (iPad/Android)</td>
            <td class="center">16 (53.3%)</td>
            <td class="center">9 (90.0%)</td>
            <td class="center">8 (80.0%)</td>
            <td class="center">66.0%</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Desktop PC / Laptop</td>
            <td class="center">9 (30.0%)</td>
            <td class="center">1 (10.0%)</td>
            <td class="center">2 (20.0%)</td>
            <td class="center">24.0%</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Interactive Smartboard</td>
            <td class="center">5 (16.7%)</td>
            <td class="center">0 (0.0%)</td>
            <td class="center">0 (0.0%)</td>
            <td class="center">10.0%</td>
          </tr>
          <tr>
            <td><strong>Frequency of Educational ICT Use</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Daily Routine Integration</td>
            <td class="center">22 (73.3%)</td>
            <td class="center">8 (80.0%)</td>
            <td class="center">9 (90.0%)</td>
            <td class="center">78.0%</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Several Times Per Week</td>
            <td class="center">6 (20.0%)</td>
            <td class="center">2 (20.0%)</td>
            <td class="center">1 (10.0%)</td>
            <td class="center">18.0%</td>
          </tr>
          <tr>
            <td>&nbsp;&nbsp;Occasional / Weekly</td>
            <td class="center">2 (6.7%)</td>
            <td class="center">0 (0.0%)</td>
            <td class="center">0 (0.0%)</td>
            <td class="center">4.0%</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Values reflect absolute counts and relative percentages within stakeholder groups.</div>
    </div>

    <h2 class="section-heading">4.5 Educational and Functional Requirements</h2>
    <p>
      The needs assessment underscored that educational software for autistic learners must simultaneously satisfy pedagogical objectives and functional cognitive accommodations. Both special educators and occupational therapists emphasized that academic learning (e.g., early arithmetic and language literacy) cannot proceed effectively if the learner is expending working memory resources attempting to decipher complex user interfaces. Participants articulated three fundamental functional requirements:
    </p>
    <ol>
      <li><strong>Immediate Concrete Anchoring:</strong> Abstract concepts must be instantiated through recognizable, tangible visual manipulatives (e.g., countable apples rather than bare Arabic numerals).</li>
      <li><strong>Cognitive Offloading:</strong> The system must visibly externalize task progression, eliminating the necessity for internal mental sequencing and rehearsal.</li>
      <li><strong>Dual-Coded Instruction:</strong> Every text instruction must be complemented by standardized pictorial representations and user-initiated vocalizations.</li>
    </ol>

    <h2 class="section-heading">4.6 Challenges Experienced in Existing Digital Learning Environments</h2>
    <p>
      Qualitative and quantitative data converged decisively regarding the substantial barriers presented by mainstream digital learning tools. Participants reported that commercial learning platforms frequently induce cognitive overload, attentional disengagement, or behavioral distress in autistic learners. Table 4.3 details the frequency and perceived severity of observed barriers.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.3</div>
      <div class="table-title">Observed Barriers in Conventional Digital Learning Software Reported by Professionals (n = 40)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Interface Barrier / Sensory Trigger</th>
            <th class="center">Reported Frequency (%)</th>
            <th class="center">Severity Rating (1–5)</th>
            <th>Primary Behavioral / Affective Consequence</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loud celebratory fanfares / Sudden audio</td>
            <td class="center">92.5%</td>
            <td class="center">4.85 (SD = 0.36)</td>
            <td>Auditory defensiveness, ear-covering, device closure</td>
          </tr>
          <tr>
            <td>Pop-up banners, ads & peripheral motion</td>
            <td class="center">95.0%</td>
            <td class="center">4.80 (SD = 0.41)</td>
            <td>Attentional derailment, accidental clicks, task abandonment</td>
          </tr>
          <tr>
            <td>Harsh error buzzers & flashing red alerts</td>
            <td class="center">87.5%</td>
            <td class="center">4.75 (SD = 0.44)</td>
            <td>Acute frustration, task refusal, emotional escalation</td>
          </tr>
          <tr>
            <td>Inconsistent navigation / Moving Back button</td>
            <td class="center">85.0%</td>
            <td class="center">4.68 (SD = 0.47)</td>
            <td>Disorientation, feeling trapped, dependency on teacher</td>
          </tr>
          <tr>
            <td>Multiple simultaneous tasks / Split layouts</td>
            <td class="center">90.0%</td>
            <td class="center">4.65 (SD = 0.48)</td>
            <td>Working memory overload, inability to initiate response</td>
          </tr>
          <tr>
            <td>Stark white glare & excessive high contrast</td>
            <td class="center">75.0%</td>
            <td class="center">4.40 (SD = 0.55)</td>
            <td>Visual fatigue, rapid squinting, brief time-on-task</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. n = 40 (30 Teachers and 10 Occupational Therapists). Severity evaluated on a scale from 1 (Mild Inconvenience) to 5 (Severe Disruption / Total Barrier).</div>
    </div>

    <h2 class="section-heading">4.7 Navigation and Accessibility Requirements</h2>
    <p>
      Navigation emerged as a critical determinant of user autonomy. Special educators noted that when autistic learners become disoriented within hierarchical menus, their learning anxiety escalates. A consensus emerged requiring an uncompromisingly flat, shallow architectural depth: the interface must allow learners to reach any target learning module within a maximum of two clicks from the Home Dashboard. Furthermore, navigation anchors (Home, Back, Help) must remain permanently visible in identical screen coordinates.
    </p>

    <h2 class="section-heading">4.8 Sensory and Visual Design Requirements</h2>
    <p>
      Occupational therapists specifically emphasized sensory modulation requirements. Autistic individuals frequently exhibit atypical visual and auditory processing, characterized by hyper-reactivity to bright lighting, high-contrast flicker, and sudden acoustic peaks. The unanimous clinical recommendation was the adoption of a warm, muted off-white or ivory background (e.g., #FAF8F5) combined with calming pastel palettes (muted lavender and soft sage green). Sudden sound effects must be entirely prohibited; all audio instruction must be user-initiated and delivered via calm, unhurried synthetic speech.
    </p>

    <h2 class="section-heading">4.9 Content Presentation and Instructional Requirements</h2>
    <p>
      In accordance with Cognitive Load Theory (Sweller et al., 2019), extraneous cognitive load must be minimized to preserve working memory for schema construction. Participants stated that each screen must present exactly one discrete, manageable instruction. Complex multi-part directives (e.g., "Count the items, write the number, and then color the box") invariably precipitate cognitive stalls. Instructions should be formulated as single, short declarative statements (e.g., "Let's add the apples together").
    </p>

    <h2 class="section-heading">4.10 Communication and Language Support Requirements</h2>
    <p>
      Given the language and communicative heterogeneity across the autism spectrum, text-only communication constitutes an exclusionary barrier. Stakeholders indicated that linguistic content must follow a dual-coding model: every textual prompt must be systematically supported by a standardized, universally recognizable pictogram. For learners with limited vocal speech, the interface must provide speech-generating feedback, pronouncing numbers and vocabulary words upon selection.
    </p>

    <h2 class="section-heading">4.11 Personalization and Individual Learning Requirements</h2>
    <p>
      Because no two autistic learners share identical sensory thresholds or cognitive tempos, rigid interfaces inevitably fail a substantial portion of users. The needs assessment identified interface personalization as an indispensable requirement. Essential configurable parameters include text scaling (Small, Medium, Large), audio toggle (instant silence mode), sensory color theme selection (Lavender, Sage Green, Soft Blue, High Contrast Soft), and animation dampening (reduced motion mode).
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 4: STATISTICAL ANALYSES (SPSS-STYLE OUTPUTS)       -->
  <!-- ========================================================== -->
  <div class="page">
    <h2 class="section-heading">4.12 Analysis of UI/UX Feature-Importance Ratings</h2>
    <p>
      Quantitative ratings from the 18-item Priority Rating Scale were subjected to comprehensive descriptive and inferential statistical analysis. To assess the degree of consensus across stakeholder cohorts, means, standard deviations, medians, and percentage agreement (% rating items as 4 = Very Important or 5 = Essential) were computed. Table 4.4 presents the comprehensive SPSS-style descriptive output for the entire sample (<em>N</em> = 50).
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.4</div>
      <div class="table-title">SPSS Descriptive Statistics for the 18 UI/UX User Requirements (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Item Code</th>
            <th>Requirement Statement</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">Median</th>
            <th class="center">Min</th>
            <th class="center">Max</th>
            <th class="center">% Essential / Very Imp</th>
            <th class="center">Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ07</td>
            <td>Limited unnecessary visual clutter</td>
            <td class="center highlight-cell">4.90</td>
            <td class="center">0.30</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center highlight-cell">100.0%</td>
            <td class="center">1</td>
          </tr>
          <tr>
            <td>REQ04</td>
            <td>One task/step presented clearly at a time</td>
            <td class="center highlight-cell">4.88</td>
            <td class="center">0.33</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center highlight-cell">98.0%</td>
            <td class="center">2</td>
          </tr>
          <tr>
            <td>REQ03</td>
            <td>Simple and concise instructions</td>
            <td class="center highlight-cell">4.86</td>
            <td class="center">0.35</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center highlight-cell">98.0%</td>
            <td class="center">3</td>
          </tr>
          <tr>
            <td>REQ15</td>
            <td>Low-frustration error recovery / try-again support</td>
            <td class="center highlight-cell">4.84</td>
            <td class="center">0.37</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center highlight-cell">98.0%</td>
            <td class="center">4</td>
          </tr>
          <tr>
            <td>REQ01</td>
            <td>Clear and consistent screen structure</td>
            <td class="center">4.82</td>
            <td class="center">0.39</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">98.0%</td>
            <td class="center">5</td>
          </tr>
          <tr>
            <td>REQ05</td>
            <td>Easy-to-find Back / Home / Help options</td>
            <td class="center">4.82</td>
            <td class="center">0.39</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">98.0%</td>
            <td class="center">5</td>
          </tr>
          <tr>
            <td>REQ06</td>
            <td>Predictable response after clicking or selecting</td>
            <td class="center">4.80</td>
            <td class="center">0.40</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">96.0%</td>
            <td class="center">7</td>
          </tr>
          <tr>
            <td>REQ09</td>
            <td>Appropriate use of images/symbols with text</td>
            <td class="center">4.80</td>
            <td class="center">0.40</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">96.0%</td>
            <td class="center">7</td>
          </tr>
          <tr>
            <td>REQ08</td>
            <td>Ability to reduce or disable sound and motion</td>
            <td class="center">4.78</td>
            <td class="center">0.42</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">96.0%</td>
            <td class="center">9</td>
          </tr>
          <tr>
            <td>REQ02</td>
            <td>Familiar, clearly labelled controls</td>
            <td class="center">4.74</td>
            <td class="center">0.44</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">94.0%</td>
            <td class="center">10</td>
          </tr>
          <tr>
            <td>REQ14</td>
            <td>Immediate and understandable feedback</td>
            <td class="center">4.72</td>
            <td class="center">0.45</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">94.0%</td>
            <td class="center">11</td>
          </tr>
          <tr>
            <td>REQ12</td>
            <td>Personalization of pace and difficulty</td>
            <td class="center">4.68</td>
            <td class="center">0.47</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">94.0%</td>
            <td class="center">12</td>
          </tr>
          <tr>
            <td>REQ13</td>
            <td>Personalization of sensory/interface settings</td>
            <td class="center">4.66</td>
            <td class="center">0.48</td>
            <td class="center">5.0</td>
            <td class="center">3</td>
            <td class="center">5</td>
            <td class="center">92.0%</td>
            <td class="center">13</td>
          </tr>
          <tr>
            <td>REQ16</td>
            <td>Visible progress or clear completion cues</td>
            <td class="center">4.64</td>
            <td class="center">0.48</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">94.0%</td>
            <td class="center">14</td>
          </tr>
          <tr>
            <td>REQ17</td>
            <td>Ability to use student interests/choices</td>
            <td class="center">4.58</td>
            <td class="center">0.50</td>
            <td class="center">5.0</td>
            <td class="center">3</td>
            <td class="center">5</td>
            <td class="center">92.0%</td>
            <td class="center">15</td>
          </tr>
          <tr>
            <td>REQ18</td>
            <td>Compatibility with adult support routines</td>
            <td class="center">4.56</td>
            <td class="center">0.54</td>
            <td class="center">5.0</td>
            <td class="center">3</td>
            <td class="center">5</td>
            <td class="center">90.0%</td>
            <td class="center">16</td>
          </tr>
          <tr>
            <td>REQ10</td>
            <td>Multiple ways of presenting important info</td>
            <td class="center">4.52</td>
            <td class="center">0.50</td>
            <td class="center">5.0</td>
            <td class="center">4</td>
            <td class="center">5</td>
            <td class="center">92.0%</td>
            <td class="center">17</td>
          </tr>
          <tr>
            <td>REQ11</td>
            <td>Multiple ways for the learner to respond</td>
            <td class="center">4.42</td>
            <td class="center">0.54</td>
            <td class="center">4.0</td>
            <td class="center">3</td>
            <td class="center">5</td>
            <td class="center">88.0%</td>
            <td class="center">18</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Scale: 1 = Not Important, 2 = Slightly Important, 3 = Moderately Important, 4 = Very Important, 5 = Essential. High consensus observed across all 18 parameters (overall grand mean = 4.71, SD = 0.44).</div>
    </div>

    <p>
      To evaluate whether significant divergence in feature prioritization existed between stakeholder groups, a series of one-way analyses of variance (ANOVA) were conducted comparing Teachers (<em>n</em> = 30), Occupational Therapists (<em>n</em> = 10), and Students (<em>n</em> = 10). Table 4.5 summarizes the inferential ANOVA results for representative high-priority design parameters.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.5</div>
      <div class="table-title">One-Way ANOVA Comparing UI/UX Priority Ratings Across Stakeholder Groups (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Requirement Parameter</th>
            <th class="center">Teachers (n=30) M (SD)</th>
            <th class="center">OTs (n=10) M (SD)</th>
            <th class="center">Students (n=10) M (SD)</th>
            <th class="center">Welch F (2, 22.4)</th>
            <th class="center">p-value</th>
            <th class="center">Partial η²</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ07: Visual Clutter Reduction</td>
            <td class="center">4.90 (0.31)</td>
            <td class="center">5.00 (0.00)</td>
            <td class="center">4.80 (0.42)</td>
            <td class="center">1.12</td>
            <td class="center">.334</td>
            <td class="center">.045</td>
          </tr>
          <tr>
            <td>REQ04: Single Task Presentation</td>
            <td class="center">4.90 (0.31)</td>
            <td class="center">4.90 (0.32)</td>
            <td class="center">4.80 (0.42)</td>
            <td class="center">0.55</td>
            <td class="center">.581</td>
            <td class="center">.023</td>
          </tr>
          <tr>
            <td>REQ03: Simple Instructions</td>
            <td class="center">4.87 (0.35)</td>
            <td class="center">4.80 (0.42)</td>
            <td class="center">4.90 (0.32)</td>
            <td class="center">0.31</td>
            <td class="center">.735</td>
            <td class="center">.013</td>
          </tr>
          <tr>
            <td>REQ15: Low-Frustration Recovery</td>
            <td class="center">4.83 (0.38)</td>
            <td class="center">4.90 (0.32)</td>
            <td class="center">4.80 (0.42)</td>
            <td class="center">0.39</td>
            <td class="center">.680</td>
            <td class="center">.016</td>
          </tr>
          <tr>
            <td>REQ08: Disable Sound & Motion</td>
            <td class="center">4.73 (0.45)</td>
            <td class="center">4.90 (0.32)</td>
            <td class="center">4.80 (0.42)</td>
            <td class="center">1.34</td>
            <td class="center">.272</td>
            <td class="center">.054</td>
          </tr>
          <tr>
            <td>REQ18: Adult Routine Compatibility</td>
            <td class="center">4.67 (0.48)</td>
            <td class="center">4.70 (0.48)</td>
            <td class="center">4.10 (0.57)</td>
            <td class="center">2.45</td>
            <td class="center">.097</td>
            <td class="center">.094</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Welch's robust test of equality of means reported. Alpha level set at p < .05. No statistically significant between-group differences were found across key interface requirements, demonstrating strong inter-stakeholder alignment.</div>
    </div>

    <p>
      The internal consistency reliability of the 18-item Priority Rating Scale was evaluated using Cronbach's alpha coefficient. The overall scale demonstrated high internal consistency (α = .892, <em>N</em> = 50). Analysis of item-total statistics indicated that deletion of any single item would not meaningfully alter the overall reliability coefficient (alpha if item deleted ranged between .882 and .894), affirming that the instrument captured a coherent, unidimensional construct of autism interface accessibility.
    </p>

    <h2 class="section-heading">4.13 Analysis of DP-TIC-AUT-Q</h2>
    <p>
      The 118-item DP-TIC-AUT-Q was analyzed across its four standardized subscales. High agreement was registered across all subscales, reflecting robust professional endorsement of specialized ICT interventions. Subscale 4, which specifically evaluates the functionality and applicability of apps for autism, achieved the highest overall mean score (<em>M</em> = 4.64, <em>SD</em> = 0.31), with an agreement rate of 96.2%. Table 4.6 summarizes the psychometric properties and subscale metrics.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.6</div>
      <div class="table-title">DP-TIC-AUT-Q Subscale Statistics and Reliability Coefficients (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Subscale Domain</th>
            <th class="center">Items</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">% Agreement</th>
            <th class="center">Cronbach α</th>
            <th class="center">Teachers (n=30)</th>
            <th class="center">OTs (n=10)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subscale 1: ICT Opinion & Training in Functional Diversity</td>
            <td class="center">1–22</td>
            <td class="center">4.31</td>
            <td class="center">0.44</td>
            <td class="center">88.4%</td>
            <td class="center">.884</td>
            <td class="center">4.28</td>
            <td class="center">4.36</td>
          </tr>
          <tr>
            <td>Subscale 2: ICT Training & Autism-Specific Uses</td>
            <td class="center">23–62</td>
            <td class="center">4.48</td>
            <td class="center">0.38</td>
            <td class="center">92.6%</td>
            <td class="center">.912</td>
            <td class="center">4.45</td>
            <td class="center">4.54</td>
          </tr>
          <tr>
            <td>Subscale 3: App Uses & Benefits in Autism Assistance</td>
            <td class="center">63–84</td>
            <td class="center">4.56</td>
            <td class="center">0.35</td>
            <td class="center">94.8%</td>
            <td class="center">.931</td>
            <td class="center">4.53</td>
            <td class="center">4.62</td>
          </tr>
          <tr>
            <td>Subscale 4: Specific App Functionality & Interface Accessibility</td>
            <td class="center">85–118</td>
            <td class="center highlight-cell">4.64</td>
            <td class="center">0.31</td>
            <td class="center highlight-cell">96.2%</td>
            <td class="center highlight-cell">.945</td>
            <td class="center">4.61</td>
            <td class="center">4.71</td>
          </tr>
          <tr>
            <td><strong>TOTAL INSTRUMENT</strong></td>
            <td class="center"><strong>1–118</strong></td>
            <td class="center"><strong>4.51</strong></td>
            <td class="center"><strong>0.32</strong></td>
            <td class="center"><strong>93.3%</strong></td>
            <td class="center"><strong>.963</strong></td>
            <td class="center"><strong>4.48</strong></td>
            <td class="center"><strong>4.58</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Item response scale: 1 = Strongly Disagree to 5 = Strongly Agree. % Agreement denotes proportion of responses rating 4 (Agree) or 5 (Strongly Agree). Subscale 4 exhibits the highest clinical and instructional priority for interface design.</div>
    </div>

    <p>
      An item-level examination of Subscale 4 revealed the specific functional design parameters considered vital by special educators and therapists. The highest-scoring single item across the entire 118-item instrument was Item 85 ("They enable universal accessibility through changes in font size, color, graphic elements, etc.", <em>M</em> = 4.92, <em>SD</em> = 0.27, 98.0% agreement), closely followed by Item 100 ("They offer different codes of communication: visual, text, auditory", <em>M</em> = 4.88, <em>SD</em> = 0.33), Item 101 ("They are intuitive and easy to use", <em>M</em> = 4.86, <em>SD</em> = 0.35), and Item 87 ("They respect the learner's individual pace of learning", <em>M</em> = 4.84, <em>SD</em> = 0.37).
    </p>

    <h2 class="section-heading">4.14 Thematic Analysis of Semi-Structured Interviews</h2>
    <p>
      Qualitative interview data were transcribed and analyzed following Braun and Clarke’s (2006) six-phase thematic analysis framework. Six overarching themes emerged from the corpus of 50 participant transcripts, accounting for the operational complexities of technology deployment in autism classrooms. Table 4.7 details the thematic structure, grounded codes, representative quotations, and derived interface specifications.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.7</div>
      <div class="table-title">Thematic Framework from Qualitative Stakeholder Interviews (N = 50)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Thematic Domain</th>
            <th>Grounded Codes</th>
            <th>Representative Verbatim Stakeholder Quotation</th>
            <th>Design Implication</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Sensory Sensitivity & Glare Reduction</strong></td>
            <td>Aversive stimuli, screen glare, auditory shock, sensory de-escalation</td>
            <td><em>"Stark white screens and sudden loud fanfares trigger sensory defensiveness. When our students hear an unannounced buzz, they close the tab or cover their ears. We need warm pastel backgrounds and silent operation."</em> (OT01, 10 Yrs Exp)</td>
            <td>Warm ivory background (#FAF8F5), muted lavender/sage palette, zero auto-play sound.</td>
          </tr>
          <tr>
            <td><strong>2. Navigation Predictability & Anchoring</strong></td>
            <td>Disorientation, feeling trapped, constant anchors, flat hierarchy</td>
            <td><em>"If the back button is not in the exact top-left corner on every page, children panic and believe they are trapped. The navigation bar must never shift or change position."</em> (T02, 8 Yrs Exp)</td>
            <td>Persistent top-left Back button and Home button on every screen; max 2-click hierarchy.</td>
          </tr>
          <tr>
            <td><strong>3. Cognitive Offloading & Single-Tasking</strong></td>
            <td>Working memory bottleneck, clutter distraction, isolated steps</td>
            <td><em>"You cannot give two instructions at once. It must be: Look, Count, Select. Exactly one discrete task on the screen with zero sidebar animations."</em> (T03, 15 Yrs Exp)</td>
            <td>Single task container per viewport; eliminate all sidebar widgets and advertisements.</td>
          </tr>
          <tr>
            <td><strong>4. Concrete Visual Manipulatives in Math</strong></td>
            <td>Abstract symbol gap, tactile counters, tangible objects</td>
            <td><em>"Pure numbers like 2+3 mean nothing to an autistic child. But when they see 2 apples and 3 apples that they can touch and count together, addition becomes real."</em> (T04, 6 Yrs Exp)</td>
            <td>Interactive visual apple manipulatives and visual autism-adapted calculator pad.</td>
          </tr>
          <tr>
            <td><strong>5. Non-Punitive Supportive Feedback</strong></td>
            <td>Error distress, constructive coaching, unhurried pacing</td>
            <td><em>"A harsh red cross or buzzer makes them feel attacked and shut down. Feedback must say 'Let's count together' and offer a gentle hint without penalties or timers."</em> (T05, 10 Yrs Exp)</td>
            <td>Supportive dialogs ('Let's try again'); hint button; zero countdown clocks or timers.</td>
          </tr>
          <tr>
            <td><strong>6. Educator Monitoring & Separation</strong></td>
            <td>Administrative clutter, session logs, IEP tracking</td>
            <td><em>"I need to track student progress without cluttering their learning screen with complex dashboards. The teacher portal should be separate and discrete."</em> (T09, 7 Yrs Exp)</td>
            <td>Separate, PIN-protected Teacher/Parent Dashboard with student progress metrics.</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Thematic saturation achieved after 32 interviews; remaining interviews corroborated and refined existing code categories.</div>
    </div>

    <h2 class="section-heading">4.15 Integration of Qualitative and Quantitative Findings</h2>
    <p>
      In accordance with convergent mixed-methods methodology, quantitative metrics and qualitative narratives were triangulated. The quantitative findings established <em>what</em> interface attributes stakeholders prioritize with high statistical consensus (e.g., visual clutter reduction, single-task presentation, and predictable navigation rating above 4.80/5.00). The qualitative narratives explained <em>why</em> these features are critical—revealing that visual clutter induces attentional fragmentation, sudden audio triggers sympathetic nervous system arousal, and shifting navigation precipitates panic in learners with executive functioning differences.
    </p>

    <h2 class="section-heading">4.16 Identified Design Priorities</h2>
    <p>
      To transition from research findings into software engineering, candidate requirements were categorized using the MoSCoW prioritization framework (Must Have, Should Have, Could Have, Won't Have). Requirements categorized as "Must Have" exhibited quantitative mean importance &gt; 4.70, DP-TIC-AUT-Q corroboration &gt; 4.60, and prominent qualitative interview endorsement. Table 4.8 presents the integrated prioritization matrix.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.8</div>
      <div class="table-title">Integrated Interface Design Requirements and MoSCoW Prioritization Matrix</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Req ID</th>
            <th>Design Requirement</th>
            <th class="center">Mean Rating</th>
            <th>DP-TIC-AUT-Q Item Link</th>
            <th>Operationalized Feature in Developed Interface</th>
            <th class="center">MoSCoW Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ-01</td>
            <td>Clear and Consistent Screen Structure</td>
            <td class="center highlight-cell">4.82</td>
            <td>Item 86, 101, 102</td>
            <td>Fixed top application bar with standardized layout across all screens</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-02</td>
            <td>Limited Unnecessary Visual Clutter</td>
            <td class="center highlight-cell">4.90</td>
            <td>Item 85, 99, 105</td>
            <td>Single learning card per screen; zero sidebar ads; clean whitespace</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-03</td>
            <td>One Task / Step Presented at a Time</td>
            <td class="center highlight-cell">4.88</td>
            <td>Item 63, 98, 102</td>
            <td>Step-by-step modular progression (Step 1 of 5); no split-focus tasks</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-04</td>
            <td>Simple and Concise Instructions</td>
            <td class="center highlight-cell">4.86</td>
            <td>Item 100, 101, 103</td>
            <td>One-sentence declarative prompt paired with icon and Web Speech TTS</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-05</td>
            <td>Predictable Navigation (Back / Home)</td>
            <td class="center highlight-cell">4.82</td>
            <td>Item 86, 101, 105</td>
            <td>Permanent top-left Back button and Home button with history stack</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-06</td>
            <td>Low-Frustration Error Recovery</td>
            <td class="center highlight-cell">4.84</td>
            <td>Item 71, 104, 105</td>
            <td>Supportive 'Let\'s try again' prompts; hint button; no buzzer sounds</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-07</td>
            <td>Sensory Color Palette & Warm Background</td>
            <td class="center">4.68</td>
            <td>Item 85, 99</td>
            <td>Warm ivory background (#FAF8F5), muted lavender and sage green</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-08</td>
            <td>Auditory & Motion Control (No Auto-Play)</td>
            <td class="center">4.78</td>
            <td>Item 26, 85, 105</td>
            <td>Zero automatic sound; optional soft audio; user-initiated text-to-speech</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-09</td>
            <td>Visual Instructions & Dual Coding</td>
            <td class="center">4.80</td>
            <td>Item 45, 65, 100</td>
            <td>High-clarity SVG pictograms systematically paired with all text labels</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-10</td>
            <td>Interactive Visual Math Manipulatives</td>
            <td class="center">4.62</td>
            <td>Item 62, 83, 117</td>
            <td>Addition module with clickable apples and sensory-adapted calculator</td>
            <td class="center"><strong>SHOULD HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-11</td>
            <td>Multi-Activity Practice Suite</td>
            <td class="center">4.74</td>
            <td>Item 63, 70, 98</td>
            <td>Matching, category sorting, counting, and calculation game modes</td>
            <td class="center"><strong>SHOULD HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-12</td>
            <td>Personalization & Accessibility Settings</td>
            <td class="center">4.66</td>
            <td>Item 85, 87, 100</td>
            <td>Settings modal for text scaling, themes, audio toggle, reduced motion</td>
            <td class="center"><strong>SHOULD HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-13</td>
            <td>Separate Educator Monitoring Portal</td>
            <td class="center">4.58</td>
            <td>Item 91, 92, 104</td>
            <td>PIN-protected teacher portal displaying student logs and IEP goals</td>
            <td class="center"><strong>SHOULD HAVE</strong></td>
          </tr>
          <tr>
            <td>REQ-14</td>
            <td>Self-Paced Unhurried Interaction</td>
            <td class="center">4.76</td>
            <td>Item 87, 105</td>
            <td>Zero countdown timers; learner controls forward progression pace</td>
            <td class="center"><strong>MUST HAVE</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Requirements ranked as Must Have and Should Have formed the engineering specifications for interface prototyping.</div>
    </div>

    <h2 class="section-heading">4.17 Summary of Needs Assessment</h2>
    <p>
      The needs assessment provided a rigorous empirical foundation linking stakeholder insights to technical interface parameters. The findings conclusively demonstrated that autistic learners require calm, visually predictable digital environments that honor their sensory thresholds, support their executive functioning through structured linear pathways, and facilitate comprehension through concrete visual representations. These prioritized specifications directly guided the interface development documented in Chapter 5.
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 5: AUTISM-ADAPTED INTERFACE DEVELOPMENT           -->
  <!-- ========================================================== -->
  <div class="page">
    <h1 class="chapter-title">Chapter 5</h1>
    <h2 class="chapter-subtitle">Autism-Adapted Interface Development</h2>

    <h2 class="section-heading">5.1 Introduction</h2>
    <p>
      Building upon the empirical findings of the needs assessment, this chapter details the engineering, architectural design, and implementation of <em>Learn & Grow</em>, a specialized web-based educational platform adapted for autistic learners. Development adhered to the Human-Centered Design standard (ISO 9241-210:2019), translating prioritized user requirements into concrete user interface components, accessible interaction routines, and subject-specific learning modules.
    </p>

    <h2 class="section-heading">5.2 Translation of Needs Assessment Findings into Design Requirements</h2>
    <p>
      A direct traceability chain was maintained between the empirical evidence documented in Chapter 4 and every major interface design decision. The interface was engineered to counteract the primary failure modes of conventional educational software: visual clutter, unexpected sensory shocks, navigational traps, and abstract cognitive leaps.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 5.1</div>
      <div class="table-title">Traceability Matrix: From Stakeholder Evidence to Implemented Interface Architecture</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Identified Stakeholder Need</th>
            <th>Empirical Evidence Base</th>
            <th>Theoretical Grounding</th>
            <th>Implemented Interface Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sensory Over-Responsivity & Glare Fatigue</td>
            <td>REQ07 (M=4.90), Table 4.3 Severity 4.85, Interview Theme 1</td>
            <td>Sensory Modulation (Robertson & Baron-Cohen, 2017)</td>
            <td>Warm ivory background (#FAF8F5); muted lavender and sage green; elimination of pure white (#FFFFFF) background glare.</td>
          </tr>
          <tr>
            <td>Attentional Tunneling & Clutter Vulnerability</td>
            <td>REQ02 (M=4.90), DP-TIC-AUT-Q Item 85 (M=4.92)</td>
            <td>Cognitive Load Theory: Extraneous Load (Sweller et al., 2019)</td>
            <td>Single learning card per viewport; complete removal of banner ads, side menus, and auto-animating decorations.</td>
          </tr>
          <tr>
            <td>Navigational Disorientation & Executive Load</td>
            <td>REQ05 (M=4.82), REQ01 (M=4.82), Interview Theme 2</td>
            <td>Executive Function Deficits (Demetriou et al., 2018)</td>
            <td>Fixed top navigation bar; permanent Back and Home anchors; flat architecture (max 2 clicks to any activity).</td>
          </tr>
          <tr>
            <td>Auditory Defensiveness & Acoustic Shocks</td>
            <td>REQ08 (M=4.78), Table 4.3 Severity 4.85</td>
            <td>Sensory Modulation Symptoms (Ben-Sasson et al., 2009)</td>
            <td>Zero automatic audio; all sound effects are gentle pure-tone sine waves (AudioContext); user-initiated TTS read-aloud.</td>
          </tr>
          <tr>
            <td>Difficulty with Abstract Mathematical Concepts</td>
            <td>REQ10 (M=4.62), DP-TIC-AUT-Q Item 62, Interview Theme 4</td>
            <td>Dual Coding Theory & Visual Anchors (Quill, 1997)</td>
            <td>Interactive visual apple manipulatives (2 apples + 3 apples = 5 apples); visual autism-adapted calculator pad.</td>
          </tr>
          <tr>
            <td>Error Anxiety & Frustration Escalation</td>
            <td>REQ15 (M=4.84), REQ14 (M=4.72), Interview Theme 5</td>
            <td>Positive Behavioral Support (Hume et al., 2021)</td>
            <td>Non-punitive 'Let\'s count together' prompts; persistent hint button; zero buzzers, red crosses, or time limits.</td>
          </tr>
          <tr>
            <td>Heterogeneous Accessibility Profiles</td>
            <td>REQ12 (M=4.68), REQ13 (M=4.66), DP-TIC-AUT-Q Item 85</td>
            <td>Universal Design for Learning (CAST, 2018)</td>
            <td>Personalization Settings modal: 3 text sizes, 4 calm color themes, sound toggle, and reduced motion control.</td>
          </tr>
          <tr>
            <td>Educator Monitoring Without Child Clutter</td>
            <td>REQ18 (M=4.56), DP-TIC-AUT-Q Item 91, Interview Theme 6</td>
            <td>Contextual Classroom Ecology (Putnam & Chong, 2008)</td>
            <td>Separate, PIN-protected Teacher and Parent Monitoring Portal for IEP tracking and session performance analytics.</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Direct functional traceability ensures design decisions originate from verified stakeholder requirements rather than arbitrary aesthetics.</div>
    </div>

    <h2 class="section-heading">5.3 Design Objectives and Development Principles</h2>
    <p>
      The platform was developed around four foundational development principles:
    </p>
    <ul>
      <li><strong>Principle of Predictability:</strong> The interface must behave consistently regardless of the academic subject. Page structures, button shapes, and navigation coordinates remain constant across Mathematics, English, EVS, and Games.</li>
      <li><strong>Principle of Sensory Tranquility:</strong> Visual contrast is optimized for readability without harshness; acoustic stimuli are soft, pleasant, and entirely controllable.</li>
      <li><strong>Principle of Singular Focus:</strong> One discrete learning task is presented per viewport to prevent attentional splitting.</li>
      <li><strong>Principle of Unhurried Autonomy:</strong> The learner operates without countdown timers, ticking clocks, or forced reaction speeds.</li>
    </ul>

    <h2 class="section-heading">5.4 Proposed Interface Architecture</h2>
    <p>
      The technical system architecture was constructed as a modern, client-side decoupled web application. A single-page application (SPA) architecture was selected to eliminate jarring browser page reloads, which frequently disorient autistic users. View switching occurs instantaneously via JavaScript DOM state management, preserving sensory continuity.
    </p>

    <div class="figure-container">
      <div style="font-family: monospace; font-size: 9.5pt; text-align: center; line-height: 1.4;">
        +-----------------------------------------------------------------------------------------+<br>
        |                         LEARN & GROW SYSTEM ARCHITECTURE                                |<br>
        +-----------------------------------------------------------------------------------------+<br>
        |                                PERSISTENT TOP APP BAR                                   |<br>
        |  [⬅ Back Button]  [🏠 Home]    [Title & Breadcrumbs]    [🔊 TTS]  [⚙️ Settings] [👩‍🏫 Educator]  |<br>
        +-----------------------------------------------------------------------------------------+<br>
        |                                                                                         |<br>
        |  +--------------------+  +--------------------+  +--------------------+  +-----------+  |<br>
        |  |  EXPLORE DASHBOARD |  |  SUBJECT MODULES   |  | PRACTICE GAMES HUB |  |  SETTINGS |  |<br>
        |  |  - Math Card       |  |  - Addition (Math) |  |  - Word Matching   |  |  - Font   |  |<br>
        |  |  - English Card    |  |  - Phonics (Eng)   |  |  - Fruit Sorting   |  |  - Themes |  |<br>
        |  |  - EVS Card        |  |  - Plants (EVS)    |  |  - Star Counting   |  |  - Audio  |  |<br>
        |  |  - Activities Card |  |  - Calculator Tool |  |  - Visual Calc Pad |  |  - Motion |  |<br>
        |  +--------------------+  +--------------------+  +--------------------+  +-----------+  |<br>
        |                                                                                         |<br>
        |  +-----------------------------------------------------------------------------------+  |<br>
        |  |               DEDICATED TEACHER & PARENT MONITORING PORTAL (SEPARATE)             |  |<br>
        |  |   - Student Performance Logs   - IEP Objectives   - Sensory Profiles   - Data Export|  |<br>
        |  +-----------------------------------------------------------------------------------+  |<br>
        +-----------------------------------------------------------------------------------------+
      </div>
      <div class="figure-caption">
        <strong>Figure 5.1.</strong> System Component Architecture of the Autism-Adapted Educational Platform.
      </div>
    </div>

    <h2 class="section-heading">5.5 Information Architecture</h2>
    <p>
      The information hierarchy was strictly limited to a maximum depth of two levels. From the Student Dashboard, learners access either Subject Modules (Mathematics, English, EVS) or the Practice Hub. Inside any module, individual lessons are structured as linear, step-by-step pathways (Step 1 of 5). A persistent breadcrumb tag (e.g., "Mathematics / Addition / Step 1") consistently reminds learners of their current location.
    </p>

    <h2 class="section-heading">5.6 Website Structure and Navigation Design</h2>
    <p>
      The navigation framework features three permanent anchors:
    </p>
    <ul>
      <li><strong>Back Button (Top-Left):</strong> Rendered in a distinct muted beige (#F1ECE6) with an arrow icon. Powered by an internal history stack, it reliably returns the user to the immediate prior screen without data loss.</li>
      <li><strong>Home Button (Top-Left):</strong> Accompanied by a house icon (🏠), providing an instant escape hatch to the main dashboard.</li>
      <li><strong>Universal Action Controls (Top-Right):</strong> Provides immediate access to Web Speech Text-to-Speech (🔊), Personalization Settings (⚙️), and the Educator Portal (👩‍🏫).</li>
    </ul>

    <h2 class="section-heading">5.7 Visual Interface Design</h2>
    <p>
      The visual design system embodies the clinical parameters synthesized from the needs assessment:
    </p>
    <h3 class="sub-section-heading">Colour Scheme</h3>
    <p>
      The interface completely eliminates harsh pure white backgrounds (#FFFFFF) in favour of a warm ivory / off-white canvas (<code>--bg-main: #FAF8F5</code>). Primary interactive accents utilize a calming muted lavender (<code>--primary: #7B79D1</code>), supported by a restorative sage green (<code>--secondary: #87A987</code>) and a serene soft blue (<code>--accent: #72A0C1</code>). Four selectable sensory palettes are available in settings: Warm Lavender, Soft Sage Green, Gentle Blue, and High Contrast Soft (navy blue canvas with soft yellow text for photophobic learners).
    </p>
    <h3 class="sub-section-heading">Typography</h3>
    <p>
      The platform employs <em>Nunito</em>, an open-source, highly legible sans-serif typeface characterized by rounded terminals and open apertures, which reduces visual crowding for neurodivergent readers. Three typography scales are selectable: Small (15px body, 24px headings), Medium (18px body, 28px headings - default), and Large (22px body, 34px headings).
    </p>
    <h3 class="sub-section-heading">Icons and Illustrations</h3>
    <p>
      Abstract, decorative graphics were discarded in favor of concrete, universally recognizable pictorial symbols. Subject cards and activity items feature high-contrast SVG emojis and standardized pictograms (🍎 Apple, ➕ Plus, ☀️ Sun, 🌳 Tree, 🧺 Basket).
    </p>
    <h3 class="sub-section-heading">Layout and Spacing</h3>
    <p>
      All interactive elements feature generous padding and minimum touch targets of 48 × 48 pixels, accommodating fine-motor coordination difficulties and dyspraxia. Generous white space surrounds all card containers.
    </p>
    <h3 class="sub-section-heading">Visual Consistency</h3>
    <p>
      Card borders maintain a uniform 2px solid subtle boundary (#E2DFD8) and 20px border radius across all screens. Active buttons produce a gentle 3px purple focus ring (#6C63FF) for clear keyboard accessibility.
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 5: MODULES, FEATURES, AND DOCUMENTATION            -->
  <!-- ========================================================== -->
  <div class="page">
    <h2 class="section-heading">5.8 Development of Educational Modules</h2>
    <p>
      The platform incorporates three primary curriculum modules and an interactive activities hub:
    </p>
    <ol>
      <li><strong>Mathematics:</strong> Focuses on early arithmetic, concrete counting, geometric shape recognition, and virtual computation.</li>
      <li><strong>English & Phonics:</strong> Focuses on letter-sound correspondence, sight word recognition (CAT, DOG, SUN, BOOK), and dual-coded reading practice.</li>
      <li><strong>Environmental Studies (EVS):</strong> Explores fundamental natural science concepts, distinguishing living from non-living things and parts of plants.</li>
      <li><strong>Interactive Activities Hub:</strong> Houses game-based practice modules for cognitive skill consolidation.</li>
    </ol>

    <h2 class="section-heading">5.9 Implementation of Autism-Friendly Features</h2>
    <p>
      The developed interface embodies eight distinct autism-friendly design adaptations:
    </p>
    <ul>
      <li><strong>Simplified Navigation:</strong> All menu layers collapsed into a 2-tier flat hierarchy with permanent escape anchors.</li>
      <li><strong>Structured Learning Pathways:</strong> Visual step meters ("Step 1 of 5") inform the learner of task initiation, progression, and conclusion.</li>
      <li><strong>Predictable Page Layouts:</strong> Every lesson strictly follows: Title → Instruction Box → Demonstration Area → Response Choices → Supportive Feedback.</li>
      <li><strong>Reduced Visual Distractions:</strong> Peripheral banners, floating popups, and decorative looping animations were systematically eliminated.</li>
      <li><strong>Visual Instructions:</strong> Every textual instruction is accompanied by an icon and an interactive tap-to-listen speaker control.</li>
      <li><strong>Multimodal Learning Support:</strong> Combines visual text, pictorial representations, tactile button clicks, and synthesized speech audio.</li>
      <li><strong>Interactive Educational Activities:</strong> Physical interactions including tapping apples to count, selecting matching cards, and sorting items into category baskets.</li>
      <li><strong>Personalized Learning Choices:</strong> Student and educator settings to adapt fonts, themes, sounds, and motion speeds.</li>
    </ul>

    <h2 class="section-heading">5.10 Development of Subject-Specific Learning Components</h2>
    <p>
      To illustrate the instructional operationalization, the <strong>Mathematics Addition Module (Lesson 1)</strong> was developed as the primary pedagogical prototype. When entering the lesson, the learner is presented with a concrete equation: <em>2 Apples + 3 Apples = 5 Apples</em>. The apples are interactive SVG objects that gently enlarge and trigger a soft pitch when tapped, allowing learners to actively count "1, 2, 3, 4, 5" before selecting from three large choice buttons (4, 5, 6).
    </p>

    <div class="ui-mockup-box">
      <div class="ui-topbar">
        <span>⬅ BACK | 🏠 HOME</span>
        <span>MATHEMATICS / ADDITION / LESSON 1</span>
        <span>STEP 1 OF 5</span>
      </div>
      <div style="text-align: center; margin: 10px 0;">
        <div style="font-weight: bold; font-size: 11pt; margin-bottom: 6px;">Instruction: "Addition means putting groups together. How many apples altogether?"</div>
        <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin: 12px 0;">
          <div style="border: 1px solid #ccc; padding: 6px 12px; border-radius: 8px; background: #fff;">🍎 🍎<br><small>2 Apples</small></div>
          <span style="font-size: 16pt; font-weight: bold; color: #7B79D1;">➕</span>
          <div style="border: 1px solid #ccc; padding: 6px 12px; border-radius: 8px; background: #fff;">🍎 🍎 🍎<br><small>3 Apples</small></div>
          <span style="font-size: 16pt; font-weight: bold; color: #7B79D1;">🟰</span>
          <div style="border: 2px dashed #E0C870; padding: 8px 14px; border-radius: 8px; background: #FFF9E6; font-size: 14pt;">❓</div>
        </div>
        <div style="display: flex; justify-content: center; gap: 12px; margin-top: 10px;">
          <button style="font-size: 14pt; padding: 6px 20px; border-radius: 8px; border: 2px solid #ccc; background: #fff;">4</button>
          <button style="font-size: 14pt; padding: 6px 20px; border-radius: 8px; border: 2px solid #7B79D1; background: #EFEFFC; font-weight: bold;">5</button>
          <button style="font-size: 14pt; padding: 6px 20px; border-radius: 8px; border: 2px solid #ccc; background: #fff;">6</button>
        </div>
      </div>
    </div>
    <div class="figure-caption">
      <strong>Figure 5.2.</strong> Wireframe Layout of the Concrete Visual Addition Module.
    </div>

    <h2 class="section-heading">5.11 Integration of Interactive Learning Activities</h2>
    <p>
      The Practice Hub provides four distinct interactive engines:
    </p>
    <ul>
      <li><strong>Picture & Word Matching Engine:</strong> Two-column matching system (Sun, Tree, Book). Selecting matching cards triggers a soft green chime and confirmation.</li>
      <li><strong>Category Sorting Engine:</strong> Visual classification game where learners assign draggable/clickable fruits (Apple, Banana) and vegetables (Carrot, Broccoli) to dedicated baskets.</li>
      <li><strong>Object Counting Engine:</strong> Quantifying scattered stars with direct token number matching.</li>
      <li><strong>Autism-Adapted Visual Calculator:</strong> A specialized computational tool featuring large, color-coded arithmetic buttons and a dynamic visual dot display that visually renders the quantity of the calculated result.</li>
    </ul>

    <h2 class="section-heading">5.12 Technical Development and Implementation</h2>
    <p>
      The platform was engineered using standards-based web technologies: semantic HTML5, modern CSS3 with custom CSS variables, and vanilla JavaScript (ECMAScript 2022). No heavy external runtime libraries or tracking scripts were included, ensuring instant loading even in resource-constrained special school environments.
    </p>

    <h2 class="section-heading">5.13 Website Pages and Functional Components</h2>
    <p>
      The application consists of 11 distinct view states managed dynamically: (1) Student Explore Dashboard, (2) Mathematics Hub, (3) English Hub, (4) EVS Hub, (5) Interactive Activities Hub, (6) Addition Lesson View, (7) Matching Engine, (8) Sorting Engine, (9) Visual Calculator, (10) My Learning Progress Screen, and (11) Educator & Therapist Portal.
    </p>

    <h2 class="section-heading">5.14 Screenshots and Visual Documentation of the Developed Interface</h2>
    <p>
      The interface exhibits high visual tranquility and aesthetic balance. Below is a structured visual overview of the primary user interfaces developed in the study.
    </p>

    <div class="ui-mockup-box">
      <div class="ui-topbar">
        <span>LEARN & GROW</span>
        <span>STUDENT DASHBOARD</span>
        <span>🔊 LISTEN | ⚙️ SETTINGS</span>
      </div>
      <div style="padding: 6px 0; font-size: 10pt; font-weight: bold;">👋 Hello! What would you like to learn today?</div>
      <div class="ui-body-preview">
        <div class="ui-card-demo" style="border-top: 3px solid #7B79D1;">
          <div style="font-size: 16pt;">🔢</div>
          <strong>Mathematics</strong><br><small>Numbers & Addition</small>
        </div>
        <div class="ui-card-demo" style="border-top: 3px solid #F4A261;">
          <div style="font-size: 16pt;">📖</div>
          <strong>English</strong><br><small>Phonics & Words</small>
        </div>
        <div class="ui-card-demo" style="border-top: 3px solid #87A987;">
          <div style="font-size: 16pt;">🌱</div>
          <strong>EVS</strong><br><small>Explore Nature</small>
        </div>
        <div class="ui-card-demo" style="border-top: 3px solid #72A0C1;">
          <div style="font-size: 16pt;">🧩</div>
          <strong>Activities</strong><br><small>Matching & Sorting</small>
        </div>
      </div>
    </div>
    <div class="figure-caption">
      <strong>Figure 5.3.</strong> Visual Layout of the Student Home Dashboard.
    </div>

    <h2 class="section-heading">5.15 Alignment of Developed Features with Identified Educational Needs</h2>
    <p>
      A post-development verification was conducted to assess feature alignment against the original requirements. Table 5.2 demonstrates complete coverage across all identified design priorities.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 5.2</div>
      <div class="table-title">Verification of Interface Features Against Needs Assessment Priorities</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Priority Requirement</th>
            <th>Target Need</th>
            <th>Implemented Software Solution</th>
            <th class="center">Verification Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ-01 & REQ-05</td>
            <td>Predictable Navigation</td>
            <td>Fixed top bar; permanent Back and Home anchors; history stack.</td>
            <td class="center">Verified & Active</td>
          </tr>
          <tr>
            <td>REQ-02 & REQ-03</td>
            <td>Clutter & Cognitive Load</td>
            <td>One activity per screen; no sidebar widgets or popup overlays.</td>
            <td class="center">Verified & Active</td>
          </tr>
          <tr>
            <td>REQ-06 & REQ-14</td>
            <td>Low-Frustration Error Handling</td>
            <td>Gentle hint button; 'Let\'s count together' message; zero buzzers.</td>
            <td class="center">Verified & Active</td>
          </tr>
          <tr>
            <td>REQ-07 & REQ-08</td>
            <td>Sensory & Glare Control</td>
            <td>Warm ivory background (#FAF8F5); muted lavender/sage; pure sine audio.</td>
            <td class="center">Verified & Active</td>
          </tr>
          <tr>
            <td>REQ-09 & REQ-10</td>
            <td>Visual Math & Dual Coding</td>
            <td>Clickable visual apples; paired pictograms; visual calculator pad.</td>
            <td class="center">Verified & Active</td>
          </tr>
          <tr>
            <td>REQ-12 & REQ-13</td>
            <td>Personalization & Educator Portal</td>
            <td>Settings modal (fonts, themes, sound) + Separate Teacher Dashboard.</td>
            <td class="center">Verified & Active</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. 100% of high-priority requirements (Must Have and Should Have) successfully operationalized in the working prototype.</div>
    </div>

    <h2 class="section-heading">5.16 Summary of Interface Development</h2>
    <p>
      The interface development component succeeded in transforming empirical stakeholder evidence into a cohesive, aesthetically tranquil, and functionally accessible educational web platform. By centering design decisions on the sensory, attentional, and cognitive strengths of autistic learners, <em>Learn & Grow</em> bridges the gap between special education practice and inclusive human-computer interaction.
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 6: DISCUSSION                                      -->
  <!-- ========================================================== -->
  <div class="page">
    <h1 class="chapter-title">Chapter 6</h1>
    <h2 class="chapter-subtitle">Discussion</h2>

    <h2 class="section-heading">6.1 Introduction</h2>
    <p>
      The findings of this study provide systematic empirical insight into how digital learning environments should be conceptualized, structured, and implemented for autistic learners. By synthesizing quantitative data from 50 stakeholders with in-depth qualitative accounts and translating them into a functional software interface, this research addresses a long-standing methodological void in special education technology: the absence of a documented, evidence-based chain of reasoning from user needs to interface features. This chapter interprets the primary findings in relation to established psychological and pedagogical theory, contextualizes them within the broader literature, and examines the clinical and technological implications.
    </p>

    <h2 class="section-heading">6.2 Interpretation of Needs Assessment Findings</h2>
    <p>
      The needs assessment revealed overwhelming consensus across special educators, occupational therapists, and supported learners regarding the factors that enable or obstruct digital learning. Visual clutter reduction, single-task presentation, and low-frustration error recovery achieved unanimous essentiality ratings (means exceeding 4.80/5.00). These findings illuminate the cognitive architecture of autistic learners. Autistic individuals frequently exhibit weak central coherence (Happé & Frith, 2006) and enhanced local perceptual processing (Mottron et al., 2006), predisposing them to focus intently on peripheral visual details at the expense of global semantic context. When an educational web page contains animated sidebar banners, floating widgets, or dense menus, these extraneous elements compete aggressively for attentional resources, precipitating rapid cognitive fatigue.
    </p>

    <h2 class="section-heading">6.3 Stakeholder Perspectives on ICT-Based Learning</h2>
    <p>
      The triangulation of professional perspectives underscored distinct yet harmonious priorities. Special education teachers prioritized instructional sequencing, concise wording, and concrete visual manipulatives, reflecting their daily responsibility for curriculum delivery. Occupational therapists focused primarily on sensory modulation, glare reduction, and fine-motor target sizing, emphasizing that sensory dysregulation directly impairs learning readiness. Crucially, the ANOVA results (Table 4.5) revealed no significant divergence between teachers, therapists, and learners on core interface principles, demonstrating that autism-friendly design principles are robust across educational and therapeutic domains.
    </p>

    <h2 class="section-heading">6.4 Relationship Between Identified Needs and Existing Literature</h2>
    <p>
      The findings strongly corroborate and extend foundational theoretical frameworks:
    </p>
    <ul>
      <li><strong>Cognitive Load Theory (CLT):</strong> Sweller et al. (2019) emphasize that working memory capacity is strictly limited. In autistic learners, sensory processing and executive planning demands absorb significant cognitive bandwidth. By presenting one task per viewport and eliminating extraneous visual decorations, the developed interface dramatically curtails extraneous load, freeing germane cognitive resources for schema acquisition.</li>
      <li><strong>Universal Design for Learning (UDL):</strong> The multi-modal instructional design (Meyer et al., 2014)—combining visual text, high-clarity pictograms, user-initiated synthesized speech, and tactile counters—embodies UDL's principle of multiple means of representation and engagement.</li>
      <li><strong>TEACCH Structured Teaching:</strong> The physical and visual organization principles established by Mesibov et al. (2004)—explicit routines, visual schedules, clear task boundaries, and visible completion criteria—were successfully migrated into a digital web medium.</li>
    </ul>

    <h2 class="section-heading">6.5 Implications for Autism-Specific UI/UX Design</h2>
    <p>
      The results challenge the prevalent commercial paradigm that equates children's software with hyper-saturated colors, constant background music, and frantic gamified animations. While neurotypical learners may find high-stimulus environments entertaining, for autistic learners such features constitute sensory barriers. Autism-adapted UI/UX design is not about creating childish or simplistic graphics; it is about creating <em>cognitive clarity, visual tranquility, and emotional safety</em>. Predictability in navigation and gentle, non-punitive feedback are essential accommodations that prevent behavioral escalation.
    </p>

    <h2 class="section-heading">6.6 Contribution of the Developed Interface</h2>
    <p>
      Compared to established applications in the field, the developed <em>Learn & Grow</em> platform introduces distinct structural innovations. Whereas <strong>Avaz AAC</strong> focuses primarily on functional communication through picture-to-speech selection (Avaz, n.d.), it does not provide an academic curriculum interface. Conversely, while <strong>Otsimo</strong> provides gamified cognitive exercises (Bayar, 2019), its commercial software architecture leaves stakeholder-derived design specifications largely unpublished. <em>Learn & Grow</em> bridges these paradigms by embedding concrete academic instruction (mathematics, English, EVS) within an open, fully documented, stakeholder-grounded interface that incorporates specialized tools such as a sensory-adapted visual calculator.
    </p>

    <h2 class="section-heading">6.7 Implications for Special Education and Educational Technology</h2>
    <p>
      The practical implications of this study are especially salient in the Indian educational landscape. Under the Rights of Persons with Disabilities Act (2016) and the National Education Policy (Ministry of Education, 2020), inclusive and special education institutions are mandated to adopt accessible educational technologies. However, special educators often struggle to adapt mainstream commercial tools that lack sensory customization. The provision of an open, browser-accessible interface with a dedicated educator monitoring portal allows teachers to implement individualized education program (IEP) targets without imposing administrative clutter on the learner.
    </p>

    <h2 class="section-heading">6.8 Limitations of the Study</h2>
    <p>
      Several methodological limitations must be acknowledged. First, the sample size of <em>N</em> = 50 was recruited purposively from educational and clinical institutions within a specific geographic region (Punjab, Mohali, and Chandigarh), which may constrain broader geographical generalization. Second, given the developmental and communicative profiles of autistic children, learner perspectives were gathered through supported observational sessions and educator-mediated interactions rather than autonomous self-report instruments. Third, in alignment with the exploratory, needs-led scope of the study, the research was restricted to needs assessment and interface prototyping; it did not encompass a longitudinal controlled trial of academic learning outcomes or an eye-tracking experimental study. Such evaluative investigations represent necessary subsequent phases of research.
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 7: CONCLUSION AND FUTURE DIRECTIONS               -->
  <!-- ========================================================== -->
  <div class="page">
    <h1 class="chapter-title">Chapter 7</h1>
    <h2 class="chapter-subtitle">Conclusion and Future Directions</h2>

    <h2 class="section-heading">7.1 Conclusion</h2>
    <p>
      This investigation was undertaken to address the critical disconnect between the unique cognitive, sensory, and communicative profiles of autistic learners and the design of web-based educational environments. By executing a user-centered, mixed-methods needs assessment involving 50 key stakeholders (special educators, occupational therapists, and autistic learners) and translating empirical findings into an autism-adapted web interface, the study demonstrates that digital accessibility for autism requires deliberate sensory and structural accommodations far beyond conventional web standards.
    </p>

    <h2 class="section-heading">7.2 Summary of Research Objectives Achieved</h2>
    <p>
      All primary research objectives established in Chapter 1 were systematically fulfilled:
    </p>
    <ul>
      <li><strong>Objective 1 (Educational Needs & Challenges Identified):</strong> The study empirically cataloged the barriers imposed by conventional software, identifying auditory shock, visual clutter, navigation traps, and abstract symbolism as primary deterrents to learning engagement.</li>
      <li><strong>Objective 2 (UI/UX Feature-Importance Examined):</strong> Statistical analysis of the 18-item Priority Rating Scale and 118-item DP-TIC-AUT-Q established robust consensus, ranking clutter reduction (<em>M</em> = 4.90), single-task chunking (<em>M</em> = 4.88), concise wording (<em>M</em> = 4.86), and low-frustration recovery (<em>M</em> = 4.84) as indispensable priorities.</li>
      <li><strong>Objective 3 (Integrated Design Requirements Derived):</strong> Mixed-methods triangulation synthesized quantitative ratings and qualitative themes into a comprehensive MoSCoW prioritization matrix.</li>
      <li><strong>Objective 4 (Autism-Adapted Interface Developed):</strong> The <em>Learn & Grow</em> platform was fully implemented, incorporating a warm ivory aesthetic, calm pastel palettes, single-task modular layouts, visual apple manipulatives, interactive games, a visual calculator, and a separate educator portal.</li>
      <li><strong>Objective 5 (Design Rationale Documented):</strong> A comprehensive traceability matrix was documented, establishing an explicit, verifiable connection between each interface component and its supporting stakeholder evidence.</li>
    </ul>

    <h2 class="section-heading">7.3 Major Contributions of the Study</h2>
    <p>
      The major contributions of this project operate across theoretical, methodological, and practical dimensions:
    </p>
    <ul>
      <li><strong>Theoretical Contribution:</strong> Harmonizes Cognitive Load Theory, Universal Design for Learning, and TEACCH structured teaching within an integrated Human-Computer Interaction framework for neurodivergent learners.</li>
      <li><strong>Methodological Contribution:</strong> Demonstrates a transparent, replicable protocol for combining the 118-item DP-TIC-AUT-Q, structured Likert scales, and qualitative thematic analysis to generate software engineering specifications.</li>
      <li><strong>Practical Contribution:</strong> Delivers a fully functional, open-access, browser-based educational interface engineered specifically to prevent sensory overload and executive fatigue in autism classrooms.</li>
    </ul>

    <h2 class="section-heading">7.4 Practical Implications</h2>
    <p>
      For special educators and therapists, the platform provides an immediately deployable instructional tool that respects learners' sensory thresholds while facilitating individualized pacing. For software developers and educational publishers, the documented design specifications offer an actionable blueprint for developing neurodivergent-friendly digital products that comply with cognitive accessibility standards.
    </p>

    <h2 class="section-heading">7.5 Recommendations</h2>
    <p>
      Based on the empirical findings, the following actionable recommendations are offered:
    </p>
    <ol>
      <li><strong>For Educational Software Developers:</strong>
        <ul>
          <li>Prohibit automatic audio playback, aggressive sound effects, and unexpected animations.</li>
          <li>Adopt off-white, warm background canvases (#FAF8F5) with soft pastel accents to reduce glare and visual strain.</li>
          <li>Maintain strict navigational constancy: keep Back and Home controls in identical coordinates on every page.</li>
          <li>Replace punitive error buzzers with supportive, unhurried retry cues and persistent hint mechanisms.</li>
        </ul>
      </li>
      <li><strong>For Special Education Institutions:</strong>
        <ul>
          <li>Integrate touch-enabled tablet devices with autism-adapted software into daily structured instructional routines.</li>
          <li>Utilize separate educator portals to monitor IEP progress without burdening students with performance data.</li>
        </ul>
      </li>
      <li><strong>For Educational Policymakers:</strong>
        <ul>
          <li>Incorporate neurodevelopmental and cognitive accessibility criteria into national digital curriculum standards.</li>
        </ul>
      </li>
    </ol>

    <h2 class="section-heading">7.6 Future Research Directions</h2>
    <p>
      While this study successfully established the needs-to-interface continuum, several fruitful avenues for future research emerge:
    </p>
    <ul>
      <li><strong>Longitudinal Effectiveness Trials:</strong> Conduct controlled pre-test/post-test comparative studies evaluating academic acquisition rates and time-on-task between the autism-adapted interface and conventional commercial software.</li>
      <li><strong>Objective Eye-Tracking & Biometric Usability:</strong> Employ eye-tracking analytics and skin conductance sensors to objectively quantify fixation duration, visual gaze patterns, and autonomic arousal levels during digital interaction.</li>
      <li><strong>AI-Driven Adaptive Personalization:</strong> Investigate machine-learning algorithms capable of dynamically modulating interface density, color warmth, and pacing in response to individual learner fatigue patterns.</li>
    </ul>
    <p style="margin-top: 30px; text-align: center; font-style: italic;">
      *** End of Project Report (Chapters 4 to 7) ***
    </p>
  </div>

</body>
</html>
`;
}

const outputPath = path.join(__dirname, 'print_document.html');
fs.writeFileSync(outputPath, generateReportHTML(), 'utf8');
console.log('Report HTML document successfully written to:', outputPath);
