#!/data/data/com.termux/files/usr/bin/node
// server.js — Chronon Local Web Server (tiny static server)
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = parseInt(process.argv[2] || '8000', 10);
const ROOT = process.argv[3] || '/data/data/com.termux/files/home/chronon';

function getLocalIP() {
  try {
    const ifaces = Object.values(os.networkInterfaces()).flat().filter(a => a && a.family === 'IPv4' && !a.internal);
    if (ifaces.length) return ifaces[0].address;
  } catch (e) {}
  return '127.0.0.1';
}

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain', '.md': 'text/markdown', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  let p = req.url.split('?')[0];
  if (p === '/') p = '/index.html';
  const filePath = path.normalize(path.join(ROOT, p));
  if (filePath.indexOf(ROOT) !== 0) { res.writeHead(403); return res.end('forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('not found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

server.on('error', () => server.listen(PORT, '127.0.0.1'));
server.listen(PORT, getLocalIP(), () => {
  console.log('CHRONON.ORG :: ' + getLocalIP() + ':' + PORT);
});
