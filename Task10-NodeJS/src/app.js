const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getAll', (req, res) => {
  res.send('all products');
});

app.get('/get', (req, res) => {
  res.send('One product');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
