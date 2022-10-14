const router = require('express').Router();
const { Address } = require('../../models')
const withAuth = require('../../utils/auth');

// api/addresses
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newAddress = await Address.create({ ...body, userId: req.session.userId });
    res.json(newAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});


// api/addresses/:id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [addressArr] = await Address.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (addressArr > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [addressArr] = Address.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (addressArr > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
