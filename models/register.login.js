const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    username: String,
    email: String,
    location: String,
    password: String,
    date_of_birth: String,
    confirm_password: String,
    role: String

})


// {
//       "username": "ayushi",
//       "date_of_birth": "2001-12-03",
//       "role": "student",
//       "location": "goa",
//       "password": "123",
//       "email": "soniayushi345@gmail.com",
//       "confirm_password": "123"
//      }

const userModel = mongoose.model('users', userschema);

module.exports = { userModel };