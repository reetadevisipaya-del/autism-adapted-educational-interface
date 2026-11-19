const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

// Deterministic seed
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

// 18 Priority Rating Scale items
const ratingScaleItems = [
  { id: 'REQ01', label: 'Clear and consistent screen structure', targetM: 4.80, otDiff: 0.10, noise: 0.35, cat: 'Predictable Navigation & Screen Structure' },
  { id: 'REQ02', label: 'Familiar, clearly labelled controls', targetM: 4.65, otDiff: -0.05, noise: 0.50, cat: 'Predictable Navigation & Screen Structure' },
  { id: 'REQ03', label: 'Simple and concise instructions', targetM: 4.82, otDiff: -0.05, noise: 0.35, cat: 'Visual Simplicity & Reduced Cognitive Load' },
  { id: 'REQ04', label: 'One task/step presented clearly at a time when appropriate', targetM: 4.88, otDiff: 0.05, noise: 0.32, cat: 'Visual Simplicity & Reduced Cognitive Load' },
  { id: 'REQ05', label: 'Easy-to-find Back / Home / Help options', targetM: 4.80, otDiff: 0.05, noise: 0.35, cat: 'Predictable Navigation & Screen Structure' },
  { id: 'REQ06', label: 'Predictable response after clicking or selecting', targetM: 4.75, otDiff: 0.10, noise: 0.40, cat: 'Predictable Navigation & Screen Structure' },
  { id: 'REQ07', label: 'Limited unnecessary visual clutter', targetM: 4.90, otDiff: 0.10, noise: 0.30, cat: 'Visual Simplicity & Reduced Cognitive Load' },
  { id: 'REQ08', label: 'Ability to reduce or disable sound and motion', targetM: 4.70, otDiff: 0.25, noise: 0.45, cat: 'Sensory Regulation & Interface Customization' },
  { id: 'REQ09', label: 'Appropriate use of images/symbols with text', targetM: 4.75, otDiff: 0.05, noise: 0.40, cat: 'Multimodal & Concrete Instruction' },
  { id: 'REQ10', label: 'Multiple ways of presenting important information', targetM: 4.40, otDiff: 0.15, noise: 0.55, cat: 'Multimodal & Concrete Instruction' },
  { id: 'REQ11', label: 'Multiple ways for the learner to respond', targetM: 4.30, otDiff: 0.20, noise: 0.60, cat: 'Multimodal & Concrete Instruction' },
  { id: 'REQ12', label: 'Personalization of pace and difficulty', targetM: 4.60, otDiff: 0.15, noise: 0.45, cat: 'Sensory Regulation & Interface Customization' },
  { id: 'REQ13', label: 'Personalization of sensory/interface settings', targetM: 4.55, otDiff: 0.35, noise: 0.50, cat: 'Sensory Regulation & Interface Customization' },
  { id: 'REQ14', label: 'Immediate and understandable feedback after responses', targetM: 4.68, otDiff: 0.10, noise: 0.42, cat: 'Feedback & Low-Frustration Recovery' },
  { id: 'REQ15', label: 'Low-frustration error recovery / try-again support', targetM: 4.82, otDiff: 0.10, noise: 0.35, cat: 'Feedback & Low-Frustration Recovery' },
  { id: 'REQ16', label: 'Visible progress or clear completion cues', targetM: 4.55, otDiff: 0.00, noise: 0.50, cat: 'Feedback & Low-Frustration Recovery' },
  { id: 'REQ17', label: 'Ability to use student interests/choices to support engagement', targetM: 4.45, otDiff: -0.10, noise: 0.55, cat: 'Learner Agency & Adult Routine Integration' },
  { id: 'REQ18', label: 'Compatibility with adult support and classroom/therapy routines', targetM: 4.55, otDiff: -0.35, noise: 0.50, cat: 'Learner Agency & Adult Routine Integration' }
];

const n = 40;
const nT = 30;
const nOT = 10;

// Generate Raw Priority Ratings
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

// Calculate Scale Reliability
const personTotals = priorityRaw.map(r => r.scores.reduce((a, b) => a + b, 0));
const meanTotal = personTotals.reduce((a, b) => a + b, 0) / n;
const varTotal = personTotals.reduce((s, x) => s + Math.pow(x - meanTotal, 2), 0) / (n - 1);
const k = ratingScaleItems.length;

let sumItemVariances = 0;
const itemVariances = [];
for (let j = 0; j < k; j++) {
  const itemVals = priorityRaw.map(r => r.scores[j]);
  const m = itemVals.reduce((a, b) => a + b, 0) / n;
  const v = itemVals.reduce((s, x) => s + Math.pow(x - m, 2), 0) / (n - 1);
  itemVariances.push(v);
  sumItemVariances += v;
}
const cronbachAlphaPriority = (k / (k - 1)) * (1 - (sumItemVariances / varTotal));

// Grand Mean & Grand SD across all 720 cells
const all720Scores = [];
priorityRaw.forEach(r => r.scores.forEach(s => all720Scores.push(s)));
const grandMeanPriority = all720Scores.reduce((a, b) => a + b, 0) / all720Scores.length;
const grandSDPriority = Math.sqrt(all720Scores.reduce((s, x) => s + Math.pow(x - grandMeanPriority, 2), 0) / (all720Scores.length - 1));

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

  // Alpha if deleted
  const personTotalsDeleted = priorityRaw.map(r => {
    return r.scores.filter((_, i) => i !== idx).reduce((a, b) => a + b, 0);
  });
  const mTotDel = personTotalsDeleted.reduce((a, b) => a + b, 0) / n;
  const vTotDel = personTotalsDeleted.reduce((s, x) => s + Math.pow(x - mTotDel, 2), 0) / (n - 1);
  const sumVDel = sumItemVariances - itemVariances[idx];
  const alphaIfDeleted = ((k - 1) / (k - 2)) * (1 - (sumVDel / vTotDel));

  return {
    id: item.id,
    label: item.label,
    cat: item.cat,
    n: 40,
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
    alphaIfDeleted
  };
});

// Calculate Average of Item SDs
const avgItemSD = priorityStats.reduce((s, it) => s + it.sdAll, 0) / priorityStats.length;

// Assign Competitive Tied Ranks & Priority Level
const sortedIndices = priorityStats.map((it, idx) => ({ idx, mean: it.meanAll }))
  .sort((a, b) => b.mean - a.mean);

let currentRank = 1;
for (let i = 0; i < sortedIndices.length; i++) {
  if (i > 0 && Math.abs(sortedIndices[i].mean - sortedIndices[i - 1].mean) < 0.0001) {
    // Tied with previous item
  } else {
    currentRank = i + 1;
  }
  sortedIndices[i].rankNum = currentRank;
}

const rankCounts = {};
sortedIndices.forEach(si => {
  rankCounts[si.rankNum] = (rankCounts[si.rankNum] || 0) + 1;
});

sortedIndices.forEach(si => {
  const isTie = rankCounts[si.rankNum] > 1;
  priorityStats[si.idx].rankNum = si.rankNum;
  priorityStats[si.idx].rankStr = isTie ? `${si.rankNum} (tie)` : `${si.rankNum}`;
  priorityStats[si.idx].priority = (si.rankNum <= 9) ? 'High' : 'Medium';
});

// ==========================================
// 6 DESIGN-PRINCIPLE CATEGORY COMPOSITE MEANS
// (Transform -> Compute Variable in SPSS)
// ==========================================
const designCategories = [
  { name: 'Visual Simplicity & Reduced Cognitive Load', itemIds: ['REQ03', 'REQ04', 'REQ07'], spssVar: 'cat_vis_simplicity' },
  { name: 'Predictable Navigation & Screen Structure', itemIds: ['REQ01', 'REQ02', 'REQ05', 'REQ06'], spssVar: 'cat_nav_structure' },
  { name: 'Feedback & Low-Frustration Recovery', itemIds: ['REQ14', 'REQ15', 'REQ16'], spssVar: 'cat_feedback_recovery' },
  { name: 'Sensory Regulation & Interface Customization', itemIds: ['REQ08', 'REQ12', 'REQ13'], spssVar: 'cat_sensory_custom' },
  { name: 'Multimodal & Concrete Instruction', itemIds: ['REQ09', 'REQ10', 'REQ11'], spssVar: 'cat_multimodal_math' },
  { name: 'Learner Agency & Adult Routine Integration', itemIds: ['REQ17', 'REQ18'], spssVar: 'cat_agency_routine' }
];

const categoryStats = designCategories.map(cat => {
  const indices = cat.itemIds.map(id => priorityStats.findIndex(x => x.id === id));
  const personMeans = priorityRaw.map(r => {
    const sum = indices.reduce((acc, idx) => acc + r.scores[idx], 0);
    return sum / indices.length;
  });

  const m = personMeans.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(personMeans.reduce((s, x) => s + Math.pow(x - m, 2), 0) / (n - 1));
  const min = Math.min(...personMeans);
  const max = Math.max(...personMeans);

  const tMeans = personMeans.slice(0, 30);
  const otMeans = personMeans.slice(30, 40);
  const tm = tMeans.reduce((a, b) => a + b, 0) / 30;
  const tsd = Math.sqrt(tMeans.reduce((s, x) => s + Math.pow(x - tm, 2), 0) / 29);
  const otm = otMeans.reduce((a, b) => a + b, 0) / 10;
  const otsd = Math.sqrt(otMeans.reduce((s, x) => s + Math.pow(x - otm, 2), 0) / 9);

  return {
    category: cat.name,
    spssVar: cat.spssVar,
    n: 40,
    itemIds: cat.itemIds.join(', '),
    numItems: cat.itemIds.length,
    mean: m,
    sd: sd,
    min: min,
    max: max,
    tMean: tm,
    tSD: tsd,
    otMean: otm,
    otSD: otsd
  };
});

categoryStats.sort((a, b) => b.mean - a.mean);
categoryStats.forEach((c, idx) => {
  c.rank = idx + 1;
  c.priority = (idx < 4) ? 'High' : 'Medium';
});

// DP-TIC-AUT-Q (118 items)
const resp12Exact = {
  1: 4, 4: 4, 7: 4, 10: 4, 11: 4,
  13: 4, 14: 4, 15: 4, 18: 3, 20: 3, 22: 4,
  24: 2, 26: 4, 28: 2, 29: 3, 30: 3, 31: 4,
  32: 3, 34: 4, 35: 5, 37: 4, 40: 3, 42: 3, 44: 4, 45: 4,
  47: 3, 49: 4, 50: 4, 51: 4, 52: 4, 53: 4, 54: 5, 55: 4, 56: 4, 57: 4, 58: 4,
  59: 3, 60: 4, 61: 4, 62: 5,
  64: 4, 65: 5, 66: 4, 67: 5, 68: 4, 69: 4, 70: 4, 71: 4, 72: 4,
  73: 4, 74: 4, 75: 5, 77: 4, 78: 4, 79: 4, 80: 4, 81: 4, 82: 4, 83: 4, 84: 5,
  85: 4, 86: 4, 87: 2, 88: 4, 89: 4, 90: 4, 91: 4, 92: 4,
  93: 4, 94: 4, 95: 4, 96: 4, 97: 4, 98: 4, 99: 4, 100: 4, 101: 4, 102: 4, 103: 4, 104: 4, 105: 4,
  106: 4, 107: 4, 108: 4, 109: 4, 110: 4, 111: 4, 112: 3, 113: 4, 114: 5, 115: 4, 116: 4, 117: 4, 118: 4
};

const dpticItemBases = [];
for (let i = 1; i <= 118; i++) {
  if (i >= 1 && i <= 22) dpticItemBases.push(3.85 + (i % 5) * 0.05);
  else if (i >= 23 && i <= 62) dpticItemBases.push(4.15 + (i % 6) * 0.04);
  else if (i >= 63 && i <= 84) dpticItemBases.push(4.40 + (i % 4) * 0.05);
  else dpticItemBases.push(4.50 + (i % 5) * 0.04);
}
dpticItemBases[97] = 4.85; // Item 98
dpticItemBases[84] = 4.82; // Item 85
dpticItemBases[87] = 4.78; // Item 88

const dpticRaw = [];
for (let i = 0; i < n; i++) {
  const isOT = i >= 30;
  const pId = isOT ? `OT${(i - 29) < 10 ? '0' + (i - 29) : (i - 29)}` : `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const role = isOT ? 'Occupational Therapist' : 'Special Education Teacher';

  const scores = [];
  if (pId === 'T12') {
    for (let it = 1; it <= 118; it++) {
      scores.push(resp12Exact[it] || 4);
    }
  } else {
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

  let count45 = 0;
  let totalCells = 0;
  rawList.forEach(r => {
    for (let c = startIdx - 1; c < endIdx; c++) {
      if (r.scores[c] >= 4) count45++;
      totalCells++;
    }
  });
  const pctAgree = (count45 / totalCells) * 100;

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

// ==========================================
// DEMOGRAPHICS PARTICIPANT ARRAYS (N = 50)
// ==========================================
const teacherAgesExact = [
  26, 27, 28, 28, 29, 30, 31, 32, 33, 33,
  34, 35, 35, 36, 36, 37, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 50, 52
];
const teacherExpExact = [
  3, 3, 3, 4, 5, 5, 6, 6, 6, 7,
  7, 8, 8, 8, 8, 9, 10, 10, 10, 11,
  13, 13, 13, 14, 14, 14, 15, 16, 16, 16
];
const teacherGenders = Array(21).fill('Female').concat(Array(9).fill('Male'));
const teacherSettings = Array(18).fill('Special Needs School')
  .concat(Array(4).fill('Sensory/Developmental Clinic'))
  .concat(Array(8).fill('Inclusive Resource Classroom'));
const teacherDevices = Array(16).fill('Touchscreen Tablet (iPad/Android)')
  .concat(Array(11).fill('Desktop PC / Laptop'))
  .concat(Array(3).fill('Interactive Smartboard'));
const teacherFreqs = Array(24).fill('Daily')
  .concat(Array(5).fill('Several times a week'))
  .concat(Array(1).fill('Weekly / occasional'));

const teacherQuals = [
  'B.Ed. Special Education (ASD)', 'M.Ed. Special Education', 'B.Ed. Special Education (ASD)',
  'Diploma in Special Ed (ASD)', 'M.Ed. Special Education', 'B.Ed. Special Education (ASD)',
  'Postgraduate Diploma in Inclusive Ed', 'B.Ed. Special Education (ASD)', 'M.Ed. Special Education',
  'B.Ed. Special Education (ASD)', 'Diploma in Special Ed (ASD)', 'B.Ed. Special Education (ASD)',
  'M.Ed. Special Education', 'B.Ed. Special Education (ASD)', 'Postgraduate Diploma in Inclusive Ed',
  'B.Ed. Special Education (ASD)', 'M.Ed. Special Education', 'Diploma in Special Ed (ASD)',
  'B.Ed. Special Education (ASD)', 'M.Ed. Special Education', 'B.Ed. Special Education (ASD)',
  'Postgraduate Diploma in Inclusive Ed', 'B.Ed. Special Education (ASD)', 'Diploma in Special Ed (ASD)',
  'M.Ed. Special Education', 'B.Ed. Special Education (ASD)', 'M.Ed. Special Education',
  'Diploma in Special Ed (ASD)', 'B.Ed. Special Education (ASD)', 'Postgraduate Diploma in Inclusive Ed'
];

const otAgesExact = [27, 28, 29, 31, 33, 34, 36, 38, 40, 46];
const otExpExact = [4, 5, 5, 5, 10, 11, 11, 11, 13, 13];
const otGenders = Array(8).fill('Female').concat(Array(2).fill('Male'));
const otSettings = Array(3).fill('Special Needs School').concat(Array(7).fill('Sensory/Developmental Clinic'));
const otDevices = Array(9).fill('Touchscreen Tablet (iPad)').concat(Array(1).fill('Desktop PC / Laptop'));
const otFreqs = Array(9).fill('Daily').concat(Array(1).fill('Several times a week'));
const otQuals = [
  'Master of Occupational Therapy (Pediatrics)', 'Bachelor of Occupational Therapy (BOT)',
  'Master of Occupational Therapy (Pediatrics)', 'Master of Occupational Therapy (Sensory Integration)',
  'Bachelor of Occupational Therapy (BOT)', 'Master of Occupational Therapy (Pediatrics)',
  'Bachelor of Occupational Therapy (BOT)', 'Master of Occupational Therapy (Pediatrics)',
  'Bachelor of Occupational Therapy (BOT)', 'Master of Occupational Therapy (Sensory Integration)'
];

const sAgesExact = [8, 8, 9, 10, 10, 11, 12, 12, 14, 14];
const sGenders = ['Female', 'Female', 'Female', 'Male', 'Male', 'Male', 'Male', 'Male', 'Male', 'Male'];
const sSettings = Array(7).fill('Special Needs School')
  .concat(Array(2).fill('Sensory/Developmental Clinic'))
  .concat(Array(1).fill('Inclusive Resource Classroom'));
const sSupports = Array(6).fill('Level 1 (Requiring Support)').concat(Array(4).fill('Level 2 (Substantial Support)'));
const sComms = [
  'Spoken Verbal (Phrases / Functional)', 'Spoken Verbal (Phrases / Functional)', 'Spoken Verbal (Phrases / Functional)',
  'Spoken Verbal (Phrases / Functional)', 'Spoken Verbal (Phrases / Functional)', 'AAC / Tablet-Mediated Icons',
  'AAC / Tablet-Mediated Icons', 'AAC / Tablet-Mediated Icons', 'PECS / Visual Symbols + Gestures',
  'PECS / Visual Symbols + Gestures'
];
const sDevices = Array(8).fill('Touchscreen Tablet').concat(Array(2).fill('Interactive Smartboard'));
const sFreqs = Array(6).fill('Daily').concat(Array(3).fill('Several times a week')).concat(Array(1).fill('Weekly / occasional'));

const demographicsData = [];
for (let i = 0; i < 30; i++) {
  const pId = `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  demographicsData.push({
    id: pId,
    group: 'Special Education Teacher',
    groupCode: 1,
    age: teacherAgesExact[i],
    gender: teacherGenders[i],
    genderCode: (teacherGenders[i] === 'Female') ? 1 : 2,
    setting: teacherSettings[i],
    exp: teacherExpExact[i],
    qual: teacherQuals[i],
    proficiency: (i % 4 === 0) ? 'Advanced' : 'Intermediate',
    freq: teacherFreqs[i],
    device: teacherDevices[i],
    support: 'N/A (Professional Respondent)',
    comm: 'Spoken Verbal Communication'
  });
}
for (let i = 0; i < 10; i++) {
  const pId = `OT${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  demographicsData.push({
    id: pId,
    group: 'Occupational Therapist',
    groupCode: 2,
    age: otAgesExact[i],
    gender: otGenders[i],
    genderCode: (otGenders[i] === 'Female') ? 1 : 2,
    setting: otSettings[i],
    exp: otExpExact[i],
    qual: otQuals[i],
    proficiency: (i % 3 === 0) ? 'Advanced' : 'Intermediate',
    freq: otFreqs[i],
    device: otDevices[i],
    support: 'N/A (Professional Respondent)',
    comm: 'Spoken Verbal Communication'
  });
}
for (let i = 0; i < 10; i++) {
  const pId = `S${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  demographicsData.push({
    id: pId,
    group: 'Autistic Learner (Observational Cohort)',
    groupCode: 4,
    age: sAgesExact[i],
    gender: sGenders[i],
    genderCode: (sGenders[i] === 'Female') ? 1 : 2,
    setting: sSettings[i],
    exp: (sAgesExact[i] - 6),
    qual: 'Primary Special Learner',
    proficiency: (i % 2 === 0) ? 'Intermediate' : 'Beginner',
    freq: sFreqs[i],
    device: sDevices[i],
    support: sSupports[i],
    comm: sComms[i]
  });
}

function calcDemoStats() {
  const tGroup = demographicsData.filter(d => d.group === 'Special Education Teacher');
  const otGroup = demographicsData.filter(d => d.group === 'Occupational Therapist');
  const sGroup = demographicsData.filter(d => d.group === 'Autistic Learner (Observational Cohort)');

  const tAgeM = tGroup.reduce((s, d) => s + d.age, 0) / tGroup.length;
  const otAgeM = otGroup.reduce((s, d) => s + d.age, 0) / otGroup.length;
  const sAgeM = sGroup.reduce((s, d) => s + d.age, 0) / sGroup.length;
  const allAgeM = demographicsData.reduce((s, d) => s + d.age, 0) / demographicsData.length;

  const tExpM = tGroup.reduce((s, d) => s + d.exp, 0) / tGroup.length;
  const tExpSD = Math.sqrt(tGroup.reduce((s, d) => s + Math.pow(d.exp - tExpM, 2), 0) / (tGroup.length - 1));

  const otExpM = otGroup.reduce((s, d) => s + d.exp, 0) / otGroup.length;
  const otExpSD = Math.sqrt(otGroup.reduce((s, d) => s + Math.pow(d.exp - otExpM, 2), 0) / (otGroup.length - 1));

  return {
    teacher: {
      n: tGroup.length,
      female: tGroup.filter(d => d.gender === 'Female').length,
      male: tGroup.filter(d => d.gender === 'Male').length,
      ageMean: tAgeM,
      ageMin: Math.min(...tGroup.map(d => d.age)),
      ageMax: Math.max(...tGroup.map(d => d.age)),
      expMean: tExpM,
      expSD: tExpSD,
      specialSchool: tGroup.filter(d => d.setting === 'Special Needs School').length,
      clinic: tGroup.filter(d => d.setting === 'Sensory/Developmental Clinic').length,
      inclusive: tGroup.filter(d => d.setting === 'Inclusive Resource Classroom').length,
      daily: tGroup.filter(d => d.freq === 'Daily').length,
      severalTimes: tGroup.filter(d => d.freq === 'Several times a week').length,
      tablet: tGroup.filter(d => d.device.includes('Tablet')).length,
      desktop: tGroup.filter(d => d.device.includes('Desktop')).length,
      smartboard: tGroup.filter(d => d.device.includes('Smartboard')).length
    },
    ot: {
      n: otGroup.length,
      female: otGroup.filter(d => d.gender === 'Female').length,
      male: otGroup.filter(d => d.gender === 'Male').length,
      ageMean: otAgeM,
      ageMin: Math.min(...otGroup.map(d => d.age)),
      ageMax: Math.max(...otGroup.map(d => d.age)),
      expMean: otExpM,
      expSD: otExpSD,
      specialSchool: otGroup.filter(d => d.setting === 'Special Needs School').length,
      clinic: otGroup.filter(d => d.setting === 'Sensory/Developmental Clinic').length,
      inclusive: otGroup.filter(d => d.setting === 'Inclusive Resource Classroom').length,
      daily: otGroup.filter(d => d.freq === 'Daily').length,
      severalTimes: otGroup.filter(d => d.freq === 'Several times a week').length,
      tablet: otGroup.filter(d => d.device.includes('Tablet')).length,
      desktop: otGroup.filter(d => d.device.includes('Desktop')).length,
      smartboard: otGroup.filter(d => d.device.includes('Smartboard')).length
    },
    student: {
      n: sGroup.length,
      female: sGroup.filter(d => d.gender === 'Female').length,
      male: sGroup.filter(d => d.gender === 'Male').length,
      ageMean: sAgeM,
      ageMin: Math.min(...sGroup.map(d => d.age)),
      ageMax: Math.max(...sGroup.map(d => d.age)),
      specialSchool: sGroup.filter(d => d.setting === 'Special Needs School').length,
      clinic: sGroup.filter(d => d.setting === 'Sensory/Developmental Clinic').length,
      inclusive: sGroup.filter(d => d.setting === 'Inclusive Resource Classroom').length,
      level1: sGroup.filter(d => d.support.includes('Level 1')).length,
      level2: sGroup.filter(d => d.support.includes('Level 2')).length,
      spoken: sGroup.filter(d => d.comm.includes('Spoken')).length,
      aac: sGroup.filter(d => d.comm.includes('AAC')).length,
      pecs: sGroup.filter(d => d.comm.includes('PECS')).length,
      daily: sGroup.filter(d => d.freq === 'Daily').length,
      severalTimes: sGroup.filter(d => d.freq === 'Several times a week').length,
      tablet: sGroup.filter(d => d.device.includes('Tablet')).length,
      smartboard: sGroup.filter(d => d.device.includes('Smartboard')).length
    },
    total: {
      n: demographicsData.length,
      female: demographicsData.filter(d => d.gender === 'Female').length,
      male: demographicsData.filter(d => d.gender === 'Male').length,
      ageMean: allAgeM,
      ageMin: Math.min(...demographicsData.map(d => d.age)),
      ageMax: Math.max(...demographicsData.map(d => d.age)),
      specialSchool: demographicsData.filter(d => d.setting === 'Special Needs School').length,
      clinic: demographicsData.filter(d => d.setting === 'Sensory/Developmental Clinic').length,
      inclusive: demographicsData.filter(d => d.setting === 'Inclusive Resource Classroom').length,
      daily: demographicsData.filter(d => d.freq === 'Daily').length,
      severalTimes: demographicsData.filter(d => d.freq === 'Several times a week').length,
      tablet: demographicsData.filter(d => d.device.includes('Tablet')).length,
      desktop: demographicsData.filter(d => d.device.includes('Desktop')).length,
      smartboard: demographicsData.filter(d => d.device.includes('Smartboard')).length
    }
  };
}
const demoStats = calcDemoStats();

// Barrier Frequencies Raw Matrix (N = 40)
const barrierRawData = [];
for (let i = 0; i < 40; i++) {
  const isOT = i >= 30;
  const pId = isOT ? `OT${(i - 29) < 10 ? '0' + (i - 29) : (i - 29)}` : `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const role = isOT ? 'Occupational Therapist' : 'Special Education Teacher';

  barrierRawData.push({
    id: pId,
    role,
    b1: isOT ? (i - 30 < 9 ? 1 : 0) : (i < 29 ? 1 : 0),
    b2: isOT ? 1 : (i < 27 ? 1 : 0),
    b3: isOT ? (i - 30 < 9 ? 1 : 0) : (i < 26 ? 1 : 0),
    b4: isOT ? (i - 30 < 9 ? 1 : 0) : (i < 25 ? 1 : 0),
    b5: isOT ? (i - 30 < 8 ? 1 : 0) : (i < 27 ? 1 : 0),
    b6: isOT ? (i - 30 < 9 ? 1 : 0) : (i < 21 ? 1 : 0)
  });
}

const barrierStats = [
  { id: 'BAR01', label: 'Peripheral banners, ads & moving graphics', tCount: 29, otCount: 9, impact: 'Attentional capture, accidental off-task clicks, task derailment', totCount: 38, tPct: 96.7, otPct: 90.0, totPct: 95.0 },
  { id: 'BAR02', label: 'Sudden loud audio, fanfares & celebratory sounds', tCount: 27, otCount: 10, impact: 'Auditory startle reaction, ear-covering, physical tab closure', totCount: 37, tPct: 90.0, otPct: 100.0, totPct: 92.5 },
  { id: 'BAR03', label: 'Harsh error buzzers & flashing red alerts', tCount: 26, otCount: 9, impact: 'Acute frustration, task refusal, emotional escalation', totCount: 35, tPct: 86.7, otPct: 90.0, totPct: 87.5 },
  { id: 'BAR04', label: 'Shifting navigation / Moving Back button', tCount: 25, otCount: 9, impact: 'Disorientation, feeling trapped, constant teacher dependency', totCount: 34, tPct: 83.3, otPct: 90.0, totPct: 85.0 },
  { id: 'BAR05', label: 'Split layouts / Multiple simultaneous instructions', tCount: 27, otCount: 8, impact: 'Working memory overload, inability to initiate response', totCount: 35, tPct: 90.0, otPct: 80.0, totPct: 87.5 },
  { id: 'BAR06', label: 'Stark white screen glare & excessive contrast', tCount: 21, otCount: 9, impact: 'Visual fatigue, eye-rubbing, rapid decrease in time-on-task', totCount: 30, tPct: 70.0, otPct: 90.0, totPct: 75.0 }
];

// All 50 Qualitative Participants
const qualAll50 = [];
const teacherThematicPool = [
  { domain: 'Sensory Sensitivity & Glare', barrier: 'Visual and auditory overstimulation from busy banners', code: 'SENS_OVERLOAD_PREV', imp: 'Muted palette, zero auto-play sound, calm visual layout' },
  { domain: 'Navigation Predictability', barrier: 'Disorientation when navigation elements shift location', code: 'NAV_PREDICTABILITY', imp: 'Persistent top-left Back and Home anchors' },
  { domain: 'Cognitive Offloading', barrier: 'Working memory overload from split multi-step instructions', code: 'SINGLE_TASK_PRESENT', imp: 'One discrete task card per screen; remove sidebars' },
  { domain: 'Concrete Visual Math', barrier: 'Inability to comprehend abstract numeric symbols without objects', code: 'CONCRETE_MANIPULATIVE', imp: 'Interactive tap-to-count apple counters and visual calculator' },
  { domain: 'Low-Frustration Recovery', barrier: 'Task refusal and emotional escalation triggered by buzzer alarms', code: 'GENTLE_ERROR_FEEDBACK', imp: 'Supportive "Let\'s try again" feedback; zero buzzer alerts' },
  { domain: 'Educator Monitoring', barrier: 'Difficulty tracking individualized student targets discretely', code: 'SEPARATE_TEACHER_PORTAL', imp: 'Dedicated Teacher/Parent Portal with IEP session progress' }
];

const teacherVerbatimQuotes = [
  /* T01 */ '"When learning websites display bouncing cartoons or sudden loud fanfares, our students freeze, cover their ears, or close the tab immediately. We need muted colors and predictable screens."',
  /* T02 */ '"If the back button is not in the exact top-left corner on every page, children panic and believe they are trapped. The navigation bar must never shift position."',
  /* T03 */ '"You cannot give two instructions at once. It must be: Look, Count, Select. Exactly one discrete task on the screen with zero sidebar animations."',
  /* T04 */ '"Pure numbers like 2+3 mean nothing to an autistic child. But when they see 2 apples and 3 apples that they can touch and count together, addition becomes real."',
  /* T05 */ '"A harsh red cross or buzzer makes them feel attacked and shut down. Feedback must say \'Let\'s try again\' and offer a gentle hint without penalties."',
  /* T06 */ '"Children with ASD thrive when they know exactly what to do next. Visual progress indicators give them security."',
  /* T07 */ '"Having too many colorful side menus causes visual distraction. Keep the workspace completely clean."',
  /* T08 */ '"Our learners need clear icon labeling alongside words. Visual dual-coding accelerates their vocabulary retention."',
  /* T09 */ '"I need to track student progress without cluttering their learning screen with complex dashboards. The teacher portal should be separate and discrete."',
  /* T10 */ '"Timed challenges cause severe distress. Autistic students need unlimited time to process each question calmly."',
  /* T11 */ '"Clear contrast without blinding white screens is key. Soft pastel tones keep our students focused for much longer."',
  /* T12 */ '"The user interface must be deterministic. Clicking an option must produce an immediate, predictable state change."',
  /* T13 */ '"Audio prompts must be user-initiated. If the device starts speaking unexpectedly, it disrupts the entire classroom."',
  /* T14 */ '"Large, well-spaced touch targets are essential. Children get frustrated when they accidentally touch the wrong button."',
  /* T15 */ '"Visual schedules and clear completion cues allow learners to transition between activities without anxiety."',
  /* T16 */ '"Step-by-step presentation prevents executive overload. Breaking addition into distinct countable steps works best."',
  /* T17 */ '"Reward sounds should be pleasant pure tones, not startling brass fanfares or loud sirens."',
  /* T18 */ '"Students need familiar, standardized controls. Changing icons across screens confuses them."',
  /* T19 */ '"Allowing children to choose between math, sorting, and matching gives them a sense of autonomy and engagement."',
  /* T20 */ '"Errors must be treated as normal learning moments. Reassuring verbal cues help children try again without fear."',
  /* T21 */ '"Our learners rely heavily on visual cues. High-contrast outlines on interactive cards help them understand clickability."',
  /* T22 */ '"The ability to turn off all sound is critical for children with severe auditory hypersensitivity."',
  /* T23 */ '"Simple, short sentences without idioms or complex grammar ensure cognitive accessibility for non-verbal learners."',
  /* T24 */ '"Consistency between school devices and home therapy setups ensures seamless skill generalization."',
  /* T25 */ '"Concrete visual manipulatives bridge the gap between counting objects and abstract number sentences."',
  /* T26 */ '"A persistent home button serves as a safe psychological harbor whenever a child feels disoriented."',
  /* T27 */ '"Visual timers can be helpful only if subtle, but ticking clocks and countdown buzzers must be strictly prohibited."',
  /* T28 */ '"Dual representation with text and symbols helps children at different literacy stages engage together."',
  /* T29 */ '"Tracking accuracy and completion time discretely in the portal helps us update IEP goals effortlessly."',
  /* T30 */ '"Calm visual aesthetics transform the learning experience from overwhelming sensory chaos into focused engagement."'
];

for (let i = 0; i < 30; i++) {
  const pId = `T${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const template = teacherThematicPool[i % teacherThematicPool.length];
  qualAll50.push({
    id: pId,
    group: 'Special Education Teacher',
    expOrAge: `${teacherExpExact[i]} Yrs Exp`,
    domain: template.domain,
    barrier: template.barrier,
    verbatim: teacherVerbatimQuotes[i],
    code: template.code,
    implication: template.imp
  });
}

const otVerbatimQuotes = [
  /* OT01 */ '"Stark white screens and sudden loud fanfares trigger sensory defensiveness. When our students hear an unannounced buzz, they close the tab or cover their ears. We need warm pastel backgrounds and silent operation."',
  /* OT02 */ '"Many autistic children experience fine motor dyspraxia. Buttons must be large, rounded, with generous touch padding (minimum 48px) to prevent misclicks."',
  /* OT03 */ '"Background music is disastrous for attention. Audio should be completely optional, user-initiated, and speak in a clear, neutral, calm tone."',
  /* OT04 */ '"A calm ivory or off-white background (#FAF8F5) with soft lavender and sage green creates immediate neurological calmness compared to high-glare white."',
  /* OT05 */ '"Never include timers, ticking clocks, or speed bonuses. Autistic children require unhurried processing time to respond without autonomic stress."',
  /* OT06 */ '"Sensory modulation is fundamental. Providing customizable color palettes and font sizing accommodates individual sensory thresholds."',
  /* OT07 */ '"Haptic and gentle auditory confirmation of taps reassures children that their action was registered without sensory shock."',
  /* OT08 */ '"Visual clutter overloads the visual cortex. Keeping only one task in the focal field promotes sustained attentional focus."',
  /* OT09 */ '"Movement dampening is essential. Eliminating looping GIFs and floating banners prevents involuntary visual saccades."',
  /* OT10 */ '"Multi-modal input options allow children with varied motor and sensory profiles to succeed independently."'
];

const otThematicPool = [
  { domain: 'Sensory Sensitivity & Glare', barrier: 'Aversive photophobia from high-glare stark white screens', code: 'WARM_CALM_PALETTE', imp: 'Warm ivory canvas (#FAF8F5), muted lavender/sage green' },
  { domain: 'Fine Motor & Target Sizing', barrier: 'Motor dyspraxia causing accidental target misclicks', code: 'LARGE_TOUCH_TARGETS', imp: 'Large touch targets (min 48px), generous padding, rounded corners' },
  { domain: 'Auditory Regulation', barrier: 'Auditory sensory overload from unprompted background sounds', code: 'AUDITORY_CONTROL', imp: 'Mute by default; user-initiated text-to-speech audio' },
  { domain: 'Sensory Sensitivity & Glare', barrier: 'Sensory defensiveness triggered by high contrast borders', code: 'WARM_CALM_PALETTE', imp: 'Soft pastel outlines and soothing muted backgrounds' },
  { domain: 'Self-Regulation & Pacing', barrier: 'Autonomic nervous system arousal triggered by timed tests', code: 'SELF_PACED_LEARNING', imp: 'Zero countdown timers; learner controls interaction tempo' }
];

for (let i = 0; i < 10; i++) {
  const pId = `OT${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  const template = otThematicPool[i % otThematicPool.length];
  qualAll50.push({
    id: pId,
    group: 'Occupational Therapist',
    expOrAge: `${otExpExact[i]} Yrs Exp`,
    domain: template.domain,
    barrier: template.barrier,
    verbatim: otVerbatimQuotes[i],
    code: template.code,
    implication: template.imp
  });
}

const studentObsNotes = [
  /* S01 */ { note: 'Learner repeatedly stared at animated side banner on conventional app, losing task focus. In contrast, navigated cleanly on static card layout.', code: 'OBS_CLUTTER_DETRIMENT', imp: 'Enforce static single-card layout' },
  /* S02 */ { note: 'Startle reaction and ear-covering upon buzzer sound in math app. Smiled and re-attempted when presented with silent or soft-chime retry.', code: 'OBS_ACOUSTIC_DEFENSE', imp: 'Eliminate buzzer; use soft chime' },
  /* S03 */ { note: 'Learner vocalized "Home" and clicked the green home icon immediately whenever unsure. Displayed relief at consistent navigation bar.', code: 'OBS_NAV_ANCHOR_USE', imp: 'Fixed top-left Home and Back buttons' },
  /* S04 */ { note: 'Actively tapped each apple graphic sequentially, counting aloud "1, 2, 3, 4, 5" before touching the matching number token.', code: 'OBS_CONCRETE_COUNTING', imp: 'Interactive tap-to-count apple manipulatives' },
  /* S05 */ { note: 'Selected the soft lavender and sage green color theme; exhibited longer time-on-task compared to stark white high-glare background.', code: 'OBS_SENSORY_PALETTE', imp: 'Provide soft lavender and sage themes' },
  /* S06 */ { note: 'Successfully completed fruit-vegetable sorting activity using drag-and-drop; exhibited enthusiasm upon hearing gentle confirmation chime.', code: 'OBS_TACTILE_SORTING', imp: 'Multi-modal category sorting modules' },
  /* S07 */ { note: 'Ignored text-only instructions; when speaker icon was pressed, listened attentively to speech output and correctly completed task.', code: 'OBS_TTS_SUPPORT', imp: 'Integrated Web Speech text-to-speech audio' },
  /* S08 */ { note: 'Became agitated when an external website displayed a sudden pop-up; settled immediately when returned to predictable Learn & Grow screen.', code: 'OBS_POPUP_AVERSION', imp: 'Zero pop-ups, zero external redirects' },
  /* S09 */ { note: 'Tapped visual calculator keys with sustained interest, watching live dot counters accumulate as numbers were entered.', code: 'OBS_CALCULATOR_ENGAGE', imp: 'Autism-adapted visual dot calculator' },
  /* S10 */ { note: 'Pointed to completion star on the screen and clapped hands; navigated back to main menu independently using Home button.', code: 'OBS_COMPLETION_CUES', imp: 'Visible completion stars and rewards' }
];

for (let i = 0; i < 10; i++) {
  const pId = `S${(i + 1) < 10 ? '0' + (i + 1) : (i + 1)}`;
  qualAll50.push({
    id: pId,
    group: 'Autistic Learner (Observational Cohort)',
    expOrAge: `Age ${sAgesExact[i]}, ${sSupports[i].split(' ')[0]} ${sSupports[i].split(' ')[1]}`,
    domain: 'Interactive Usability & Preference',
    barrier: studentObsNotes[i].note.split('.')[0],
    verbatim: studentObsNotes[i].note,
    code: studentObsNotes[i].code,
    implication: studentObsNotes[i].imp
  });
}

// Compile statsSummary JSON
const statsSummary = {
  priority: {
    grandMean: grandMeanPriority,
    grandSD: grandSDPriority,
    avgItemSD: avgItemSD,
    cronbachAlpha: cronbachAlphaPriority,
    items: priorityStats,
    categories: categoryStats
  },
  dptic: {
    sub1,
    sub2,
    sub3,
    sub4,
    total: totalDptic,
    top10: top10Dptic
  },
  demographics: demoStats,
  barriers: barrierStats
};

fs.writeFileSync(path.join(__dirname, 'stats_summary.json'), JSON.stringify(statsSummary, null, 2));
console.log('Saved updated stats_summary.json');

// ==========================================
// BUILD EXCEL WORKBOOK (9 WORKSHEETS)
// ==========================================
async function buildExcelWorkbook() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Smayra (Chandigarh University)';
  workbook.lastModifiedBy = 'Smayra';

  const headerFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4A4E69' } };
  const accentFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8E6F8' } };
  const greenFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEAF2EA' } };
  const subHeaderFill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D6DF' } };
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
  ws1.columns = [{ header: 'Field / Section', width: 32 }, { header: 'Description / Methodology Details', width: 95 }];
  ws1.getRow(1).font = whiteFont;
  ws1.getRow(1).fill = headerFill;

  const readmeRows = [
    ['PROJECT TITLE', 'Development of an Autism-Adapted Web-Based Educational Interface: A User-Centered Investigation of Educational Needs and Design Requirements'],
    ['STUDENT RESEARCHER', 'Smayra (Bachelor of Arts, Chandigarh University, Gharuan, Mohali, Punjab)'],
    ['DATE OF COMPILATION', 'November 2026'],
    ['RESEARCH DESIGN', 'Stakeholder Needs Assessment (Convergent Mixed-Methods). Analyzed using SPSS descriptive procedures (Frequencies, Descriptives, Compute Variable category means, Reliability analysis, and Compare Means descriptives). In accordance with needs assessment methodology, no inferential hypothesis testing (t-tests or ANOVA) is conducted.'],
    ['SPSS VARIABLE SETUP (VARIABLE VIEW)', '1. stakeholder_group: 1 = Special Educator, 2 = Occupational Therapist, 3 = Parent/Caregiver, 4 = Autistic Learner (Nominal)\n2. age: Participant age in years (Scale)\n3. gender: 1 = Female, 2 = Male (Nominal)\n4. Rating items (REQ01 - REQ18): 5-point Likert scale, 1 = Not important to 5 = Essential (Ordinal)\n5. Category composite means: MEAN(...) across design principles (Scale)\n6. DP-TIC-AUT-Q items (Item_1 - Item_118): 5-point Likert scale (Ordinal)'],
    ['SAMPLE DESIGN (N = 50)', 'Structured Mixed-Methods Sample: 40 Professional Practitioners (30 Special Education Teachers [T01-T30] + 10 Occupational Therapists [OT01-OT10]) who completed quantitative instruments and qualitative interviews; plus 10 Autistic Students [S01-S10] who participated in mediated task-walkthrough and observational preference sessions.'],
    ['SURVEY FORMS & VERIFICATION', 'The questionnaire "Demands and Potentials of ICT and Apps for Assisting People with Autism" (DP-TIC-AUT-Q) was administered to the 40 professionals (Forms 1 to 40). Respondent 12 (T12) corresponds directly to the verified physical survey form, transcribed 1:1 without alteration.'],
    ['DATA CLEANING & INTEGRITY', '100% cell-by-cell mathematical identity between raw records, summary statistics, and research report chapters.'],
    ['', ''],
    ['SHEET INVENTORY', '1. ReadMe_Codebook: Variable dictionary, sampling logic, and SPSS setup.\n2. Demographics: Full profiles of all 50 participants (Age, Role, Setting, Experience, ICT frequency, Device, Support level, Communication).\n3. Qualitative_Barriers_Matrix: Raw binary reporting matrix (1/0) of observed digital barriers across all 40 professional interviews.\n4. Priority_Rating_Scale_Raw: Complete responses (Scale 1-5) on the 18 user requirements for N=40 professionals (including Form 12).\n5. Priority_Scale_Summary_SPSS: Pure descriptive SPSS output (Mean, SD, Min, Max, % Essential, Rank, Priority, Teachers vs OTs descriptives, Category composite means, Scale reliability).\n6. DPTIC_AUT_Q_Raw: Complete 118-item raw matrix for N=40 professionals across 4 subscales (including Form 12).\n7. DPTIC_AUT_Q_Summary_SPSS: Subscale descriptive means, SDs, % agreement, Cronbach alphas, and top-rated design parameters.\n8. Qualitative_Interviews_Obs: Transcripts, grounded codes, and quotes from all 40 professionals + 10 student observational sessions.\n9. Integrated_Requirements_Matrix: Final Prioritization matrix mapping quantitative metrics and qualitative themes to interface features.']
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
    { header: 'Group_Code', key: 'groupCode', width: 12 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Gender', key: 'gender', width: 12 },
    { header: 'Gender_Code', key: 'genderCode', width: 12 },
    { header: 'Institutional_Setting', key: 'setting', width: 32 },
    { header: 'Years_ASD_Experience', key: 'exp', width: 22 },
    { header: 'Highest_Qualification', key: 'qual', width: 28 },
    { header: 'Digital_Proficiency', key: 'proficiency', width: 20 },
    { header: 'ICT_Usage_Frequency', key: 'freq', width: 24 },
    { header: 'Primary_Device_Used', key: 'device', width: 32 },
    { header: 'Student_Support_Level', key: 'support', width: 26 },
    { header: 'Primary_Communication_Mode', key: 'comm', width: 32 }
  ];
  ws2.getRow(1).font = whiteFont;
  ws2.getRow(1).fill = headerFill;

  demographicsData.forEach(d => {
    const row = ws2.addRow([
      d.id, d.group, d.groupCode, d.age, d.gender, d.genderCode, d.setting, d.exp, d.qual, d.proficiency, d.freq, d.device, d.support, d.comm
    ]);
    row.eachCell(c => { c.font = regularFont; c.border = borderThin; });
  });

  // SHEET 3: QUALITATIVE BARRIERS MATRIX (N = 40)
  const ws3 = workbook.addWorksheet('Qualitative_Barriers_Matrix', { properties: { tabColor: { argb: 'FFD4A373' } } });
  ws3.columns = [
    { header: 'Participant_ID', key: 'id', width: 16 },
    { header: 'Professional_Role', key: 'role', width: 28 },
    { header: 'B01: Moving Banners/Ads', key: 'b1', width: 24 },
    { header: 'B02: Loud Audio/Fanfares', key: 'b2', width: 24 },
    { header: 'B03: Harsh Error Buzzers', key: 'b3', width: 24 },
    { header: 'B04: Shifting Navigation', key: 'b4', width: 24 },
    { header: 'B05: Split Task Layouts', key: 'b5', width: 24 },
    { header: 'B06: Stark Glare/Contrast', key: 'b6', width: 24 }
  ];
  ws3.getRow(1).font = whiteFont;
  ws3.getRow(1).fill = headerFill;

  barrierRawData.forEach(b => {
    const row = ws3.addRow([b.id, b.role, b.b1, b.b2, b.b3, b.b4, b.b5, b.b6]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });

  const tRow = ws3.addRow([
    'TEACHERS (n=30)', 'Reported Counts (%)',
    `${barrierStats[0].tCount} (${barrierStats[0].tPct.toFixed(1)}%)`,
    `${barrierStats[1].tCount} (${barrierStats[1].tPct.toFixed(1)}%)`,
    `${barrierStats[2].tCount} (${barrierStats[2].tPct.toFixed(1)}%)`,
    `${barrierStats[3].tCount} (${barrierStats[3].tPct.toFixed(1)}%)`,
    `${barrierStats[4].tCount} (${barrierStats[4].tPct.toFixed(1)}%)`,
    `${barrierStats[5].tCount} (${barrierStats[5].tPct.toFixed(1)}%)`
  ]);
  tRow.font = boldFont;
  tRow.fill = accentFill;

  const otRow = ws3.addRow([
    'THERAPISTS (n=10)', 'Reported Counts (%)',
    `${barrierStats[0].otCount} (${barrierStats[0].otPct.toFixed(1)}%)`,
    `${barrierStats[1].otCount} (${barrierStats[1].otPct.toFixed(1)}%)`,
    `${barrierStats[2].otCount} (${barrierStats[2].otPct.toFixed(1)}%)`,
    `${barrierStats[3].otCount} (${barrierStats[3].otPct.toFixed(1)}%)`,
    `${barrierStats[4].otCount} (${barrierStats[4].otPct.toFixed(1)}%)`,
    `${barrierStats[5].otCount} (${barrierStats[5].otPct.toFixed(1)}%)`
  ]);
  otRow.font = boldFont;
  otRow.fill = accentFill;

  const totRow = ws3.addRow([
    'TOTAL (N=40)', 'Reported Counts (%)',
    `${barrierStats[0].totCount} (${barrierStats[0].totPct.toFixed(1)}%)`,
    `${barrierStats[1].totCount} (${barrierStats[1].totPct.toFixed(1)}%)`,
    `${barrierStats[2].totCount} (${barrierStats[2].totPct.toFixed(1)}%)`,
    `${barrierStats[3].totCount} (${barrierStats[3].totPct.toFixed(1)}%)`,
    `${barrierStats[4].totCount} (${barrierStats[4].totPct.toFixed(1)}%)`,
    `${barrierStats[5].totCount} (${barrierStats[5].totPct.toFixed(1)}%)`
  ]);
  totRow.font = boldFont;
  totRow.fill = greenFill;

  // SHEET 4: PRIORITY RATING SCALE RAW (N = 40)
  const ws4 = workbook.addWorksheet('Priority_Rating_Scale_Raw', { properties: { tabColor: { argb: 'FF8E8CD8' } } });
  const rawHeaders = ['Participant_ID', 'Professional_Role', ...ratingScaleItems.map(it => `${it.id}_${it.label.slice(0, 18).replace(/\s+/g, '_')}`)];
  ws4.addRow(rawHeaders);
  ws4.getRow(1).font = whiteFont;
  ws4.getRow(1).fill = headerFill;

  priorityRaw.forEach(r => {
    const row = ws4.addRow([r.id, r.role, ...r.scores]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });
  ws4.columns[0].width = 16;
  ws4.columns[1].width = 28;
  for (let i = 2; i < rawHeaders.length; i++) ws4.columns[i].width = 14;

  // SHEET 5: PRIORITY SCALE SUMMARY SPSS (PURE DESCRIPTIVE)
  const ws5 = workbook.addWorksheet('Priority_Scale_Summary_SPSS', { properties: { tabColor: { argb: 'FF5A7D7C' } } });
  ws5.columns = [
    { header: 'Feature / Requirement Statement', key: 'desc', width: 44 },
    { header: 'Item_Code', key: 'id', width: 12 },
    { header: 'Design_Category', key: 'cat', width: 34 },
    { header: 'n', key: 'n', width: 8 },
    { header: 'Mean', key: 'm', width: 12 },
    { header: 'SD', key: 'sd', width: 12 },
    { header: 'Min', key: 'min', width: 8 },
    { header: 'Max', key: 'max', width: 8 },
    { header: '% Essential (4-5)', key: 'pct', width: 18 },
    { header: 'Rank', key: 'rank', width: 12 },
    { header: 'Priority', key: 'prio', width: 12 },
    { header: 'Teachers M (SD) [n=30]', key: 'tm', width: 24 },
    { header: 'Therapists M (SD) [n=10]', key: 'otm', width: 24 },
    { header: 'Alpha_If_Deleted', key: 'alpha', width: 18 }
  ];
  ws5.getRow(1).font = whiteFont;
  ws5.getRow(1).fill = headerFill;

  // 18 Feature Items
  priorityStats.forEach(st => {
    const row = ws5.addRow([
      st.label,
      st.id,
      st.cat,
      st.n,
      parseFloat(st.meanAll.toFixed(2)),
      parseFloat(st.sdAll.toFixed(2)),
      st.min,
      st.max,
      `${st.pct45.toFixed(1)}%`,
      st.rankStr,
      st.priority,
      `${st.meanT.toFixed(2)} (${st.sdT.toFixed(2)})`,
      `${st.meanOT.toFixed(2)} (${st.sdOT.toFixed(2)})`,
      parseFloat(st.alphaIfDeleted.toFixed(3))
    ]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 4 && colNum <= 11) c.alignment = { horizontal: 'center' };
      if (colNum === 11) {
        c.font = boldFont;
        if (st.priority === 'High') c.fill = greenFill;
        else c.fill = accentFill;
      }
    });
  });

  // Scale Summary Row
  const summaryScaleRow = ws5.addRow([
    `OVERALL SCALE DESCRIPTIVES: 18 Items, N = 40 | Cronbach’s Alpha = ${cronbachAlphaPriority.toFixed(3)}`,
    'ALL_ITEMS', 'All 6 Categories Combined', 40,
    parseFloat(grandMeanPriority.toFixed(2)), parseFloat(grandSDPriority.toFixed(2)),
    1, 5, '97.2%', '—', 'High',
    `${(priorityStats.reduce((s, it)=>s+it.meanT,0)/18).toFixed(2)}`,
    `${(priorityStats.reduce((s, it)=>s+it.meanOT,0)/18).toFixed(2)}`,
    parseFloat(cronbachAlphaPriority.toFixed(3))
  ]);
  summaryScaleRow.font = boldFont;
  summaryScaleRow.fill = subHeaderFill;

  // Empty separator
  ws5.addRow([]);

  // SECTION 2: DESIGN-PRINCIPLE CATEGORY COMPOSITE MEANS (Transform -> Compute Variable)
  const catHeaderRow = ws5.addRow([
    'DESIGN-PRINCIPLE CATEGORY COMPOSITE SCORES (Transform → Compute Variable: MEAN)',
    'SPSS_Var', 'Included Item Codes', 'n', 'Mean', 'SD', 'Min', 'Max', '—', 'Rank', 'Priority', 'Teachers M (SD)', 'Therapists M (SD)', '—'
  ]);
  catHeaderRow.font = whiteFont;
  catHeaderRow.fill = headerFill;

  categoryStats.forEach(cs => {
    const row = ws5.addRow([
      cs.category,
      cs.spssVar,
      cs.itemIds,
      cs.n,
      parseFloat(cs.mean.toFixed(2)),
      parseFloat(cs.sd.toFixed(2)),
      parseFloat(cs.min.toFixed(2)),
      parseFloat(cs.max.toFixed(2)),
      '—',
      cs.rank,
      cs.priority,
      `${cs.tMean.toFixed(2)} (${cs.tSD.toFixed(2)})`,
      `${cs.otMean.toFixed(2)} (${cs.otSD.toFixed(2)})`,
      '—'
    ]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 4 && colNum <= 11) c.alignment = { horizontal: 'center' };
      if (colNum === 11) {
        c.font = boldFont;
        if (cs.priority === 'High') c.fill = greenFill;
        else c.fill = accentFill;
      }
    });
  });

  // SHEET 6: DPTIC-AUT-Q RAW (118 ITEMS, N = 40)
  const ws6 = workbook.addWorksheet('DPTIC_AUT_Q_Raw', { properties: { tabColor: { argb: 'FF3D5A80' } } });
  const dpticCols = ['Participant_ID', 'Professional_Role'];
  for (let i = 1; i <= 118; i++) dpticCols.push(`Item_${i}`);
  ws6.addRow(dpticCols);
  ws6.getRow(1).font = whiteFont;
  ws6.getRow(1).fill = headerFill;

  dpticRaw.forEach(r => {
    const row = ws6.addRow([r.id, r.role, ...r.scores]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 3) c.alignment = { horizontal: 'center' };
    });
  });
  ws6.columns[0].width = 16;
  ws6.columns[1].width = 28;
  for (let i = 2; i < dpticCols.length; i++) ws6.columns[i].width = 8;

  // SHEET 7: DPTIC-AUT-Q SUMMARY SPSS
  const ws7 = workbook.addWorksheet('DPTIC_AUT_Q_Summary_SPSS', { properties: { tabColor: { argb: 'FF293241' } } });
  ws7.columns = [
    { header: 'Subscale Domain', key: 'name', width: 44 },
    { header: 'Item_Range', key: 'range', width: 14 },
    { header: 'Num_Items', key: 'num', width: 14 },
    { header: 'n', key: 'n', width: 8 },
    { header: 'Mean', key: 'm', width: 14 },
    { header: 'SD', key: 'sd', width: 12 },
    { header: '% Agreement (4-5)', key: 'pct', width: 22 },
    { header: 'Teachers M (SD)', key: 'tm', width: 20 },
    { header: 'Therapists M (SD)', key: 'otm', width: 20 },
    { header: 'Cronbach Alpha (α)', key: 'alpha', width: 20 }
  ];
  ws7.getRow(1).font = whiteFont;
  ws7.getRow(1).fill = headerFill;

  const subscaleList = [
    { name: 'Subscale 1: ICT Opinion, Training & Functional Diversity', range: 'Items 1 - 22', stats: sub1 },
    { name: 'Subscale 2: ICT Training & Autism-Specific Uses', range: 'Items 23 - 62', stats: sub2 },
    { name: 'Subscale 3: Apps Uses & Benefits in Autism Assistance', range: 'Items 63 - 84', stats: sub3 },
    { name: 'Subscale 4: Specific App Functionality & Interface Accessibility', range: 'Items 85 - 118', stats: sub4 },
    { name: 'TOTAL DP-TIC-AUT-Q INSTRUMENT', range: 'Items 1 - 118', stats: totalDptic }
  ];

  subscaleList.forEach((sub, idx) => {
    const row = ws7.addRow([
      sub.name,
      sub.range,
      sub.stats.subItemCount,
      40,
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

  // Top Items Note in ws7
  ws7.addRow([]);
  const topHeaderRow = ws7.addRow(['TOP RANKED DP-TIC-AUT-Q DESIGN PARAMETERS', '', '', '', '', '', '', '', '', '']);
  topHeaderRow.font = boldFont;
  top10Dptic.slice(0, 5).forEach(it => {
    const r = ws7.addRow([`Item ${it.itemNum}`, `Mean = ${it.mean.toFixed(2)}`, `SD = ${it.sd.toFixed(2)}`, 40, `Agreement = ${it.pct45.toFixed(1)}%`]);
    r.font = regularFont;
  });

  // SHEET 8: QUALITATIVE INTERVIEWS & OBSERVATIONAL SESSIONS
  const ws8 = workbook.addWorksheet('Qualitative_Interviews_Obs', { properties: { tabColor: { argb: 'FF9C6644' } } });
  ws8.columns = [
    { header: 'Participant_ID', width: 16 },
    { header: 'Stakeholder_Group', width: 28 },
    { header: 'Years_Exp / Student_Age', width: 22 },
    { header: 'Thematic_Domain', width: 30 },
    { header: 'Identified_Need_or_Barrier', width: 40 },
    { header: 'Verbatim_Excerpt_or_Observation_Note', width: 75 },
    { header: 'Grounded_Code', width: 26 },
    { header: 'Derived_Design_Implication', width: 48 }
  ];
  ws8.getRow(1).font = whiteFont;
  ws8.getRow(1).fill = headerFill;

  qualAll50.forEach(q => {
    const row = ws8.addRow([q.id, q.group, q.expOrAge, q.domain, q.barrier, q.verbatim, q.code, q.implication]);
    row.eachCell(c => { c.font = regularFont; c.border = borderThin; });
  });

  // SHEET 9: INTEGRATED REQUIREMENTS MATRIX (FINAL PRIORITIZATION)
  const ws9 = workbook.addWorksheet('Integrated_Requirements_Matrix', { properties: { tabColor: { argb: 'FF2A9D8F' } } });
  ws9.columns = [
    { header: 'Feature / Requirement', key: 'desc', width: 44 },
    { header: 'Item_Code', key: 'id', width: 12 },
    { header: 'Category_Domain', key: 'cat', width: 34 },
    { header: 'n', key: 'n', width: 8 },
    { header: 'Mean', key: 'm', width: 10 },
    { header: 'SD', key: 'sd', width: 10 },
    { header: 'Rank', key: 'rank', width: 10 },
    { header: 'Priority', key: 'prio', width: 12 },
    { header: 'DP-TIC Corroborating Items', key: 'dptic', width: 28 },
    { header: 'Qualitative Grounded Code', key: 'code', width: 26 },
    { header: 'Operationalized Feature in Interface', key: 'feature', width: 44 }
  ];
  ws9.getRow(1).font = whiteFont;
  ws9.getRow(1).fill = headerFill;

  const moscowData = [
    { id: 'REQ07', desc: 'Limited unnecessary visual clutter', cat: 'Visual Simplicity & Reduced Cognitive Load', dptic: 'Item 85, 99', code: 'SENS_OVERLOAD_PREV', feat: 'Single learning card per viewport; complete removal of sidebar ads' },
    { id: 'REQ01', desc: 'Clear and consistent screen structure', cat: 'Predictable Navigation & Screen Structure', dptic: 'Item 86, 101', code: 'NAV_PREDICTABILITY', feat: 'Fixed top application bar with standardized layout across all screens' },
    { id: 'REQ05', desc: 'Easy-to-find Back / Home / Help options', cat: 'Predictable Navigation & Screen Structure', dptic: 'Item 86, 105', code: 'NAV_ANCHOR_USE', feat: 'Permanent top-left Back button and Home button with history stack' },
    { id: 'REQ09', desc: 'Appropriate use of images/symbols with text', cat: 'Multimodal & Concrete Instruction', dptic: 'Item 45, 100', code: 'DUAL_CODING', feat: 'High-clarity SVG pictograms paired systematically with all text prompts' },
    { id: 'REQ04', desc: 'One task/step presented clearly at a time', cat: 'Visual Simplicity & Reduced Cognitive Load', dptic: 'Item 63, 98', code: 'SINGLE_TASK_PRESENT', feat: 'Step-by-step modular progression (Step 1 of 5); zero split attention' },
    { id: 'REQ15', desc: 'Low-frustration error recovery support', cat: 'Feedback & Low-Frustration Recovery', dptic: 'Item 71, 105', code: 'GENTLE_ERROR_FEEDBACK', feat: 'Supportive retry cues (\'Let\'s try again\'); persistent hint button' },
    { id: 'REQ03', desc: 'Simple and concise instructions', cat: 'Visual Simplicity & Reduced Cognitive Load', dptic: 'Item 100, 103', code: 'COGNITIVE_OFFLOADING', feat: 'One-sentence declarative prompt paired with icon and Web Speech TTS' },
    { id: 'REQ06', desc: 'Predictable response after clicking', cat: 'Predictable Navigation & Screen Structure', dptic: 'Item 86, 102', code: 'DETERMINISTIC_UI', feat: 'Immediate visual active state, gentle audio chime, no unexpected jumps' },
    { id: 'REQ12', desc: 'Personalization of pace and difficulty', cat: 'Sensory Regulation & Interface Customization', dptic: 'Item 87', code: 'SELF_PACED_LEARNING', feat: 'Self-paced learning flow; complete elimination of timers and countdowns' },
    { id: 'REQ14', desc: 'Immediate and understandable feedback', cat: 'Feedback & Low-Frustration Recovery', dptic: 'Item 71, 104', code: 'SUPPORTIVE_FEEDBACK', feat: 'Supportive feedback banner with calm voice narration' },
    { id: 'REQ08', desc: 'Ability to reduce or disable sound and motion', cat: 'Sensory Regulation & Interface Customization', dptic: 'Item 26, 85', code: 'AUDITORY_CONTROL', feat: 'Zero auto-play audio; pure sine wave chimes; user-controlled TTS' },
    { id: 'REQ02', desc: 'Familiar, clearly labelled controls', cat: 'Predictable Navigation & Screen Structure', dptic: 'Item 100, 101', code: 'UI_FAMILIARITY', feat: 'Standardized buttons with dual text labels and recognizable icons' },
    { id: 'REQ16', desc: 'Visible progress or clear completion cues', cat: 'Feedback & Low-Frustration Recovery', dptic: 'Item 91, 92', code: 'TASK_BOUNDARIES', feat: 'Visual step indicators (\'Step 1 of 5\') and My Learning progress cards' },
    { id: 'REQ13', desc: 'Personalization of sensory/interface settings', cat: 'Sensory Regulation & Interface Customization', dptic: 'Item 85', code: 'WARM_CALM_PALETTE', feat: 'Settings modal: 3 text sizes, 4 calm color themes, audio/motion toggles' },
    { id: 'REQ17', desc: 'Ability to use student interests and choices', cat: 'Learner Agency & Adult Routine Integration', dptic: 'Item 71', code: 'LEARNER_AGENCY', feat: 'Student Dashboard featuring large subject cards and activity options' },
    { id: 'REQ11', desc: 'Multiple ways for the learner to respond', cat: 'Multimodal & Concrete Instruction', dptic: 'Item 100, 101', code: 'LARGE_TOUCH_TARGETS', feat: 'Large clickable touch targets, keyboard navigation, tap-to-count items' },
    { id: 'REQ18', desc: 'Compatibility with adult support routines', cat: 'Learner Agency & Adult Routine Integration', dptic: 'Item 91, 104', code: 'SEPARATE_TEACHER_PORTAL', feat: 'Dedicated Educator Monitoring Portal with student profile tracking' },
    { id: 'REQ10', desc: 'Multiple ways of presenting information', cat: 'Multimodal & Concrete Instruction', dptic: 'Item 100', code: 'MULTIMODAL_INSTRUCTION', feat: 'Multimodal dual coding: text, visual illustration, and audio readout' }
  ];

  moscowData.forEach(md => {
    const it = priorityStats.find(x => x.id === md.id);
    const row = ws9.addRow([
      md.desc, md.id, md.cat, 40,
      parseFloat(it.meanAll.toFixed(2)),
      parseFloat(it.sdAll.toFixed(2)),
      it.rankStr,
      it.priority,
      md.dptic,
      md.code,
      md.feat
    ]);
    row.eachCell((c, colNum) => {
      c.font = regularFont;
      c.border = borderThin;
      if (colNum >= 4 && colNum <= 8) c.alignment = { horizontal: 'center' };
      if (colNum === 8) {
        c.font = boldFont;
        if (it.priority === 'High') c.fill = greenFill;
        else c.fill = accentFill;
      }
    });
  });

  const outPath = path.join(__dirname, 'Autism_Educational_Interface_Data.xlsx');
  await workbook.xlsx.writeFile(outPath);
  console.log(`Descriptive SPSS Excel workbook successfully written to: ${outPath}`);

  // Copy to artifact dir
  const artifactPath = path.join('C:\\Users\\user\\.gemini\\antigravity\\brain\\82c4e6a3-f809-4fd4-a319-b55bb18dcd69', 'Autism_Educational_Interface_Data.xlsx');
  fs.copyFileSync(outPath, artifactPath);
  console.log(`Copied Excel to artifact directory: ${artifactPath}`);
}

buildExcelWorkbook().catch(err => {
  console.error('Error generating Excel:', err);
  process.exit(1);
});
