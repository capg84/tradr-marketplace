const router = require("express").Router();
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const categoryRoutes = require("./categoryRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const addressRoutes = require('./addressRoutes');

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/category", categoryRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/addresses", addressRoutes);

module.exports = router;
