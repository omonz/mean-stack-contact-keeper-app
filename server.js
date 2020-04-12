const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect database
connectDB();

app.get('/', (req, res) => 
    res.json({ greetings: 'this is noce'})
); 

app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));