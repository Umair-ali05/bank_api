const mongoDb = require('mongoose');
const beneficiariesSchema = mongoDb.Schema;

const beneficiaries = new beneficiariesSchema({
    senderId : {
        type : String,
        required : true
    },
    receiverId : {
        type : String,
        required : true
    },
    nickName : {
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

const model = new mongoDb.model('beneficiaries', beneficiaries)

module.exports = model;