const router = require('express').Router();
const { Product, User, Category, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

// get all products for homepage
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [Category],
    });

    const products = productData.map((product) => product.get({ plain: true }));


    // Pass serialized data and session flag into template
    res.render("home", {

      products,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get a single category
router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
        attributes: ['id', 'product_name', 'price', 'image'],
      }
    ],
    });

    if (categoryData) {
      const category = categoryData.get({ plain: true });
      console.log(category);
      res.render('category', { 
        category,
        logged_in: req.session.logged_in 
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name'],
          include: [{model: Product, attributes: ['id', 'product_name', 'price', 'image']}]
        },
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
    });
    
    if (productData) {
    const product = productData.get({ plain: true });
    console.log(productData);
    res.render('product', {
      product,
      logged_in: req.session.logged_in
    });
  } else {
    res.status(404).end();
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }, {model: Wishlist}],
    });

    const user = userData.get({ plain: true });

    res.render('home', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/wishlist', withAuth, async (req, res) => {
  try {
    const wishlistData = await Wishlist.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [User, {model: Product}],
    });

    const wishlists = wishlistData.map((wishlist) => wishlist.get({ plain: true }));
    console.log(wishlists);
    res.render('wishlist', {
      wishlists,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.redirect('login');
  }
});

// SEARCH

router.get('/search/:id', async (req, res) => {
  try {
    let input = req.params.id.split("%20").join("|");
    const productData = await Product.findAll({
      where: {
        name: {
          [Op.regexp]: `*(${input})*`,
        },
      },
    });

    if (productData) {
      const product = productData.get({ plain: true });
      console.log(product);
      res.render('search', { 
        product
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render("login");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  res.render('signup');
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/contactus", (req, res) => {
  res.render("contactus");
});

module.exports = router;
