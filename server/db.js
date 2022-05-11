const mongoose = require('mongoose');
const { DB_URI } = require('./config');

module.exports.Db = () => {
  const mongoDB = DB_URI;
  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Conectado a mongoDB')).catch((err) => console.log(err));
};