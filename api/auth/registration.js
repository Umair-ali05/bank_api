const userSchema = require('../../schema/user.js');
const nodemailer = require("nodemailer");
require('dotenv').config();

async function register(req, res) {
    console.log("i am running");
    const {
        userName,
        email,
        password,
        name,
        accountType,
        bankName,
        currentBalance
    } = req.body;
    const accountNo = Math.floor(100000000000 + Math.random() * 900000000000);
    if (!userName) {
        res.status(400).send({
            success: false,
            message: "userName is required",
        });
        return;
    }
    if (!email) {
        res.status(400).send({
            success: false,
            message: "mail is required for otp",
        });
        return;
    }
    if (!password) {
        res.status(400).send({
            success: false,
            message: "password is required",
        });
        return;
    }
    if (!name) {
        res.status(400).send({
            success: false,
            message: "Name is required",
        });
        return;
    }
    if (!accountType) {
        res.status(400).send({
            success: false,
            message: "account Type is required",
        });
        return;
    }
    if (!bankName) {
        res.status(400).send({
            success: false,
            message: "bank Name is required",
        });
        return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);
    // const transporter = nodemailer.createTransport({
    //     service: process.env.SERVICE,
    //     auth: {
    //         user: process.env.EMAILNAME,
    //         pass: process.env.EMAILPASSWORD,
    //     }
    // });
    // await transporter.sendMail({
    //     from: process.env.EMAILNAME,
    //     to: email,
    //     subject: "OTP for Login",
    //     text: `this is your otp ${otp} don't forget it `,
    // });
    const userModel = await new userSchema({
        userName,
        email,
        password,
        accountNo,
        name,
        bankName,
        accountType,
        currentBalance,
        otp
    });
    const alreadyUser = await userSchema.findOne({
            userName,
            accountNo
        })
        .exec();
    if (alreadyUser == null) {
        userModel.save();
        res.status(200).send({
            success: true,
            message: "registered successfully",
            user: userModel,
        });
    } else {
        res.status(400).send({
            success: false,
            message: "already user exist",
        });
    }
}

module.exports = register;