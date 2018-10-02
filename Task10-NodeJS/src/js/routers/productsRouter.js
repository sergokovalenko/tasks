const express = require('express');
const data = require('./../dataWorker');

const router = express.Router();

router.get('/', (req, res) => {
  data.getAll().then((all) => {
    res.status(200).json(all);
  });
});

router.get('/:expr', (req, res) => {
  data.find(req.params.expr).then((filterResult) => {
    if (!filterResult) {
      res.status(200).json([]);
    } else {
      res.status(200).json(filterResult);
    }
  });
});

module.exports = router;
