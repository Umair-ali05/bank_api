const userSchema = require('../../schema/user.js');

async function otpVerification(req , res){
    const {
        userName,
        otp
    } = req.body;
    const verify = await userSchema.findOne({
        userName
    });
    if (verify == null) {
        res.status(404).send({
            success: false,
            message: "User does not found"
        });
    } else if (verify.otp == otp) {
        verify.isVerified = true,
        await verify.save();
        res.status(200).send({
            success: true,
            message: "you registered successfully"
        });
    } else{
        res.status(400).send({
            success : false,
            message : "wrong otp"
        });
    }
}

module.exports = otpVerification;