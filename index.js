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
  let cpus = os.cpus();
  res.send(cpus);
});

app.listen(80);
