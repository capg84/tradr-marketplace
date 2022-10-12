const router = require('express').Router();
const { Product, User, Category } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
        console.log(userData);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id);
      
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      const product = productData.get({ plain: true });
      console.log(product);
      res.render('editlisting', {
        product,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});  

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  