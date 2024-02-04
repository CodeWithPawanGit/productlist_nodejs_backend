const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./middleware/auth');
const cors = require('cors');

const app = express();
const port = 3010;
app.use(cors({
    origin: 'http://localhost:8080', // Replace with your Vue.js client's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
}));

mongoose.connect('mongodb://localhost/architect_rnd', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



const productRoutes = require('./routes/productRoutes'); // Adjust the path as needed


app.use(bodyParser.json());
app.use(productRoutes);
app.use('/auth', authRouter); // Mount the router at /auth path


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;