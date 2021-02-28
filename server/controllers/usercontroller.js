const router = require('express').Router();
//const {UniqueConstraintError} = require('sequelize/types');
const {UserModel} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UniqueConstraintError} = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    let {username, passwordhash} = req.body;

    try {
        const newUser = await UserModel.create({
            username,
            passwordhash: bcrypt.hashSync(passwordhash, 13)
        })

        const token = jwt.sign({
            id: newUser
        },
        process.env.JWT_SECRET,
        {expiresIn: 60*60*24});

        res.status(201).json({
            message: "user created",
            user: newUser,
            token
        })
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username Unavailable"
            })
        } else {
            res.status(500).json({
                error: `Failed ${err}`
            })
        }
    }
});

router.post('/login', async (req, res) => {
    const {username, passwordhash} = req.body;

    try {
        let loginUser = await UserModel.findOne({
            where: {
                username
            }
        });

        if (loginUser) {
            let passCompare = await bcrypt.compare(passwordhash, loginUser.passwordhash);
            if(passCompare) {
                let token = jwt.sign({
                    id: loginUser.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 60*60*24
                });

                res.status(200).json({
                    user: loginUser,
                    message: "Logged in",
                    token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect Username or Password"
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect Email or Password"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: `Error logging in ${err}`
        });
    }
});

module.exports = router;