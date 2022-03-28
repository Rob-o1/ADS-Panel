const router = require("express").Router();

const PlaceController = require("../controllers/advertisementsPlaces.controller");

//places
router.post("/advertisements/place/create", PlaceController.createPlace);
router.get("/advertisements/place/list", PlaceController.fetchPlaceList);
router.get("/ads/place/:id", PlaceController.fetchPlaceById);
router.put("/ads/place/updateby/:id", PlaceController.updatePlaceById);
router.delete("/ads/place/deleteby/:id", PlaceController.deletePlaceById);

module.exports = router;