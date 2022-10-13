const router = require('express').Router();
const {Product} = require('../../models');
const withAuth = require('../../utils/auth');

// create a listing api/products
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newProduct = await Product.create({ ...body, user_id: req.session.user_id });
    res.json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a listing api/product/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [productArr] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (productArr > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a listing api/product/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [productArr] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (productArr > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
