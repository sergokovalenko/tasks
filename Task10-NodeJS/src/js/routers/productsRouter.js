const express = require('express');
const data = require('./../dataWorker');

const router = express.Router();

router.get('/', (req, res) => {
  const all = data.getAll();
  res.status(200).json(all);
});

router.get('/:expr', (req, res) => {
  const filterResult = data.find(req.params.expr);
  if (!filterResult) {
    res.status(200).json([]);
  } else {
    res.status(200).json(filterResult);
  }
});

module.exports = router;
