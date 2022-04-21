const mongoDb = require('mongoose');
const statementSchema = mongoDb.Schema;

const statement = new statementSchema({
    receiverId : {
        type: String,
    },
    senderAccountDetails : {
        type: mongoDb.Schema.Types.ObjectId,
        ref: "user"
    },
    receiverAccountDetails : {
        type: mongoDb.Schema.Types.ObjectId,
        ref: "user"
    },
    amount : {
        type: Number,
        required :true
    },
    type :{
        enum : [ 'bill' , 'pay any one'],
        type : String,
        default : 'pay any one'
    },
    purpose : {
        enum : [ 'fee', 'family' , 'business' , 'education' ,],
        type : String,
    },
    billType : {
        enum : [ 'internet', 'challan' , 'water' , 'gass' , 'electricity'],
        type : String,
    },
    time : {
        type : String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    pin : {
        type : Number
    },
    
})

const model = new mongoDb.model('statement', statement)

module.exports = model;