const router = require('express').Router();
const { User } = require('../models');

// function to log user in
router.post('/session', async (req, res) => {

    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log(userData, 100)
        if (!userData) {

            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        console.log(req.body.password, 200)
        const validPassword = await userData.checkPassword(userData.password);
        console.log(validPassword, 300)
        if (!validPassword) {

            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        console.log(400)
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

module.exports = router;