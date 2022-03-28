const TransactionDetailSchema = require("../models/transactionDetails.model");

// Create Advertisement Transaction Detail
exports.createTransaction = async (req, res) => {
  try {
    if(req.body.username != undefined && req.body.mobile != undefined && req.body.email != undefined){
      let insertData = {
        username: req.body.username,
        mobile: req.body.mobile,
        email: req.body.email,
        locality: req.body.locality,
        city: req.body.city,
        state: req.body.state,
        ad: req.body.ad,
        on_date: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
      }
      const createTransactionDetail = new TransactionDetailSchema(insertData);
      const newTransactionDetail = await createTransactionDetail.save();
      return res.status(201).json({ success: true, message: "Created successfully", data: newTransactionDetail });
    }else {
      return res.status(400).json({ success: false, message: "Must enter your transaction details" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", data: error });
  }
}

// Fetch Or Get Advertisement Transaction Detail List
exports.fetchTransactionDetailList = async (req, res) => {
  try {
    var mysort = { username: 1 };
    const TransactionDetailList = await TransactionDetailSchema.find().sort(mysort);
    return res.status(200).json({ success: true, data: TransactionDetailList});
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

// Fetch Or Get Advertisement Transaction Detail By ID
exports.fetchTransactionDetailById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchTransactionDetail = await TransactionDetailSchema.findById({_id: _id});
    if (!fetchTransactionDetail) {
      return res.status(404).json({ success: false, message: "404 Not Found"});
    } else {
      return res.status(200).json({ success: true, data: fetchTransactionDetail});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

// Update Advertisement Transaction Detail By ID
exports.updateTransactionDetailById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchTransactionDetail = await TransactionDetailSchema.findById({_id:_id});
    if (!fetchTransactionDetail) {
      return res.status(404).json({ success: false, message: "404 Not Found"});
    } else {
      let insertData = {
        username: req.body.username,
        mobile:req.body.mobile,
        email:req.body.email, 
        locality:req.body.locality, 
        city:req.body.city,
        state:req.body.state
      }
      const updateTransactionDetail = await TransactionDetailSchema.findByIdAndUpdate(_id, insertData, {new: true});
      return res.status(201).json({success: true, message: "Updated Successfully"});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

// Delete Advertisement Transaction Detail By ID
exports.deleteTransactionDetailById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchTransactionDetail = await TransactionDetailSchema.findById({_id:_id});
    if(!fetchTransactionDetail){
      return res.status(404).json({ success: false, message: "404 Not Found"});
    }else {
      const deleteTransactionDetail = await TransactionDetailSchema.findByIdAndDelete(_id);
      return res.status(200).json({ success: true, message: "Deleted Successfully"});
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}
