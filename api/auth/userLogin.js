const userModel = require('../../schema/user.js')
const bcrypt = require("bcrypt");
require('dotenv').config();
var jwt = require('jsonwebtoken');
const {
    SECRET
} = process.env;
async function login(req, res) {
    const {
        userName,
        password
    } = req.body;
    var login = await userModel.findOne({
        userName
    })
    if (!login) {
        res.status(403).send({
            success: false,
            message: "incorrect userName"
        })
    } else if (login.isVerified === true) {
        const check =  bcrypt.compare(password, login.password);
        console.log(check);
        if (!check) {
            res.status(403).send({
                success: false,
                message: "incorrect password"
            })
        } else {
            const token = jwt.sign({
                    id: login._id,
                    userName,
                    password: login.password
                },
                SECRET, {
                    expiresIn: "20h",
                }
            )
            console.log(token);
            res.header('auth', token).send({
                success: true,
                message: "token has been created"
            });
            res.status(200).send();
        }
    } else {
        res.status(403).send({
            success: false,
            message: "not varified"
        })
    }
}

module.exports = login;