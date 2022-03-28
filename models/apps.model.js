const mongoose = require("mongoose");
// var Schema = mongoose.Schema;  
// var ObjectId = Schema.ObjectId;  

const AppSchema = new mongoose.Schema({
  name: { type: String, uppercase: true },
  status: { type: String, default: "Active" },
  modify_date_time: { type: Date },
});

module.exports = mongoose.model("app", AppSchema);