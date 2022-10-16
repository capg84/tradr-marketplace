const router = require('express').Router();
const { Wishlist, Product } = require('../../models');
const { afterBulkCreate } = require('../../models/User');
const withAuth = require('../../utils/auth');


router.get('/', withAuth, async (req, res) => {

    try {
        const products = await Wishlist.findAll({
            where: {
                user_id: req.session.user_id
            },

            include: [{model: Product }],
    
            });
            
            const cartSerialized = products.map((product) => product.get({ plain: true }));
            const obj = { products: cartSerialized, logged_in: req.session.logged_in, name: req.session.first_name }

            res.render('wishlist', obj);
    
        } catch (err) {
            res.status(500).json(err);
            
        }
});


// Adds item to wishlist

router.post('/add/:id', withAuth,  async (req, res) => {


    try {
        const wishlist = await Wishlist.create({
            product_id: req.params.id,
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
            },
        });
        if (!wishlist) {
            res.status(404).json({ message: 'No product found' });
            return;
        }
        res.status(200).json(wishlist);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});



module.exports = router;