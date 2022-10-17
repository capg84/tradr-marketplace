const router = require('express').Router();
const { Cart, Product, Purchase } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {

    try {
        const products = await Cart.findAll({
            where: {
                user_id: req.session.user_id
            },

            include: [{ model: Product }],

        });

        const prices = []
        const cartSerialized = products.map((product) => product.get({ plain: true }));

        for (let i = 0; i < cartSerialized.length; i++) {

            let price = parseInt(cartSerialized[i].product.price)
            prices.push(price)
        }

        let total = 0;
        for (let i = 0; i < prices.length; i++) {

            total += prices[i];

        }

        const obj = {
            products: cartSerialized,
            price: total,
            logged_in: req.session.logged_in,
            name: req.session.first_name
        }

        res.render('cart', obj);

    } catch (err) {
        console.log(err)
        res.status(500).json(err);

    }
});



// Adds item to Cart
router.post('/add/:id', withAuth, async (req, res) => {

    try {
        const cart = await Cart.create({
            quantity: 1,
            user_id: req.session.user_id,
            product_id: req.body.product_id,

        });

        res.status(200).json(cart);
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});


// Deletes item from Cart
router.delete('/delete/:id', withAuth, async (req, res) => {

    try {
        const cart = await Cart.destroy({
            where: {
                id: req.params.id,
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



// Deletes all items from Cart
router.delete('/checkout/:id', withAuth, async (req, res) => {

    try {
        const cart = await Cart.destroy({
            where: {
                user_id: req.params.id,
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