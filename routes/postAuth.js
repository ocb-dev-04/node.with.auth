const router = require('express').Router();
const verify = require('./verifyToken');

const User = require('../model/User');

router.get('/', verify, async (req, res) => {
    // IF YOU NEED ID OF USER  FOR FIND IN DB USE THIS
    const userId = req.user;

    // FIND ON DB
    const userInfo = await User.findOne({ _id: userId});
    
    // RETURN USER INFO OR SOMETHING WHAT YOU NEED
    res.status(200).send(userInfo);
    // res.json({
    //     post: {
    //         title: 'My first post',
    //         description: 'Ramdon data you shouldnt access'   
    //     }
    // });
});

module.exports = router;