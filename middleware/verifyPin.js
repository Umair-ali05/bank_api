const statementModel = require('../schema/transaction.js')
const beneficiaryModel = require("../schema/beneficiaries.js")


async function verifyBeneficiary(req, res) {
    const {
        beneficiaryId,
        pin
    } = req.body
    const verifyPin = await beneficiaryModel.findOne({
        _id: beneficiaryId,
        senderId: accountId,
    });
    if (verifyPin) {
        if (verifyPin.pin == pin) {
            verifyPin.isVerified = true,
                res.status(200).send({
                    success: true,
                    message: "beneficiary is added successfully"
                });
            await verifyPin.save();
        } else {
            res.status(400).send({
                success: false,
                message: "wrong Pin"
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: "wrong transcation id"
        });

    }
}
async function verify(req, res, next) {
    const {
        _id,
        pin
    } = req.body;
    const verifyPin = await statementModel.findOne({
        _id
    });
    
    if (verifyPin) {
        if (verifyPin.pin == pin) {
            verifyPin.isVerified = true,
                await verifyPin.save();
            id = verifyPin._id
            next();
        } else {
            res.status(400).send({
                success: false,
                message: "wrong Pin"
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: "wrong transcation id"
        });

    }
}
module.exports = {
    verify,
    verifyBeneficiary
}