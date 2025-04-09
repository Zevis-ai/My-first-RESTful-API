const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { token } = require('morgan');
const jwt = require('jsonwebtoken');

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
        const { email, password } = req.body;
        User.find({ email }).then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            const [ user ] = users
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            id: user._id,
                            email: user.email
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        "token": token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
    }
}