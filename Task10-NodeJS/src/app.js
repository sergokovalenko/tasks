const express = require('express');
const productRouter = require('./js/routers/productRouter');
const productsRouter = require('./js/routers/productsRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/products', productsRouter);
app.use('/product', productRouter);

app.listen(3001, () => {
  console.log('Server started on port 3001!');
});
