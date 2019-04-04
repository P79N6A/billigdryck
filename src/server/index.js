const express = require('express');
const utils = require('../utils');

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/delta/latest', (req, res) => {
  const data = utils.requireDelta(utils.getLatestDelta());
  res.json(data);
});

app.get('/products', (req, res) => {
  const products = utils.getLatestProducts();
  res.json(products);
});

app.get('/products/:articleID', (req, res) => {
  const product = utils.getProductById(req.params.articleID);
  res.json(product);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
