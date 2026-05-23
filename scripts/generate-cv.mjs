import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const cv = JSON.parse(
  fs.readFileSync(path.join(root, 'src', 'data', 'cv.json'), 'utf8')
);

/** ATS-friendly: Times New Roman (Times-Roman in PDF), standard 1" margins and 11pt body */
const FONT = 'Times-Roman';
const FONT_BOLD = 'Times-Bold';

const TEXT = '#000000';
const TEXT_MUTED = '#333333';
const RULE = '#000000';

const MARGIN = 72;
const PAGE_WIDTH = 595.28;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PAGE_BOTTOM = 720;

const SIZE_NAME = 16;
const SIZE_TITLE = 11;
const SIZE_BODY = 11;
const SIZE_SMALL = 10;
const LINE_GAP_BODY = 3;
const LINE_GAP_TIGHT = 2;
const SPACE_AFTER_SECTION = 10;
const SPACE_AFTER_PARA = 8;
const SPACE_AFTER_BULLET = 4;

function ensureSpace(doc, y, needed = 44) {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function sectionHeading(doc, title, y) {
  y = ensureSpace(doc, y, 36);
  doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text(title.toUpperCase(), MARGIN, y);
  y += 16;
  doc
    .moveTo(MARGIN, y)
    .lineTo(MARGIN + CONTENT_WIDTH, y)
    .strokeColor(RULE)
    .lineWidth(0.5)
    .stroke();
  return y + SPACE_AFTER_SECTION;
}

function bodyParagraph(doc, text, y) {
  y = ensureSpace(doc, y, 28);
  doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT);
  doc.text(text, MARGIN, y, { width: CONTENT_WIDTH, lineGap: LINE_GAP_BODY, align: 'left' });
  return doc.y + SPACE_AFTER_PARA;
}

function bulletList(doc, items, y) {
  items.forEach((item) => {
    y = ensureSpace(doc, y, 22);
    doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT);
    doc.text(`• ${item}`, MARGIN + 12, y, { width: CONTENT_WIDTH - 12, lineGap: LINE_GAP_TIGHT });
    y = doc.y + SPACE_AFTER_BULLET;
  });
  return y + 4;
}

function skillGroups(doc, groups, y) {
  Object.entries(groups).forEach(([label, items]) => {
    y = ensureSpace(doc, y, 26);
    doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text(`${label}: `, MARGIN, y, {
      continued: true,
    });
    doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT).text(items.join(', '), {
      width: CONTENT_WIDTH,
      lineGap: LINE_GAP_TIGHT,
    });
    y = doc.y + 6;
  });
  return y;
}

function jobBlock(doc, job, y) {
  y = ensureSpace(doc, y, 60);
  doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text(job.role, MARGIN, y);
  doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT);
  const periodWidth = doc.widthOfString(job.period);
  doc.text(job.period, MARGIN + CONTENT_WIDTH - periodWidth, y);

  const subline = [job.company, job.location].filter(Boolean).join(' | ');
  doc.font(FONT).fontSize(SIZE_SMALL).fillColor(TEXT_MUTED).text(subline, MARGIN, y + 16);
  return bulletList(doc, job.bullets, y + 32);
}

function projectBlock(doc, project, y) {
  y = ensureSpace(doc, y, 48);
  doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text(project.name, MARGIN, y, {
    continued: true,
  });
  doc.font(FONT).fontSize(SIZE_SMALL).fillColor(TEXT_MUTED).text(` | ${project.url}`, {
    link: project.url,
    underline: false,
  });
  y = doc.y + 4;
  doc
    .font(FONT)
    .fontSize(SIZE_SMALL)
    .fillColor(TEXT_MUTED)
    .text(`Technologies: ${project.stack}`, MARGIN, y, { lineGap: LINE_GAP_TIGHT });
  y = doc.y + 6;
  const bullets = project.bullets || (project.description ? [project.description] : []);
  return bulletList(doc, bullets, y);
}

function generatePdf(outputPath) {
  const doc = new PDFDocument({ margin: MARGIN, size: 'A4', bufferPages: true });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  let y = MARGIN;

  doc.font(FONT_BOLD).fontSize(SIZE_NAME).fillColor(TEXT).text(cv.name, MARGIN, y);
  y += 22;
  doc.font(FONT).fontSize(SIZE_TITLE).fillColor(TEXT).text(cv.title, MARGIN, y, {
    width: CONTENT_WIDTH,
    lineGap: LINE_GAP_TIGHT,
  });
  y = doc.y + 14;

  const contactParts = [
    cv.location || cv.address,
    [cv.email, cv.emailAlt].filter(Boolean).join(' | '),
    cv.phone,
    cv.github ? `GitHub: ${cv.github}` : null,
    cv.portfolio ? `Portfolio: ${cv.portfolio}` : null,
    cv.linkedin ? `LinkedIn: ${cv.linkedin}` : null,
  ].filter(Boolean);

  doc.font(FONT).fontSize(SIZE_SMALL).fillColor(TEXT_MUTED);
  contactParts.forEach((line) => {
    doc.text(line, MARGIN, y, { width: CONTENT_WIDTH, lineGap: LINE_GAP_TIGHT });
    y = doc.y + 4;
  });
  y += 10;

  y = sectionHeading(doc, 'Professional Summary', y);
  y = bodyParagraph(doc, cv.summary, y);

  if (cv.competencies?.length) {
    y = sectionHeading(doc, 'Core Competencies', y);
    y = bodyParagraph(doc, cv.competencies.join(', '), y);
  }

  if (cv.skills && Object.keys(cv.skills).length) {
    y = sectionHeading(doc, 'Technical Skills', y);
    y = skillGroups(doc, cv.skills, y);
  }

  if (cv.languages?.length) {
    y = ensureSpace(doc, y, 26);
    doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text('Languages: ', MARGIN, y, {
      continued: true,
    });
    doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT).text(cv.languages.join(', '), {
      lineGap: LINE_GAP_TIGHT,
    });
    y = doc.y + SPACE_AFTER_PARA;
  }

  y = sectionHeading(doc, 'Professional Experience', y);
  cv.experience.forEach((job) => {
    y = jobBlock(doc, job, y);
  });

  y = sectionHeading(doc, 'Selected Projects', y);
  cv.projects.forEach((project) => {
    y = projectBlock(doc, project, y);
  });

  if (cv.devWorkflow?.length) {
    y = sectionHeading(doc, 'Development Workflow Experience', y);
    y = bulletList(doc, cv.devWorkflow, y);
  }

  if (cv.databaseApi?.length) {
    y = sectionHeading(doc, 'Database and API Experience', y);
    y = bulletList(doc, cv.databaseApi, y);
  }

  y = sectionHeading(doc, 'Education', y);
  cv.education.forEach((entry) => {
    y = ensureSpace(doc, y, 40);
    doc.font(FONT_BOLD).fontSize(SIZE_BODY).fillColor(TEXT).text(entry.credential, MARGIN, y);
    if (entry.period) {
      doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT);
      const periodWidth = doc.widthOfString(entry.period);
      doc.text(entry.period, MARGIN + CONTENT_WIDTH - periodWidth, y);
    }
    doc
      .font(FONT)
      .fontSize(SIZE_SMALL)
      .fillColor(TEXT_MUTED)
      .text(entry.institution, MARGIN, y + 16);
    y += 32;
    if (entry.coursework?.length) {
      doc.font(FONT).fontSize(SIZE_BODY).fillColor(TEXT).text('Relevant coursework:', MARGIN, y);
      y += 14;
      y = bulletList(doc, entry.coursework, y);
    }
  });

  if (cv.achievements?.length) {
    y = sectionHeading(doc, 'Key Achievements', y);
    y = bulletList(doc, cv.achievements, y);
  }

  const range = doc.bufferedPageRange();
  const pageCount = range.count;
  for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(range.start + i);
    doc
      .font(FONT)
      .fontSize(9)
      .fillColor(TEXT_MUTED)
      .text(cv.name, MARGIN, 800, { width: CONTENT_WIDTH, align: 'left', lineBreak: false });
    doc.text(`Page ${i + 1} of ${pageCount}`, MARGIN, 800, {
      width: CONTENT_WIDTH,
      align: 'right',
      lineBreak: false,
    });
  }

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

const outputs = [
  path.join(root, 'public', 'Derrick-Teye-CV.pdf'),
  path.join(root, 'public', 'Riley-Happuch-CV.pdf'),
];

for (const file of outputs) {
  await generatePdf(file);
}
console.log('Generated CV PDFs:', outputs.map((p) => path.basename(p)).join(', '));
