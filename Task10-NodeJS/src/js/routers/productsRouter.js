const express = require('express');
const data = require('./../dataWorker');
const Logger = require('./../Logger');

const router = express.Router();
const logger = new Logger('log.txt');

router.get('/', (req, res) => {
  try {
    data.getAll().then((all) => {
      res.status(200).json(all);
    });
  } catch (e) {
    logger.error(e);
  }
});

router.get('/:expr', (req, res) => {
  try {
    data.find(req.params.expr).then((filterResult) => {
      if (!filterResult) {
        res.status(200).json([]);
      } else {
        res.status(200).json(filterResult);
      }
    });
  } catch (e) {
    logger.error(e);
  }
});

module.exports = router;
