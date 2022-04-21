const express = require('express');
const auth = require('../middleware/jwt.js');
const sendingMoney = require('../api/transaction/sendmoney.js')
const billPayment = require('../api/transaction/submitBills.js')
const generateStatment = require('../api/statment/generateStatment .js')
const downloadStatment = require('../api/statment/downloadStatment.js')
const beneficiary = require('../api/Beneficiaries/beneficiaryCRUD.js')
const verify = require('../middleware/verifyPin.js')
const route = express.Router();

route.post('/send-money', auth, sendingMoney.initTransaction, sendingMoney.sendMoney);
route.post('/send-money-verification', auth, verify.verify, sendingMoney.sendMoney);
route.post('/bill-pay', auth, billPayment.verifyBillPayment);
route.post('/bill-pay-verification', auth, verify.verify, billPayment.payBill);
route.post('/verify-beneficiary', auth, verify.verifyBeneficiary);
route.get('/generate-statment', auth, generateStatment)
route.get('/download-statment', auth, downloadStatment)
route.post('/add-beneficiaries', auth, beneficiary.add)
route.get('/get-beneficiaries', auth, beneficiary.get)
route.put('/update-beneficiaries', auth, beneficiary.update)
route.delete('/delete-beneficiaries', auth, beneficiary.del)
module.exports = route;