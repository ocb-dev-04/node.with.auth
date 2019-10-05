const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validations/schemas');
const bcrypt = require('bcryptjs');

// ROUTES
// CREATE
router.post('/register', async (req, res) => {
    // VALIDATE DATA
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF EMAIL EXIST
    // const emailExist = await User.findOne({ email: req.body.email });
    // if(emailExist) return res.status(400).send("Email already exist");
    
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        console.log('Try to adding...');
        // const createNewUser = await user.save();
        // res.status(200).json({ user: createNewUser._id });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// LOGIN


module.exports = router;