const router = require('express').Router();
const { Product, User, Category, Wishlist } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all products and JOIN with user data
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
        },
      ],
    });

    // Serialize data so the template can read it
    const products = productData.map((product) => product.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      products
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'image'],
        },
      ],
    });

    if (categoryData) {
      const category = categoryData.get({ plain: true });

      res.render('category', { category });
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
        },
        {
            model: Category,
            attributes: ['category_name'],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render('product', {
      ...product
    });
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
      ...user,
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
      include: [{model: Product}],
    });

    const wishlists = wishlistData.map((wishlist) => wishlist.get({ plain: true }));

    res.render('home', {
      layout: 'main',
      wishlists,
    });
  } catch (err) {
    res.redirect('login');
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});


module.exports = router;
