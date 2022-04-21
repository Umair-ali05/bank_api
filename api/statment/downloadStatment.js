const statementModel = require('../../schema/transaction.js')
const ObjectsToCsv = require('objects-to-csv')
// var fileSystem = require("fs");
// var fastcsv = require("fast-csv");

async function downloadStatment(req, res) {
    
    const statment = await statementModel.find({
        isVerified: true
    }).exec();
    const arr= [];
    function newArr(accountNo, amount , type, purpose , time){
    this.accountNo = accountNo;
    this.amount = amount;
    this.type = type;
    this.purpose = purpose;
    this.time = time
}
    for (let data in statment) {
        {
            arr.push(new newArr(statment[data].reciverAccountNo,statment[data].amount,statment[data].type,statment[data].purpose , statment[data].time));
        }
    }
    if (statment != '') {
        res.status(200).send({
            success: true,
            message: "statment generated successfully"
        });
        const csv = new ObjectsToCsv(arr);
        await csv.toDisk('data.csv')
    } else {
        res.status(400).send({
            success: false,
            message: "there is no transcation on till now"
        })
    }
}

module.exports = downloadStatment;