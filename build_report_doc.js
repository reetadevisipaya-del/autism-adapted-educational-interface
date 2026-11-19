const fs = require('fs');
const path = require('path');

const stats = JSON.parse(fs.readFileSync(path.join(__dirname, 'stats_summary.json'), 'utf8'));

function generateReportHTML() {
  const pStats = stats.priority;
  const dStats = stats.dptic;
  const pItems = pStats.items;
  const categories = pStats.categories;
  const demo = stats.demographics;
  const barriers = stats.barriers;

  // Helper for formatting
  const f2 = val => typeof val === 'number' ? val.toFixed(2) : val;
  const f3 = val => typeof val === 'number' ? val.toFixed(3) : val;
  const f1 = val => typeof val === 'number' ? val.toFixed(1) : val;

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
      margin-bottom: 25px;
    }

    h2.section-heading {
      font-size: 13pt;
      font-weight: bold;
      margin-top: 22px;
      margin-bottom: 8px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 3px;
    }

    h3.sub-section-heading {
      font-size: 12pt;
      font-weight: bold;
      font-style: italic;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    p {
      text-align: justify;
      text-indent: 0.5in;
      margin-top: 0;
      margin-bottom: 11px;
    }

    p.no-indent {
      text-indent: 0;
    }

    .apa-table-wrapper {
      margin: 18px 0;
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
      font-size: 9pt;
      line-height: 1.35;
      margin-bottom: 6px;
    }

    table.apa-table th, table.apa-table td {
      padding: 5px 6px;
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
      font-size: 8.5pt;
      font-style: italic;
      line-height: 1.3;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 11px;
      padding-left: 0.5in;
    }

    li {
      margin-bottom: 4px;
    }

    .highlight-cell {
      background-color: #F4F3FB;
      font-weight: bold;
    }

    .priority-high {
      background-color: #EAF2EA;
      font-weight: bold;
    }

    .priority-med {
      background-color: #F0EFF9;
      font-weight: bold;
    }

    .figure-container {
      margin: 18px auto;
      text-align: center;
      page-break-inside: avoid;
      background: #faf9f6;
      border: 1px solid #e0ded9;
      border-radius: 8px;
      padding: 12px;
    }

    .figure-caption {
      text-align: left;
      font-size: 9.5pt;
      margin-top: 6px;
    }

    .ui-mockup-box {
      background: #ffffff;
      border: 2px solid #7B79D1;
      border-radius: 10px;
      padding: 12px;
      margin: 10px auto;
      max-width: 90%;
      text-align: left;
    }

    .ui-topbar {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid #E2DFD8;
      padding-bottom: 5px;
      margin-bottom: 8px;
      font-size: 9pt;
      font-weight: bold;
      color: #7B79D1;
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
      Designing educational technologies adapted for autistic learners requires an empirical foundation grounded in the operational realities of special education and therapeutic practice. While universal accessibility guidelines such as the Web Content Accessibility Guidelines (WCAG 2.1) provide an essential technical baseline, they focus primarily on sensory and motor accessibility and do not address the atypical attentional orienting, executive dysfunction, and sensory modulation characteristics of Autism Spectrum Disorder (ASD). This chapter presents the findings of a user-centered, mixed-methods needs assessment conducted across special schools, inclusive resource classrooms, and pediatric therapy clinics in the Mohali, Chandigarh, and Punjab regions.
    </p>
    <p>
      The investigation was designed to address four specific research questions: (a) What educational needs and operational barriers do stakeholders encounter when autistic learners use existing digital tools? (b) Which user interface (UI) and user experience (UX) features do stakeholders prioritize, and how do average importance ratings compare across professional roles? (c) How do individual features group into core design-principle categories? and (d) How can these prioritized requirements be operationalized in an educational web interface tailored for autistic learners?
    </p>

    <h2 class="section-heading">4.2 Overview of the Needs Assessment</h2>
    <p>
      In alignment with the convergent mixed-methods methodology established in Chapter 3, the study recruited a total sample of <em>N</em> = 50 participants, intentionally structured into two complementary cohorts:
    </p>
    <ul>
      <li><strong>Professional Cohort (<em>N</em> = 40):</strong> Comprising 30 Special Education Teachers (coded T01 to T30) and 10 Occupational Therapists (coded OT01 to OT10). Because these practitioners possess direct daily responsibility for curriculum mediation and sensory regulation, they completed the full quantitative survey battery (the 18-item Priority Rating Scale and the 118-item DP-TIC-AUT-Q) as well as semi-structured qualitative interviews.</li>
      <li><strong>Autistic Student Cohort (<em>n</em> = 10):</strong> Comprising 10 primary school-aged autistic learners (coded S01 to S10, aged 8 to 14 years; 6 with ASD Level 1 support needs and 4 with Level 2 support needs). In accordance with ethical guidelines and developmental appropriateness, student participants were not burdened with 118-item professional questionnaires. Instead, they participated in guided task-walkthrough and observational preference sessions mediated by familiar educators, providing direct behavioral and qualitative preference evidence.</li>
    </ul>

    <h2 class="section-heading">4.3 Stakeholder Demographic and Professional Profile</h2>
    <p>
      In SPSS, participant background characteristics were analyzed using frequency distributions and central tendency measures (<em>Analyze → Descriptive Statistics → Frequencies</em>). The professional sample possessed substantial clinical and pedagogical expertise. Special educators reported a mean of 9.4 years of professional experience working with autistic children (<em>SD</em> = 4.2), while occupational therapists reported a mean of 8.8 years of pediatric practice (<em>SD</em> = 3.6). Table 4.1 summarizes the demographic and professional profiles of the participants across all cohorts.
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
            <td><strong>Mean Age in Years (Range)</strong></td>
            <td class="center">37.4 (26–52)</td>
            <td class="center">34.2 (27–46)</td>
            <td class="center">10.8 (8–14)</td>
            <td class="center">31.4 (8–52)</td>
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
            <td><strong>Years ASD Experience: Mean (SD)</strong></td>
            <td class="center">9.4 (4.2)</td>
            <td class="center">8.8 (3.6)</td>
            <td class="center">—</td>
            <td class="center">9.2 (4.1)</td>
          </tr>
          <tr>
            <td><strong>Student Support Level</strong></td>
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
            <td>&nbsp;&nbsp;Level 2 (Substantial Support)</td>
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
      <div class="table-note">Note. Total sample N = 50. All demographic distributions in this table match the Demographics worksheet of the accompanying dataset exactly. Student participants (n = 10) engaged through supported, assent-based interactive task observation sessions mediated by their assigned special educators and primary caregivers.</div>
    </div>

    <h2 class="section-heading">4.4 Existing Technology Usage in Autism Education</h2>
    <p>
      An examination of baseline technology adoption revealed that digital tools are routinely utilized across participating settings: 78.0% of participants (39 of 50) reported daily computer or tablet use during educational sessions, and another 18.0% (9 of 50) reported usage several times per week. Touchscreen tablets were identified as the primary interaction device (66.0% overall; 90.0% among occupational therapists and 80.0% among student sessions), followed by desktop computers (24.0%) and interactive smartboards (10.0%).
    </p>

    <h2 class="section-heading">4.5 Educational and Functional Requirements</h2>
    <p>
      Interviews with special educators indicated that educational software must address two interrelated functional requirements: preserving attentional focus and facilitating conceptual grounding. Abstract arithmetic and literacy concepts represent significant hurdles unless grounded in tangible visual objects. Furthermore, because executive planning difficulties impede multi-step task execution, software must structure learning into explicit, self-contained units.
    </p>

    <h2 class="section-heading">4.6 Challenges Experienced in Existing Digital Learning Environments</h2>
    <p>
      Qualitative analysis of interview transcripts and observational notes identified recurring digital barriers that impair learning engagement. Table 4.2 presents the thematic reporting frequencies across the 40 professional interviews, fully grounded in the raw binary records in the <em>Qualitative_Barriers_Matrix</em> worksheet of the dataset.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.2</div>
      <div class="table-title">Thematic Reporting Frequencies of Observed Digital Barriers in Autism Education (N = 40)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Identified Digital Barrier</th>
            <th class="center">Teachers (n = 30)</th>
            <th class="center">Therapists (n = 10)</th>
            <th class="center">Total (N = 40)</th>
            <th>Primary Observed Behavioral / Affective Impact</th>
          </tr>
        </thead>
        <tbody>
          ${barriers.map(b => `
          <tr>
            <td>${b.label}</td>
            <td class="center">${b.tCount} (${f1(b.tPct)}%)</td>
            <td class="center">${b.otCount} (${f1(b.otPct)}%)</td>
            <td class="center highlight-cell">${b.totCount} (${f1(b.totPct)}%)</td>
            <td>${b.impact}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div class="table-note">Note. Counts reflect participants who spontaneously or upon prompt identified the barrier as a substantive disruption during instructional sessions. Individual respondent records (1 = reported, 0 = not reported) are cataloged in the Qualitative_Barriers_Matrix worksheet of the accompanying workbook.</div>
    </div>

    <h2 class="section-heading">4.7 Navigation and Accessibility Requirements</h2>
    <p>
      Special educators and therapists emphasized that navigation controls must be permanent, shallow, and physically predictable. When autistic learners navigate multi-level menus, they frequently lose orientation. A flat, two-tier information architecture was recommended, coupled with permanent Back and Home anchors positioned in identical screen coordinates.
    </p>

    <h2 class="section-heading">4.8 Sensory and Visual Design Requirements</h2>
    <p>
      Occupational therapists noted that autistic sensory profiles require calming, low-glare visual environments. Stark pure white (#FFFFFF) backgrounds reflect excessive glare, triggering photophobic discomfort. A warm ivory or off-white background (#FAF8F5), paired with muted lavender and soft sage green, was recommended to support sensory tranquility.
    </p>

    <h2 class="section-heading">4.9 Content Presentation and Instructional Requirements</h2>
    <p>
      In accordance with Cognitive Load Theory (Sweller et al., 2019), extraneous cognitive load must be minimized. Practitioners reported that presenting one discrete task per screen enables learners to channel their attention effectively, whereas dense, multi-instruction layouts lead to cognitive paralysis.
    </p>

    <h2 class="section-heading">4.10 Communication and Language Support Requirements</h2>
    <p>
      To support diverse verbal abilities, instructions must combine concise written text with concrete pictograms and optional, user-initiated text-to-speech narration, aligning with Universal Design for Learning (CAST, 2018).
    </p>

    <h2 class="section-heading">4.11 Personalization and Individual Learning Requirements</h2>
    <p>
      Because sensory sensitivities and reading abilities vary across the autism spectrum, an accessible interface must offer user-adjustable settings for font size, color palette, sound muting, and motion dampening.
    </p>
  </div>

  <!-- ========================================================== -->
  <!-- CHAPTER 4: STATISTICAL ANALYSES (SPSS DESCRIPTIVES)       -->
  <!-- ========================================================== -->
  <div class="page">
    <h2 class="section-heading">4.12 Analysis of UI/UX Feature-Importance Ratings</h2>
    <p>
      In accordance with stakeholder needs assessment methodology, quantitative data from the 18-item Priority Rating Scale were analyzed primarily for <strong>descriptive results</strong> using SPSS (Version 28). In the SPSS Variable View, each rating item was defined with an <em>Ordinal</em> measure, coded consistently from 1 ("Not important") to 5 ("Essential"). Descriptive parameters—including the sample size (<em>n</em>), mean importance rating, standard deviation (<em>SD</em>), minimum, and maximum—were calculated using the SPSS Descriptives procedure (<em>Analyze → Descriptive Statistics → Descriptives</em>).
    </p>
    <p>
      A higher mean indicates that stakeholders judge that requirement more critical to learning success; a lower standard deviation denotes closer consensus among practitioners. Features were ranked from highest to lowest mean. Requirements exhibiting identical unrounded means were assigned tied ranks. Table 4.3 presents the complete SPSS descriptive statistics across all 18 UI/UX features, along with their assigned priority classifications.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.3</div>
      <div class="table-title">SPSS Descriptive Statistics for the 18 UI/UX User Requirements (N = 40 Professionals)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Feature / Requirement Statement</th>
            <th class="center">Item Code</th>
            <th class="center">n</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">Min</th>
            <th class="center">Max</th>
            <th class="center">% Essential (4–5)</th>
            <th class="center">Rank</th>
            <th class="center">Priority</th>
          </tr>
        </thead>
        <tbody>
          ${pItems.map(it => `
          <tr>
            <td>${it.label}</td>
            <td class="center"><strong>${it.id}</strong></td>
            <td class="center">40</td>
            <td class="center ${it.priority === 'High' ? 'highlight-cell' : ''}">${f2(it.meanAll)}</td>
            <td class="center">${f2(it.sdAll)}</td>
            <td class="center">${it.min}</td>
            <td class="center">${it.max}</td>
            <td class="center">${f1(it.pct45)}%</td>
            <td class="center">${it.rankStr}</td>
            <td class="center ${it.priority === 'High' ? 'priority-high' : 'priority-med'}">${it.priority}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div class="table-note">Note. SPSS procedure: Analyze → Descriptive Statistics → Descriptives. Scale: 1 = Not Important, 2 = Slightly Important, 3 = Moderately Important, 4 = Very Important, 5 = Essential. Grand Mean = ${f2(pStats.grandMean)}, Grand SD across all ratings = ${f2(pStats.grandSD)} (average item SD = ${f2(pStats.avgItemSD)}). Overall scale reliability Cronbach’s Alpha = ${f3(pStats.cronbachAlpha)} (18 items, N = 40). High priority assigned to top-ranked core requirements (Mean &ge; 4.60); Medium priority assigned to supportive requirements (Mean &ge; 4.30).</div>
    </div>

    <p>
      To examine how priorities compare across professional contexts, group means and standard deviations were calculated using the SPSS Means procedure (<em>Analyze → Compare Means → Means</em>), entering professional role (Special Education Teacher vs. Occupational Therapist) as the independent factor. In alignment with needs assessment guidelines, group differences are interpreted <strong>descriptively</strong> rather than inferentially, acknowledging that the sample is purposive and relatively small. Table 4.4 compares the average importance ratings between teachers and therapists.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.4</div>
      <div class="table-title">Descriptive Comparison of UI/UX Priority Ratings Across Stakeholder Groups (SPSS Compare Means)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Requirement Parameter & Code</th>
            <th>Design Category Domain</th>
            <th class="center">Teachers (n = 30) M (SD)</th>
            <th class="center">Therapists (n = 10) M (SD)</th>
            <th class="center">Total (N = 40) M (SD)</th>
            <th class="center">Rank</th>
            <th>Descriptive Practical Focus</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Visual Clutter Reduction (REQ07)</td>
            <td>Visual Simplicity</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ07').meanT)} (${f2(pItems.find(x=>x.id==='REQ07').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ07').meanOT)} (${f2(pItems.find(x=>x.id==='REQ07').sdOT)})</td>
            <td class="center highlight-cell">${f2(pItems.find(x=>x.id==='REQ07').meanAll)} (${f2(pItems.find(x=>x.id==='REQ07').sdAll)})</td>
            <td class="center">1</td>
            <td>Shared consensus: top priority across both professions to prevent sensory and attentional distraction.</td>
          </tr>
          <tr>
            <td>Consistent Screen Structure (REQ01)</td>
            <td>Predictable Navigation</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ01').meanT)} (${f2(pItems.find(x=>x.id==='REQ01').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ01').meanOT)} (${f2(pItems.find(x=>x.id==='REQ01').sdOT)})</td>
            <td class="center highlight-cell">${f2(pItems.find(x=>x.id==='REQ01').meanAll)} (${f2(pItems.find(x=>x.id==='REQ01').sdAll)})</td>
            <td class="center">2 (tie)</td>
            <td>Shared consensus: uniform header and viewport layout reduces spatial anxiety for learners.</td>
          </tr>
          <tr>
            <td>Easy Back/Home/Help (REQ05)</td>
            <td>Predictable Navigation</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ05').meanT)} (${f2(pItems.find(x=>x.id==='REQ05').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ05').meanOT)} (${f2(pItems.find(x=>x.id==='REQ05').sdOT)})</td>
            <td class="center highlight-cell">${f2(pItems.find(x=>x.id==='REQ05').meanAll)} (${f2(pItems.find(x=>x.id==='REQ05').sdAll)})</td>
            <td class="center">2 (tie)</td>
            <td>Persistent escape routes prevent feelings of entrapment when learners encounter difficulty.</td>
          </tr>
          <tr>
            <td>Single Task Presentation (REQ04)</td>
            <td>Visual Simplicity</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ04').meanT)} (${f2(pItems.find(x=>x.id==='REQ04').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ04').meanOT)} (${f2(pItems.find(x=>x.id==='REQ04').sdOT)})</td>
            <td class="center highlight-cell">${f2(pItems.find(x=>x.id==='REQ04').meanAll)} (${f2(pItems.find(x=>x.id==='REQ04').sdAll)})</td>
            <td class="center">5 (tie)</td>
            <td>Therapists slightly higher (4.90 vs 4.70); prevents working memory overload during tasks.</td>
          </tr>
          <tr>
            <td>Low-Frustration Error Recovery (REQ15)</td>
            <td>Feedback & Recovery</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ15').meanT)} (${f2(pItems.find(x=>x.id==='REQ15').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ15').meanOT)} (${f2(pItems.find(x=>x.id==='REQ15').sdOT)})</td>
            <td class="center highlight-cell">${f2(pItems.find(x=>x.id==='REQ15').meanAll)} (${f2(pItems.find(x=>x.id==='REQ15').sdAll)})</td>
            <td class="center">5 (tie)</td>
            <td>High mutual agreement: supportive prompts ('Let\'s try again') protect emotional stability.</td>
          </tr>
          <tr>
            <td>Sensory Settings Customization (REQ13)</td>
            <td>Sensory Regulation</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ13').meanT)} (${f2(pItems.find(x=>x.id==='REQ13').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ13').meanOT)} (${f2(pItems.find(x=>x.id==='REQ13').sdOT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ13').meanAll)} (${f2(pItems.find(x=>x.id==='REQ13').sdAll)})</td>
            <td class="center">14</td>
            <td>Occupational therapists placed markedly higher priority (4.80 vs 4.37), reflecting clinical focus on sensory modulation.</td>
          </tr>
          <tr>
            <td>Multiple Learner Response Modes (REQ11)</td>
            <td>Multimodal Instruction</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ11').meanT)} (${f2(pItems.find(x=>x.id==='REQ11').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ11').meanOT)} (${f2(pItems.find(x=>x.id==='REQ11').sdOT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ11').meanAll)} (${f2(pItems.find(x=>x.id==='REQ11').sdAll)})</td>
            <td class="center">16 (tie)</td>
            <td>Therapists rated higher (4.70 vs 4.20), reflecting clinical mandate to accommodate fine motor dyspraxia.</td>
          </tr>
          <tr>
            <td>Adult Routine Compatibility (REQ18)</td>
            <td>Learner Agency & Routines</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ18').meanT)} (${f2(pItems.find(x=>x.id==='REQ18').sdT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ18').meanOT)} (${f2(pItems.find(x=>x.id==='REQ18').sdOT)})</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ18').meanAll)} (${f2(pItems.find(x=>x.id==='REQ18').sdAll)})</td>
            <td class="center">16 (tie)</td>
            <td>Teachers rated higher (4.40 vs 4.10), reflecting direct responsibility for classroom timetable integration.</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. SPSS procedure: Analyze → Compare Means → Means. Dependent variable: feature ratings; Independent variable: stakeholder_group (1 = Special Educator, 2 = Therapist). Group comparisons are reported descriptively to illuminate practitioner viewpoints without inferential hypothesis testing.</div>
    </div>

    <p>
      To synthesize individual features into broader design principles, composite category variables were computed in SPSS using the Compute Variable function (<em>Transform → Compute Variable</em>). Each composite score represents the mean of its constituent rating items (e.g., <code>cat_vis_simplicity = MEAN(REQ03, REQ04, REQ07)</code>). Descriptives were then calculated on these composite variables. Table 4.5 presents the resulting category rankings.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.5</div>
      <div class="table-title">SPSS Descriptive Statistics for Design-Principle Categories (Transform → Compute Variable)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Design-Principle Category</th>
            <th class="center">SPSS Variable</th>
            <th>Included Items</th>
            <th class="center">n</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">Min</th>
            <th class="center">Max</th>
            <th class="center">Rank</th>
            <th class="center">Priority</th>
          </tr>
        </thead>
        <tbody>
          ${categories.map(cat => `
          <tr>
            <td><strong>${cat.category}</strong></td>
            <td class="center"><code>${cat.spssVar}</code></td>
            <td>${cat.itemIds}</td>
            <td class="center">40</td>
            <td class="center ${cat.priority === 'High' ? 'highlight-cell' : ''}">${f2(cat.mean)}</td>
            <td class="center">${f2(cat.sd)}</td>
            <td class="center">${f2(cat.min)}</td>
            <td class="center">${f2(cat.max)}</td>
            <td class="center">${cat.rank}</td>
            <td class="center ${cat.priority === 'High' ? 'priority-high' : 'priority-med'}">${cat.priority}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div class="table-note">Note. SPSS procedure: Transform → Compute Variable; Target Variable = category mean; Numeric Expression = MEAN(item1, item2, ...). Descriptives procedure then executed on computed variables. High priority assigned to categories with overall Mean &ge; 4.50.</div>
    </div>

    <h2 class="section-heading">4.13 Analysis of DP-TIC-AUT-Q</h2>
    <p>
      The 118-item questionnaire <em>"Demands and Potentials of ICT and Apps for Assisting People with Autism (DPTIC-AUT-Q)"</em> was administered to the 40 professional respondents (numbered Form 1 to Form 40). Analysis of the raw responses confirmed strong internal consistency across the instrument. Subscale 4, which measures the functionality and accessibility of specific applications, yielded the highest agreement (<em>M</em> = ${f2(dStats.sub4.mean)}, <em>SD</em> = ${f2(dStats.sub4.sd)}, $\\alpha = ${f3(dStats.sub4.alpha)}$). Table 4.6 presents the subscale descriptive metrics.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.6</div>
      <div class="table-title">DP-TIC-AUT-Q Subscale Descriptive Metrics and Reliability (N = 40 Professionals)</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Subscale Domain</th>
            <th class="center">Items</th>
            <th class="center">n</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">% Agree (4–5)</th>
            <th class="center">Teachers (n=30)</th>
            <th class="center">Therapists (n=10)</th>
            <th class="center">Cronbach α</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Subscale 1: ICT Opinion, Training & Functional Diversity</td>
            <td class="center">1–22</td>
            <td class="center">40</td>
            <td class="center">${f2(dStats.sub1.mean)}</td>
            <td class="center">${f2(dStats.sub1.sd)}</td>
            <td class="center">${f1(dStats.sub1.pctAgree)}%</td>
            <td class="center">${f2(dStats.sub1.meanT)}</td>
            <td class="center">${f2(dStats.sub1.meanOT)}</td>
            <td class="center">${f3(dStats.sub1.alpha)}</td>
          </tr>
          <tr>
            <td>Subscale 2: ICT Training & Autism-Specific Uses</td>
            <td class="center">23–62</td>
            <td class="center">40</td>
            <td class="center">${f2(dStats.sub2.mean)}</td>
            <td class="center">${f2(dStats.sub2.sd)}</td>
            <td class="center">${f1(dStats.sub2.pctAgree)}%</td>
            <td class="center">${f2(dStats.sub2.meanT)}</td>
            <td class="center">${f2(dStats.sub2.meanOT)}</td>
            <td class="center">${f3(dStats.sub2.alpha)}</td>
          </tr>
          <tr>
            <td>Subscale 3: Apps Uses & Benefits in Autism Assistance</td>
            <td class="center">63–84</td>
            <td class="center">40</td>
            <td class="center">${f2(dStats.sub3.mean)}</td>
            <td class="center">${f2(dStats.sub3.sd)}</td>
            <td class="center">${f1(dStats.sub3.pctAgree)}%</td>
            <td class="center">${f2(dStats.sub3.meanT)}</td>
            <td class="center">${f2(dStats.sub3.meanOT)}</td>
            <td class="center">${f3(dStats.sub3.alpha)}</td>
          </tr>
          <tr>
            <td>Subscale 4: Specific App Functionality & Interface Accessibility</td>
            <td class="center">85–118</td>
            <td class="center">40</td>
            <td class="center highlight-cell">${f2(dStats.sub4.mean)}</td>
            <td class="center">${f2(dStats.sub4.sd)}</td>
            <td class="center highlight-cell">${f1(dStats.sub4.pctAgree)}%</td>
            <td class="center">${f2(dStats.sub4.meanT)}</td>
            <td class="center">${f2(dStats.sub4.meanOT)}</td>
            <td class="center highlight-cell">${f3(dStats.sub4.alpha)}</td>
          </tr>
          <tr>
            <td><strong>TOTAL INSTRUMENT</strong></td>
            <td class="center"><strong>1–118</strong></td>
            <td class="center"><strong>40</strong></td>
            <td class="center"><strong>${f2(dStats.total.mean)}</strong></td>
            <td class="center"><strong>${f2(dStats.total.sd)}</strong></td>
            <td class="center"><strong>${f1(dStats.total.pctAgree)}%</strong></td>
            <td class="center"><strong>${f2(dStats.total.meanT)}</strong></td>
            <td class="center"><strong>${f2(dStats.total.meanOT)}</strong></td>
            <td class="center"><strong>${f3(dStats.total.alpha)}</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Total scale mean = ${f2(dStats.total.mean)} (SD = ${f2(dStats.total.sd)}). Overall instrument reliability α = ${f3(dStats.total.alpha)}. Item 98 ("Include tasks that respond to their needs", M = 4.83, SD = 0.38) ranked highest across all 118 items, closely followed by Item 85 ("Universal accessibility: font size, color, graphic elements", M = 4.80, SD = 0.41) and Item 88 ("Allow adding personalized images or pictograms", M = 4.78, SD = 0.42).</div>
    </div>

    <h2 class="section-heading">4.14 Thematic Analysis of Semi-Structured Interviews</h2>
    <p>
      Qualitative interview data from 40 professionals and 10 supported student observation sessions were coded using reflexive thematic analysis (Braun & Clarke, 2006). Six major thematic domains were identified, summarized in Table 4.7 with illustrative quotations and design implications. Every quote reported below matches the verbatim text recorded in the <em>Qualitative_Interviews_Obs</em> worksheet of the dataset.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.7</div>
      <div class="table-title">Qualitative Thematic Framework Linking Stakeholder Accounts to Interface Specifications</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Thematic Domain</th>
            <th>Grounded Codes</th>
            <th>Representative Verbatim Stakeholder Quote</th>
            <th>Derived Design Specification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Sensory Sensitivity & Glare</strong></td>
            <td>Aversive glare, acoustic shock, calming palette</td>
            <td><em>"Stark white screens and sudden loud fanfares trigger sensory defensiveness. When our students hear an unannounced buzz, they close the tab or cover their ears. We need warm pastel backgrounds and silent operation."</em> (OT01, 10 Yrs Exp)</td>
            <td>Warm ivory canvas (#FAF8F5), muted lavender/sage green, zero auto-play audio.</td>
          </tr>
          <tr>
            <td><strong>2. Navigation Predictability</strong></td>
            <td>Disorientation, constant anchors, flat hierarchy</td>
            <td><em>"If the back button is not in the exact top-left corner on every page, children panic and believe they are trapped. The navigation bar must never shift position."</em> (T02, 8 Yrs Exp)</td>
            <td>Fixed top-left Back and Home buttons; shallow 2-tier architectural hierarchy.</td>
          </tr>
          <tr>
            <td><strong>3. Cognitive Offloading</strong></td>
            <td>Single instruction, working memory bottleneck</td>
            <td><em>"You cannot give two instructions at once. It must be: Look, Count, Select. Exactly one discrete task on the screen with zero sidebar animations."</em> (T03, 15 Yrs Exp)</td>
            <td>Single card container per viewport; complete elimination of sidebar links and ads.</td>
          </tr>
          <tr>
            <td><strong>4. Concrete Visual Math</strong></td>
            <td>Abstract symbol gap, tactile visual counters</td>
            <td><em>"Pure numbers like 2+3 mean nothing to an autistic child. But when they see 2 apples and 3 apples that they can touch and count together, addition becomes real."</em> (T04, 6 Yrs Exp)</td>
            <td>Interactive visual apple manipulatives and visual calculator pad with dot counters.</td>
          </tr>
          <tr>
            <td><strong>5. Low-Frustration Recovery</strong></td>
            <td>Buzzer distress, supportive cues, unhurried pace</td>
            <td><em>"A harsh red cross or buzzer makes them feel attacked and shut down. Feedback must say 'Let\'s try again' and offer a gentle hint without penalties."</em> (T05, 10 Yrs Exp)</td>
            <td>Non-punitive 'Let\'s try again' feedback; hint button; zero timers or countdown clocks.</td>
          </tr>
          <tr>
            <td><strong>6. Educator Monitoring</strong></td>
            <td>IEP tracking, session logs, separate portal</td>
            <td><em>"I need to track student progress without cluttering their learning screen with complex dashboards. The teacher portal should be separate and discrete."</em> (T09, 7 Yrs Exp)</td>
            <td>Dedicated, PIN-protected Teacher/Parent Dashboard with IEP progress metrics.</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Thematic framework derived from N = 40 professional interviews and corroborated during n = 10 student interaction walkthroughs. Complete verbatim records for all 50 participants are cataloged in the Qualitative_Interviews_Obs worksheet.</div>
    </div>

    <h2 class="section-heading">4.15 Integration of Qualitative and Quantitative Findings</h2>
    <p>
      Triangulation of quantitative ratings and qualitative themes demonstrated strong convergent validity. Items rated highest in the Priority Rating Scale (e.g., REQ07 visual clutter, REQ01 screen structure, REQ05 navigation anchors) directly matched the core themes articulated in interviews. The descriptive SPSS data established the relative priority of requirements, while the qualitative accounts provided contextual rationale, explaining how visual clutter induces attentional fragmentation and why acoustic alarms precipitate emotional dysregulation.
    </p>

    <h2 class="section-heading">4.16 Identified Design Priorities</h2>
    <p>
      Requirements were organized into High and Medium priority tiers by triangulating three independent data sources: (a) SPSS importance rating means and ranks, (b) corroborating items from the 118-item DP-TIC-AUT-Q, and (c) repeated qualitative interview themes. Table 4.8 presents the final prioritized interface requirements matrix.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 4.8</div>
      <div class="table-title">Final Prioritized Interface Requirements Matrix Combining Descriptive Statistics, DP-TIC, and Themes</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Feature / Requirement Statement</th>
            <th class="center">Item Code</th>
            <th class="center">n</th>
            <th class="center">Mean</th>
            <th class="center">SD</th>
            <th class="center">Rank</th>
            <th class="center">Priority</th>
            <th>DP-TIC Link</th>
            <th>Operationalized Feature in Interface</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Limited unnecessary visual clutter</td>
            <td class="center">REQ07</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ07').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ07').sdAll)}</td>
            <td class="center">1</td>
            <td class="center priority-high">High</td>
            <td>Item 85, 99</td>
            <td>Single learning card per viewport; complete removal of sidebar ads</td>
          </tr>
          <tr>
            <td>Clear and consistent screen structure</td>
            <td class="center">REQ01</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ01').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ01').sdAll)}</td>
            <td class="center">2 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 86, 101</td>
            <td>Fixed top application bar with standardized layout across all screens</td>
          </tr>
          <tr>
            <td>Easy-to-find Back / Home / Help options</td>
            <td class="center">REQ05</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ05').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ05').sdAll)}</td>
            <td class="center">2 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 86, 105</td>
            <td>Permanent top-left Back button and Home button with history stack</td>
          </tr>
          <tr>
            <td>Appropriate use of images/symbols with text</td>
            <td class="center">REQ09</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ09').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ09').sdAll)}</td>
            <td class="center">2 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 45, 100</td>
            <td>High-clarity SVG pictograms paired systematically with all text prompts</td>
          </tr>
          <tr>
            <td>One task/step presented clearly at a time</td>
            <td class="center">REQ04</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ04').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ04').sdAll)}</td>
            <td class="center">5 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 63, 98</td>
            <td>Step-by-step modular progression (Step 1 of 5); zero split attention</td>
          </tr>
          <tr>
            <td>Low-frustration error recovery support</td>
            <td class="center">REQ15</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ15').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ15').sdAll)}</td>
            <td class="center">5 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 71, 105</td>
            <td>Supportive retry cues ('Let\'s try again'); persistent hint button</td>
          </tr>
          <tr>
            <td>Simple and concise instructions</td>
            <td class="center">REQ03</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ03').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ03').sdAll)}</td>
            <td class="center">7</td>
            <td class="center priority-high">High</td>
            <td>Item 100, 103</td>
            <td>One-sentence declarative prompt paired with icon and Web Speech TTS</td>
          </tr>
          <tr>
            <td>Predictable response after clicking</td>
            <td class="center">REQ06</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ06').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ06').sdAll)}</td>
            <td class="center">8 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 86, 102</td>
            <td>Immediate visual active state, gentle audio chime, no unexpected jumps</td>
          </tr>
          <tr>
            <td>Personalization of pace and difficulty</td>
            <td class="center">REQ12</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ12').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ12').sdAll)}</td>
            <td class="center">8 (tie)</td>
            <td class="center priority-high">High</td>
            <td>Item 87</td>
            <td>Self-paced learning flow; complete elimination of timers and countdowns</td>
          </tr>
          <tr>
            <td>Immediate and understandable feedback</td>
            <td class="center">REQ14</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ14').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ14').sdAll)}</td>
            <td class="center">10</td>
            <td class="center priority-med">Medium</td>
            <td>Item 71, 104</td>
            <td>Supportive feedback banner with calm voice narration</td>
          </tr>
          <tr>
            <td>Ability to reduce or disable sound and motion</td>
            <td class="center">REQ08</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ08').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ08').sdAll)}</td>
            <td class="center">11</td>
            <td class="center priority-med">Medium</td>
            <td>Item 26, 85</td>
            <td>Zero auto-play audio; pure sine wave chimes; user-controlled TTS</td>
          </tr>
          <tr>
            <td>Familiar, clearly labelled controls</td>
            <td class="center">REQ02</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ02').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ02').sdAll)}</td>
            <td class="center">12</td>
            <td class="center priority-med">Medium</td>
            <td>Item 100, 101</td>
            <td>Standardized buttons with dual text labels and recognizable icons</td>
          </tr>
          <tr>
            <td>Visible progress or clear completion cues</td>
            <td class="center">REQ16</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ16').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ16').sdAll)}</td>
            <td class="center">13</td>
            <td class="center priority-med">Medium</td>
            <td>Item 91, 92</td>
            <td>Visual step indicators ('Step 1 of 5') and My Learning progress cards</td>
          </tr>
          <tr>
            <td>Personalization of sensory/interface settings</td>
            <td class="center">REQ13</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ13').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ13').sdAll)}</td>
            <td class="center">14</td>
            <td class="center priority-med">Medium</td>
            <td>Item 85</td>
            <td>Settings modal: 3 text sizes, 4 calm color themes, audio/motion toggles</td>
          </tr>
          <tr>
            <td>Ability to use student interests and choices</td>
            <td class="center">REQ17</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ17').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ17').sdAll)}</td>
            <td class="center">15</td>
            <td class="center priority-med">Medium</td>
            <td>Item 71</td>
            <td>Student Dashboard featuring large subject cards and activity options</td>
          </tr>
          <tr>
            <td>Multiple ways for the learner to respond</td>
            <td class="center">REQ11</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ11').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ11').sdAll)}</td>
            <td class="center">16 (tie)</td>
            <td class="center priority-med">Medium</td>
            <td>Item 100, 101</td>
            <td>Large clickable touch targets, keyboard navigation, tap-to-count items</td>
          </tr>
          <tr>
            <td>Compatibility with adult support routines</td>
            <td class="center">REQ18</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ18').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ18').sdAll)}</td>
            <td class="center">16 (tie)</td>
            <td class="center priority-med">Medium</td>
            <td>Item 91, 104</td>
            <td>Dedicated Educator Monitoring Portal with student profile tracking</td>
          </tr>
          <tr>
            <td>Multiple ways of presenting information</td>
            <td class="center">REQ10</td>
            <td class="center">40</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ10').meanAll)}</td>
            <td class="center">${f2(pItems.find(x=>x.id==='REQ10').sdAll)}</td>
            <td class="center">18</td>
            <td class="center priority-med">Medium</td>
            <td>Item 100</td>
            <td>Multimodal dual coding: text, visual illustration, and audio readout</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Triangulated prioritization: features supported by highest rating means (Rank 1–9), strong DP-TIC questionnaire ratings, and repeated interview themes are assigned High Priority; supportive features (Rank 10–18) are assigned Medium Priority. All 18 requirements are maintained with identical codes across chapters.</div>
    </div>

    <h2 class="section-heading">4.17 Summary of Needs Assessment</h2>
    <p>
      The needs assessment provided a coherent, evidence-based specification of educational needs and interface requirements for autistic learners. The descriptive data demonstrated that digital accessibility in autism centers on reducing extraneous sensory and cognitive load, establishing unwavering navigational predictability, and providing concrete multimodal instruction. These prioritized specifications formed the engineering blueprint for interface development in Chapter 5.
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
      This chapter documents the design, architecture, and implementation of <em>Learn & Grow</em>, a working autism-adapted educational website developed in response to the needs assessment findings. Development followed the Human-Centered Design process (ISO 9241-210:2019), converting the prioritized requirements from Chapter 4 into concrete interaction workflows, accessible visual styles, and functional curriculum modules.
    </p>

    <h2 class="section-heading">5.2 Translation of Needs Assessment Findings into Design Requirements</h2>
    <p>
      To ensure design decisions were rooted in empirical evidence rather than subjective intuition, an explicit traceability matrix was maintained. Table 5.1 links the identified stakeholder requirements to theoretical frameworks and their concrete software operationalization.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 5.1</div>
      <div class="table-title">Traceability Matrix: Linking Identified Needs to Implemented Interface Features</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Requirement Code & Need</th>
            <th>Empirical Evidence Base</th>
            <th>Theoretical Grounding</th>
            <th>Implemented Interface Feature</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ07: Visual Clutter Reduction</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ07').meanAll)}, Rank 1, High Priority; DP-TIC Item 85; Theme 1</td>
            <td>Cognitive Load Theory: Extraneous Load (Sweller et al., 2019)</td>
            <td>Single learning card per viewport; complete elimination of sidebar links, banners, and decorative animations.</td>
          </tr>
          <tr>
            <td>REQ01 & REQ05: Screen Structure & Anchored Navigation</td>
            <td>REQ01 Mean = ${f2(pItems.find(x=>x.id==='REQ01').meanAll)}; REQ05 Mean = ${f2(pItems.find(x=>x.id==='REQ05').meanAll)}; Rank 2 (tie), High Priority</td>
            <td>Executive Function & Predictability (Demetriou et al., 2018)</td>
            <td>Fixed top application bar with permanent top-left Back and Home buttons; persistent breadcrumb orientation tag.</td>
          </tr>
          <tr>
            <td>REQ04: Single Task Presentation</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ04').meanAll)}, Rank 5 (tie), High Priority; DP-TIC Item 63; Theme 3</td>
            <td>Cognitive Architecture & Working Memory (Sweller et al., 2019)</td>
            <td>Modular, step-by-step lesson progression (Step 1 of 5); learners complete one isolated interaction before advancing.</td>
          </tr>
          <tr>
            <td>REQ08: Sound & Motion Control</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ08').meanAll)}, Medium Priority; DP-TIC Item 26; Theme 1</td>
            <td>Sensory Modulation (Ben-Sasson et al., 2009; Robertson & Baron-Cohen, 2017)</td>
            <td>Zero automatic audio; all sound effects are soft sine-wave chimes (Web Audio API); user-initiated Web Speech TTS.</td>
          </tr>
          <tr>
            <td>REQ15: Low-Frustration Error Recovery</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ15').meanAll)}, Rank 5 (tie), High Priority; DP-TIC Item 71; Theme 5</td>
            <td>Positive Behavioral Support (Hume et al., 2021)</td>
            <td>Supportive retry feedback ('Let\'s try again'); persistent hint button; complete absence of buzzing error alarms.</td>
          </tr>
          <tr>
            <td>REQ09 & REQ10: Visual Math & Dual Coding</td>
            <td>REQ09 Mean = ${f2(pItems.find(x=>x.id==='REQ09').meanAll)}, Rank 2 (tie), High Priority; Theme 4</td>
            <td>Dual Coding & Visual Structuring (Quill, 1997; Mesibov et al., 2004)</td>
            <td>Interactive visual apple manipulatives (2 + 3 = 5); visual calculator with dynamic dot counters; paired text-icon cards.</td>
          </tr>
          <tr>
            <td>REQ12: Self-Paced Learning</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ12').meanAll)}, Rank 8 (tie), High Priority; DP-TIC Item 87</td>
            <td>Universal Design for Learning (CAST, 2018)</td>
            <td>Unhurried interaction flow; zero countdown clocks, timers, or rapid reaction constraints.</td>
          </tr>
          <tr>
            <td>REQ13: Personalization Settings</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ13').meanAll)}, Medium Priority; OTs Mean = 4.80; DP-TIC Item 85</td>
            <td>Universal Design for Learning (Meyer et al., 2014)</td>
            <td>Settings modal: 3 text sizes (Small, Medium, Large), 4 calm color themes, sound toggle, and reduced motion control.</td>
          </tr>
          <tr>
            <td>REQ18: Adult Support Compatibility</td>
            <td>Mean = ${f2(pItems.find(x=>x.id==='REQ18').meanAll)}, Medium Priority; Teachers Mean = 4.40; Theme 6</td>
            <td>Classroom Ecology (Putnam & Chong, 2008)</td>
            <td>Dedicated Teacher & Parent Portal with student profiles and progress tracking, separate from the student screen.</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Direct functional traceability ensures design decisions originate from verified stakeholder requirements rather than arbitrary aesthetics.</div>
    </div>

    <h2 class="section-heading">5.3 Design Objectives and Development Principles</h2>
    <p>
      Four development principles guided interface construction: (a) <em>Predictability:</em> page structure, controls, and feedback mechanisms remain identical across all subjects; (b) <em>Sensory Tranquility:</em> high-glare white screens and abrupt acoustic stimuli are eliminated; (c) <em>Singular Focus:</em> exactly one task is presented per viewport; and (d) <em>Unhurried Autonomy:</em> learners navigate at their own pace without time pressure.
    </p>

    <h2 class="section-heading">5.4 Proposed Interface Architecture</h2>
    <p>
      The platform was engineered as a lightweight, client-side single-page application (SPA). This architecture eliminates full page reloads, preserving visual and sensory continuity during task transitions.
    </p>

    <div class="figure-container">
      <div style="font-family: monospace; font-size: 9pt; text-align: center; line-height: 1.35;">
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
        <strong>Figure 5.1.</strong> System Architecture of the Autism-Adapted Educational Platform.
      </div>
    </div>

    <h2 class="section-heading">5.5 Information Architecture</h2>
    <p>
      The information structure was constrained to a maximum depth of two clicks from the Student Dashboard. From the dashboard, learners select either a Subject (Mathematics, English, EVS) or the Practice Hub. Within any lesson, progression follows a linear sequence (Step 1 of 5).
    </p>

    <h2 class="section-heading">5.6 Website Structure and Navigation Design</h2>
    <p>
      The navigation header contains fixed anchors: the Back button (top-left, powered by a JavaScript history stack), the Home button (top-left, providing an immediate return to the dashboard), and utility controls (top-right: Web Speech narration, settings modal, and educator portal).
    </p>

    <h2 class="section-heading">5.7 Visual Interface Design</h2>
    <h3 class="sub-section-heading">Colour Scheme</h3>
    <p>
      The interface canvas uses a warm off-white ivory (#FAF8F5) rather than pure white (#FFFFFF), reducing glare. Primary controls feature a muted lavender (#7B79D1), sage green (#87A987), and soft blue (#72A0C1). A high-contrast dark navy theme with soft yellow text is also provided for learners with photophobia.
    </p>
    <h3 class="sub-section-heading">Typography</h3>
    <p>
      The platform employs <em>Nunito</em>, an open-source rounded sans-serif typeface designed for clarity and legibility. Three selectable sizes are available: Small (15px), Medium (18px default), and Large (22px).
    </p>
    <h3 class="sub-section-heading">Icons, Layout and Spacing</h3>
    <p>
      Abstract visual elements were discarded in favor of concrete SVG illustrations (apples, sun, tree, basket). Interactive touch targets exceed 48 × 48 pixels with generous padding, accommodating fine-motor dyspraxia.
    </p>

    <h2 class="section-heading">5.8 Development of Educational Modules</h2>
    <p>
      Four functional areas were implemented: (a) <strong>Mathematics:</strong> early addition, counting, shapes, and virtual calculation; (b) <strong>English:</strong> sight words and phonics (CAT, DOG, SUN); (c) <strong>Environmental Studies:</strong> living versus non-living things, plant anatomy; and (d) <strong>Practice Hub:</strong> hands-on interactive activities.
    </p>

    <h2 class="section-heading">5.9 Implementation of Autism-Friendly Features</h2>
    <p>
      Eight specific autism accommodations were implemented: (1) simplified navigation, (2) structured step meters, (3) predictable page layouts, (4) elimination of visual distractions, (5) visual instructions, (6) multimodal audio-visual presentation, (7) interactive educational activities, and (8) personalized learning settings.
    </p>

    <h2 class="section-heading">5.10 Development of Subject-Specific Learning Components</h2>
    <p>
      The <strong>Mathematics Addition Lesson (Lesson 1)</strong> serves as the primary instructional module. Learners encounter a concrete visual equation: <em>2 Apples + 3 Apples = 5 Apples</em>. The apples are interactive SVG elements that enlarge and produce a gentle sine tone when tapped, allowing learners to actively count "1, 2, 3, 4, 5" before selecting from three large choice buttons (4, 5, 6).
    </p>

    <div class="ui-mockup-box">
      <div class="ui-topbar">
        <span>⬅ BACK | 🏠 HOME</span>
        <span>MATHEMATICS / ADDITION / LESSON 1</span>
        <span>STEP 1 OF 5</span>
      </div>
      <div style="text-align: center; margin: 8px 0;">
        <div style="font-weight: bold; font-size: 10.5pt; margin-bottom: 6px;">Instruction: "Addition means putting groups together. How many apples altogether?"</div>
        <div style="display: flex; justify-content: center; align-items: center; gap: 10px; margin: 10px 0;">
          <div style="border: 1px solid #ccc; padding: 4px 10px; border-radius: 6px; background: #fff;">🍎 🍎<br><small>2 Apples</small></div>
          <span style="font-size: 14pt; font-weight: bold; color: #7B79D1;">➕</span>
          <div style="border: 1px solid #ccc; padding: 4px 10px; border-radius: 6px; background: #fff;">🍎 🍎 🍎<br><small>3 Apples</small></div>
          <span style="font-size: 14pt; font-weight: bold; color: #7B79D1;">🟰</span>
          <div style="border: 2px dashed #E0C870; padding: 6px 12px; border-radius: 6px; background: #FFF9E6; font-size: 12pt;">❓</div>
        </div>
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 8px;">
          <button style="font-size: 12pt; padding: 5px 18px; border-radius: 6px; border: 2px solid #ccc; background: #fff;">4</button>
          <button style="font-size: 12pt; padding: 5px 18px; border-radius: 6px; border: 2px solid #7B79D1; background: #EFEFFC; font-weight: bold;">5</button>
          <button style="font-size: 12pt; padding: 5px 18px; border-radius: 6px; border: 2px solid #ccc; background: #fff;">6</button>
        </div>
      </div>
    </div>
    <div class="figure-caption">
      <strong>Figure 5.2.</strong> Visual Layout of the Concrete Addition Lesson.
    </div>

    <h2 class="section-heading">5.11 Integration of Interactive Learning Activities</h2>
    <p>
      Four interactive practice engines were built:
    </p>
    <ul>
      <li><strong>Picture & Word Matching Engine:</strong> Two-column matching activity (Sun, Tree, Book). Selecting matching cards confirms the pairing with a soft green highlight.</li>
      <li><strong>Category Sorting Engine:</strong> Visual classification game sorting fruits (Apple, Banana) and vegetables (Carrot, Broccoli) into labelled baskets.</li>
      <li><strong>Object Counting Engine:</strong> Quantifying scattered stars with direct numeral matching.</li>
      <li><strong>Visual Autism-Adapted Calculator:</strong> A calculation tool with large, tactile buttons and a dynamic visual dot counter rendering the exact quantity computed.</li>
    </ul>

    <h2 class="section-heading">5.12 Technical Development and Implementation</h2>
    <p>
      The platform was built using semantic HTML5, CSS3 Custom Properties, and vanilla ECMAScript 2022 JavaScript. Audio feedback is synthesized using the Web Audio API (pure sine tones at 440–659 Hz), avoiding harsh audio samples. Verbal narration utilizes the browser's built-in Web Speech Synthesis API.
    </p>

    <h2 class="section-heading">5.13 Website Pages and Functional Components</h2>
    <p>
      The application consists of 11 view states managed dynamically: Student Dashboard, Mathematics Hub, English Hub, EVS Hub, Activities Hub, Addition Lesson View, Matching Engine, Sorting Engine, Visual Calculator, My Learning Progress, and Educator Portal.
    </p>

    <h2 class="section-heading">5.14 Visual Documentation and Live Repository</h2>
    <p>
      The complete source code and live working website are hosted on GitHub:
    </p>
    <ul>
      <li><strong>Live Educational Platform:</strong> <a href="https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/">https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/</a></li>
      <li><strong>GitHub Source Code Repository:</strong> <a href="https://github.com/reetadevisipaya-del/autism-adapted-educational-interface">https://github.com/reetadevisipaya-del/autism-adapted-educational-interface</a></li>
    </ul>

    <h2 class="section-heading">5.15 Alignment of Developed Features with Identified Educational Needs</h2>
    <p>
      A formative verification of the developed prototype against the prioritized requirements confirmed that all high-priority specifications were operationalized in the working software. Table 5.2 summarizes the implementation status, clearly distinguishing active prototype features from proposed administrative enhancements.
    </p>

    <div class="apa-table-wrapper">
      <div class="table-number">Table 5.2</div>
      <div class="table-title">Formative Feature Verification Against Prioritized Requirements</div>
      <table class="apa-table">
        <thead>
          <tr>
            <th>Requirement Code</th>
            <th>Target Requirement</th>
            <th>Operationalized Feature in Working Website</th>
            <th class="center">Implementation Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>REQ01 & REQ05</td>
            <td>Predictable Navigation</td>
            <td>Fixed top application bar; permanent Back and Home buttons; history stack.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ02 & REQ06</td>
            <td>Familiar Controls & Predictability</td>
            <td>Dual text-icon labels; deterministic active states; visual feedback chimes.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ03 & REQ04</td>
            <td>Single Task Presentation</td>
            <td>One activity card per screen; 1-sentence prompt; step progression meter.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ07 & REQ08</td>
            <td>Visual Clutter & Sound Control</td>
            <td>Warm ivory canvas (#FAF8F5); zero ads; user-controlled Web Speech TTS.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ09 & REQ10</td>
            <td>Concrete Visual Manipulatives</td>
            <td>Addition lesson with clickable apples; visual dot calculator.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ12 & REQ15</td>
            <td>Self-Pacing & Error Recovery</td>
            <td>Zero countdown timers; non-punitive 'Let\'s try again' feedback; hint button.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ13</td>
            <td>Personalization Settings</td>
            <td>Settings modal: 3 text sizes, 4 calm color themes, sound and motion toggles.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>REQ18</td>
            <td>Educator & Parent Monitoring</td>
            <td>Educator Portal displaying student profiles and IEP target tracking.</td>
            <td class="center">Implemented & Active</td>
          </tr>
          <tr>
            <td>System Extension</td>
            <td>Multi-Classroom Cloud Sync</td>
            <td>Remote multi-institution database synchronization and analytics.</td>
            <td class="center">Proposed Future Development</td>
          </tr>
        </tbody>
      </table>
      <div class="table-note">Note. Formative verification indicates that all core functional specifications were successfully instantiated in the browser-based software prototype.</div>
    </div>

    <h2 class="section-heading">5.16 Summary of Interface Development</h2>
    <p>
      The development phase established an empirical translation pathway from stakeholder needs to software features. By embodying the principles of sensory tranquility, predictable structure, and concrete visual representation, <em>Learn & Grow</em> demonstrates how web-based learning environments can be purposefully adapted for autistic learners.
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
      This study investigated the educational needs and interface requirements of autistic learners through a user-centered needs assessment and translated those findings into an autism-adapted web interface. By documenting the chain of reasoning linking stakeholder perspectives to concrete software features, this work addresses a persistent gap in the special education technology literature, where design specifications are frequently omitted or reported with insufficient detail (Fletcher-Watson, 2014; Mazon et al., 2019). This chapter interprets the empirical findings in relation to established psychological and pedagogical theory, examines stakeholder viewpoints, contextualizes the contribution against existing platforms, and considers methodological limitations.
    </p>

    <h2 class="section-heading">6.2 Interpretation of Needs Assessment Findings</h2>
    <p>
      The descriptive analysis revealed strong consensus among professionals regarding the essentiality of visual clarity, predictable structure, and sensory control. Visual clutter reduction (REQ07, <em>M</em> = ${f2(pItems.find(x=>x.id==='REQ07').meanAll)}, Rank 1), consistent screen layout (REQ01, <em>M</em> = ${f2(pItems.find(x=>x.id==='REQ01').meanAll)}, Rank 2 tie), and predictable navigation anchors (REQ05, <em>M</em> = ${f2(pItems.find(x=>x.id==='REQ05').meanAll)}, Rank 2 tie) were ranked as the top priorities. These findings align with cognitive accounts of autism. Enhanced perceptual functioning (Mottron et al., 2006) and a detail-focused cognitive style (Happé & Frith, 2006) mean that autistic learners process local stimuli with high salience; peripheral visual elements such as banner ads or decorative animations compete strongly for attentional resources, inducing cognitive fatigue.
    </p>

    <h2 class="section-heading">6.3 Stakeholder Perspectives on ICT-Based Learning</h2>
    <p>
      Descriptive comparison of average ratings across professional roles revealed meaningful differences in practical focus. Special educators and occupational therapists shared strong agreement on foundational structural parameters: visual clutter elimination (<em>M</em> = 4.77 vs 4.90), consistent screen structure (<em>M</em> = 4.73 vs 4.90), and predictable back navigation (<em>M</em> = 4.77 vs 4.80). 
    </p>
    <p>
      However, differences in daily practice were clearly reflected in their ratings: occupational therapists assigned higher average importance to sensory settings customization (REQ13, <em>M</em> = 4.80, <em>SD</em> = 0.42 vs. Teachers <em>M</em> = 4.37, <em>SD</em> = 0.50) and multiple response options (REQ11, <em>M</em> = 4.70, <em>SD</em> = 0.48 vs. Teachers <em>M</em> = 4.20, <em>SD</em> = 0.71), reflecting their clinical responsibility to accommodate sensory defensiveness and fine-motor dyspraxia. Conversely, special educators placed higher priority on classroom routine integration (REQ18, <em>M</em> = 4.40, <em>SD</em> = 0.50 vs. Therapists <em>M</em> = 4.10, <em>SD</em> = 0.74), reflecting the practical demand of managing timetable transitions and curriculum pacing. Given the purposive nature and size of the sample, these variations are interpreted as complementary professional perspectives rather than conflicting requirements.
    </p>

    <h2 class="section-heading">6.4 Relationship Between Identified Needs and Existing Literature</h2>
    <p>
      The findings corroborate three foundational frameworks:
    </p>
    <ul>
      <li><strong>Cognitive Load Theory (CLT):</strong> Sweller et al. (2019) note that working memory capacity is strictly bounded. For autistic learners, atypical sensory filtering and executive planning demands absorb significant cognitive bandwidth. Presenting one isolated task per screen dramatically reduces extraneous cognitive load.</li>
      <li><strong>Universal Design for Learning (UDL):</strong> The multimodal instruction model—pairing text, pictograms, and user-initiated speech—embodies UDL's principle of multiple means of representation (CAST, 2018; Meyer et al., 2014).</li>
      <li><strong>TEACCH Structured Teaching:</strong> The structured routine and explicit completion cues advocated by Mesibov et al. (2004) were successfully translated into digital step meters and permanent navigation anchors.</li>
    </ul>

    <h2 class="section-heading">6.5 Implications for Autism-Specific UI/UX Design</h2>
    <p>
      These findings challenge commercial software paradigms that assume children's educational apps must feature hyper-saturated colors, constant background music, and fast-paced gamification. For autistic learners, such design patterns represent substantial barriers. Autism-adapted UI/UX design is characterized not by infantilized graphics, but by <em>visual tranquility, structural predictability, and emotional safety</em>.
    </p>

    <h2 class="section-heading">6.6 Contribution of the Developed Interface</h2>
    <p>
      The developed <em>Learn & Grow</em> interface bridges an important functional gap. While platforms like <strong>Avaz AAC</strong> provide customizable communication tools (Avaz, n.d.), they do not deliver structured academic curriculum modules. Conversely, while platforms like <strong>Otsimo</strong> offer gamified cognitive exercises (Bayar, 2019), their underlying stakeholder-derived design requirements remain proprietary. <em>Learn & Grow</em> demonstrates how an open, browser-accessible interface can combine academic instruction with autism-specific accommodations such as a visual dot-counter calculator.
    </p>

    <h2 class="section-heading">6.7 Implications for Special Education and Educational Technology</h2>
    <p>
      In the Indian educational context, national frameworks such as the Rights of Persons with Disabilities Act (2016) and the National Education Policy (Ministry of Education, 2020) mandate accessible digital learning. However, resource constraints often leave schools reliant on mainstream software. The provision of an open, lightweight web interface with a dedicated educator monitoring portal allows teachers to track individual education program (IEP) targets without cluttering student learning screens.
    </p>

    <h2 class="section-heading">6.8 Limitations of the Study</h2>
    <p>
      Several methodological limitations must be acknowledged: (a) the sample was recruited purposively from educational and clinical institutions within a single geographic region (Punjab, Mohali, and Chandigarh), which may constrain broader generalizability; (b) given communicative and developmental considerations, student insights were gathered through mediated observational walkthroughs rather than autonomous self-report instruments; and (c) the study scope was restricted to needs assessment and interface development. It did not include a controlled trial of academic learning efficacy or an objective eye-tracking evaluation. The developed prototype represents a structured design response to identified needs rather than a validated clinical intervention.
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
      This project was undertaken to investigate the educational needs of autistic learners, derive prioritized interface design requirements, and develop an autism-adapted web-based educational interface. By combining quantitative ratings from 40 professionals, qualitative interviews, and 10 supported student observation sessions, the study demonstrated that accessible digital design for autism requires deliberate accommodations centered on cognitive load reduction, sensory tranquility, and navigational predictability.
    </p>

    <h2 class="section-heading">7.2 Summary of Research Objectives Achieved</h2>
    <p>
      The research objectives established in Chapter 1 were addressed as follows:
    </p>
    <ul>
      <li><strong>Objective 1 (Identify Educational Needs & Challenges):</strong> Empirical investigation cataloged key digital barriers, identifying peripheral motion, sudden loud audio, harsh error buzzers, and multi-step layouts as primary impediments.</li>
      <li><strong>Objective 2 (Examine UI/UX Feature-Importance):</strong> Descriptive statistics established high consensus on clutter reduction (<em>M</em> = ${f2(pItems.find(x=>x.id==='REQ07').meanAll)}), consistent screen layout (<em>M</em> = ${f2(pItems.find(x=>x.id==='REQ01').meanAll)}), and predictable back navigation (<em>M</em> = ${f2(pItems.find(x=>x.id==='REQ05').meanAll)}), while documenting distinct clinical priorities regarding sensory settings.</li>
      <li><strong>Objective 3 (Derive Prioritized Design Requirements):</strong> Triangulated descriptive metrics, DP-TIC subscale responses, and qualitative interview themes into a coherent High and Medium priority requirements matrix.</li>
      <li><strong>Objective 4 (Develop Autism-Adapted Interface):</strong> The <em>Learn & Grow</em> platform was fully implemented with 11 functional views, incorporating an off-white canvas, calming pastel palettes, single-task modular layouts, visual apple manipulatives, interactive games, a visual calculator, and an educator portal.</li>
      <li><strong>Objective 5 (Document Design Rationale):</strong> An explicit traceability matrix established the rationale connecting each software feature to its underlying stakeholder evidence base.</li>
    </ul>

    <h2 class="section-heading">7.3 Major Contributions of the Study</h2>
    <p>
      The study contributes to special education technology on three levels:
    </p>
    <ul>
      <li><strong>Theoretical Contribution:</strong> Operationalizes Cognitive Load Theory, Universal Design for Learning, and TEACCH structured teaching principles within web interface design.</li>
      <li><strong>Methodological Contribution:</strong> Demonstrates a transparent, replicable protocol combining the 118-item DP-TIC-AUT-Q, priority rating scales, and qualitative thematic analysis to generate software requirements.</li>
      <li><strong>Practical Contribution:</strong> Delivers a functioning, open-access web-based educational platform tailored for autistic learners and made freely available on GitHub.</li>
    </ul>

    <h2 class="section-heading">7.4 Practical Implications</h2>
    <p>
      For special educators and therapists, the platform provides an accessible digital resource that respects sensory thresholds and supports self-paced learning. For software developers, the documented specifications offer an actionable design guide for engineering cognitive accessibility.
    </p>

    <h2 class="section-heading">7.5 Recommendations</h2>
    <p>
      Based on the study findings, the following recommendations are offered:
    </p>
    <ol>
      <li><strong>For Educational Software Developers:</strong>
        <ul>
          <li>Eliminate automatic audio playback, loud celebratory fanfares, and aggressive error buzzers.</li>
          <li>Utilize warm off-white canvases (#FAF8F5) with muted pastel accents to prevent glare and sensory overload.</li>
          <li>Ensure navigation controls (Back, Home) remain anchored in identical coordinates across all application views.</li>
          <li>Structure instructional tasks into self-contained, single-step screens with clear completion indicators.</li>
        </ul>
      </li>
      <li><strong>For Special Education Practitioners:</strong>
        <ul>
          <li>Integrate touch-enabled tablets with adapted educational interfaces into daily structured classroom routines.</li>
          <li>Utilize dedicated educator dashboards to track learner progression without cluttering student learning screens.</li>
        </ul>
      </li>
      <li><strong>For Educational Policymakers:</strong>
        <ul>
          <li>Incorporate neurodivergent and cognitive accessibility criteria into national procurement standards for educational software.</li>
        </ul>
      </li>
    </ol>

    <h2 class="section-heading">7.6 Future Research Directions</h2>
    <p>
      Future research should build upon this needs-to-interface foundation through several avenues:
    </p>
    <ul>
      <li><strong>Comparative Effectiveness Evaluations:</strong> Conducting longitudinal pre-test/post-test comparative studies to evaluate academic knowledge acquisition and time-on-task between the autism-adapted interface and conventional commercial software.</li>
      <li><strong>Eye-Tracking & Biometric Usability Studies:</strong> Using eye-tracking analytics and physiological sensors to objectively measure visual fixation patterns, scan paths, and autonomic stress responses during interaction.</li>
      <li><strong>Adaptive Personalization Algorithms:</strong> Investigating intelligent algorithms capable of dynamically modulating visual density and instructional scaffolding based on individual learner performance.</li>
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
console.log('Successfully generated print_document.html with descriptive SPSS statistics');
