import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const cv = JSON.parse(
  fs.readFileSync(path.join(root, 'src', 'data', 'cv.json'), 'utf8')
);

const PRIMARY = '#FF3E00';
const DARK = '#111827';
const MUTED = '#4B5563';
const PAGE_BOTTOM = 760;

function ensureSpace(doc, y, needed = 48) {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return 50;
  }
  return y;
}

function sectionTitle(doc, title, y) {
  y = ensureSpace(doc, y, 36);
  doc
    .font('Helvetica-Bold')
    .fontSize(11)
    .fillColor(PRIMARY)
    .text(title.toUpperCase(), 50, y, { characterSpacing: 0.6 });
  y += 16;
  doc
    .moveTo(50, y)
    .lineTo(545, y)
    .strokeColor('#E5E7EB')
    .lineWidth(0.75)
    .stroke();
  return y + 14;
}

function bodyText(doc, text, y, options = {}) {
  doc.font('Helvetica').fontSize(10).fillColor(MUTED);
  doc.text(text, 50, y, { width: 495, lineGap: 3, ...options });
  return doc.y + 8;
}

function bulletList(doc, items, y) {
  items.forEach((item) => {
    y = ensureSpace(doc, y, 20);
    doc.font('Helvetica').fontSize(10).fillColor(MUTED);
    doc.text(`•  ${item}`, 58, y, { width: 487, lineGap: 2 });
    y = doc.y + 4;
  });
  return y + 6;
}

function generatePdf(outputPath) {
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Header band
  doc.rect(0, 0, 595, 118).fill(DARK);
  doc
    .font('Helvetica-Bold')
    .fontSize(26)
    .fillColor('#FFFFFF')
    .text(cv.name, 50, 36);
  doc
    .font('Helvetica')
    .fontSize(13)
    .fillColor(PRIMARY)
    .text(cv.title, 50, 68);
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#D1D5DB')
    .text(cv.brand, 50, 88);

  const contactLine = [cv.email, cv.phone, cv.location].join('   ·   ');
  doc
    .font('Helvetica')
    .fontSize(8.5)
    .fillColor('#E5E7EB')
    .text(contactLine, 50, 102, { width: 495, align: 'right' });

  let y = 138;

  y = sectionTitle(doc, 'Profile', y);
  y = bodyText(doc, cv.summary, y);

  y = sectionTitle(doc, 'Core strengths', y);
  y = bulletList(doc, cv.highlights, y);

  y = sectionTitle(doc, 'Technical skills', y);
  Object.entries(cv.skills).forEach(([group, items]) => {
    y = ensureSpace(doc, y, 28);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(DARK).text(group, 50, y);
    y += 14;
    doc.font('Helvetica').fontSize(9.5).fillColor(MUTED);
    doc.text(items.join('  ·  '), 50, y, { width: 495, lineGap: 2 });
    y = doc.y + 10;
  });

  y = sectionTitle(doc, 'Experience', y);
  cv.experience.forEach((job) => {
    y = ensureSpace(doc, y, 72);
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(DARK).text(job.role, 50, y);
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(MUTED)
      .text(`${job.company}  ·  ${job.period}`, 50, y + 14);
    y = bulletList(doc, job.bullets, y + 30);
  });

  y = sectionTitle(doc, 'Selected projects', y);
  cv.projects.forEach((project) => {
    y = ensureSpace(doc, y, 52);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK).text(project.name, 50, y);
    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor(PRIMARY)
      .text(project.url, 50, y + 13, { link: project.url, underline: true });
    doc
      .font('Helvetica-Oblique')
      .fontSize(8.5)
      .fillColor(MUTED)
      .text(project.stack, 50, y + 26);
    y = bodyText(doc, project.description, y + 38);
  });

  y = sectionTitle(doc, 'Education', y);
  cv.education.forEach((entry) => {
    y = ensureSpace(doc, y, 32);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(DARK).text(entry.credential, 50, y);
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(MUTED)
      .text(`${entry.institution}  ·  ${entry.period}`, 50, y + 14);
    y += 34;
  });

  y = ensureSpace(doc, y, 40);
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor(MUTED)
    .text(`Portfolio: ${cv.portfolio}`, 50, y, { link: cv.portfolio, underline: true });
  doc.text(`GitHub: ${cv.github}`, 50, doc.y + 4, { link: cv.github, underline: true });

  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc
      .font('Helvetica')
      .fontSize(8)
      .fillColor('#9CA3AF')
      .text(`${cv.name} — ${cv.title}`, 50, 820, { width: 495, align: 'left' });
    doc.text(`Page ${i - range.start + 1} of ${range.count}`, 50, 820, {
      width: 495,
      align: 'right',
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
