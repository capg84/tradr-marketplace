const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const paymentRoutes = require("./paymentRoutes");


router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/payment", paymentRoutes);
router.use("/api", apiRoutes);



module.exports = router;
