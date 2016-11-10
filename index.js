let express = require('express');
let fs = require('fs');
let readdir = require('fs-readdir-promise');
let app = express();
let os = require('os');

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/*', (req, res) => {
  let dir = req.url;
  let data = {data: []};
  if (dir !== '/') {
    let upPath = dir.split('/');
    console.log(upPath);
    upPath.pop();
    upPath = upPath.join('/');
    data.data = [{
      name: 'up directory',
      type: 'up',
      url: upPath || '/',
    }];
    console.log(data);
  }
  dir = dir.split('+').join(' ');
  let promises = [];
  readdir(dir)
    .then((files) => {
      // This is a directory
      if (files.length === 0) {
        res.render('index', { empty: true })
      }
      for (let file of files) {
        let newPromise = readdir(`${dir}/${file}`)
          .then((files) => {
            data.data.push({
              name: file,
              type: 'dir',
              url: `${dir === '/' ? '' : dir}/${file}`.split(' ').join('+'),
            })
          })
          .catch((err) => {
            data.data.push({
              name: file,
              type: 'file',
              url: `${dir === '/' ? '' : dir}/${file}`.split(' ').join('+'),
            })
          })
        ;
        promises.push(newPromise);
      }
      Promise.all(promises).then(() => {
        res.render('index', data);
      });
    })
    .catch((err) => {
      // This is a file
      fs.readFile(dir, (err, data) => {
        if (err) {
          res.send('This file is protected and cannot be downloaded.')
        }
        res.send(data);
      })
    })
  ;
});

app.listen(80);
