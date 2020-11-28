const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const productCenterController = require('../controllers/productCenterController');
const productController = require('../controllers/productController');

router.get('/test', (req, res) => res.json({ text: 'API is up' }));

router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);

router.post('/contact', contactController.createContact);
router.post('/product-center', productCenterController.createProductCenter);
router.post('/product', productController.createProduct);

router.put('/product/:id', productController.updateProduct);

module.exports = router;
