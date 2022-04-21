const statementModel = require("../../schema/transaction.js")
const userModel = require('../../schema/user.js')
const beneficiaryModel = require("../../schema/beneficiaries.js")
const nodemailer = require('nodemailer');
const { path } = require("express/lib/application");
require('dotenv').config();

async function initTransaction(req, res, next) {
    const {
        receiverId,
        amount,
        purpose
    } = req.body;
    const sender = await userModel.findOne({
        _id: accountId
    })
    const receiver = await userModel.findOne({
        _id: receiverId
    });
    const verifyBeneficiary = await beneficiaryModel.findOne({
        senderId: sender._id,
        receiverId: receiver._id,
        isVerified: true
    })
    if (receiver) {
        if (sender._id == receiverId) {
            res.status(400).send({
                success: false,
                message: "self sending err"
            })
        }
        if (sender.currentBalance < amount) {
            res.status(400).send({
                success: false,
                message: "balance is in sufficient"
            })
        } else if (verifyBeneficiary != null) {
            const date = new Date().toLocaleString("en-US");
            getdate = date.split(',', 1)
            transcationDate = getdate.toString();
            const statement = await new statementModel({
                senderAccountDetails: sender._id,
                receiverAccountDetails: receiverId,
                purpose,
                amount,
                pin: verifyBeneficiary.pin,
                isVerified: verifyBeneficiary.isVerified,
                time: transcationDate
            })
            statement.save();
            id = statement._id
            next();
        } else {
            const pin = Math.floor(1000 + Math.random() * 9000);
            // const transporter = nodemailer.createTransport({
            //     service: process.env.SERVICE,
            //     auth: {
            //         user: process.env.GMAILNAME,
            //         pass: process.env.GMAILPASSWORD,
            //     }
            // });
            // await transporter.sendMail({
            //     from: process.env.GMAILNAME,
            //     to: reciver.gmail,
            //     subject: "pin verification to send money",
            //     text: `this is your pin ${pin} to send money `,
            // });
            const date = new Date().toLocaleString("en-US");
            getdate = date.split(',', 1)
            const transcationDate = getdate.toString();
            const statement = await new statementModel({
                senderAccountDetails: sender._id,
                receiverAccountDetails: receiverId,
                purpose,
                amount,
                pin,
                time: transcationDate
            })
            const transactionId = await statement._id;
            res.status(200).send({
                transactionId,
                success: true,
                message: "pin has been sended"
            })
            statement.save();
        }
    } else {
        res.status(400).send({
            success: false,
            message: "Account not found"
        })
    }
}

async function sendMoney(req, res) {
    try {
        const statement = await statementModel.findOne({
            id
        }).populate({
            path: "senderAccountDetails",
        }).populate({
            path: "receiverAccountDetails",
        });
        const senderCurrentBalance = statement.senderAccountDetails.currentBalance - statement.amount
        const receiverCurrentBalance = statement.receiverAccountDetails.currentBalance + statement.amount
        await userModel.findOneAndUpdate({
            _id: statement.senderAccountDetails
        }, {
            currentBalance: senderCurrentBalance
        }, { new: true })
        const reciverAccount = await userModel.findOneAndUpdate({
            _id: statement.receiverAccountDetails,
        }, { currentBalance: receiverCurrentBalance }, { new: true })
        console.log(reciverAccount);
        res.status(200).send({
            success: true,
            message: "money has sended"
        })
        // const transporter = nodemailer.createTransport({
        //     service: process.env.SERVICE,
        //     auth: {
        //         user: process.env.GMAILNAME,
        //         pass: process.env.GMAILPASSWORD,
        //     }
        // });
        // await transporter.sendMail({
        //     from: process.env.GMAILNAME,
        //     to:reciverAccount.gmail,
        //     subject: "alert",
        //     text: `you just send rupees ${statement.amount} to account ${statement.reciverAccountNo},  thaks for using our service`,
        // });
    } catch {
        res.status(400).send({
            success: false,
            message: "there is an err with the rerquest"
        })
    }
}
module.exports = {
    sendMoney,
    initTransaction
}