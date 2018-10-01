const express = require('express');
const productRouter = require('./js/routers/productRouter');
const productsRouter = require('./js/routers/productsRouter');

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/product', productRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
