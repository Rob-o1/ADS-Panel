const mongoose = require("mongoose");

const advertisementsPlacesSchema = new mongoose.Schema({
//   _id : mongoose.Schema.Types.ObjectId,
 name: { type: String, uppercase: true },
  max_Add_Count: { type: Number, default: 1 }
});

module.exports = mongoose.model("places", advertisementsPlacesSchema);
