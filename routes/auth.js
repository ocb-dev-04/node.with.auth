const router = require('express').Router();
const User = require('../model/User');

// ROUTES
router.post('/register', async (req, res) => {
    console.log('Acces to create a user');
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
console.log('user created');
    try {
        const addUser = await user.save();
        console.log('User saved');
        res.status(200).send(addUser);
    } catch (error) {
        console.log('Some error ocurred');
        res.status(400).send({ message: err });
    }
    console.log('all code run!!');
});

module.exports = router;