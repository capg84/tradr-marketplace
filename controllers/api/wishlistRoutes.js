const router = require('express').Router();
const { Wishlist, User, Product } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {

    try {
        const productData = await Wishlist.findAll({
            where: {
                user_id: 2
            },

            attributes: ['id', 'product_id'],
            include: [{ model: User, attributes: ['id'] },
            { model: Product, attributes: ['id', 'Product_name', 'image', 'description', 'price'] }],

        });

        const wishlistSerialized = productData.map((product) => product.get({ plain: true }));
        const products = { products: wishlistSerialized, logged_in: req.session.logged_in }
        console.log(products)
       
        res.render('wishlist', products);

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
    console.log("hello")

    try {
        const wishlist = await Wishlist.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
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