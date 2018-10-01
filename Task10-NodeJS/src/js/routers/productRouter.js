const express = require('express');
const Ajv = require('ajv');
const data = require('./../dataWorker');
const schema = require('./../schemas/productSchema.json');

const router = express.Router();
const ajv = new Ajv({
  allErrors: true,
});
const validator = ajv.compile(schema);

router.get('/', (req, res) => {
  const all = data.getAll();
  res.status(200).json(all);
});

router.route('/:id')
  .all((req, res, next) => {
    if (!req.params.id) {
      res.status(404).send('Not Found');
      return;
    }
    next();
  })
  .get((req, res) => {
    const product = data.getElementById(req.params.id);
    if (!product) {
      res.status(404).send('Not Found');
      return;
    }

    res.json(product);
  })
  .put((req, res) => {
    if (!req.body) {
      res.status(400).send('Bad Request');
      return;
    }
    if (validator(req.body)) {
      const success = data.update(req.body);
      res.status(201).send(success);
      return;
    }

    res.send(validator.errors);
  })
  .delete((req, res) => {
    const success = data.removeElement(req.params.id);
    if (!success) {
      res.status(404).send('Not Found');
      return;
    }

    res.status(201).json(success);
  });

module.exports = router;
