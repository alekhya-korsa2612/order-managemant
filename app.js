const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const OrderRoute = require('./routes/OrderRoute');
const ProductRoute = require('./routes/ProductRoute');
const UserRoute = require('./routes/UserRoute')
const mongodb = require('mongodb');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', OrderRoute);
app.use('/api', UserRoute);
app.use('/api', ProductRoute);

const uri = 'mongodb+srv://korsaalekhya516:6bA91pJwoK0rGY6w@cluster0.wq9diur.mongodb.net/';
mongoose.connect(uri, {

})
.then(() => {
  console.log('Connected to MongoDB Atlas with Mongoose');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
  console.log(orderId);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${7000}`);
});

