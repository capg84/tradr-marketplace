const router = require('express').Router();
const {Product, Purchase, Address, Category} = require('../models');
const withAuth = require('../utils/auth');

// GET ALL ACTIVELISTINGS
router.get('/', withAuth, async (req, res) => {
    try {
      const productData = await Product.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const products = productData.map((product) => product.get({ plain: true }));
  
      res.render('activelistings', {
        layout: 'dashboard',
        products,
      });
    } catch (err) {
      res.redirect('login');
    }
});

// EDIT A PRODUCT
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id);
      
      if (productData) {
      const product = productData.get({ plain: true });
      console.log(product);

      res.render('editlisting', {
        layout: 'dashboard',
        product,
        logged_in: req.session.logged_in
      });
    }
      else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
});

// Get all addresses
router.get('/addresses', withAuth, async (req, res) => {
    try {
      const addressData = await Address.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const addresses = addressData.map((address) => address.get({ plain: true }));
  
      res.render('address', {
        layout: 'dashboard',
        addresses,
      });
    } catch (err) {
      res.redirect('login');
    }
});

// Get all Purchases 
router.get('/purchases', withAuth, async (req, res) => {
    try {
      const purchaseData = await Purchase.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const purchases = purchaseData.map((purchase) => purchase.get({ plain: true }));
  
      res.render('purchases', {
        layout: 'dashboard',
        purchases,
      });
    } catch (err) {
      res.redirect('login');
    }
});

// Create listing
router.get('/createlisting', withAuth, (req, res) => {
    res.render('createlisting', {
      layout: 'dashboard',
    });
});

module.exports = router;