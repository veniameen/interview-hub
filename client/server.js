const express = require('express');
const path = require('path');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use('/api', createProxyMiddleware({
    target: process.env.API_URL || 'http://localhost:5000',
    changeOrigin: true,
    pathRewrite: {'^/api': '/api'},
  }));

  server.post('/run-code', (req, res) => {
    res.json({ message: "Code execution endpoint" });
  });

  server.use('/_next', express.static(path.join(__dirname, '.next')));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
