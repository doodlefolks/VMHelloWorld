let express = require('express');
let fs = require('fs');
let app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/files', (req, res) => {
  let root = fs.readdir('/', (err, files) => {
    res.send(files);
  });
})

app.listen(80);
