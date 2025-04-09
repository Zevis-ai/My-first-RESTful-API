const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = {
    signup: (req, res) => {
        const { email, password } = req.body;

        User.find({ email }).then(users =>{
            if (users.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }
            
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    err
                });
            }
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email,
                password: hash
            });
            user.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message: 'User created',
                        user: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        err
                    });
                });
        })
        })
    },

    login: (req, res) => {
        res.status(200).json({
            message: 'Login'
        });
    }
}