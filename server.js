const http = require('node:http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
  });

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200);
    return res.end(JSON.stringify({ mensagem: 'Olá, back-end!' }));
  }
  if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200);
    return res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  }
  if (req.method === 'GET' && req.url === '/hora') {
    res.writeHead(200);
    return res.end(JSON.stringify({ hora: new Date().toLocaleTimeString() }));
  }
  if (req.method === 'POST' && req.url === '/eco') {
    let corpo = '';
    req.on('data', (pedaco) => {
      corpo += pedaco;
    });
    req.on('end', () => {
      res.setHeader('Content-Type', req.headers['content-type'] || 'text/plain');
      res.writeHead(201);
      res.end(corpo);
    });
    return;
  }
  if (req.url === '/status' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.writeHead(405);
    return res.end(JSON.stringify({ erro: 'Método não permitido' }));
  }

  res.writeHead(404);
  res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
});

server.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));