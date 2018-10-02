const express = require('express');
const Ajv = require('ajv');
const data = require('./../dataWorker');
const schema = require('./../schemas/productSchema.json');
const Logger = require('./../Logger');

const logger = new Logger('log.txt');

const router = express.Router();
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
});
const validator = ajv.compile(schema);

function validMiddleware(req, res, next) {
  if (req.body) {
    const isValid = validator(req.body);
    if (!isValid) {
      logger.validationError(ajv.errorsText(validator.errors));
      res.send(validator.errors);
    } else {
      next();
    }
  } else {
    next();
  }
}

router.use(validMiddleware);

router.post('/', (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
  }
  const success = data.add(req.body);
  res.status(200).json(success);
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
    }
    const product = req.body;
    product.id = req.params.id;
    const success = data.update(product);
    res.status(201).send(success);
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
