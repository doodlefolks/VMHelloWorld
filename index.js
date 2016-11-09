let http = require ('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(80, () => {
  console.log('Server listening at port 80 at 35.163.38.57');
});
