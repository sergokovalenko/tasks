const express = require('express');
const Ajv = require('ajv');
const bodyParser = require('body-parser');
const data = require('./js/dataWorker');
const schema = require('./js/schema.json');

const ajv = new Ajv({
  allErrors: true,
});
const validator = ajv.compile(schema);
const app = express();
const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
  // TODO: раздавать статику, удалить логирование в консоль
  console.log(validator({ name: 'e', price: -2 }));
  console.log(ajv.errorsText(validator.errors, { dataVar: 'product' }));
  res.send(validator.errors);
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

  if (validator(req.body)) {
    const newProductId = data.add(req.body);
    res.send(newProductId);
    return;
  }

  res.send(validator.errors);
});

app.put('/product', jsonParser, (req, res) => {
  if (!req.body) {
    res.sendStatus(400).send('Bad Request');
    return;
  }
  if (validator(req.body)) {
    const success = data.update(req.body);
    res.send(success);
    return;
  }

  res.send(validator.errors);
});

app.delete('/product/:id', (req, res) => {
  if (+req.params.id) {
    res.sendStatus(400).send('Bad Request');
    return;
  }

  const success = data.removeElement(req.params.id);
  if (!success) {
    res.sendStatus(404).send('Not Found');
    return;
  }

  res.json(success);
});

app.get('/filter/:expr', (req, res) => {
  const filteredData = data.find(req.params.expr);
  if (!filteredData) {
    res.sendStatus(404).send('Not Found');
    return;
  }

  res.json(filteredData);
});

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
