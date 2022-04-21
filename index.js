const express = require('express');
const bodyParser = require('body-parser');
const mongoDb = require('mongoose');
const unAuth = require('./route/unAuth.js')
const auth = require('./route/auth.js')
require('dotenv').config();

const {
    PORT,
    MONGO_URL
} = process.env;
const app = express();
app.use(bodyParser.json());
app.use('/unauth' , unAuth);
app.use('/auth' , auth);
mongoDb.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
 
const db = mongoDb.connection;
db.on('err', console.error.bind("thier is a connection err"))

app.listen(PORT, () => {
    console.log(`app is runnig on port ${PORT}`);
})