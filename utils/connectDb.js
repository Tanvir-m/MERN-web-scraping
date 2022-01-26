const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log('Database connection error', err);
  });

module.exports = mongoose;
