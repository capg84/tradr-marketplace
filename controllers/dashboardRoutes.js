const router = require("express").Router();
const { Product, Purchase, Address, Category, Order } = require("../models");
const withAuth = require("../utils/auth");

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
        name: req.session.first_name
      });
    } catch (err) {
      res.redirect('login');
    }


});

// EDIT A PRODUCT
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);

    if (productData) {
      const product = productData.get({ plain: true });

      res.render("editlisting", {
        layout: "dashboard",
        product,
        logged_in: req.session.logged_in,
        name: req.session.first_name
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
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
    console.log(addresses);

    res.render('address', {
      layout: 'dashboard',
      addresses,
      name: req.session.first_name
    });
  } catch (err) {
    res.redirect('login');
  }
})



// Create Address
router.get('/address/create', withAuth, (req, res) => {
  res.render('create-add', {
    layout: 'dashboard',
    name: req.session.first_name
  });
});

// EDIT ADDRESS
router.get("/address/edit/:id", withAuth, async (req, res) => {

  try {
    const addressData = await Address.findByPk(req.params.id);

    if (addressData) {
      const address = addressData.get({ plain: true });



    res.render('edit-add', {
      layout: 'dashboard',
      address,
      logged_in: req.session.logged_in,
      name: req.session.first_name
    });
  }
     else {

      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});


// Get all Purchases 
router.get('/purchases', withAuth, async (req, res) => {

    try {
      const purchaseData = await Purchase.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{model: Product}],
      });
  
      const purchases = purchaseData.map((purchase) => purchase.get({ plain: true }));
      console.log(purchases);
      res.render('purchases', {
        layout: 'dashboard',
        purchases,
        name: req.session.first_name
      });
    } catch (err) {
      res.redirect('login');
    }
});

// Create listing
router.get('/createlisting', withAuth, (req, res) => {
    res.render('createlisting', {
      layout: 'dashboard',
      name: req.session.first_name
    });

});

// Get seller stats
router.get('/stats', withAuth, (req, res) => {

  res.render('stats', {
    layout: 'dashboard',
    name: req.session.first_name
  });
});


module.exports = router;
