const router = require('express').Router();
<<<<<<< HEAD
=======
const { Wishlist, Cart } = require('../../models');
const withAuth = require('../../utils/auth');

// Adds item to Cart
router.post('/add', withAuth, async (req, res) => {

    try {
        const wishlist = await Cart.create({
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


>>>>>>> main

module.exports = router;