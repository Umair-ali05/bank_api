const express = require('express');
const register = require('../api/auth/registration');
const otpVerification = require('../api/auth/otpVerification.js')
const userLogin = require('../api/auth/userLogin.js')
const route = express.Router();

route.post('/user-registration' , register);
route.post('/otp-verification' , otpVerification);
route.post('/user-login' , userLogin);


module.exports = route;