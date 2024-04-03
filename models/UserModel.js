const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const usermodelSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    mobileNumber: { type: Number, unique: true },
    address: { type: String, required: true },
    otp: { type: Number, required: true, unique: true }
});
 
module.exports = mongoose.model('UserModel', usermodelSchema);