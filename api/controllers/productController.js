const Product = require('../models/Product');
const ProductCenter = require('../models/ProductCenter');

const mapProductCenters = (locations) => {
  return new Promise((resolve, reject) => {
    ProductCenter.find({ 'location.city': { $in: locations } })
      .then(results => {
        const idArray = results.map(doc => doc._id);
        resolve(idArray);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.getProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).send(products);
    })
    .catch(err => res.status(500).send(`Internal error: ${err}`));
};

exports.getProduct = (req, res) => {
  Product.findOne({ _id: req.params.id }).populate({
    path: 'locations',
    populate: {
      path: 'contact',
      model: 'Contact'
    }
  })
    .then(product => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send('Specified product does not exist');
      }
    })
    .catch(err => res.status(500).send(`Internal error: ${err}`));
};

exports.createProduct = (req, res) => {
  let data = { ...req.body };

  mapProductCenters(req.body.locations)
    .then(arr => {
      if (arr.length) {
        data.locations = arr;
        const product = new Product(data);
        return product.save();
      } else {
        throw new Error('Product center location(s) do not exist');
      }
    })
    .then(newProd => {
      res.status(200).send(newProd);
    })
    .catch(err => {
      res.status(500).send(`Error creating new product: ${err}`);
    });
};

exports.updateProduct = (req, res) => {
  let data = { ...req.body };

  mapProductCenters(req.body.locations)
    .then(arr => {
      if (arr.length) {
        data.locations = arr;
      }
      return Product.findOneAndUpdate({ _id: req.params.id }, data, {
        new: true,
        runValidators: true
      }).exec();
    })
    .then(updatedProd => {
      res.status(200).send(updatedProd);
    })
    .catch(err => {
      res.status(500).send(`Error creating new product: ${err}`);
    });
};
