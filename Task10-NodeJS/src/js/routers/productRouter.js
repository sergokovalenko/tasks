const express = require('express');
const Ajv = require('ajv');
const data = require('./../dataWorker');
const schema = require('./../schemas/productSchema.json');

const router = express.Router();
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
});
const validator = ajv.compile(schema);

router.post('/', (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    res.end();
  }

  if (validator(req.body)) {
    const success = data.add(req.body);
    res.status(200).json(success);
  } else {
    res.send(validator.errors);
  }
});

router.route('/:id')
  .all((req, res, next) => {
    if (!req.params.id) {
      res.sendStatus(404);
    } else {
      next();
    }
  })
  .get((req, res) => {
    const product = data.getElementById(req.params.id);
    if (!product) {
      res.sendStatus(404);
    } else {
      res.status(200).json(product);
    }
  })
  .put((req, res) => {
    if (!req.body) {
      res.sendStatus(400);
      res.end();
    }
    if (validator(req.body)) {
      const product = req.body;
      product.id = req.params.id;
      const success = data.update(product);
      res.status(201).send(success);
    } else {
      res.send(validator.errors);
    }
  })
  .delete((req, res) => {
    const success = data.removeElement(req.params.id);
    if (!success) {
      res.sendStatus(404);
    } else {
      res.status(201).json(success);
    }
  });

module.exports = router;
