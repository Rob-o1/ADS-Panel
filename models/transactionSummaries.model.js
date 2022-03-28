const mongoose = require("mongoose");

const transactionSummarySchema = new mongoose.Schema({
  count: { type: Number },
  last_use: { type: Date },
  // ad: { type: String}
});

module.exports = mongoose.model(
  "Transaction_Summary",
  transactionSummarySchema
);
