const router = require("express").Router();

const AppController = require("../controllers/apps.controller");

//Apps
router.post("/ads/apps/create", AppController.createApp);
router.get("/ads/apps", AppController.fetchAppList);
router.get("/ads/apps/:id", AppController.fetchAppById);
router.get("/ads/search/apps?", AppController.fetchAppByQuery);
router.put("/ads/apps/updateby/:id", AppController.updateAppById);
router.put("/ads/apps/inactive/:id", AppController.inactiveAppById);


module.exports = router;