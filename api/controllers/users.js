import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = (req, res) => {
    const { email, password } = req.body;

    User.find({ email }).then(users => {
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
                    res.status(200).json({
                        message: 'User created',
                        user: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        err
                    });
                });
        });
    });
};

export const login = (req, res) => {
    const { email, password } = req.body;

    User.find({ email }).then(users => {
        if (users.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        const [user] = users;

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
                    token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    });
};
