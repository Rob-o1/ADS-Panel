const TransactionSummarySchema = require("../models/transactionSummaries.model");
const AdvertisementSchema = require("../models/advertisements.model");

// Create Advertisement Transaction Summary 
exports.createTransactionSummary = async (req, res) => {
  try {
    let countAdvertisement = await AdvertisementSchema.find().count();
    let insertData = {
            count : countAdvertisement,
            // ad: (req.body.ad),
            last_use: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
    }
    const createTransactionSummary = new TransactionSummarySchema(insertData);
    const newTransactionSummary = await createTransactionSummary.save();
    return res.status(201).json({ success: true, message: "Created successfully", data: newTransactionSummary });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetch Or Get Advertisement Transaction Summary List
exports.fetchTransactionSummaryList = async (req, res) => {
  try {
    var mysort = { last_use: 1 };
    const fetchTransactionSummaryList = await TransactionSummarySchema.find().sort(mysort);
    return res.status(200).json({ success: true, data: fetchTransactionSummaryList });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetch Or Get Advertisement Transaction Summary By ID
  // exports.fetchTransactionSummaryById = async (req, res) => {
  //   try {
  //     const _id = req.params.id;
  //     const fetchTransactionSummary = await TransactionSummarySchema.findById({_id:_id});
  //     if(!fetchTransactionSummary){
  //       return res.status(404).json({ success: false, message: "Not Found"});
  //     }else {
  //      return res.status(200).json({ success: true, data: fetchTransactionSummary});
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ success: false, message: "Internal Server Error"});
  //   }
  // }

// Update Advertisement Transaction Summary By ID 
exports.updateTransactionSummaryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchTransactionSummary = await TransactionSummarySchema.findById({_id:_id});
    if(!fetchTransactionSummary){
      return res.status(404).json({ success: false, message: "Not Found"});
    }else{
      let insertData = {
        count: countAdvertisement,
        // ad: (req.body.ad),
        last_use: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
      }
      const updateTransactionSummary = await TransactionSummarySchema.findByIdAndUpdate(_id, insertData, { new: true });
      return res.status(201).json({ success: true, message: "Updated Successfully"});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

// Delete Advertisement Transaction Summary By ID 
exports.deleteTransactionSummaryById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchTransactionSummary = await TransactionSummarySchema.findById({_id:_id});
    if (!fetchTransactionSummary) {
      return res.status(404).json({ success: false, message: "Not Found"});
    } else {
      await TransactionSummarySchema.findByIdAndDelete(_id);
      return res.status(200).json({ success: true, message: "Deleted Successfully"});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}
