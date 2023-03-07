const mongoose = require('mongoose');

const connectDB = (url) =>
  mongoose.connect(url).then(({ connection }) => console.log(`DB CONNECTED host: ${connection.host} 🚀🚀🚀`));

module.exports = connectDB;
