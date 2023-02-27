const mongoose = require('mongoose');

const connectDB = (url) =>
    mongoose.connect(url).then(() => console.log('DB CONNECTED'));

module.exports =  connectDB;