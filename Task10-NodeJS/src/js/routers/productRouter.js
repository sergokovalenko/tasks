const express = require('express');
const Ajv = require('ajv');
const dataStorage = require('./../dataWorker');
const schema = require('./../schemas/productSchema.json');
const Logger = require('./../Logger');

const logger = new Logger('log.txt');

const router = express.Router();
const ajv = new Ajv({
  allErrors: true,
  useDefaults: true,
});
const validate = ajv.compile(schema);

function sendErrorCode(response, code) {
  let message = '';
  switch (code) {
    case 400:
      message = 'Request with empty body';
      break;
    case 404:
      message = 'Product not found';
      break;
    default:
      break;
  }

  if (message) {
    logger.requestError(message);
  }
  response.sendStatus(code);
}

function validMiddleware(req, res, next) {
  try {
    if (Object.keys(req.body).length > 0) {
      if (!validate(req.body)) {
        logger.validationError(ajv.errorsText(validate.errors));
        res.send(validate.errors);
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (e) {
    logger.error(e);
  }
}

router.use(validMiddleware);

router.post('/', (req, res) => {
  try {
    if (!req.body) {
      sendErrorCode(res, 400);
    }

    const success = dataStorage.add(req.body);
    res.status(200).json(success);
  } catch (e) {
    logger.error(e);
  }
});

router.route('/:id')
  .all((req, res, next) => {
    try {
      if (!req.params.id) {
        sendErrorCode(res, 404);
      } else {
        next();
      }
    } catch (e) {
      logger.error(e);
    }
  })
  .get((req, res) => {
    try {
      dataStorage.getElementById(req.params.id)
        .then((product) => {
          if (!product) {
            sendErrorCode(res, 404);
          } else {
            res.status(200).json(product);
          }
        });
    } catch (e) {
      logger.error(e);
    }
  })
  .put((req, res) => {
    try {
      if (!req.body) {
        sendErrorCode(res, 400);
      }
      const product = req.body;
      product.id = req.params.id;
      dataStorage.update(product)
        .then((success) => {
          res.status(201).send(success);
        });
    } catch (e) {
      logger.error(e);
    }
  })
  .delete((req, res) => {
    try {
      dataStorage.removeElement(req.params.id)
        .then((success) => {
          if (!success) {
            sendErrorCode(res, 404);
          } else {
            res.status(201).json(success);
          }
        });
    } catch (e) {
      logger.error(e);
    }
  });

module.exports = router;
