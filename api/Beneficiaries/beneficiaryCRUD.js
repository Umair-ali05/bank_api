const userModel = require('../../schema/user.js')
const beneficiariesModel = require('../../schema/beneficiaries.js')
const nodemailer = require('nodemailer')
require('dotenv').config();

async function add(req, res) {
    const {
        receiverId,
        nickName,
        bankName
    } = req.body
    const checkReceiverId = await userModel.findOne({
        _id: receiverId
    })
    const checkAlreadyBeneficiary = await beneficiariesModel.findOne({
        receiverId
    })
    if (checkAlreadyBeneficiary == null) {
        if (checkReceiverId) {
            if (!receiverId) {
                res.status(400).send({
                    success: false,
                    message: "receiverId is required",
                });
            }
            if (!nickName) {
                res.status(400).send({
                    success: false,
                    message: "NickName in required",
                });
            }
            if (!bankName) {
                res.status(400).send({
                    success: false,
                    message: "Bank Name is required",
                });
            }
            const sender = await userModel.findOne({
                _id: accountId
            })
            if (sender._id == receiverId) {
                res.status(400).send({
                    success: false,
                    message: "you can not add your own account",
                });
            }
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
            //     to: sender.gmail,
            //     subject: "pin verification to send money",
            //     text: `this is your pin ${pin} to send money `,
            // });
            const beneficiaries = await new beneficiariesModel({
                senderId: sender._id,
                receiverId,
                bankName,
                nickName,
                pin
            })
            await beneficiaries.save();
            sender.beneficiaries = beneficiaries,
            await sender.save();
            res.status(200).send({
                message: "verify beneficiary ",
                success: true
            })
        } else {
            res.status(404).send({
                message: "receiver does not found",
                success: false
            })
        }
    } else {
        res.status(404).send({
            message: "alredy beneficiary",
            success: false
        })
    }
}

async function del(req, res) {
    const id = await req.query.id;
    console.log(id);
    if(id){
    const findBeneficiary = await transactionModel.deleteOne({
        _id : id
    }).exec();
    console.log(findBeneficiary);
    if (!findBeneficiary) {
        res.status(404).send({
            message: "beneficiary not fond",
            success: false,
        })
    } else {
        res.status(200).send({
            message: "deleted",
            success: true,
        })
    }}
    else{
        res.status(200).send({
            message: "Id is required",
            success: false,
        })
    }
}

async function get(req, res) {
    const beneficiaries = await beneficiaryModel.find({
        senderId : accountId,
        isVerified: true
    }).exec();
    console.log(accountId);
    if (beneficiaries) {
        res.status(200).send({
            success: true,
            beneficiaries,
            Message: "beneficiaries",
        })
    } else {
        res.status(400).send({
            success: false,
            Allusers,
            Message: "no beneficiary found",
        })
    }
}

async function update(req, res) {
    const {
        nickName
    } = req.body
    const _id = req.query.id;
    const findBeneficiary = await transactionModel.findOne({
        _id,
        isVerified :true
    })
    if(_id){
    if (!findBeneficiary) {
        res.status(404).send({
            message: "Beneficiary not fond",
            success: false,
        })
    } else {
        findBeneficiary.nickName = nickName,
            await findBeneficiary.save();
        res.status(200).send({
            message: "Nick Name has been updated",
            success: true,
        })
    }}else{
        res.status(400).send({
            message: "id is required",
            success: false,
        })
    }
}

module.exports = {
    add,
    del,
    get,
    update
}