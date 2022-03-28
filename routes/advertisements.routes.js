const router = require("express").Router();

const AdvertisementController = require("../controllers/advertisements.controller");

const {advertisementValidation} = require('../valiadation/advertisement.validation');
const {advertisementUpdateValidation} = require('../valiadation/advertisementUpdate.validation');
const {uploadFiles} = require('../middleware/upload');
const {updateUploadFiles} = require('../middleware/upload.update');
//Advertisements_Portal
  // router.post("/ads/createAdvertise",upload.fields([{
  //   name: 'images', maxCount: 10
  // }, {
  //   name: 'videos', maxCount: 10
  // }]) ,AdvertisementsController.createAdvertise);

router.post("/ads/create", advertisementValidation, uploadFiles, AdvertisementController.createAdvertisement);
router.get("/ads/list", AdvertisementController.fetchAdvertisementList);
router.get("/ads/:id", AdvertisementController.fetchAdvertisementById);
router.put("/ads/updateby/:id", advertisementUpdateValidation, updateUploadFiles, AdvertisementController.updateAdvertisementById);
router.delete("/ads/deleteby/:id", AdvertisementController.deleteAdvertisementById);

router.get("/search/ads?", AdvertisementController.fetchAdvertisementByQuery);

//Generate Random String
// router.get("/testRandom", AdvertisementController.testRandom);





// router.get("/ads/searchby/appid/placeid", AdvertisementController.getAdvertiseByQuery);

module.exports = router;