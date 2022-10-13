const router = require('express').Router();
const {Product} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log("I am in post route");
    try {
      const newProduct = await Product.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log(newProduct);
      res.status(200).json(newProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
