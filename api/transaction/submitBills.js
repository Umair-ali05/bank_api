const statementModel = require('../../schema/transaction.js');
const userModel = require('../../schema/user.js')
const nodemailer = require('nodemailer')
require('dotenv').config();

async function verifyBillPayment(req, res ) {
    const {
        receiverId,
        amount,
        billType 
    } = req.body;
    const sender = await userModel.findOne({
        _id: accountId
    })
    const receiver = await userModel.findOne({
        _id: receiverId
    });
    if (receiver) {
        if (accountId == receiverId) {
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
                billType,
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

async function payBill(req, res) {
    try {
        const statement = await statementModel.findOne({
            id
        });
        console.log(statement);
        const senderAccount = await userModel.findOne({
            _id: statement.senderAccountDetails
        })
        senderAccount.currentBalance -= await statement.amount;
        senderAccount.save();
        const reciverAccount = await userModel.findOne({
            _id: statement.receiverAccountDetails
        })
        reciverAccount.currentBalance += await statement.amount;
       
        reciverAccount.save();
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
    verifyBillPayment,
    payBill,
}
