let express = require('express');
let fs = require('fs');
let app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/files', (req, res) => {
  let root = fs.readdir('/');
  res.send(root);
})

app.listen(80);
