const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt  = require('jsonwebtoken');
const User = require('../models/User');
const { check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');

//@route    POST api/auth  
//desc      get loggin user
//@acces    private
router.get('/', auth, async (req, res) => {
   try {
       const user = await User.findById(req.user.id).select('-password');
       res.json(user);
   } catch (err) {
       console.error(err.message);
       res.status(500).send('internal server error');
   }
});

//@route    get api/auth
//desc     auth user and get token
//@acces    public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please password must be at least 6 characters').isLength({min:6})
], 

async (req, res) => {
    //validate the user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array() });
    }

    //deconstruct the user input
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'Email not found'});
        } 

        //if user found compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: 'invalid password please try again'});
        }

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
        console.error(error.message);
        res.status(500).send('internal server error!');
    }
});

module.exports = router;