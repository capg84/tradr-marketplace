const router = require('express').Router();
const { Wishlist, User, Product } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
    console.log(req, "hello")
        try {
            const blogs = await Wishlist.findAll({
                where: {
                    user_id: req.session.user_id
                },
    
                attributes: ['id'],
                include: [{ model: User, attributes: ['id'] },
            {model: Product, attributes: ['id', 'Product_name', 'description', 'price', 'stock'] }],
    
            });
            console.log(req, "hello")
            const wishlistSerialized = products.map((product) => product.get({ plain: true }));
            const obj = { products: wishlistSerialized, logged_in: req.session.logged_in }
            console.log(obj, "hello")
            res.render('wishlist', obj);
    
        } catch (err) {
            res.status(500).json(err);
        }
    });


// Adds item to wishlist
router.post('/add', withAuth, async (req, res) => {

    try {
        const wishlist = await Wishlist.create({
            product_id: req.body.id,
            user_id: req.session.user_id
          
        });

        res.json(wishlist)
    } catch (err) {
        res.status(500).json(err)
    }
});




// Deletes item from wishlist
router.delete('/delete/:id', withAuth, async (req, res) => {

    try {
        const wishlist = await Wishlist.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!wishlist) {
            res.status(404).json({ message: 'No product found' });
            return;
        }
        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;