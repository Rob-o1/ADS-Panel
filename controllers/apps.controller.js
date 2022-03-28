const mongoose = require('mongoose');
const AppSchema = require("../models/apps.model");
const date = new Date();

//Create Advertisement App
exports.createApp = async (req, res) => {
  try {
    if (req.body.name != undefined) {
      let insertData = {
        name: (req.body.name),
        status: "active",
        modify_date_time: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
      }
      const createApp = new AppSchema(insertData);
      const newApp = await createApp.save();
      return res.status(201).json({ success: true, message: "Created successfully", data: newApp });
    } else {
      return res.status(400).json({ success: false, message: "Must enter your app name" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//Fetch Or Get Advertisement App List
exports.fetchAppList = async (req, res) => {
  try {
    var mysort = { name: 1 };
    const AppList = await AppSchema.find().sort(mysort);
    return res.status(200).json({ success: true, data: AppList });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Fetch Or Get Advertisement App By ID
exports.fetchAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchApp = await AppSchema.findById({ _id: _id });
    if (!fetchApp) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      return res.status(200).json({ success: true, data: fetchApp });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

//// Fetch Or Get Advertisement App By Query
exports.fetchAppByQuery = async (req, res) => {
  try {
    const fetchApp = await AppSchema.find(req.query);
    return res.status(200).json({ success: true, data: fetchApp });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Update Advertisement App By ID
exports.updateAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchApp = await AppSchema.findById({ _id: _id });
    if (!fetchApp) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      let insertData = {
        name: req.body.name,
        modify_date_time: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
      }
      const updateApp = await AppSchema.findByIdAndUpdate(_id, insertData, { new: true });
      return res.status(201).json({ success: true, message: "Updated Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

// Inactive Advertisement App By ID
exports.inactiveAppById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchApp = await AppSchema.findById({ _id: _id });
    if (!fetchApp) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      let inactiveStatus = {
        status: "inactive",
        modify_date_time: (new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString())
      }
      const inactiveAppStatus = await AppSchema.findByIdAndUpdate(_id, inactiveStatus, { new: true });
      return res.status(200).json({ success: true, message: "App Inactive" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}


// Delete Advertisement App By ID
// exports.deactivateAppById = async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const deleteApp = await AppSchema.findByIdAndDelete(_id);
//     res.status(200).json({ status: "success", message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error occured", data: error });
//   }
// }