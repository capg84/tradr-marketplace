const router = require('express').Router();
const { Cart, User, Product } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {

        try {
            const products = await Cart.findAll({
                where: {
                    user_id: 2
                },
    
                attributes: ['id', 'product_id'],
                include: [{ model: User, attributes: ['id'] },
                {model: Product, attributes: ['id', 'Product_name', 'image', 'description', 'price'] }],
    
            });

            const cartSerialized = products.map((product) => product.get({ plain: true }));
            const obj = { products: cartSerialized, logged_in: req.session.logged_in }
            console.log(obj)
            res.render('cart', obj);
    
        } catch (err) {
            res.status(500).json(err);
            
        }
    });

// Adds item to Cart
router.post('/add', withAuth, async (req, res) => {

    try {
        const cart = await Cart.create({
            product_id: req.body.id,
            user_id: req.session.user_id,
            quantity: req.body.quantity
          
        });

        res.json(cart)
    } catch (err) {
        res.status(500).json(err)
    }
});


// Deletes item from Cart
router.delete('/delete/:id', withAuth, async (req, res) => {

    try {
        const cart = await Cart.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });
        if (!cart) {
            res.status(404).json({ message: 'No product found' });
            return;
        }
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;