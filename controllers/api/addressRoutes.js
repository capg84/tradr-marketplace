const router = require('express').Router();
const { Address } = require('../../models')
const withAuth = require('../../utils/auth');

// api/addresses
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
      const newAddress = await  Address.create({ ...body, user_id: req.session.user_id });
      res.json(newAddress);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// api/addresses/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
      const addressData = await Address.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!addressData) {
          res.status(404).json({ message: 'No address found with this id!' });
          return;
        }
    
      res.status(200).json(addressData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const addressData = Address.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!addressData) {
          res.status(404).json({ message: 'No address found with this id!' });
          return;
        }
    
        res.status(200).json(addressData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
