const express = require('express');
const data = require('./js/dataWorker');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  res.redirect('/getAll');
});

app.get('/getAll', (req, res) => {
  const all = data.getAll();
  res.json(all);
});

app.get('/product/:id', (req, res) => {
  const product = data.getElementById(req.params.id);
  if (!product) {
    res.sendStatus(404).send('Not Found');
    return;
  }

  res.json(product);
});

app.post('/product', jsonParser, (req, res) => {
  if (!req.body) {
    res.sendStatus(400).send('Bad Request');
    return;
  }
  data.add(req.body);

  res.send(req.body.id);
});

app.put('/product', jsonParser, (req, res) => {
  if (!req.body) {
    res.sendStatus(400).send('Bad Request');
    return;
  }
  data.update(req.body);

  res.send(req.body.id);
});

app.delete('/product/:id', (req, res) => {
  const product = data.removeElement(req.params.id);
  if (!product) {
    res.sendStatus(404).send('Not Found');
    return;
  }

  res.json(product);
});

app.get('/filter/:expr', (req, res) => {
  const filtered = data.find(req.params.expr);
  if (!filtered) {
    res.sendStatus(404).send('Not Found');
    return;
  }

  res.json(filtered);
});

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
