const statmentModel = require('../../schema/transaction.js')

async function generateStatment(req,res){
    const {
        date
    } = req.body;
    const statment = await statmentModel.find({
        isVerified : true,
        
    }).exec();
    if(statment != ''){
        res.status(200).send({
            statment,
            success: true,
            message: "statment generated successfully"
        })
    } else{
        res.status(400).send({
            success: false,
            message: "there is no transcation on this specific date"
        })
    }
}

module.exports = generateStatment;