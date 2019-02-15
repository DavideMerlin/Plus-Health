const express = require('express');
const sql = require('mssql');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');


const authRouter = express.Router();

// var Info = mongoose.model('Info', {
//     fname: String,
//     lname: String,
//     email: String,
//     phonenumber: String,
//     username: String,
//     password: String,
//     password2: String,
//     profile: String,
//   });


authRouter.route('/signUp')
    .post((req, res) => {
        debug(req.body);
    });

module.exports = authRouter; 