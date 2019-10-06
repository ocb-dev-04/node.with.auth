const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validations/schemas');


// ROUTES
// CREATE
router.post('/register', async (req, res) => {
    // VALIDATE DATA
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // CHECK IF EMAIL EXIST
    const emailExist = await User.findOne({ email: req.body.email });
    if(emailExist) return res.status(400).send("Email already exist");
    
    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const createNewUser = await user.save();
        res.status(200).json({ user: createNewUser._id });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    // VALIDATE
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // EMAIL EXIST
    const emailExist = await User.findOne({ email: req.body.email });
    if(!emailExist) return res.status(400).send('Email is not found');

    // PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, emailExist.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // CREATE AND ASSING A TOKEN
    const token = jwt.sign({ 
        _id: emailExist._id }, 
        process.env.JWT_KEY);

    res.status(200).header('auth-token', token).send(token);
});

module.exports = router;