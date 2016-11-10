let express = require('express');
let fs = require('fs');
let app = express();
let os = require('os');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/files', (req, res) => {
  let root = fs.readdir('/', (err, files) => {
    res.send(files);
  });
})

app.get('/os', (req, res) => {
  fs.readFile('/proc/cpuinfo', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.listen(80);
