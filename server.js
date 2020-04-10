const express = require('express');
const app = express();
app.get('/', (req, res) => 
    res.json({ greetings: 'this is noce'})
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
