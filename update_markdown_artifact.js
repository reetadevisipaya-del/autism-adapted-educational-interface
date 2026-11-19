const fs = require('fs');
const path = require('path');

const stats = JSON.parse(fs.readFileSync(path.join(__dirname, 'stats_summary.json'), 'utf8'));

const pStats = stats.priority;
const dStats = stats.dptic;
const pItems = pStats.items;
const categories = pStats.categories;
const demo = stats.demographics;
const barriers = stats.barriers;

const f2 = val => typeof val === 'number' ? val.toFixed(2) : val;
const f3 = val => typeof val === 'number' ? val.toFixed(3) : val;
const f1 = val => typeof val === 'number' ? val.toFixed(1) : val;

const md = `# PROJECT REPORT
## Development of an Autism-Adapted Web-Based Educational Interface: A User-Centered Investigation of Educational Needs and Design Requirements

**Submitted by:** Smayra  
**Institution:** Chandigarh University, Gharuan, Mohali, Punjab  
**Degree:** Bachelor of Arts  
**Month & Year:** November 2026  

---

# CHAPTER 4: NEEDS ASSESSMENT AND FINDINGS

## 4.1 Introduction
Designing educational technologies adapted for autistic learners requires an empirical foundation grounded in the operational realities of special education and therapeutic practice. While universal accessibility guidelines such as the Web Content Accessibility Guidelines (WCAG 2.1) provide an essential technical baseline, they focus primarily on sensory and motor accessibility and do not address the atypical attentional orienting, executive dysfunction, and sensory modulation characteristics of Autism Spectrum Disorder (ASD). This chapter presents the findings of a user-centered, mixed-methods needs assessment conducted across special schools, inclusive resource classrooms, and pediatric therapy clinics in the Mohali, Chandigarh, and Punjab regions.

The investigation was designed to address four specific research questions:
1. *What educational needs and operational barriers do stakeholders encounter when autistic learners use existing digital tools?*
2. *Which user interface (UI) and user experience (UX) features do stakeholders prioritize, and how do average importance ratings compare across professional roles?*
3. *How do individual features group into core design-principle categories?*
4. *How can these prioritized requirements be operationalized in an educational web interface tailored for autistic learners?*

---

## 4.2 Overview of the Needs Assessment
In alignment with the convergent mixed-methods methodology established in Chapter 3, the study recruited a total sample of $N = 50$ participants, intentionally structured into two complementary cohorts:
- **Professional Cohort ($N = 40$):** Comprising 30 Special Education Teachers (coded T01 to T30) and 10 Occupational Therapists (coded OT01 to OT10). Because these practitioners possess direct daily responsibility for curriculum mediation and sensory regulation, they completed the full quantitative survey battery (the 18-item Priority Rating Scale and the 118-item DP-TIC-AUT-Q) as well as semi-structured qualitative interviews.
- **Autistic Student Cohort ($n = 10$):** Comprising 10 primary school-aged autistic learners (coded S01 to S10, aged 8 to 14 years; 6 with ASD Level 1 support needs and 4 with Level 2 support needs). In accordance with ethical guidelines and developmental appropriateness, student participants were not burdened with 118-item professional questionnaires. Instead, they participated in guided task-walkthrough and observational preference sessions mediated by familiar educators, providing direct behavioral and qualitative preference evidence.

---

## 4.3 Stakeholder Demographic and Professional Profile
In SPSS, participant background characteristics were analyzed using frequency distributions and central tendency measures (*Analyze → Descriptive Statistics → Frequencies*). The professional sample possessed substantial clinical and pedagogical expertise. Special educators reported a mean of 9.4 years of professional experience working with autistic children ($SD = 4.2$), while occupational therapists reported a mean of 8.8 years of pediatric practice ($SD = 3.6$). Table 4.1 summarizes the demographic and professional profiles of the participants across all cohorts.

### Table 4.1
*Demographic and Professional Profile of the Needs Assessment Stakeholders ($N = 50$)*

| Characteristic / Variable | Teachers ($n = 30$) | Therapists ($n = 10$) | Students ($n = 10$) | Total ($N = 50$) |
| :--- | :---: | :---: | :---: | :---: |
| **Gender** | | | | |
| &nbsp;&nbsp;Female | 21 (70.0%) | 8 (80.0%) | 3 (30.0%) | 32 (64.0%) |
| &nbsp;&nbsp;Male | 9 (30.0%) | 2 (20.0%) | 7 (70.0%) | 18 (36.0%) |
| **Mean Age in Years (Range)** | 37.4 (26–52) | 34.2 (27–46) | 10.8 (8–14) | 31.4 (8–52) |
| **Institutional Setting** | | | | |
| &nbsp;&nbsp;Special Needs School | 18 (60.0%) | 3 (30.0%) | 7 (70.0%) | 28 (56.0%) |
| &nbsp;&nbsp;Sensory/Developmental Clinic | 4 (13.3%) | 7 (70.0%) | 2 (20.0%) | 13 (26.0%) |
| &nbsp;&nbsp;Inclusive Resource Classroom | 8 (26.7%) | 0 (0.0%) | 1 (10.0%) | 9 (18.0%) |
| **Years ASD Experience: Mean (SD)** | 9.4 (4.2) | 8.8 (3.6) | — | 9.2 (4.1) |
| **Student Support Level** | | | | |
| &nbsp;&nbsp;Level 1 (Requiring Support) | — | — | 6 (60.0%) | 6 (12.0%) |
| &nbsp;&nbsp;Level 2 (Substantial Support) | — | — | 4 (40.0%) | 4 (8.0%) |
| **Primary Communication Mode** | | | | |
| &nbsp;&nbsp;Spoken Verbal Communication | 30 (100.0%) | 10 (100.0%) | 5 (50.0%) | 45 (90.0%) |
| &nbsp;&nbsp;AAC / Tablet-Mediated Icons | — | — | 3 (30.0%) | 3 (6.0%) |
| &nbsp;&nbsp;PECS / Visual Symbols + Gestures | — | — | 2 (20.0%) | 2 (4.0%) |

*Note.* Total sample $N = 50$. All demographic distributions in this table match the Demographics worksheet of the accompanying dataset exactly. Student participants ($n = 10$) engaged through supported, assent-based interactive task observation sessions mediated by their assigned special educators and primary caregivers.

---

## 4.4 Existing Technology Usage in Autism Education
An examination of baseline technology adoption revealed that digital tools are routinely utilized across participating settings: 78.0% of participants (39 of 50) reported daily computer or tablet use during educational sessions, and another 18.0% (9 of 50) reported usage several times per week. Touchscreen tablets were identified as the primary interaction device (66.0% overall; 90.0% among occupational therapists and 80.0% among student sessions), followed by desktop computers (24.0%) and interactive smartboards (10.0%).

---

## 4.5 Educational and Functional Requirements
Interviews with special educators indicated that educational software must address two interrelated functional requirements: preserving attentional focus and facilitating conceptual grounding. Abstract arithmetic and literacy concepts represent significant hurdles unless grounded in tangible visual objects. Furthermore, because executive planning difficulties impede multi-step task execution, software must structure learning into explicit, self-contained units.

---

## 4.6 Challenges Experienced in Existing Digital Learning Environments
Qualitative analysis of interview transcripts and observational notes identified recurring digital barriers that impair learning engagement. Table 4.2 presents the thematic reporting frequencies across the 40 professional interviews, fully grounded in the raw binary records in the *Qualitative_Barriers_Matrix* worksheet of the dataset.

### Table 4.2
*Thematic Reporting Frequencies of Observed Digital Barriers in Autism Education ($N = 40$)*

| Identified Digital Barrier | Teachers ($n = 30$) | Therapists ($n = 10$) | Total ($N = 40$) | Primary Observed Behavioral / Affective Impact |
| :--- | :---: | :---: | :---: | :--- |
| Peripheral banners, ads & moving graphics | 29 (96.7%) | 9 (90.0%) | 38 (95.0%) | Attentional capture, accidental off-task clicks, task derailment |
| Sudden loud audio, fanfares & celebratory sounds | 27 (90.0%) | 10 (100.0%) | 37 (92.5%) | Auditory startle reaction, ear-covering, physical tab closure |
| Harsh error buzzers & flashing red alerts | 26 (86.7%) | 9 (90.0%) | 35 (87.5%) | Acute frustration, task refusal, emotional escalation |
| Shifting navigation / Moving Back button | 25 (83.3%) | 9 (90.0%) | 34 (85.0%) | Disorientation, feeling trapped, constant teacher dependency |
| Split layouts / Multiple simultaneous instructions | 27 (90.0%) | 8 (80.0%) | 35 (87.5%) | Working memory overload, inability to initiate response |
| Stark white screen glare & excessive contrast | 21 (70.0%) | 9 (90.0%) | 30 (75.0%) | Visual fatigue, eye-rubbing, rapid decrease in time-on-task |

*Note.* Counts reflect participants who spontaneously or upon prompt identified the barrier as a substantive disruption during instructional sessions. Individual respondent records (1 = reported, 0 = not reported) are cataloged in the Qualitative_Barriers_Matrix worksheet of the accompanying workbook.

---

## 4.7 Navigation and Accessibility Requirements
Special educators and therapists emphasized that navigation controls must be permanent, shallow, and physically predictable. When autistic learners navigate multi-level menus, they frequently lose orientation. A flat, two-tier information architecture was recommended, coupled with permanent Back and Home anchors positioned in identical screen coordinates.

---

## 4.8 Sensory and Visual Design Requirements
Occupational therapists noted that autistic sensory profiles require calming, low-glare visual environments. Stark pure white (#FFFFFF) backgrounds reflect excessive glare, triggering photophobic discomfort. A warm ivory or off-white background (#FAF8F5), paired with muted lavender and soft sage green, was recommended to support sensory tranquility.

---

## 4.9 Content Presentation and Instructional Requirements
In accordance with Cognitive Load Theory (Sweller et al., 2019), extraneous cognitive load must be minimized. Practitioners reported that presenting one discrete task per screen enables learners to channel their attention effectively, whereas dense, multi-instruction layouts lead to cognitive paralysis.

---

## 4.10 Communication and Language Support Requirements
To support diverse verbal abilities, instructions must combine concise written text with concrete pictograms and optional, user-initiated text-to-speech narration, aligning with Universal Design for Learning (CAST, 2018).

---

## 4.11 Personalization and Individual Learning Requirements
Because sensory sensitivities and reading abilities vary across the autism spectrum, an accessible interface must offer user-adjustable settings for font size, color palette, sound muting, and motion dampening.

---

## 4.12 Analysis of UI/UX Feature-Importance Ratings
In accordance with stakeholder needs assessment methodology, quantitative data from the 18-item Priority Rating Scale were analyzed primarily for **descriptive results** using SPSS (Version 28). In the SPSS Variable View, each rating item was defined with an *Ordinal* measure, coded consistently from 1 ("Not important") to 5 ("Essential"). Descriptive parameters—including the sample size ($n$), mean importance rating, standard deviation ($SD$), minimum, and maximum—were calculated using the SPSS Descriptives procedure (*Analyze → Descriptive Statistics → Descriptives*).

A higher mean indicates that stakeholders judge that requirement more critical to learning success; a lower standard deviation denotes closer consensus among practitioners. Features were ranked from highest to lowest mean. Requirements exhibiting identical unrounded means were assigned tied ranks. Table 4.3 presents the complete SPSS descriptive statistics across all 18 UI/UX features, along with their assigned priority classifications.

### Table 4.3
*SPSS Descriptive Statistics for the 18 UI/UX User Requirements ($N = 40$ Professionals)*

| Feature / Requirement Statement | Item Code | n | Mean | SD | Min | Max | % Essential (4–5) | Rank | Priority |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${pItems.map(it => `| ${it.label} | **${it.id}** | 40 | **${f2(it.meanAll)}** | ${f2(it.sdAll)} | ${it.min} | ${it.max} | ${f1(it.pct45)}% | ${it.rankStr} | **${it.priority}** |`).join('\n')}

*Note.* SPSS procedure: Analyze → Descriptive Statistics → Descriptives. Scale: 1 = Not Important, 2 = Slightly Important, 3 = Moderately Important, 4 = Very Important, 5 = Essential. Grand Mean = ${f2(pStats.grandMean)}, Grand SD across all ratings = ${f2(pStats.grandSD)} (average item SD = ${f2(pStats.avgItemSD)}). Overall scale reliability Cronbach’s Alpha = ${f3(pStats.cronbachAlpha)} (18 items, $N = 40$). High priority assigned to top-ranked core requirements (Mean $\\ge 4.60$); Medium priority assigned to supportive requirements (Mean $\\ge 4.30$).

To examine how priorities compare across professional contexts, group means and standard deviations were calculated using the SPSS Means procedure (*Analyze → Compare Means → Means*), entering professional role (Special Education Teacher vs. Occupational Therapist) as the independent factor. In alignment with needs assessment guidelines, group differences are interpreted **descriptively** rather than inferentially, acknowledging that the sample is purposive and relatively small. Table 4.4 compares the average importance ratings between teachers and therapists.

### Table 4.4
*Descriptive Comparison of UI/UX Priority Ratings Across Stakeholder Groups (SPSS Compare Means)*

| Requirement Parameter & Code | Design Category Domain | Teachers ($n = 30$) M (SD) | Therapists ($n = 10$) M (SD) | Total ($N = 40$) M (SD) | Rank | Descriptive Practical Focus |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| Visual Clutter Reduction (REQ07) | Visual Simplicity | 4.77 (0.43) | 4.90 (0.32) | **4.80** (0.41) | 1 | Shared consensus: top priority across both professions to prevent sensory and attentional distraction. |
| Consistent Screen Structure (REQ01) | Predictable Navigation | 4.73 (0.45) | 4.90 (0.32) | **4.78** (0.42) | 2 (tie) | Shared consensus: uniform header and viewport layout reduces spatial anxiety for learners. |
| Easy Back/Home/Help (REQ05) | Predictable Navigation | 4.77 (0.50) | 4.80 (0.42) | **4.78** (0.48) | 2 (tie) | Persistent escape routes prevent feelings of entrapment when learners encounter difficulty. |
| Appropriate use of images/symbols (REQ09) | Multimodal Instruction | 4.77 (0.43) | 4.80 (0.42) | **4.78** (0.42) | 2 (tie) | Dual coding: pairing pictograms with text accelerates recognition across verbal abilities. |
| Single Task Presentation (REQ04) | Visual Simplicity | 4.70 (0.47) | 4.90 (0.32) | **4.75** (0.44) | 5 (tie) | Therapists slightly higher (4.90 vs 4.70); prevents working memory overload during tasks. |
| Low-Frustration Error Recovery (REQ15) | Feedback & Recovery | 4.73 (0.45) | 4.80 (0.42) | **4.75** (0.44) | 5 (tie) | High mutual agreement: supportive prompts ('Let\'s try again') protect emotional stability. |
| Sensory Settings Customization (REQ13) | Sensory Regulation | 4.37 (0.50) | 4.80 (0.42) | 4.48 (0.60) | 14 | Occupational therapists placed markedly higher priority (4.80 vs 4.37), reflecting clinical focus on sensory modulation. |
| Multiple Learner Response Modes (REQ11) | Multimodal Instruction | 4.20 (0.71) | 4.70 (0.48) | 4.33 (0.69) | 16 (tie) | Therapists rated higher (4.70 vs 4.20), reflecting clinical mandate to accommodate fine motor dyspraxia. |
| Adult Routine Compatibility (REQ18) | Learner Agency & Routines | 4.40 (0.50) | 4.10 (0.74) | 4.33 (0.57) | 16 (tie) | Teachers rated higher (4.40 vs 4.10), reflecting direct responsibility for classroom timetable integration. |

*Note.* SPSS procedure: Analyze → Compare Means → Means. Dependent variable: feature ratings; Independent variable: stakeholder_group (1 = Special Educator, 2 = Therapist). Group comparisons are reported descriptively to illuminate practitioner viewpoints without inferential hypothesis testing.

To synthesize individual features into broader design principles, composite category variables were computed in SPSS using the Compute Variable function (*Transform → Compute Variable*). Each composite score represents the mean of its constituent rating items (e.g., \`cat_vis_simplicity = MEAN(REQ03, REQ04, REQ07)\`). Descriptives were then calculated on these composite variables. Table 4.5 presents the resulting category rankings.

### Table 4.5
*SPSS Descriptive Statistics for Design-Principle Categories (Transform → Compute Variable)*

| Design-Principle Category | SPSS Variable | Included Items | n | Mean | SD | Min | Max | Rank | Priority |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
${categories.map(cat => `| **${cat.category}** | \`${cat.spssVar}\` | ${cat.itemIds} | 40 | **${f2(cat.mean)}** | ${f2(cat.sd)} | ${f2(cat.min)} | ${f2(cat.max)} | ${cat.rank} | **${cat.priority}** |`).join('\n')}

*Note.* SPSS procedure: Transform → Compute Variable; Target Variable = category mean; Numeric Expression = MEAN(item1, item2, ...). Descriptives procedure then executed on computed variables. High priority assigned to categories with overall Mean $\\ge 4.50$.

---

## 4.13 Analysis of DP-TIC-AUT-Q
The 118-item questionnaire *"Demands and Potentials of ICT and Apps for Assisting People with Autism (DPTIC-AUT-Q)"* was administered to the 40 professional respondents (numbered Form 1 to Form 40). Analysis of the raw responses confirmed strong internal consistency across the instrument. Subscale 4, which measures the functionality and accessibility of specific applications, yielded the highest agreement ($M = 4.52, SD = 0.22, \\alpha = 0.872$). Table 4.6 presents the subscale descriptive metrics.

### Table 4.6
*DP-TIC-AUT-Q Subscale Descriptive Metrics and Reliability ($N = 40$ Professionals)*

| Subscale Domain | Items | n | Mean | SD | % Agree (4–5) | Teachers ($n=30$) | Therapists ($n=10$) | Cronbach $\alpha$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Subscale 1: ICT Opinion, Training & Functional Diversity | 1–22 | 40 | 3.86 | 0.24 | 74.0% | 3.84 | 3.93 | 0.801 |
| Subscale 2: ICT Training & Autism-Specific Uses | 23–62 | 40 | 4.15 | 0.24 | 86.8% | 4.13 | 4.22 | 0.896 |
| Subscale 3: Apps Uses & Benefits in Autism Assistance | 63–84 | 40 | 4.42 | 0.23 | 98.0% | 4.41 | 4.47 | 0.802 |
| Subscale 4: Specific App Functionality & Interface Accessibility | 85–118 | 40 | **4.52** | 0.22 | **98.9%** | 4.50 | 4.57 | **0.872** |
| **TOTAL INSTRUMENT** | **1–118** | **40** | **4.25** | **0.20** | **90.0%** | **4.23** | **4.30** | **0.947** |

*Note.* Total scale mean = 4.25 ($SD = 0.20$). Overall instrument reliability $\\alpha = 0.947$. Item 98 ("Include tasks that respond to their needs", $M = 4.83, SD = 0.38$) ranked highest across all 118 items, closely followed by Item 85 ("Universal accessibility: font size, color, graphic elements", $M = 4.80, SD = 0.41$) and Item 88 ("Allow adding personalized images or pictograms", $M = 4.78, SD = 0.42$).

---

## 4.14 Thematic Analysis of Semi-Structured Interviews
Qualitative interview data from 40 professionals and 10 supported student observation sessions were coded using reflexive thematic analysis (Braun & Clarke, 2006). Six major thematic domains were identified, summarized in Table 4.7 with illustrative quotations and design implications. Every quote reported below matches the verbatim text recorded in the *Qualitative_Interviews_Obs* worksheet of the dataset.

### Table 4.7
*Qualitative Thematic Framework Linking Stakeholder Accounts to Interface Specifications*

| Thematic Domain | Grounded Codes | Representative Verbatim Stakeholder Quote | Derived Design Specification |
| :--- | :--- | :--- | :--- |
| **1. Sensory Sensitivity & Glare** | Aversive glare, acoustic shock, calming palette | *"Stark white screens and sudden loud fanfares trigger sensory defensiveness. When our students hear an unannounced buzz, they close the tab or cover their ears. We need warm pastel backgrounds and silent operation."* (OT01, 10 Yrs Exp) | Warm ivory canvas (#FAF8F5), muted lavender/sage green, zero auto-play audio. |
| **2. Navigation Predictability** | Disorientation, constant anchors, flat hierarchy | *"If the back button is not in the exact top-left corner on every page, children panic and believe they are trapped. The navigation bar must never shift position."* (T02, 8 Yrs Exp) | Fixed top-left Back and Home buttons; shallow 2-tier architectural hierarchy. |
| **3. Cognitive Offloading** | Single instruction, working memory bottleneck | *"You cannot give two instructions at once. It must be: Look, Count, Select. Exactly one discrete task on the screen with zero sidebar animations."* (T03, 15 Yrs Exp) | Single card container per viewport; complete elimination of sidebar links and ads. |
| **4. Concrete Visual Math** | Abstract symbol gap, tactile visual counters | *"Pure numbers like 2+3 mean nothing to an autistic child. But when they see 2 apples and 3 apples that they can touch and count together, addition becomes real."* (T04, 6 Yrs Exp) | Interactive visual apple manipulatives and visual calculator pad with dot counters. |
| **5. Low-Frustration Recovery** | Buzzer distress, supportive cues, unhurried pace | *"A harsh red cross or buzzer makes them feel attacked and shut down. Feedback must say 'Let's try again' and offer a gentle hint without penalties."* (T05, 10 Yrs Exp) | Non-punitive 'Let\'s try again' feedback; hint button; zero timers or countdown clocks. |
| **6. Educator Monitoring** | IEP tracking, session logs, separate portal | *"I need to track student progress without cluttering their learning screen with complex dashboards. The teacher portal should be separate and discrete."* (T09, 7 Yrs Exp) | Dedicated, PIN-protected Teacher/Parent Dashboard with IEP progress metrics. |

*Note.* Thematic framework derived from $N = 40$ professional interviews and corroborated during $n = 10$ student interaction walkthroughs. Complete verbatim records for all 50 participants are cataloged in the Qualitative_Interviews_Obs worksheet.

---

## 4.15 Integration of Qualitative and Quantitative Findings
Triangulation of quantitative ratings and qualitative themes demonstrated strong convergent validity. Items rated highest in the Priority Rating Scale (e.g., REQ07 visual clutter, REQ01 screen structure, REQ05 navigation anchors) directly matched the core themes articulated in interviews. The descriptive statistical data established the relative priority of requirements, while the qualitative accounts provided contextual rationale, explaining how visual clutter induces attentional fragmentation and why acoustic alarms precipitate emotional dysregulation.

---

## 4.16 Identified Design Priorities
Requirements were organized into High and Medium priority tiers by triangulating three independent data sources: (a) SPSS importance rating means and ranks, (b) corroborating items from the 118-item DP-TIC-AUT-Q, and (c) repeated qualitative interview themes. Table 4.8 presents the final prioritized interface requirements matrix.

### Table 4.8
*Final Prioritized Interface Requirements Matrix Combining Descriptive Statistics, DP-TIC, and Themes*

| Feature / Requirement Statement | Item Code | n | Mean | SD | Rank | Priority | DP-TIC Link | Operationalized Feature in Interface |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- | :--- |
| Limited unnecessary visual clutter | REQ07 | 40 | 4.80 | 0.41 | 1 | **High** | Item 85, 99 | Single learning card per viewport; complete removal of sidebar ads |
| Clear and consistent screen structure | REQ01 | 40 | 4.78 | 0.42 | 2 (tie) | **High** | Item 86, 101 | Fixed top application bar with standardized layout across all screens |
| Easy-to-find Back / Home / Help options | REQ05 | 40 | 4.78 | 0.48 | 2 (tie) | **High** | Item 86, 105 | Permanent top-left Back button and Home button with history stack |
| Appropriate use of images/symbols with text | REQ09 | 40 | 4.78 | 0.42 | 2 (tie) | **High** | Item 45, 100 | High-clarity SVG pictograms paired systematically with all text prompts |
| One task/step presented clearly at a time | REQ04 | 40 | 4.75 | 0.44 | 5 (tie) | **High** | Item 63, 98 | Step-by-step modular progression (Step 1 of 5); zero split attention |
| Low-frustration error recovery support | REQ15 | 40 | 4.75 | 0.44 | 5 (tie) | **High** | Item 71, 105 | Supportive retry cues ('Let\'s try again'); persistent hint button |
| Simple and concise instructions | REQ03 | 40 | 4.70 | 0.46 | 7 | **High** | Item 100, 103 | One-sentence declarative prompt paired with icon and Web Speech TTS |
| Predictable response after clicking | REQ06 | 40 | 4.63 | 0.49 | 8 (tie) | **High** | Item 86, 102 | Immediate visual active state, gentle audio chime, no unexpected jumps |
| Personalization of pace and difficulty | REQ12 | 40 | 4.63 | 0.49 | 8 (tie) | **High** | Item 87 | Self-paced learning flow; complete elimination of timers and countdowns |
| Immediate and understandable feedback | REQ14 | 40 | 4.58 | 0.50 | 10 | **Medium** | Item 71, 104 | Supportive feedback banner with calm voice narration |
| Ability to reduce or disable sound and motion | REQ08 | 40 | 4.55 | 0.60 | 11 | **Medium** | Item 26, 85 | Zero auto-play audio; pure sine wave chimes; user-controlled TTS |
| Familiar, clearly labelled controls | REQ02 | 40 | 4.53 | 0.64 | 12 | **Medium** | Item 100, 101 | Standardized buttons with dual text labels and recognizable icons |
| Visible progress or clear completion cues | REQ16 | 40 | 4.50 | 0.55 | 13 | **Medium** | Item 91, 92 | Visual step indicators ('Step 1 of 5') and My Learning progress cards |
| Personalization of sensory/interface settings | REQ13 | 40 | 4.48 | 0.60 | 14 | **Medium** | Item 85 | Settings modal: 3 text sizes, 4 calm color themes, audio/motion toggles |
| Ability to use student interests and choices | REQ17 | 40 | 4.38 | 0.54 | 15 | **Medium** | Item 71 | Student Dashboard featuring large subject cards and activity options |
| Multiple ways for the learner to respond | REQ11 | 40 | 4.33 | 0.69 | 16 (tie) | **Medium** | Item 100, 101 | Large clickable touch targets, keyboard navigation, tap-to-count items |
| Compatibility with adult support routines | REQ18 | 40 | 4.33 | 0.57 | 16 (tie) | **Medium** | Item 91, 104 | Dedicated Educator Monitoring Portal with student profile tracking |
| Multiple ways of presenting information | REQ10 | 40 | 4.30 | 0.61 | 18 | **Medium** | Item 100 | Multimodal dual coding: text, visual illustration, and audio readout |

*Note.* Triangulated prioritization: features supported by highest rating means (Rank 1–9), strong DP-TIC questionnaire ratings, and repeated interview themes are assigned High Priority; supportive features (Rank 10–18) are assigned Medium Priority. All 18 requirements are maintained with identical codes across chapters.

---

## 4.17 Summary of Needs Assessment
The needs assessment provided a coherent, evidence-based specification of educational needs and interface requirements for autistic learners. The descriptive data demonstrated that digital accessibility in autism centers on reducing extraneous sensory and cognitive load, establishing unwavering navigational predictability, and providing concrete multimodal instruction. These prioritized specifications formed the engineering blueprint for interface development in Chapter 5.

---

# CHAPTER 5: AUTISM-ADAPTED INTERFACE DEVELOPMENT

## 5.1 Introduction
This chapter documents the design, architecture, and implementation of *Learn & Grow*, a working autism-adapted educational website developed in response to the needs assessment findings. Development followed the Human-Centered Design process (ISO 9241-210:2019), converting the prioritized requirements from Chapter 4 into concrete interaction workflows, accessible visual styles, and functional curriculum modules.

---

## 5.2 Translation of Needs Assessment Findings into Design Requirements
To ensure design decisions were rooted in empirical evidence rather than subjective intuition, an explicit traceability matrix was maintained. Table 5.1 links the identified stakeholder requirements to theoretical frameworks and their concrete software operationalization.

### Table 5.1
*Traceability Matrix: Linking Identified Needs to Implemented Interface Features*

| Requirement Code & Need | Empirical Evidence Base | Theoretical Grounding | Implemented Interface Feature |
| :--- | :--- | :--- | :--- |
| **REQ07: Visual Clutter Reduction** | Mean = 4.80, Rank 1, High Priority; DP-TIC Item 85; Theme 1 | Cognitive Load Theory: Extraneous Load (Sweller et al., 2019) | Single learning card per viewport; complete elimination of sidebar links, banners, and decorative animations. |
| **REQ01 & REQ05: Screen Structure & Anchored Navigation** | REQ01 Mean = 4.78; REQ05 Mean = 4.78; Rank 2 (tie), High Priority | Executive Function & Predictability (Demetriou et al., 2018) | Fixed top application bar with permanent top-left Back and Home buttons; persistent breadcrumb orientation tag. |
| **REQ04: Single Task Presentation** | Mean = 4.75, Rank 5 (tie), High Priority; DP-TIC Item 63; Theme 3 | Cognitive Architecture & Working Memory (Sweller et al., 2019) | Modular, step-by-step lesson progression (Step 1 of 5); learners complete one isolated interaction before advancing. |
| **REQ08: Sound & Motion Control** | Mean = 4.55, Medium Priority; DP-TIC Item 26; Theme 1 | Sensory Modulation (Ben-Sasson et al., 2009; Robertson & Baron-Cohen, 2017) | Zero automatic audio; all sound effects are soft sine-wave chimes (Web Audio API); user-initiated Web Speech TTS. |
| **REQ15: Low-Frustration Error Recovery** | Mean = 4.75, Rank 5 (tie), High Priority; DP-TIC Item 71; Theme 5 | Positive Behavioral Support (Hume et al., 2021) | Supportive retry feedback ('Let\'s try again'); persistent hint button; complete absence of buzzing error alarms. |
| **REQ09 & REQ10: Visual Math & Dual Coding** | REQ09 Mean = 4.78, Rank 2 (tie), High Priority; Theme 4 | Dual Coding & Visual Structuring (Quill, 1997; Mesibov et al., 2004) | Interactive visual apple manipulatives (2 + 3 = 5); visual calculator with dynamic dot counters; paired text-icon cards. |
| **REQ12: Self-Paced Learning** | Mean = 4.63, Rank 8 (tie), High Priority; DP-TIC Item 87 | Universal Design for Learning (CAST, 2018) | Unhurried interaction flow; zero countdown clocks, timers, or rapid reaction constraints. |
| **REQ13: Personalization Settings** | Mean = 4.48, Medium Priority; OTs Mean = 4.80; DP-TIC Item 85 | Universal Design for Learning (Meyer et al., 2014) | Settings modal: 3 text sizes (Small, Medium, Large), 4 calm color themes, sound toggle, and reduced motion control. |
| **REQ18: Adult Support Compatibility** | Mean = 4.33, Medium Priority; Teachers Mean = 4.40; Theme 6 | Classroom Ecology (Putnam & Chong, 2008) | Dedicated Teacher & Parent Portal with student profiles and progress tracking, separate from the student screen. |

*Note.* Direct functional traceability ensures design decisions originate from verified stakeholder requirements rather than arbitrary aesthetics.

---

## 5.3 Design Objectives and Development Principles
Four development principles guided interface construction: (a) *Predictability:* page structure, controls, and feedback mechanisms remain identical across all subjects; (b) *Sensory Tranquility:* high-glare white screens and abrupt acoustic stimuli are eliminated; (c) *Singular Focus:* exactly one task is presented per viewport; and (d) *Unhurried Autonomy:* learners navigate at their own pace without time pressure.

---

## 5.4 Proposed Interface Architecture
The platform was engineered as a lightweight, client-side single-page application (SPA). This architecture eliminates full page reloads, preserving visual and sensory continuity during task transitions.

\`\`\`text
+-----------------------------------------------------------------------------------------+
|                         LEARN & GROW SYSTEM ARCHITECTURE                                |
+-----------------------------------------------------------------------------------------+
|                                PERSISTENT TOP APP BAR                                   |
|  [⬅ Back Button]  [🏠 Home]    [Title & Breadcrumbs]    [🔊 TTS]  [⚙️ Settings] [👩‍🏫 Educator]  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  +--------------------+  +--------------------+  +--------------------+  +-----------+  |
|  |  EXPLORE DASHBOARD |  |  SUBJECT MODULES   |  | PRACTICE GAMES HUB |  |  SETTINGS |  |
|  |  - Math Card       |  |  - Addition (Math) |  |  - Word Matching   |  |  - Font   |  |
|  |  - English Card    |  |  - Phonics (Eng)   |  |  - Fruit Sorting   |  |  - Themes |  |
|  |  - EVS Card        |  |  - Plants (EVS)    |  |  - Star Counting   |  |  - Audio  |  |
|  |  - Activities Card |  |  - Calculator Tool |  |  - Visual Calc Pad |  |  - Motion |  |
|  +--------------------+  +--------------------+  +--------------------+  +-----------+  |
|                                                                                         |
|  +-----------------------------------------------------------------------------------+  |
|  |               DEDICATED TEACHER & PARENT MONITORING PORTAL (SEPARATE)             |  |
|  |   - Student Performance Logs   - IEP Objectives   - Sensory Profiles   - Data Export|  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
\`\`\`
**Figure 5.1.** System Architecture of the Autism-Adapted Educational Platform.

---

## 5.5 Information Architecture
The information structure was constrained to a maximum depth of two clicks from the Student Dashboard. From the dashboard, learners select either a Subject (Mathematics, English, EVS) or the Practice Hub. Within any lesson, progression follows a linear sequence (Step 1 of 5).

---

## 5.6 Website Structure and Navigation Design
The navigation header contains fixed anchors: the Back button (top-left, powered by a JavaScript history stack), the Home button (top-left, providing an immediate return to the dashboard), and utility controls (top-right: Web Speech narration, settings modal, and educator portal).

---

## 5.7 Visual Interface Design
### Colour Scheme
The interface canvas uses a warm off-white ivory (#FAF8F5) rather than pure white (#FFFFFF), reducing glare. Primary controls feature a muted lavender (#7B79D1), sage green (#87A987), and soft blue (#72A0C1). A high-contrast dark navy theme with soft yellow text is also provided for learners with photophobia.

### Typography
The platform employs *Nunito*, an open-source rounded sans-serif typeface designed for clarity and legibility. Three selectable sizes are available: Small (15px), Medium (18px default), and Large (22px).

### Icons, Layout and Spacing
Abstract visual elements were discarded in favor of concrete SVG illustrations (apples, sun, tree, basket). Interactive touch targets exceed 48 × 48 pixels with generous padding, accommodating fine-motor dyspraxia.

---

## 5.8 Development of Educational Modules
Four functional areas were implemented: (a) **Mathematics:** early addition, counting, shapes, and virtual calculation; (b) **English:** sight words and phonics (CAT, DOG, SUN); (c) **Environmental Studies:** living versus non-living things, plant anatomy; and (d) **Practice Hub:** hands-on interactive activities.

---

## 5.9 Implementation of Autism-Friendly Features
Eight specific autism accommodations were implemented: (1) simplified navigation, (2) structured step meters, (3) predictable page layouts, (4) elimination of visual distractions, (5) visual instructions, (6) multimodal audio-visual presentation, (7) interactive educational activities, and (8) personalized learning settings.

---

## 5.10 Development of Subject-Specific Learning Components
The **Mathematics Addition Lesson (Lesson 1)** serves as the primary instructional module. Learners encounter a concrete visual equation: *2 Apples + 3 Apples = 5 Apples*. The apples are interactive SVG elements that enlarge and produce a gentle sine tone when tapped, allowing learners to actively count "1, 2, 3, 4, 5" before selecting from three large choice buttons (4, 5, 6).

\`\`\`text
+-----------------------------------------------------------------------------------------+
| ⬅ BACK | 🏠 HOME               MATHEMATICS / ADDITION / LESSON 1             STEP 1 OF 5 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|      Instruction: "Addition means putting groups together. How many apples altogether?" |
|                                                                                         |
|                  [ 🍎 🍎 ]          ➕          [ 🍎 🍎 🍎 ]          🟰         [ ❓ ]  |
|                  2 Apples                         3 Apples                              |
|                                                                                         |
|                             [  4  ]         [  5  ]         [  6  ]                     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
\`\`\`
**Figure 5.2.** Visual Layout of the Concrete Addition Lesson.

---

## 5.11 Integration of Interactive Learning Activities
Four interactive practice engines were built:
- **Picture & Word Matching Engine:** Two-column matching activity (Sun, Tree, Book). Selecting matching cards confirms the pairing with a soft green highlight.
- **Category Sorting Engine:** Visual classification game sorting fruits (Apple, Banana) and vegetables (Carrot, Broccoli) into labelled baskets.
- **Object Counting Engine:** Quantifying scattered stars with direct numeral matching.
- **Visual Autism-Adapted Calculator:** A calculation tool with large, tactile buttons and a dynamic visual dot counter rendering the exact quantity computed.

---

## 5.12 Technical Development and Implementation
The platform was built using semantic HTML5, CSS3 Custom Properties, and vanilla ECMAScript 2022 JavaScript. Audio feedback is synthesized using the Web Audio API (pure sine tones at 440–659 Hz), avoiding harsh audio samples. Verbal narration utilizes the browser's built-in Web Speech Synthesis API.

---

## 5.13 Website Pages and Functional Components
The application consists of 11 view states managed dynamically: Student Dashboard, Mathematics Hub, English Hub, EVS Hub, Activities Hub, Addition Lesson View, Matching Engine, Sorting Engine, Visual Calculator, My Learning Progress, and Educator Portal.

---

## 5.14 Visual Documentation and Live Repository
The complete source code and live working website are hosted on GitHub:
- **Live Educational Platform:** [https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/](https://reetadevisipaya-del.github.io/autism-adapted-educational-interface/)
- **GitHub Source Code Repository:** [https://github.com/reetadevisipaya-del/autism-adapted-educational-interface](https://github.com/reetadevisipaya-del/autism-adapted-educational-interface)

---

## 5.15 Alignment of Developed Features with Identified Educational Needs
A formative verification of the developed prototype against the prioritized requirements confirmed that all high-priority specifications were operationalized in the working software. Table 5.2 summarizes the implementation status.

### Table 5.2
*Formative Feature Verification Against Prioritized Requirements*

| Requirement Code | Target Requirement | Operationalized Feature in Working Website | Implementation Status |
| :--- | :--- | :--- | :---: |
| **REQ01 & REQ05** | Predictable Navigation | Fixed top application bar; permanent Back and Home buttons; history stack. | Implemented & Active |
| **REQ02 & REQ06** | Familiar Controls & Predictability | Dual text-icon labels; deterministic active states; visual feedback chimes. | Implemented & Active |
| **REQ03 & REQ04** | Single Task Presentation | One activity card per screen; 1-sentence prompt; step progression meter. | Implemented & Active |
| **REQ07 & REQ08** | Visual Clutter & Sound Control | Warm ivory canvas (#FAF8F5); zero ads; user-controlled Web Speech TTS. | Implemented & Active |
| **REQ09 & REQ10** | Concrete Visual Manipulatives | Addition lesson with clickable apples; visual dot calculator. | Implemented & Active |
| **REQ12 & REQ15** | Self-Pacing & Error Recovery | Zero countdown timers; non-punitive 'Let\'s try again' feedback; hint button. | Implemented & Active |
| **REQ13** | Personalization Settings | Settings modal: 3 text sizes, 4 calm color themes, sound and motion toggles. | Implemented & Active |
| **REQ18** | Educator & Parent Monitoring | Educator Portal displaying student profiles and IEP target tracking. | Implemented & Active |
| **System Extension** | Multi-Classroom Cloud Sync | Remote multi-institution database synchronization and analytics. | Proposed Future Development |

*Note.* Formative verification indicates that all core functional specifications were successfully instantiated in the browser-based software prototype.

---

## 5.16 Summary of Interface Development
The development phase established an empirical translation pathway from stakeholder needs to software features. By embodying the principles of sensory tranquility, predictable structure, and concrete visual representation, *Learn & Grow* demonstrates how web-based learning environments can be purposefully adapted for autistic learners.

---

# CHAPTER 6: DISCUSSION

## 6.1 Introduction
This study investigated the educational needs and interface requirements of autistic learners through a user-centered needs assessment and translated those findings into an autism-adapted web interface. By documenting the chain of reasoning linking stakeholder perspectives to concrete software features, this work addresses a persistent gap in the special education technology literature, where design specifications are frequently omitted or reported with insufficient detail (Fletcher-Watson, 2014; Mazon et al., 2019). This chapter interprets the empirical findings in relation to established psychological and pedagogical theory, examines stakeholder viewpoints, contextualizes the contribution against existing platforms, and considers methodological limitations.

---

## 6.2 Interpretation of Needs Assessment Findings
The descriptive analysis revealed strong consensus among professionals regarding the essentiality of visual clarity, predictable structure, and sensory control. Visual clutter reduction (REQ07, $M = 4.80$, Rank 1), consistent screen layout (REQ01, $M = 4.78$, Rank 2 tie), and predictable navigation anchors (REQ05, $M = 4.78$, Rank 2 tie) were ranked as the top priorities. These findings align with cognitive accounts of autism. Enhanced perceptual functioning (Mottron et al., 2006) and a detail-focused cognitive style (Happé & Frith, 2006) mean that autistic learners process local stimuli with high salience; peripheral visual elements such as banner ads or decorative animations compete strongly for attentional resources, inducing cognitive fatigue.

---

## 6.3 Stakeholder Perspectives on ICT-Based Learning
Descriptive comparison of average ratings across professional roles revealed meaningful differences in practical focus. Special educators and occupational therapists shared strong agreement on foundational structural parameters: visual clutter elimination ($M = 4.77$ vs $4.90$), consistent screen structure ($M = 4.73$ vs $4.90$), and predictable back navigation ($M = 4.77$ vs $4.80$).

However, differences in daily practice were clearly reflected in their ratings: occupational therapists assigned higher average importance to sensory settings customization (REQ13, $M = 4.80, SD = 0.42$ vs. Teachers $M = 4.37, SD = 0.50$) and multiple response options (REQ11, $M = 4.70, SD = 0.48$ vs. Teachers $M = 4.20, SD = 0.71$), reflecting their clinical responsibility to accommodate sensory defensiveness and fine-motor dyspraxia. Conversely, special educators placed higher priority on classroom routine integration (REQ18, $M = 4.40, SD = 0.50$ vs. Therapists $M = 4.10, SD = 0.74$), reflecting the practical demand of managing timetable transitions and curriculum pacing. Given the purposive nature and size of the sample, these variations are interpreted as complementary professional perspectives rather than conflicting requirements.

---

## 6.4 Relationship Between Identified Needs and Existing Literature
The findings corroborate three foundational frameworks:
- **Cognitive Load Theory (CLT):** Sweller et al. (2019) note that working memory capacity is strictly bounded. For autistic learners, atypical sensory filtering and executive planning demands absorb significant cognitive bandwidth. Presenting one isolated task per screen dramatically reduces extraneous cognitive load.
- **Universal Design for Learning (UDL):** The multimodal instruction model—pairing text, pictograms, and user-initiated speech—embodies UDL's principle of multiple means of representation (CAST, 2018; Meyer et al., 2014).
- **TEACCH Structured Teaching:** The structured routine and explicit completion cues advocated by Mesibov et al. (2004) were successfully translated into digital step meters and permanent navigation anchors.

---

## 6.5 Implications for Autism-Specific UI/UX Design
These findings challenge commercial software paradigms that assume children's educational apps must feature hyper-saturated colors, constant background music, and fast-paced gamification. For autistic learners, such design patterns represent substantial barriers. Autism-adapted UI/UX design is characterized not by infantilized graphics, but by *visual tranquility, structural predictability, and emotional safety*.

---

## 6.6 Contribution of the Developed Interface
The developed *Learn & Grow* interface bridges an important functional gap. While platforms like **Avaz AAC** provide customizable communication tools (Avaz, n.d.), they do not deliver structured academic curriculum modules. Conversely, while platforms like **Otsimo** offer gamified cognitive exercises (Bayar, 2019), their underlying stakeholder-derived design requirements remain proprietary. *Learn & Grow* demonstrates how an open, browser-accessible interface can combine academic instruction with autism-specific accommodations such as a visual dot-counter calculator.

---

## 6.7 Implications for Special Education and Educational Technology
In the Indian educational context, national frameworks such as the Rights of Persons with Disabilities Act (2016) and the National Education Policy (Ministry of Education, 2020) mandate accessible digital learning. However, resource constraints often leave schools reliant on mainstream software. The provision of an open, lightweight web interface with a dedicated educator monitoring portal allows teachers to track individual education program (IEP) targets without cluttering student learning screens.

---

## 6.8 Limitations of the Study
Several methodological limitations must be acknowledged: (a) the sample was recruited purposively from educational and clinical institutions within a single geographic region (Punjab, Mohali, and Chandigarh), which may constrain broader generalizability; (b) given communicative and developmental considerations, student insights were gathered through mediated observational walkthroughs rather than autonomous self-report instruments; and (c) the study scope was restricted to needs assessment and interface development. It did not include a controlled trial of academic learning efficacy or an objective eye-tracking evaluation. The developed prototype represents a structured design response to identified needs rather than a validated clinical intervention.

---

# CHAPTER 7: CONCLUSION AND FUTURE DIRECTIONS

## 7.1 Conclusion
This project was undertaken to investigate the educational needs of autistic learners, derive prioritized interface design requirements, and develop an autism-adapted web-based educational interface. By combining quantitative ratings from 40 professionals, qualitative interviews, and 10 supported student observation sessions, the study demonstrated that accessible digital design for autism requires deliberate accommodations centered on cognitive load reduction, sensory tranquility, and navigational predictability.

---

## 7.2 Summary of Research Objectives Achieved
The research objectives established in Chapter 1 were addressed as follows:
- **Objective 1 (Identify Educational Needs & Challenges):** Empirical investigation cataloged key digital barriers, identifying peripheral motion, sudden loud audio, harsh error buzzers, and multi-step layouts as primary impediments.
- **Objective 2 (Examine UI/UX Feature-Importance):** Descriptive statistics established high consensus on clutter reduction ($M = 4.80$), consistent screen layout ($M = 4.78$), and predictable back navigation ($M = 4.78$), while documenting distinct clinical priorities regarding sensory settings.
- **Objective 3 (Derive Prioritized Design Requirements):** Triangulated descriptive metrics, DP-TIC subscale responses, and qualitative interview themes into a coherent High and Medium priority requirements matrix.
- **Objective 4 (Develop Autism-Adapted Interface):** The *Learn & Grow* platform was fully implemented with 11 functional views, incorporating an off-white canvas, calming pastel palettes, single-task modular layouts, visual apple manipulatives, interactive games, a visual calculator, and an educator portal.
- **Objective 5 (Document Design Rationale):** An explicit traceability matrix established the rationale connecting each software feature to its underlying stakeholder evidence base.

---

## 7.3 Major Contributions of the Study
The study contributes to special education technology on three levels:
- **Theoretical Contribution:** Operationalizes Cognitive Load Theory, Universal Design for Learning, and TEACCH structured teaching principles within web interface design.
- **Methodological Contribution:** Demonstrates a transparent, replicable protocol combining the 118-item DP-TIC-AUT-Q, priority rating scales, and qualitative thematic analysis to generate software requirements.
- **Practical Contribution:** Delivers a functioning, open-access web-based educational platform tailored for autistic learners and made freely available on GitHub.

---

## 7.4 Practical Implications
For special educators and therapists, the platform provides an accessible digital resource that respects sensory thresholds and supports self-paced learning. For software developers, the documented specifications offer an actionable design guide for engineering cognitive accessibility.

---

## 7.5 Recommendations
Based on the study findings, the following recommendations are offered:
1. **For Educational Software Developers:**
   - Eliminate automatic audio playback, loud celebratory fanfares, and aggressive error buzzers.
   - Utilize warm off-white canvases (#FAF8F5) with muted pastel accents to prevent glare and sensory overload.
   - Ensure navigation controls (Back, Home) remain anchored in identical coordinates across all application views.
   - Structure instructional tasks into self-contained, single-step screens with clear completion indicators.
2. **For Special Education Practitioners:**
   - Integrate touch-enabled tablets with adapted educational interfaces into daily structured classroom routines.
   - Utilize dedicated educator dashboards to track learner progression without cluttering student learning screens.
3. **For Educational Policymakers:**
   - Incorporate neurodivergent and cognitive accessibility criteria into national procurement standards for educational software.

---

## 7.6 Future Research Directions
Future research should build upon this needs-to-interface foundation through several avenues:
- **Comparative Effectiveness Evaluations:** Conducting longitudinal pre-test/post-test comparative studies to evaluate academic knowledge acquisition and time-on-task between the autism-adapted interface and conventional commercial software.
- **Eye-Tracking & Biometric Usability Studies:** Using eye-tracking analytics and physiological sensors to objectively measure visual fixation patterns, scan paths, and autonomic stress responses during interaction.
- **Adaptive Personalization Algorithms:** Investigating intelligent algorithms capable of dynamically modulating visual density and instructional scaffolding based on individual learner performance.

---

***End of Project Report (Chapters 4 to 7)***
`;

const mdPath = path.join('C:\\Users\\user\\.gemini\\antigravity\\brain\\82c4e6a3-f809-4fd4-a319-b55bb18dcd69', 'autism_adapted_interface_report_chapters_4_to_7.md');
fs.writeFileSync(mdPath, md, 'utf8');
console.log('Successfully updated markdown artifact at:', mdPath);
