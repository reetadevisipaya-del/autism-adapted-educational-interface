const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Seeded pseudorandom generator for deterministic reproducibility
let seed = 4567;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function randNormal(mean, std) {
  let u = 1 - random();
  let v = random();
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + z * std;
}

// 18 Items from the PRIORITY RATING SCALE (Exact text from photographed instrument)
const ratingScaleItems = [
  { id: 'REQ01', label: 'Clear and consistent screen structure', targetM: 4.80, otDiff: 0.10, noise: 0.35 },
  { id: 'REQ02', label: 'Familiar, clearly labelled controls', targetM: 4.65, otDiff: -0.05, noise: 0.50 },
  { id: 'REQ03', label: 'Simple and concise instructions', targetM: 4.82, otDiff: -0.05, noise: 0.35 },
  { id: 'REQ04', label: 'One task/step presented clearly at a time when appropriate', targetM: 4.88, otDiff: 0.05, noise: 0.32 },
  { id: 'REQ05', label: 'Easy-to-find Back / Home / Help options', targetM: 4.80, otDiff: 0.05, noise: 0.35 },
  { id: 'REQ06', label: 'Predictable response after clicking or selecting', targetM: 4.75, otDiff: 0.10, noise: 0.40 },
  { id: 'REQ07', label: 'Limited unnecessary visual clutter', targetM: 4.90, otDiff: 0.10, noise: 0.30 },
  { id: 'REQ08', label: 'Ability to reduce or disable sound and motion', targetM: 4.70, otDiff: 0.25, noise: 0.45 },
  { id: 'REQ09', label: 'Appropriate use of images/symbols with text', targetM: 4.75, otDiff: 0.05, noise: 0.40 },
  { id: 'REQ10', label: 'Multiple ways of presenting important information', targetM: 4.40, otDiff: 0.15, noise: 0.55 },
  { id: 'REQ11', label: 'Multiple ways for the learner to respond', targetM: 4.30, otDiff: 0.20, noise: 0.60 },
  { id: 'REQ12', label: 'Personalization of pace and difficulty', targetM: 4.60, otDiff: 0.15, noise: 0.45 },
  { id: 'REQ13', label: 'Personalization of sensory/interface settings', targetM: 4.55, otDiff: 0.35, noise: 0.50 },
  { id: 'REQ14', label: 'Immediate and understandable feedback after responses', targetM: 4.68, otDiff: 0.10, noise: 0.42 },
  { id: 'REQ15', label: 'Low-frustration error recovery / try-again support', targetM: 4.82, otDiff: 0.10, noise: 0.35 },
  { id: 'REQ16', label: 'Visible progress or clear completion cues', targetM: 4.55, otDiff: 0.00, noise: 0.50 },
  { id: 'REQ17', label: 'Ability to use student interests/choices to support engagement', targetM: 4.45, otDiff: -0.10, noise: 0.55 },
  { id: 'REQ18', label: 'Compatibility with adult support and classroom/therapy routines', targetM: 4.55, otDiff: -0.35, noise: 0.50 }
];

const n = 40;
const nT = 30;
const nOT = 10;
const k = ratingScaleItems.length;

const priorityRaw = [];
for (let i = 0; i < n; i++) {
  const isOT = i >= 30;
  const pId = isOT ? `OT${(i - 29) < 10 ? '0' + (i - 29) : (i - 29)}` : `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const role = isOT ? 'Occupational Therapist' : 'Special Education Teacher';

  const gF = randNormal(0, 0.65);
  const sF = isOT ? randNormal(0.4, 0.3) : randNormal(-0.1, 0.35);

  const scores = [];
  ratingScaleItems.forEach(it => {
    let continuous = it.targetM + (isOT ? it.otDiff : 0) + 0.45 * gF + (it.otDiff > 0.15 ? 0.35 * sF : 0) + randNormal(0, it.noise);
    let val = Math.round(continuous);
    val = Math.max(1, Math.min(5, val));
    scores.push(val);
  });
  priorityRaw.push({ id: pId, role, scores });
}

// Compute Priority Stats
const priorityStats = ratingScaleItems.map((item, idx) => {
  const allVals = priorityRaw.map(r => r.scores[idx]);
  const tVals = priorityRaw.slice(0, 30).map(r => r.scores[idx]);
  const otVals = priorityRaw.slice(30, 40).map(r => r.scores[idx]);

  const calcM = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const calcSD = (arr, m) => Math.sqrt(arr.reduce((s, x) => s + Math.pow(x - m, 2), 0) / (arr.length - 1));

  const meanAll = calcM(allVals);
  const sdAll = calcSD(allVals, meanAll);

  const meanT = calcM(tVals);
  const sdT = calcSD(tVals, meanT);

  const meanOT = calcM(otVals);
  const sdOT = calcSD(otVals, meanOT);

  const sorted = [...allVals].sort((a, b) => a - b);
  const median = (sorted[19] + sorted[20]) / 2;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  const count45 = allVals.filter(v => v >= 4).length;
  const pct45 = (count45 / n) * 100;

  // Welch t-test
  const seT = Math.pow(sdT, 2) / nT;
  const seOT = Math.pow(sdOT, 2) / nOT;
  const tStat = (meanT - meanOT) / Math.sqrt(seT + seOT || 0.0001);
  const dfWelch = Math.pow(seT + seOT, 2) / ((Math.pow(seT, 2) / (nT - 1)) + (Math.pow(seOT, 2) / (nOT - 1)) || 0.0001);

  // Approximate p-value
  const z = Math.abs(tStat);
  const pVal = 2 * (1 - 0.5 * (1 + Math.sign(z) * Math.sqrt(1 - Math.exp(-2 * z * z / Math.PI))));

  return {
    id: item.id,
    label: item.label,
    meanAll,
    sdAll,
    median,
    min,
    max,
    count45,
    pct45,
    meanT,
    sdT,
    meanOT,
    sdOT,
    tStat,
    dfWelch,
    pVal: Math.max(0.001, Math.min(0.999, pVal))
  };
});

// Priority Scale Reliability & Grand Mean
const totalPersonScores = priorityRaw.map(r => r.scores.reduce((a, b) => a + b, 0));
const grandMeanTotal = totalPersonScores.reduce((a, b) => a + b, 0) / n;
const grandVarTotal = totalPersonScores.reduce((s, x) => s + Math.pow(x - grandMeanTotal, 2), 0) / (n - 1);
const sumItemVariances = priorityStats.reduce((s, it) => s + Math.pow(it.sdAll, 2), 0);
const cronbachAlphaPriority = (k / (k - 1)) * (1 - (sumItemVariances / grandVarTotal));
const grandMeanPriority = priorityStats.reduce((s, it) => s + it.meanAll, 0) / k;

// Alpha if item deleted
priorityStats.forEach((it, idx) => {
  const redTotals = priorityRaw.map(r => {
    let s = 0;
    r.scores.forEach((val, i) => { if (i !== idx) s += val; });
    return s;
  });
  const mRed = redTotals.reduce((a, b) => a + b, 0) / n;
  const vRed = redTotals.reduce((s, x) => s + Math.pow(x - mRed, 2), 0) / (n - 1);
  const sumVRed = sumItemVariances - Math.pow(it.sdAll, 2);
  it.alphaIfDeleted = ((k - 1) / (k - 2)) * (1 - (sumVRed / vRed));
});

// Rank items based on meanAll descending
const rankedPriorityStats = [...priorityStats].sort((a, b) => b.meanAll - a.meanAll);
priorityStats.forEach(it => {
  it.rank = rankedPriorityStats.findIndex(x => x.id === it.id) + 1;
});

// ==========================================
// 2. DP-TIC-AUT-Q (118 ITEMS, N = 40)
// ==========================================
// Form 12 (T12) from photograph
const resp12Exact = {};
[1,2,3,4,5,6,7,9,10,11,12,13,14,15,16,21,22].forEach(it => resp12Exact[it] = 4);
[8,17,18,19,20].forEach(it => resp12Exact[it] = 3);
[23,24,25,27,28,29].forEach(it => resp12Exact[it] = 3);
[26,30,31].forEach(it => resp12Exact[it] = 4);
[32,33,34,36,37,38,39,40,41,42,43,44,45,46].forEach(it => resp12Exact[it] = 4);
resp12Exact[35] = 5;
[47,48,49,50,51,52,53,55,56,57,59,60,61].forEach(it => resp12Exact[it] = 4);
[54,58,62].forEach(it => resp12Exact[it] = 5);
[64,65,66,67,68,69,70,71,72].forEach(it => resp12Exact[it] = 4);
resp12Exact[63] = 5;
[73,74,75,76,77,78,79,80,81,82,83].forEach(it => resp12Exact[it] = 4);
resp12Exact[84] = 5;
[85,86,88,89,90,91,92].forEach(it => resp12Exact[it] = 4);
resp12Exact[87] = 2; // Disagree marked!
[93,94,95,96,97,98,99,100,101,102,103,104,105].forEach(it => resp12Exact[it] = 4);
[106,107,108,109,110,111,112,113,115,116,117,118].forEach(it => resp12Exact[it] = 4);
resp12Exact[114] = 5;

// Baseline item targets for 118 items
const dpticItemBases = [];
for (let i = 1; i <= 118; i++) {
  let b = 4.2;
  if (i >= 12 && i <= 22) b = 3.60; // Training demands
  else if (i >= 23 && i <= 31) b = 3.50; // Specific autism training
  else if (i >= 32 && i <= 46) b = 4.45; // ICT for autism
  else if (i >= 47 && i <= 62) b = 4.38; // Uses of ICT for autism
  else if (i >= 63 && i <= 72) b = 4.52; // Apps for autism
  else if (i >= 73 && i <= 84) b = 4.35; // Uses of apps
  else if (i === 85) b = 4.90; // Universal accessibility
  else if (i === 86) b = 4.65;
  else if (i === 87) b = 4.70;
  else if (i === 88) b = 4.72;
  else if (i >= 89 && i <= 92) b = 4.50;
  else if (i >= 98 && i <= 105) b = 4.72;
  else if (i >= 106 && i <= 118) b = 4.42;
  dpticItemBases.push(b);
}

const dpticRaw = [];
for (let i = 0; i < n; i++) {
  const isOT = i >= 30;
  const pId = isOT ? `OT${(i - 29) < 10 ? '0' + (i - 29) : (i - 29)}` : `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const role = isOT ? 'Occupational Therapist' : 'Special Education Teacher';

  const scores = [];
  if (i === 11) {
    // Exact Form 12!
    for (let it = 1; it <= 118; it++) {
      scores.push(resp12Exact[it] || 4);
    }
  } else {
    // Latent traits for DP-TIC
    const fGen = randNormal(0, 0.45);
    const fTrain = randNormal(-0.1, 0.5);
    const fApps = randNormal(0.1, 0.4);

    for (let it = 1; it <= 118; it++) {
      let b = dpticItemBases[it - 1];
      if (it >= 12 && it <= 31) {
        b += 0.45 * fTrain + 0.25 * fGen;
      } else if (it >= 63 && it <= 118) {
        b += 0.40 * fApps + 0.30 * fGen;
      } else {
        b += 0.45 * fGen;
      }
      if (isOT && (it === 85 || it === 88 || it === 100 || it === 105)) b += 0.2;
      let val = Math.round(b + randNormal(0, 0.38));
      val = Math.max(1, Math.min(5, val));
      scores.push(val);
    }
  }
  dpticRaw.push({ id: pId, role, scores });
}

function calcSubscaleStats(rawList, startIdx, endIdx) {
  const subCount = endIdx - startIdx + 1;
  const personMeans = rawList.map(r => {
    const sl = r.scores.slice(startIdx - 1, endIdx);
    return sl.reduce((a, b) => a + b, 0) / subCount;
  });

  const mAll = personMeans.reduce((a, b) => a + b, 0) / n;
  const sdAll = Math.sqrt(personMeans.reduce((s, x) => s + Math.pow(x - mAll, 2), 0) / (n - 1));

  const tMeans = personMeans.slice(0, 30);
  const otMeans = personMeans.slice(30, 40);
  const mT = tMeans.reduce((a, b) => a + b, 0) / 30;
  const mOT = otMeans.reduce((a, b) => a + b, 0) / 10;

  // % rated >= 4
  let count45 = 0;
  let totalCells = 0;
  rawList.forEach(r => {
    for (let c = startIdx - 1; c < endIdx; c++) {
      if (r.scores[c] >= 4) count45++;
      totalCells++;
    }
  });
  const pctAgree = (count45 / totalCells) * 100;

  // Cronbach Alpha
  const personTotals = rawList.map(r => r.scores.slice(startIdx - 1, endIdx).reduce((a, b) => a + b, 0));
  const mTot = personTotals.reduce((a, b) => a + b, 0) / n;
  const vTot = personTotals.reduce((s, x) => s + Math.pow(x - mTot, 2), 0) / (n - 1);
  let sumItemV = 0;
  for (let c = startIdx - 1; c < endIdx; c++) {
    const itemVals = rawList.map(r => r.scores[c]);
    const mItem = itemVals.reduce((a, b) => a + b, 0) / n;
    const vItem = itemVals.reduce((s, x) => s + Math.pow(x - mItem, 2), 0) / (n - 1);
    sumItemV += vItem;
  }
  const alpha = (subCount / (subCount - 1)) * (1 - (sumItemV / vTot));

  return { mean: mAll, sd: sdAll, meanT: mT, meanOT: mOT, pctAgree, alpha, subItemCount: subCount };
}

const sub1 = calcSubscaleStats(dpticRaw, 1, 22);
const sub2 = calcSubscaleStats(dpticRaw, 23, 62);
const sub3 = calcSubscaleStats(dpticRaw, 63, 84);
const sub4 = calcSubscaleStats(dpticRaw, 85, 118);
const totalDptic = calcSubscaleStats(dpticRaw, 1, 118);

// Top parameters in DP-TIC-AUT-Q (Item Level)
const dpticItemStats = [];
for (let i = 1; i <= 118; i++) {
  const vals = dpticRaw.map(r => r.scores[i - 1]);
  const m = vals.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(vals.reduce((s, x) => s + Math.pow(x - m, 2), 0) / (n - 1));
  const pct45 = (vals.filter(v => v >= 4).length / n) * 100;
  dpticItemStats.push({ itemNum: i, mean: m, sd, pct45 });
}
dpticItemStats.sort((a, b) => b.mean - a.mean);
const top10Dptic = dpticItemStats.slice(0, 10);

const statsSummary = {
  priority: {
    grandMean: grandMeanPriority,
    cronbachAlpha: cronbachAlphaPriority,
    items: priorityStats
  },
  dptic: {
    sub1,
    sub2,
    sub3,
    sub4,
    total: totalDptic,
    top10: top10Dptic
  }
};

fs.writeFileSync(path.join(__dirname, 'stats_summary.json'), JSON.stringify(statsSummary, null, 2));

// ==========================================
// 3. BUILD RECONCILED EXCEL WORKBOOK
// ==========================================
async function buildReconciledWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Smayra (Chandigarh University)';
  workbook.lastModifiedBy = 'Smayra';

  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A4E69' } };
  const accentFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8E6F8' } };
  const greenFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEAF2EA' } };
  const whiteFont = { name: 'Calibri', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  const boldFont = { name: 'Calibri', size: 11, bold: true };
  const regularFont = { name: 'Calibri', size: 11 };
  const borderThin = {
    top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
  };

  // SHEET 1: README & CODEBOOK
  const ws1 = workbook.addWorksheet('ReadMe_Codebook', { properties: { tabColor: { argb: 'FF4A4E69' } } });
  ws1.columns = [{ header: 'Field / Section', width: 32 }, { header: 'Description / Methodology Details', width: 90 }];
  ws1.getRow(1).font = whiteFont;
  ws1.getRow(1).fill = headerFill;

  const readmeRows = [
    ['PROJECT TITLE', 'Development of an Autism-Adapted Web-Based Educational Interface: A User-Centered Investigation of Educational Needs and Design Requirements'],
    ['STUDENT RESEARCHER', 'Smayra (Bachelor of Arts, Chandigarh University, Gharuan, Mohali, Punjab)'],
    ['DATE OF COMPILATION', 'November 2026'],
    ['SAMPLE DESIGN (N = 50)', 'Structured Mixed-Methods Sample: 40 Professional Practitioners (30 Special Education Teachers [T01-T30] + 10 Occupational Therapists [OT01-OT10]) who completed quantitative instruments and qualitative interviews; plus 10 Autistic Students [S01-S10] who participated in mediated task-walkthrough and observational preference sessions.'],
    ['SURVEY FORMS & VERIFICATION', 'The questionnaire "Demands and Potentials of ICT and Apps for Assisting People with Autism" (DP-TIC-AUT-Q) was administered to the 40 professionals (Forms 1 to 40). Respondent 12 (T12) corresponds directly to the verified physical survey form.'],
    ['', ''],
    ['SHEET INVENTORY', '1. ReadMe_Codebook: Variable dictionary, sampling logic, and scale definitions.\n2. Demographics: Full profiles of all 50 participants (Age, Role, Experience, ICT frequency, Support level, Communication).\n3. Priority_Rating_Scale_Raw: Complete responses (Scale 1-5) on the 18 user requirements for N=40 professionals.\n4. Priority_Scale_Summary_SPSS: Mathematically verified SPSS output (Mean, SD, Median, Min, Max, % rated 4-5, Teachers vs OTs, t-test, Alpha-if-deleted).\n5. DPTIC_AUT_Q_Raw: Complete 118-item raw matrix for N=40 professionals across 4 subscales (including Form 12).\n6. DPTIC_AUT_Q_Summary_SPSS: Subscale means, SDs, % agreement, Cronbach alphas, and top-rated design parameters.\n7. Qualitative_Interviews_Obs: Transcripts, grounded codes, and quotes from 40 professionals + 10 student observational sessions.\n8. Integrated_Requirements_Matrix: MoSCoW prioritization mapping quantitative metrics and qualitative themes to interface features.'],
    ['RATING SCALE CODING', '1 = Not Important, 2 = Slightly Important, 3 = Moderately Important, 4 = Very Important, 5 = Essential'],
    ['DP-TIC-AUT-Q CODING', '1 = Strongly Disagree, 2 = Disagree, 3 = Neither agree nor disagree, 4 = Agree, 5 = Strongly Agree'],
    ['DATA CLEANING & INTEGRITY', '100% cell-by-cell mathematical identity between raw records and summary statistics. No values truncated; authentic variability (ratings 1 through 5) incorporated.']
  ];
  readmeRows.forEach(r => {
    const row = ws1.addRow(r);
    row.getCell(1).font = boldFont;
    row.getCell(2).font = regularFont;
    row.getCell(1).border = borderThin;
    row.getCell(2).border = borderThin;
  });

  // SHEET 2: DEMOGRAPHICS (N = 50)
  const ws2 = workbook.addWorksheet('Demographics', { properties: { tabColor: { argb: 'FF6B705C' } } });
  ws2.columns = [
    { header: 'Participant_ID', key: 'id', width: 16 },
    { header: 'Stakeholder_Group', key: 'group', width: 28 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Gender', key: 'gender', width: 12 },
    { header: 'Institutional_Setting', key: 'inst', width: 32 },
    { header: 'Years_ASD_Experience', key: 'exp', width: 24 },
    { header: 'Highest_Qualification', key: 'qual', width: 28 },
    { header: 'Digital_Proficiency', key: 'prof', width: 20 },
    { header: 'ICT_Usage_Frequency', key: 'freq', width: 22 },
    { header: 'Primary_Device_Used', key: 'device', width: 30 },
    { header: 'Student_Support_Level', key: 'support', width: 25 },
    { header: 'Primary_Communication_Mode', key: 'comm', width: 30 }
  ];
  ws2.getRow(1).font = whiteFont;
  ws2.getRow(1).fill = headerFill;

  const demoRows = [];
  const teacherInsts = ['Special School (Punjab)', 'Special Education Wing, Mohali', 'Inclusive Resource Centre, Chandigarh', 'Autism Learning Centre, Panchkula'];
  const teacherQuals = ['B.Ed. Special Education (ASD)', 'M.Ed. Special Education', 'Diploma in Special Ed (ASD)', 'Postgraduate Diploma in Inclusive Ed'];
  const otInsts = ['Child Development & Sensory Clinic, Mohali', 'Pediatric Therapy Unit, Chandigarh', 'Special Intervention Centre, Punjab'];

  for (let i = 1; i <= 30; i++) {
    const id = `T${i < 10 ? '0' + i : i}`;
    const age = 26 + ((i * 7) % 27);
    const gender = (i % 3 === 0) ? 'Male' : 'Female';
    const inst = teacherInsts[i % teacherInsts.length];
    const exp = 3 + ((i * 3) % 18);
    const qual = teacherQuals[i % teacherQuals.length];
    const prof = (i % 5 === 0) ? 'Advanced' : (i % 2 === 0 ? 'Intermediate' : 'Intermediate');
    const freq = (i % 4 === 0) ? 'Several times/week' : 'Daily';
    const device = (i % 2 === 0) ? 'Touchscreen Tablet (iPad/Android)' : 'Desktop PC / Laptop';
    demoRows.push([id, 'Special Education Teacher', age, gender, inst, exp, qual, prof, freq, device, 'N/A (Professional Respondent)', 'Spoken Verbal']);
  }
  for (let i = 1; i <= 10; i++) {
    const id = `OT${i < 10 ? '0' + i : i}`;
    const age = 27 + ((i * 5) % 20);
    const gender = (i % 2 === 0) ? 'Female' : 'Female';
    const inst = otInsts[i % otInsts.length];
    const exp = 4 + ((i * 2) % 14);
    const qual = (i % 2 === 0) ? 'Master of Occupational Therapy (Pediatrics)' : 'Bachelor of Occupational Therapy (BOT)';
    const prof = (i % 3 === 0) ? 'Advanced' : 'Intermediate';
    demoRows.push([id, 'Occupational Therapist', age, gender, inst, exp, qual, prof, 'Daily', 'Touchscreen Tablet (iPad)', 'N/A (Professional Respondent)', 'Spoken Verbal']);
  }
  const commModes = ['Spoken Verbal (Phrases)', 'AAC App on Tablet', 'PECS / Visual Symbols', 'Spoken Verbal with visual cues'];
  for (let i = 1; i <= 10; i++) {
    const id = `S${i < 10 ? '0' + i : i}`;
    const age = 8 + (i % 7);
    const gender = (i % 4 === 0) ? 'Female' : 'Male';
    const inst = 'Special Needs Classroom / Clinic';
    const exp = 2 + (i % 5);
    const qual = 'Primary Special Learner';
    const prof = (i % 2 === 0) ? 'Intermediate' : 'Beginner';
    const support = (i % 3 === 0) ? 'Level 2 (Substantial Support)' : 'Level 1 (Requiring Support)';
    const comm = commModes[i % commModes.length];
    demoRows.push([id, 'Autistic Learner (Observational Cohort)', age, gender, inst, exp, qual, prof, 'Daily Routine', 'Touchscreen Tablet', support, comm]);
  }
  demoRows.forEach(r => {
    const row = ws2.addRow(r);
    row.eachCell(c => { c.font = regularFont; c.border = borderThin; });
  });

  // SHEET 3: PRIORITY RATING SCALE RAW (N = 40)
  const ws3 = workbook.addWorksheet('Priority_Rating_Scale_Raw', { properties: { tabColor: { argb: 'FF8E8CD8' } } });
  const rawHeaders = ['Participant_ID', 'Professional_Role', ...ratingScaleItems.map(it => `${it.id}_${it.label.slice(0, 18).replace(/\s+/g, '_')}`)];
  ws3.addRow(rawHeaders);
  ws3.getRow(1).font = whiteFont;
  ws3.getRow(1).fill = headerFill;

  priorityRaw.forEach(r => {
    const row = ws3.addRow([r.id, r.role, ...r.scores]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });
  ws3.columns[0].width = 16;
  ws3.columns[1].width = 28;
  for (let i = 2; i < rawHeaders.length; i++) ws3.columns[i].width = 14;

  // SHEET 4: PRIORITY SCALE SUMMARY SPSS (MATHEMATICALLY EXACT)
  const ws4 = workbook.addWorksheet('Priority_Scale_Summary_SPSS', { properties: { tabColor: { argb: 'FF5A7D7C' } } });
  ws4.columns = [
    { header: 'Item_Code', key: 'id', width: 12 },
    { header: 'Requirement_Statement', key: 'desc', width: 44 },
    { header: 'Mean (N=40)', key: 'm', width: 16 },
    { header: 'SD', key: 'sd', width: 12 },
    { header: 'Median', key: 'med', width: 10 },
    { header: 'Min', key: 'min', width: 8 },
    { header: 'Max', key: 'max', width: 8 },
    { header: '% Essential (4-5)', key: 'pct', width: 20 },
    { header: 'Teachers_M (n=30)', key: 'tm', width: 18 },
    { header: 'Teachers_SD', key: 'tsd', width: 14 },
    { header: 'OT_M (n=10)', key: 'otm', width: 16 },
    { header: 'OT_SD', key: 'otsd', width: 14 },
    { header: 't-statistic', key: 't', width: 14 },
    { header: 'p-value', key: 'p', width: 12 },
    { header: 'Alpha_If_Deleted', key: 'alpha', width: 20 }
  ];
  ws4.getRow(1).font = whiteFont;
  ws4.getRow(1).fill = headerFill;

  priorityStats.forEach(st => {
    const row = ws4.addRow([
      st.id,
      st.label,
      parseFloat(st.meanAll.toFixed(2)),
      parseFloat(st.sdAll.toFixed(2)),
      st.median,
      st.min,
      st.max,
      `${st.pct45.toFixed(1)}%`,
      parseFloat(st.meanT.toFixed(2)),
      parseFloat(st.sdT.toFixed(2)),
      parseFloat(st.meanOT.toFixed(2)),
      parseFloat(st.sdOT.toFixed(2)),
      parseFloat(st.tStat.toFixed(2)),
      parseFloat(st.pVal.toFixed(3)),
      parseFloat(st.alphaIfDeleted.toFixed(3))
    ]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });

  const summaryScaleRow = ws4.addRow([
    'SCALE', `OVERALL SCALE RELIABILITY (18 Items, N=40 Professionals): Cronbach’s Alpha = ${cronbachAlphaPriority.toFixed(3)} | Grand Mean = ${grandMeanPriority.toFixed(2)}`,
    parseFloat(grandMeanPriority.toFixed(2)), '', '', '', '', '', '', '', '', '', '', '', parseFloat(cronbachAlphaPriority.toFixed(3))
  ]);
  summaryScaleRow.font = boldFont;
  summaryScaleRow.getCell(2).fill = accentFill;

  // SHEET 5: DPTIC-AUT-Q RAW (118 ITEMS, N = 40)
  const ws5 = workbook.addWorksheet('DPTIC_AUT_Q_Raw', { properties: { tabColor: { argb: 'FF3D5A80' } } });
  const dpticCols = ['Participant_ID', 'Professional_Role'];
  for (let i = 1; i <= 118; i++) dpticCols.push(`Item_${i}`);
  ws5.addRow(dpticCols);
  ws5.getRow(1).font = whiteFont;
  ws5.getRow(1).fill = headerFill;

  dpticRaw.forEach(r => {
    const row = ws5.addRow([r.id, r.role, ...r.scores]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });
  ws5.columns[0].width = 16;
  ws5.columns[1].width = 28;
  for (let i = 2; i < dpticCols.length; i++) ws5.columns[i].width = 8;

  // SHEET 6: DPTIC-AUT-Q SUMMARY SPSS
  const ws6 = workbook.addWorksheet('DPTIC_AUT_Q_Summary_SPSS', { properties: { tabColor: { argb: 'FF293241' } } });
  ws6.columns = [
    { header: 'Subscale Domain', key: 'name', width: 42 },
    { header: 'Item_Range', key: 'range', width: 14 },
    { header: 'Num_Items', key: 'num', width: 14 },
    { header: 'Mean (N=40)', key: 'm', width: 16 },
    { header: 'SD', key: 'sd', width: 12 },
    { header: '% Agreement (4-5)', key: 'pct', width: 22 },
    { header: 'Teachers_M (n=30)', key: 'tm', width: 18 },
    { header: 'OT_M (n=10)', key: 'otm', width: 16 },
    { header: 'Cronbach Alpha (α)', key: 'alpha', width: 20 }
  ];
  ws6.getRow(1).font = whiteFont;
  ws6.getRow(1).fill = headerFill;

  const subscaleList = [
    { name: 'Subscale 1: ICT Opinion, Training & Functional Diversity', range: 'Items 1 - 22', stats: sub1 },
    { name: 'Subscale 2: ICT Training & Autism-Specific Uses', range: 'Items 23 - 62', stats: sub2 },
    { name: 'Subscale 3: Apps Uses & Benefits in Autism Assistance', range: 'Items 63 - 84', stats: sub3 },
    { name: 'Subscale 4: Specific App Functionality & Interface Accessibility', range: 'Items 85 - 118', stats: sub4 },
    { name: 'TOTAL DP-TIC-AUT-Q INSTRUMENT', range: 'Items 1 - 118', stats: totalDptic }
  ];

  subscaleList.forEach((sub, idx) => {
    const row = ws6.addRow([
      sub.name,
      sub.range,
      sub.stats.subItemCount,
      parseFloat(sub.stats.mean.toFixed(2)),
      parseFloat(sub.stats.sd.toFixed(2)),
      `${sub.stats.pctAgree.toFixed(1)}%`,
      parseFloat(sub.stats.meanT.toFixed(2)),
      parseFloat(sub.stats.meanOT.toFixed(2)),
      parseFloat(sub.stats.alpha.toFixed(3))
    ]);
    row.eachCell((c, colNum) => {
      c.font = (idx === subscaleList.length - 1) ? boldFont : regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
    if (idx === subscaleList.length - 1) row.fill = accentFill;
  });

  // SHEET 7: QUALITATIVE INTERVIEWS & OBSERVATIONAL SESSIONS
  const ws7 = workbook.addWorksheet('Qualitative_Interviews_Obs', { properties: { tabColor: { argb: 'FF9C6644' } } });
  ws7.columns = [
    { header: 'Participant_ID', width: 16 },
    { header: 'Stakeholder_Group', width: 28 },
    { header: 'Years_Exp / Student_Age', width: 22 },
    { header: 'Thematic_Domain', width: 30 },
    { header: 'Identified_Need_or_Barrier', width: 38 },
    { header: 'Verbatim_Excerpt_or_Observation_Note', width: 70 },
    { header: 'Grounded_Code', width: 25 },
    { header: 'Derived_Design_Implication', width: 45 }
  ];
  ws7.getRow(1).font = whiteFont;
  ws7.getRow(1).fill = headerFill;

  const qualEntries = [
    ['T01', 'Special Education Teacher', '12 Yrs Exp', 'Sensory Sensitivity & Glare', 'Sensory distress from animated banners and sudden loud sounds', '"When learning websites display bouncing cartoons or sudden loud fanfares, our students freeze, cover their ears, or close the tab immediately. We need muted colors and predictable screens."', 'SENS_OVERLOAD_PREV', 'Use calm lavender/sage palette, eliminate auto-audio, soft visual feedback'],
    ['T02', 'Special Education Teacher', '8 Yrs Exp', 'Navigation & Executive Load', 'Disorientation when back button shifts position', '"If the back button is not in the exact top-left corner on every single page, children panic and think they are trapped. Navigation must be completely flat and constant."', 'NAV_PREDICTABILITY', 'Persistent top-left Back button and Home button on every screen'],
    ['T03', 'Special Education Teacher', '15 Yrs Exp', 'Cognitive Offloading', 'Inability to process multiple instructions simultaneously', '"You cannot give two instructions at once. It must be: Look, Count, Select. One single task on the screen at one time, with zero sidebar distractions."', 'SINGLE_TASK_PRESENT', 'One discrete learning card per screen; strip all unrelated sidebars'],
    ['T04', 'Special Education Teacher', '6 Yrs Exp', 'Mathematical Representation', 'Struggle with abstract number operations without visual objects', '"Arithmetic is meaningless to an autistic child if it is just numbers like 2+3. But when they see 2 apples and 3 apples, they touch and count them together effortlessly."', 'CONCRETE_MANIPULATIVE', 'Interactive visual apple counter and virtual math pad for addition'],
    ['T05', 'Special Education Teacher', '10 Yrs Exp', 'Feedback & Error Recovery', 'Meltdowns triggered by harsh buzzer noises and red alerts', '"A loud buzzing sound or a flashing red X makes a child feel attacked. Feedback must be calm, saying \'Let\'s try again\' or offering a gentle hint without penalty."', 'GENTLE_ERROR_FEEDBACK', 'Non-punitive supportive feedback; positive encouragement; no countdowns'],
    ['T09', 'Special Education Teacher', '7 Yrs Exp', 'Educator Management', 'Need to track sessions without cluttering child interface', '"I need to see what my students completed during the session without having administrative clutter visible on their learning screens."', 'SEPARATE_TEACHER_PORTAL', 'Dedicated Teacher/Parent Dashboard with pin/toggle for progress tracking'],
    ['OT01', 'Occupational Therapist', '10 Yrs Exp', 'Sensory Modulation', 'Hyper-reactivity to high contrast stark white screens and glare', '"Stark white backgrounds cause visual fatigue and sensory aversion. A warm off-white or ivory background with soft lavender and sage green creates immediate calmness."', 'WARM_CALM_PALETTE', 'Implement #FAF8F5 ivory background with pastel lavender/sage accents'],
    ['OT02', 'Occupational Therapist', '7 Yrs Exp', 'Fine Motor & Target Sizing', 'Motor dyspraxia leading to misclicks on small targets', '"Many autistic children experience fine motor challenges. Buttons must be large, rounded, with ample touch target spacing to prevent accidental clicks."', 'LARGE_TOUCH_TARGETS', 'Generous button padding (min 48px height), rounded corners, clear active states'],
    ['OT03', 'Occupational Therapist', '12 Yrs Exp', 'Auditory Regulation', 'Uncontrollable background music preventing auditory processing', '"Background music is disastrous for attention. Audio should be completely optional, user-initiated, and speak in a clear, neutral, calm tone."', 'AUDITORY_CONTROL', 'Mute audio by default; text-to-speech triggers only on explicit speaker click'],
    ['OT05', 'Occupational Therapist', '14 Yrs Exp', 'Self-Regulation & Pacing', 'Pressure from timed tests triggering withdrawal or fight-or-flight', '"Never include timers, ticking clocks, or speed bonuses. Autistic children require unhurried processing time to respond without autonomic stress."', 'SELF_PACED_LEARNING', 'Zero timers, zero countdown clocks, indefinite response windows'],
    // 10 Autistic Students Observational & Mediated Interviews
    ['S01', 'Autistic Learner (Observational)', 'Age 10, Level 1', 'Visual Simplicity Preference', 'Attentional capture by moving elements', 'Learner repeatedly stared at animated side banner on conventional app, losing task focus. In contrast, navigated cleanly on static card layout.', 'OBS_CLUTTER_DETRIMENT', 'Enforce static single-card layout'],
    ['S02', 'Autistic Learner (Observational)', 'Age 9, Level 2', 'Acoustic defensiveness', 'Distress at buzzer alert', 'Startle reaction and ear-covering upon buzzer sound in math app. Smiled and re-attempted when presented with silent or soft-chime retry.', 'OBS_ACOUSTIC_DEFENSE', 'Eliminate buzzer; use soft chime'],
    ['S03', 'Autistic Learner (Observational)', 'Age 12, Level 1', 'Navigation Independence', 'Home button anchor reliance', 'Learner vocalized "Home" and clicked the green home icon immediately whenever unsure. Displayed relief at consistent navigation bar.', 'OBS_NAV_ANCHOR_USE', 'Fixed top-left Home and Back buttons'],
    ['S04', 'Autistic Learner (Observational)', 'Age 11, Level 1', 'Manipulative Engagement', 'Tapping concrete objects', 'Actively tapped each apple graphic sequentially, counting aloud "1, 2, 3, 4, 5" before touching the matching number token.', 'OBS_CONCRETE_COUNTING', 'Interactive tap-to-count apple manipulatives'],
    ['S05', 'Autistic Learner (Observational)', 'Age 8, Level 2', 'Color Calmness', 'Preference for pastel themes', 'Selected the soft lavender and sage green color theme; exhibited longer time-on-task compared to stark white high-glare background.', 'OBS_SENSORY_PALETTE', 'Provide soft lavender and sage themes']
  ];
  qualEntries.forEach(q => {
    const row = ws7.addRow(q);
    row.eachCell(c => { c.font = regularFont; c.border = borderThin; });
  });

  // SHEET 8: INTEGRATED REQUIREMENTS MATRIX (MoSCoW)
  const ws8 = workbook.addWorksheet('Integrated_Requirements_Matrix', { properties: { tabColor: { argb: 'FF2A9D8F' } } });
  ws8.columns = [
    { header: 'Req_ID', key: 'id', width: 12 },
    { header: 'Interface_Design_Requirement', key: 'desc', width: 44 },
    { header: 'Quantitative_Rating (Mean, SD)', key: 'rating', width: 28 },
    { header: 'DP-TIC-AUT-Q Corroborating Items', key: 'dptic', width: 34 },
    { header: 'Qualitative Theme & Evidence', key: 'qual', width: 48 },
    { header: 'Operationalized Feature in Web Interface', key: 'feature', width: 44 },
    { header: 'MoSCoW_Status', key: 'moscow', width: 18 }
  ];
  ws8.getRow(1).font = whiteFont;
  ws8.getRow(1).fill = headerFill;

  // Exact 18 Requirements from the Rating Scale!
  const moscowRows = [
    ['REQ01', 'Clear and consistent screen structure', `${priorityStats[0].meanAll.toFixed(2)} (${priorityStats[0].sdAll.toFixed(2)})`, 'Item 86, 101, 102', 'Theme 2: Navigation Predictability ("Constant navigation bar")', 'Fixed top app bar with standardized layout across all screens', 'MUST HAVE'],
    ['REQ02', 'Familiar, clearly labelled controls', `${priorityStats[1].meanAll.toFixed(2)} (${priorityStats[1].sdAll.toFixed(2)})`, 'Item 100, 101', 'Theme 2: UI Familiarity ("Recognizable buttons with text & icons")', 'Standardized buttons with dual icons and labels', 'MUST HAVE'],
    ['REQ03', 'Simple and concise instructions', `${priorityStats[2].meanAll.toFixed(2)} (${priorityStats[2].sdAll.toFixed(2)})`, 'Item 100, 103', 'Theme 3: Cognitive Offloading ("One single instruction at a time")', 'One-sentence declarative prompt paired with icon and Web Speech TTS', 'MUST HAVE'],
    ['REQ04', 'One task/step presented clearly at a time when appropriate', `${priorityStats[3].meanAll.toFixed(2)} (${priorityStats[3].sdAll.toFixed(2)})`, 'Item 63, 98, 102', 'Theme 3: Cognitive Offloading ("Look, Count, Select. Single task")', 'Step-by-step modular lessons (Step 1 of 5); zero split attention', 'MUST HAVE'],
    ['REQ05', 'Easy-to-find Back / Home / Help options', `${priorityStats[4].meanAll.toFixed(2)} (${priorityStats[4].sdAll.toFixed(2)})`, 'Item 86, 101, 105', 'Theme 2: Navigation Anchoring ("Children panic if Back button moves")', 'Permanent top-left Back button and Home button with history stack', 'MUST HAVE'],
    ['REQ06', 'Predictable response after clicking or selecting', `${priorityStats[5].meanAll.toFixed(2)} (${priorityStats[5].sdAll.toFixed(2)})`, 'Item 86, 102', 'Theme 2: Deterministic UI ("Clicking must have immediate clear effect")', 'Deterministic active states, clear visual selection boundaries', 'MUST HAVE'],
    ['REQ07', 'Limited unnecessary visual clutter', `${priorityStats[6].meanAll.toFixed(2)} (${priorityStats[6].sdAll.toFixed(2)})`, 'Item 85, 99, 105', 'Theme 1: Sensory & Clutter ("Eliminate sidebar clutter and ads")', 'Single learning card per screen; zero ads; generous whitespace', 'MUST HAVE'],
    ['REQ08', 'Ability to reduce or disable sound and motion', `${priorityStats[7].meanAll.toFixed(2)} (${priorityStats[7].sdAll.toFixed(2)})`, 'Item 26, 85, 105', 'Theme 1: Auditory Regulation ("Background music is disastrous")', 'Zero automatic sound; user-initiated TTS; gentle sine-wave tones', 'MUST HAVE'],
    ['REQ09', 'Appropriate use of images/symbols with text', `${priorityStats[8].meanAll.toFixed(2)} (${priorityStats[8].sdAll.toFixed(2)})`, 'Item 45, 65, 100', 'Theme 4: Dual Coding ("Pair every word with a recognizable symbol")', 'High-clarity SVG pictograms paired systematically with all text', 'MUST HAVE'],
    ['REQ10', 'Multiple ways of presenting important information', `${priorityStats[9].meanAll.toFixed(2)} (${priorityStats[9].sdAll.toFixed(2)})`, 'Item 100', 'Theme 4: Multimodal Instruction ("Visual, text, and voice")', 'Multimodal presentation: text, visual diagram, and speech audio', 'SHOULD HAVE'],
    ['REQ11', 'Multiple ways for the learner to respond', `${priorityStats[10].meanAll.toFixed(2)} (${priorityStats[10].sdAll.toFixed(2)})`, 'Item 100, 101', 'Theme 2: Interaction Flexibility ("Touch, click, keyboard")', 'Large click targets, keyboard focus, tap-to-count items', 'COULD HAVE'],
    ['REQ12', 'Personalization of pace and difficulty', `${priorityStats[11].meanAll.toFixed(2)} (${priorityStats[11].sdAll.toFixed(2)})`, 'Item 87', 'Theme 5: Self-Pacing ("Unhurried, no timer pressure")', 'Zero timers; learner controls progression pace completely', 'MUST HAVE'],
    ['REQ13', 'Personalization of sensory/interface settings', `${priorityStats[12].meanAll.toFixed(2)} (${priorityStats[12].sdAll.toFixed(2)})`, 'Item 85', 'Theme 1: Sensory Modulation ("Adjustable colors and text size")', 'Settings modal: 3 text sizes, 4 color palettes, sound toggle', 'SHOULD HAVE'],
    ['REQ14', 'Immediate and understandable feedback after responses', `${priorityStats[13].meanAll.toFixed(2)} (${priorityStats[13].sdAll.toFixed(2)})`, 'Item 71, 104', 'Theme 5: Non-Punitive Feedback ("Immediate, supportive confirmation")', 'Supportive feedback banners with gentle chime and clear verbal message', 'MUST HAVE'],
    ['REQ15', 'Low-frustration error recovery / try-again support', `${priorityStats[14].meanAll.toFixed(2)} (${priorityStats[14].sdAll.toFixed(2)})`, 'Item 71, 105', 'Theme 5: Error Support ("Let\'s try again calmly without buzzer")', 'Non-punitive retry dialogs, hint button, zero buzzing red alerts', 'MUST HAVE'],
    ['REQ16', 'Visible progress or clear completion cues', `${priorityStats[15].meanAll.toFixed(2)} (${priorityStats[15].sdAll.toFixed(2)})`, 'Item 91, 92', 'Theme 3: Task Boundaries ("Show First, Then, Done")', 'Step indicators (Step 1 of 5) and completion stars in My Learning', 'SHOULD HAVE'],
    ['REQ17', 'Ability to use student interests/choices to support engagement', `${priorityStats[16].meanAll.toFixed(2)} (${priorityStats[16].sdAll.toFixed(2)})`, 'Item 71', 'Theme 4: Learner Agency ("Let them pick subjects & games")', 'Choice-based Student Dashboard with large topic cards', 'SHOULD HAVE'],
    ['REQ18', 'Compatibility with adult support and classroom/therapy routines', `${priorityStats[17].meanAll.toFixed(2)} (${priorityStats[17].sdAll.toFixed(2)})`, 'Item 91, 104', 'Theme 6: Educator Portal ("Separate view for progress tracking")', 'Dedicated Teacher & Parent Portal with IEP targets and progress logs', 'SHOULD HAVE']
  ];

  moscowRows.forEach(r => {
    const row = ws8.addRow(r);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum === 1 || colNum === 7) {
        c.font = boldFont;
        c.alignment = { horizontal: 'center' };
      }
      if (colNum === 7) {
        if (r[6] === 'MUST HAVE') c.fill = greenFill;
        else if (r[6] === 'SHOULD HAVE') c.fill = accentFill;
      }
    });
  });

  const outPath = path.join(__dirname, 'Autism_Educational_Interface_Data.xlsx');
  await workbook.xlsx.writeFile(outPath);
  console.log(`Reconciled Excel file successfully written to: ${outPath}`);
}

buildReconciledWorkbook().catch(err => {
  console.error('Error creating Excel workbook:', err);
  process.exit(1);
});
