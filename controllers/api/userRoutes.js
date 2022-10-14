const router = require("express").Router();
const { Product, User, Category } = require("../../models");
const withAuth = require("../../utils/auth");

//api/users
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.email = newUser.email;
      req.session.logged_in = true;

      res.json(newUser);
      console.log(newUser);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//api/users/login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "---Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.first_name = userData.first_name;
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }




});

router.post("/logout", (req, res) => {
  console.log("hello", req.session.logged_in);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
