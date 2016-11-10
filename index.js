let express = require('express');
let fs = require('fs');
let readdir = require('fs-readdir-promise');
let app = express();
let os = require('os');

app.get('/*', (req, res) => {
  let dir = req.url;
  dir = dir.replace(/\+*/, ' ');
  console.log(dir);
  let data = [];
  let promises = [];
  readdir(dir)
    .then((files) => {
      for (let file of files) {
        let newPromise = readdir(`${dir}/${file}`)
          .then((files) => {
            data.push({
              name: file,
              type: 'dir',
              path: `${dir}${file}`,
            })
          })
          .catch((err) => {
            data.push({
              name: file,
              type: 'file',
              path: `${dir}/${file}`,
            })
          })
        ;
        promises.push(newPromise);
      }
      Promise.all(promises).then(() => {
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err);
      res.end();
    })
  ;
});

app.listen(80);
