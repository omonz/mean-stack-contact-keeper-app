const express = require('express');
const router = express.Router();

//@route    GET api/contact
//desc      get users contact
//@acces    private
router.get('/', (req, res) => {
    res.send('get all contact')
});

//@route    POST api/contact
//desc      add new contact
//@acces    private
router.post('/', (req, res) => {
    res.send('add new contact')
});

//@route    PUT api/contact/:id
//desc      update contact
//@acces    private
router.put('/:id', (req, res) => {
    res.send('update contact')
});

//@route    DELETE api/contact/:id
//desc      delete contact
//@acces    private
router.delete('/:id', (req, res) => {
    res.send('delete a contact')
});


module.exports = router;