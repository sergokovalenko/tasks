const express = require('express');
const router = require('./js/routers/router');

const app = express();

app.use(express.json());
app.use('/product', router);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
