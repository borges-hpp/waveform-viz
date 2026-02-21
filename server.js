const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const file = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(file);
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  const filePath = path.join(__dirname, file);
  
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
