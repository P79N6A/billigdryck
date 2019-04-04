/* eslint no-underscore-dangle: 0 global-require: 0, import/no-dynamic-require: 0 */
const { diff } = require('deep-diff');
const convert = require('xml-js');
const path = require('path');
const fs = require('fs');

const utils = {

  __rawpath: path.resolve(`${process.env.PWD}/resources/products/`),
  __deltapath: path.resolve(`${process.env.PWD}/resources/deltas/`),
  __rawname: name => path.resolve(`${utils.__rawpath}/${name}`),
  __deltaname: name => path.resolve(`${utils.__deltapath}/${name}`),

  saveRawFile: (name, data) => fs.writeFileSync(utils.__rawname(name), data),

  saveDelta: (name, data) => fs.writeFileSync(utils.__deltaname(name), data),

  requireProduct: name => require(`${utils.__rawpath}/${name}`),
  requireDelta: name => require(`${utils.__deltapath}/${name}`),

  getProductsFiles: () => fs.readdirSync(utils.__rawpath).filter(file => file.indexOf('.json') > -1),
  getDeltaFiles: () => fs.readdirSync(utils.__deltapath).filter(file => file.indexOf('.json') > -1),

  sortByDate: files => files.sort((a, b) => new Date(a) - new Date(b)),

  getLast2: () => {
    const sorted = utils.sortByDate(utils.getProductsFiles());
    return sorted.slice(sorted.length - 2);
  },

  getProductById: (articleID) => {
    const products = utils.getLatestProducts();
    return products.artiklar.artikel.filter(product => product.Artikelid._text === articleID)[0];
  },

  getLatestProducts: () => {
    const latest = utils.getLast2()[1];
    return utils.requireProduct(latest);
  },

  getLatestDelta: () => {
    const sorted = utils.sortByDate(utils.getDeltaFiles());
    return sorted[sorted.length - 1];
  },

  convert: (body) => {
    const converted = convert.xml2json(body, { compact: true, spaces: 2 });
    const convertedJSON = JSON.parse(converted);
    return {
      name: `${convertedJSON.artiklar['skapad-tid']._text}.json`,
      converted,
    };
  },

  compare: () => {
    let last2 = utils.getLast2();

    if (last2.length < 2) last2 = last2.concat([...last2]);

    return diff(
      utils.requireProduct(last2[0]),
      utils.requireProduct(last2[1]),
    );
  },

};

module.exports = utils;
