const mongoose = require('mongoose');
const AdvertisementsPlacesSchema = require("../models/advertisementsPlaces.model");

  //Create Advertisement Place
exports.createPlace = async (req, res) => {
  try {
    if (req.body.name != undefined){
      let insertdata = {
        name : req.body.name,
        max_Add_Count : req.body.max_Add_Count
      }
      const createPlace = new AdvertisementsPlacesSchema(insertdata);
      const newPlace = await createPlace.save();
      return res.status(201).json({ success: true, message: "Created successfully", data: newPlace });
    }else{
      return res.status(400).json({ success: false, message: "Must enter your place name" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

  //Fetch or Get Advertisement Place List
exports.fetchPlaceList = async (req, res) => {
  try {
    var mysort = { name: 1 };
    const PlaceList = await AdvertisementsPlacesSchema.find().sort(mysort);
    return res.status(200).json({ success: true, data: PlaceList });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

//Fetch or Get Advertisement Place By ID
exports.fetchPlaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchPlace = await AdvertisementsPlacesSchema.findById({ _id: _id });
    if (!fetchPlace) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      return res.status(200).json({ success: true, data: fetchPlace });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

//Update Advertisement Place By ID
exports.updatePlaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchPlace = await AdvertisementsPlacesSchema.findById({ _id: _id });
    if (!fetchPlace) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      let insertdata = {
        name : req.body.name,
        max_Add_Count : req.body.max_Add_Count
      }
      const updatePlace = await AdvertisementsPlacesSchema.findByIdAndUpdate(_id, insertdata, {new: true});
      return res.status(201).json({ success: true, message: "Updated Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

//Delete Advertisement Place By ID
exports.deletePlaceById = async (req, res) => {
  try {
    const _id = req.params.id;
    const fetchPlace = await AdvertisementsPlacesSchema.findById({ _id: _id });
    if (!fetchPlace) {
      return res.status(404).json({ success: false, message: "404 Not Found" });
    } else {
      const deletePlace = await AdvertisementsPlacesSchema.findByIdAndDelete(_id);
      return res.status(200).json({ success: true, message: "Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}
