const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const paymentRoutes = require("./paymentRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/payment", paymentRoutes);
router.use("/api", apiRoutes);
router.use("/login", loginRoutes);


module.exports = router;
