const router = require('express').Router();

router.post('/', withAuth, async (req, res) => {
    try {
      const newProduct = await Product.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;
