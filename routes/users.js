const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt  = require('jsonwebtoken');
const { check, validationResult} = require('express-validator/check');

//@route    POST api/users
//desc      register a user
//@acces    public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'password must be at least 6 characters').isLength({min:6})
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array() });
    }

    //get the user params 
    const {name, email, password} = req.body;

    try {
        //check if user already exist in the database
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg : 'User already exist'});
        }

        user = new User({
            name, email, password
        });

        //has user password
        const salt  = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save and redirect user
        await user.save();

        
        const payload = {
            user: {
                id: user.id
            }
        }

        //get and return the token from jwt
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        //handle the error message
        console.log(err.message);
        res.status(500).send('internal server error');
    }
});

module.exports = router; 