const express = require('express');
const productRouter = require('./js/routers/productRouter');
const productsRouter = require('./js/routers/productsRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/product', productRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000!');
});
