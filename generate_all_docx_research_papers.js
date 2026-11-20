const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  BorderStyle,
  WidthType,
  ShadingType,
  AlignmentType,
  UnderlineType,
} = docx;

const outputDir = 'D:\\research papers';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Import papers data from our previous script
const { papers } = require('./papers_data.js');

async function createDocxForPaper(paper) {
  const children = [];

  // 1. Journal Header
  children.push(
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 120 },
      children: [
        new TextRun({
          text: `${paper.journal.toUpperCase()} • VOL. ${paper.volume}, ISSUE ${paper.issue}, PP. ${paper.pages} (${paper.year})`,
          size: 18, // 9pt
          color: '475569',
          font: 'Arial',
          bold: true,
        }),
      ],
    })
  );

  // 2. Paper Title
  children.push(
    new Paragraph({
      spacing: { before: 120, after: 160 },
      children: [
        new TextRun({
          text: paper.title,
          size: 32, // 16pt
          bold: true,
          color: '0F172A',
          font: 'Calibri',
        }),
      ],
    })
  );

  // 3. Authors
  children.push(
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({
          text: paper.authors,
          size: 22, // 11pt
          italics: true,
          color: '334155',
          font: 'Calibri',
        }),
      ],
    })
  );

  // 4. Affiliations
  children.push(
    new Paragraph({
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: paper.affiliations,
          size: 19, // 9.5pt
          color: '64748B',
          font: 'Calibri',
        }),
      ],
    })
  );

  // 5. APA Citation & Metadata Box
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
                left: { style: BorderStyle.SINGLE, size: 16, color: '3B82F6' },
                right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
              },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: 'APA 7th Edition Reference & Metadata:',
                      bold: true,
                      size: 20,
                      color: '1E293B',
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: paper.apaCitation,
                      size: 19,
                      color: '334155',
                      font: 'Calibri',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'DOI: ',
                      bold: true,
                      size: 18,
                      color: '64748B',
                      font: 'Calibri',
                    }),
                    new TextRun({
                      text: paper.doi,
                      size: 18,
                      color: '2563EB',
                      underline: { type: UnderlineType.SINGLE },
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  children.push(new Paragraph({ spacing: { after: 180 } }));

  // 6. Abstract Box
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 4, color: 'C7D2FE' },
                bottom: { style: BorderStyle.SINGLE, size: 4, color: 'C7D2FE' },
                left: { style: BorderStyle.SINGLE, size: 20, color: '6366F1' },
                right: { style: BorderStyle.SINGLE, size: 4, color: 'C7D2FE' },
              },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  spacing: { after: 60 },
                  children: [
                    new TextRun({
                      text: 'ABSTRACT',
                      bold: true,
                      size: 20,
                      color: '4338CA',
                      font: 'Arial',
                    }),
                  ],
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: paper.abstract,
                      size: 20,
                      color: '1E1B4B',
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  children.push(new Paragraph({ spacing: { after: 240 } }));

  // 7. Sections with Yellow Highlighted Passages & Callouts
  for (const sec of paper.sections) {
    children.push(
      new Paragraph({
        spacing: { before: 200, after: 120 },
        heading: HeadingLevel.HEADING_2,
        children: [
          new TextRun({
            text: sec.heading,
            size: 24, // 12pt
            bold: true,
            color: '0F172A',
            font: 'Arial',
          }),
        ],
      })
    );

    for (const p of sec.paragraphs) {
      if (typeof p === 'string') {
        children.push(
          new Paragraph({
            spacing: { after: 120 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: p,
                size: 22, // 11pt
                color: '334155',
                font: 'Calibri',
              }),
            ],
          })
        );
      } else {
        // Highlighted paragraph in Microsoft Word
        children.push(
          new Paragraph({
            spacing: { before: 100, after: 100 },
            alignment: AlignmentType.JUSTIFIED,
            children: [
              new TextRun({
                text: p.highlightedText,
                size: 22, // 11pt
                bold: true,
                color: '000000',
                font: 'Calibri',
                highlight: docx.HighlightColor.YELLOW, // NATIVE WORD YELLOW HIGHLIGHT!
              }),
            ],
          })
        );

        // Callout box linking to Smayra's Thesis
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'FEF9C3' }, // Soft yellow card
                    borders: {
                      top: { style: BorderStyle.SINGLE, size: 4, color: 'FDE047' },
                      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'FDE047' },
                      left: { style: BorderStyle.SINGLE, size: 24, color: 'CA8A04' }, // Bold amber marker border
                      right: { style: BorderStyle.SINGLE, size: 4, color: 'FDE047' },
                    },
                    margins: { top: 120, bottom: 120, left: 160, right: 160 },
                    children: [
                      new Paragraph({
                        spacing: { after: 40 },
                        children: [
                          new TextRun({
                            text: '📍 CITED IN THESIS: ',
                            bold: true,
                            size: 19,
                            color: '854D0E',
                            font: 'Arial',
                          }),
                          new TextRun({
                            text: p.thesisLocation,
                            bold: true,
                            size: 19,
                            color: '713F12',
                            font: 'Arial',
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'Thesis Context: ',
                            bold: true,
                            size: 18,
                            color: '854D0E',
                            font: 'Calibri',
                          }),
                          new TextRun({
                            text: `"${p.thesisQuote}"`,
                            italics: true,
                            size: 18,
                            color: '1E293B',
                            font: 'Calibri',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        );

        children.push(new Paragraph({ spacing: { after: 140 } }));
      }
    }
  }

  // 8. Footer
  children.push(new Paragraph({ spacing: { before: 240 } }));
  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 6, color: '94A3B8' },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              margins: { top: 100, bottom: 100, left: 140, right: 140 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Chandigarh University • B.A. (Hons.) Psychology • Candidate: Smayra (UID: 23BHP70113) • Supervisor: Dr. Kulbeer Kaur\nArchived in D:\\research papers for Academic Defense and Audit Verification',
                      size: 17,
                      color: '64748B',
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );

  // Build Document
  const doc = new Document({
    title: paper.title,
    author: paper.authors,
    description: `Academic paper cited in Smayra's project report with yellow highlight annotations.`,
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

// Function to generate the Master Index in DOCX
async function createMasterIndexDocx() {
  const tableRows = [];

  // Header row
  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({
          width: { size: 6, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '0F172A' },
          children: [new Paragraph({ children: [new TextRun({ text: '#', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 34, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '0F172A' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Word Document (.docx) & APA Reference', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 24, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '0F172A' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Thesis Citation Location', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
        new TableCell({
          width: { size: 36, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: '0F172A' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Yellow-Highlighted Evidence in Paper', bold: true, color: 'FFFFFF', size: 18 })] })],
        }),
      ],
    })
  );

  papers.forEach((p, idx) => {
    const docxFileName = p.fileName.replace('.pdf', '.docx');
    const highlightedObj = p.sections[0].paragraphs.find(x => typeof x === 'object');
    const thesisLoc = highlightedObj ? highlightedObj.thesisLocation : 'General Reference';
    const highlightSnippet = highlightedObj ? highlightedObj.highlightedText.substring(0, 140) + '...' : '';

    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: String(idx + 1), bold: true, size: 18 })] })],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: docxFileName, bold: true, color: '1D4ED8', size: 18 }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: p.apaCitation, size: 16, color: '475569' }),
                ],
              }),
            ],
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: thesisLoc, bold: true, size: 17, color: '92400E' }),
                ],
              }),
            ],
          }),
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: 'FFFDE7' },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: highlightSnippet,
                    bold: true,
                    size: 16,
                    color: '713F12',
                    highlight: docx.HighlightColor.YELLOW,
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  });

  const doc = new Document({
    title: 'Master Evidentiary Index of Cited Research Papers',
    sections: [
      {
        properties: {
          page: { margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } },
        },
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'MASTER EVIDENTIARY AUDIT INDEX (DOCX FORMAT)',
                bold: true,
                size: 32,
                color: '0F172A',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'Chandigarh University • Department of B.A. (Hons.) Psychology\nCandidate: Smayra (UID: 23BHP70113) • Supervisor: Dr. Kulbeer Kaur (November 2026)\nDirectory: D:\\research papers (30 Highlighted Microsoft Word Documents)',
                size: 20,
                color: '475569',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'This document indexes all 30 research papers cited and referenced in the project report. In every single Word document (.docx), all corresponding quotations, definitions, and empirical statistics are highlighted with native Microsoft Word yellow highlighting so you can open, edit, and review them directly in Word.',
                size: 20,
                color: '1E293B',
              }),
            ],
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          }),
        ],
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

async function buildAllDocx() {
  console.log(`Starting generation of ${papers.length} Word (.docx) documents with yellow highlights into: ${outputDir}`);

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    const docxFileName = paper.fileName.replace('.pdf', '.docx');
    const docxPath = path.join(outputDir, docxFileName);

    try {
      const buffer = await createDocxForPaper(paper);
      fs.writeFileSync(docxPath, buffer);
      console.log(`[${i + 1}/${papers.length}] Generated DOCX: ${docxFileName} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Failed to generate DOCX for ${docxFileName}:`, err);
    }
  }

  // Generate Master Index DOCX
  console.log('Generating 00_INDEX_OF_CITED_PAPERS_AND_THESIS_MAPPING.docx ...');
  try {
    const indexDocxBuffer = await createMasterIndexDocx();
    const indexDocxPath = path.join(outputDir, '00_INDEX_OF_CITED_PAPERS_AND_THESIS_MAPPING.docx');
    fs.writeFileSync(indexDocxPath, indexDocxBuffer);
    console.log(`Generated Master Index DOCX: 00_INDEX_OF_CITED_PAPERS_AND_THESIS_MAPPING.docx (${indexDocxBuffer.length} bytes)`);
  } catch (err) {
    console.error('Failed to generate Master Index DOCX:', err);
  }

  // Mirror all DOCX files to artifact folder for safe persistence
  const artifactDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\82c4e6a3-f809-4fd4-a319-b55bb18dcd69\\research_papers_docx';
  if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

  const docxFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.docx'));
  docxFiles.forEach(f => {
    fs.copyFileSync(path.join(outputDir, f), path.join(artifactDir, f));
  });
  console.log(`Successfully mirrored all ${docxFiles.length} DOCX files to artifact directory: ${artifactDir}`);
}

buildAllDocx().catch(err => {
  console.error('Fatal error during DOCX generation:', err);
  process.exit(1);
});
