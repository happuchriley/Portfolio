import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dir = path.join(root, 'public', 'data', 'projects');
const outFile = path.join(root, 'public', 'data', 'projects.json');

fs.mkdirSync(dir, { recursive: true });

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .sort();

const projects = files.map((file) => {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const data = JSON.parse(raw);
  if (!data.id) data.id = path.basename(file, '.json');
  return data;
});

projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

fs.writeFileSync(outFile, `${JSON.stringify({ projects }, null, 2)}\n`, 'utf8');
console.log(`Synced ${projects.length} project(s) → public/data/projects.json`);
