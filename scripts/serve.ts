/** Minimal static server for local review of dist/ (no dependencies). */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain',
};
const port = Number(process.env.PORT ?? 4173);
createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url ?? '/').split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = join(dist, p);
    if (!file.startsWith(dist)) throw new Error('traversal');
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    const nf = await readFile(join(dist, '404.html')).catch(() => Buffer.from('Not found'));
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    res.end(nf);
  }
}).listen(port, () => console.log(`Serving dist/ at http://localhost:${port}/`));
