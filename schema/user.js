const mongoDb = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoDb.Schema;

const userSchema = new schema({
    userName: {
        unique: true,
        required: true,
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    accountNo: {
        unique: true,
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    bankName : {
        required: true,
        type: String
    },
    accountType: {
        type: String,
        enum: ['current', 'saving'],
        default: 'saving'
    },
    currentBalance: {
        required: true,
        type: Number
    },
    otp: {
        type: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    time: {
        type: Date,
        default: Date.now
    },
    beneficiaries : {
        type: mongoDb.Schema.Types.ObjectId,
        ref: "beneficiaries"
    },
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const model = new mongoDb.model('user', userSchema)

module.exports = model;