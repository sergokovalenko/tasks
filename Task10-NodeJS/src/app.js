const express = require('express');
const productRouter = require('./js/routers/productRouter');
const productsRouter = require('./js/routers/productsRouter');
// const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);
app.use('/product', productRouter);

app.listen(3001, () => {
  console.log('Server started on port 3001!');
});
