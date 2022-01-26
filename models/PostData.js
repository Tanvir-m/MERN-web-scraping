const mongoose = require('mongoose');

const PostDataSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    meta: { type: Array, require: true },
    amImg: { type: String },
    fbImg: { type: String },
    price: { type: String },
    userName: { type: String },
  },
  { timestams: true }
);

module.exports = mongoose.model('PostDataSchema', PostDataSchema);
