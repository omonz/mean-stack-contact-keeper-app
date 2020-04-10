const express = require('express');
const router = express.Router();

//@route    POST api/auth
//desc      get loggin user
//@acces    private
router.get('/', (req, res) => {
    res.send('Get Logged user')
});

//@route    get api/auth
//desc     auth user and get token
//@acces    public
router.post('/', (req, res) => {
    res.send('Get token')
});

module.exports = router;