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
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a listing api/product/:id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const productData = Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
