const mongoose = require("mongoose");
const validator = require("validator");

const transactionDetailSchema = new mongoose.Schema({
  username: { type: String},
  mobile: { type: String},
  email: { type: String},
  // mobile: { type: String, validate(value) {
  //   if (!validator.isMobilePhone(value)) {
  //    throw new Error('Phone is invalid');
  //   }
  //  }},
  // email: {
  //   type: String,
  //   lowercase:true,
  //   trim: true,
  //   unique: [true, "Email already present"],
  //   validate(value) {
  //     if (!validator.isEmail(value)) {
  //       throw new Error("Invalid Email");
  //     }
  //   },
  // },
  locality: {type:String},
  city: {type:String},
  state: {type:String},
  ad: { type: String },
  on_date: { type: Date }
});

module.exports = mongoose.model("Transaction_Detail", transactionDetailSchema);
