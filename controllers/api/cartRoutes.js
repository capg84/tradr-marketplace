const router = require('express').Router();
const { Cart, User, Product } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
console.log("Hello", req.session.id)
        try {
            const products = await Cart.findAll({
                where: {
                    user_id: req.session.user_id
                },
    
                include: [{model: Product }],
    
            });
            
            const cartSerialized = products.map((product) => product.get({ plain: true }));
     
            const obj = { products: cartSerialized, logged_in: req.session.logged_in }
            console.log("products", obj)
            res.render('cart', obj);
    
        } catch (err) {
            res.status(500).json(err);
            
        }
    });



// Adds item to Cart
router.post('/add/:id',  async (req, res) => {
    console.log("hello1-----------------------")
    try {
        const cart = await Cart.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log("userID",req.session.user_id )
        res.status(200).json(cart);
    } catch (err) {git 
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