const express = require('express');
const router = express.Router();

const { check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

//@route    GET api/contact
//desc      get users contact
//@acces    private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal server error');
        
    }
});

//@route    POST api/contact
//desc      add new contact
//@acces    private
router.post('/',[auth, [
    check('name', 'Please enter the contact name').not().isEmpty()
]], async (req, res) => {
    //validate the user input
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json( {errors: errors.array() });
    }
    
    const {name, email, phone, type} = req.body;
    try {
        const newContact = await new Contact({ name, email, phone, type, user: req.user.id });
        const contact = await newContact.save();
        res.send(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('internal sever error');
    }
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