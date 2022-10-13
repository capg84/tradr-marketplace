const router = require("express").Router();
const { Product, User, Category } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
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
    res.render("home", {
      products,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Category,
          attributes: ["category_name"],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render("product", {
      ...product,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.render("login");
    return;
  }
  res.redirect("/dashboard");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("signup");
});

router.get("/terms", (req, res) => {
  res.render("terms");
});

router.get("/privacy", (req, res) => {
  res.render("privacy");
});

router.get("/contactus", (req, res) => {
  res.render("contactus");
});

module.exports = router;
