const express=require('express');

const router =express.Router();

const Authorization=require("../middlewares/check-auth"); 

const sensorDataController=require('../controllers/sensordataController')


router.get("/hello",sensorDataController.hello);
router.post("/posttest",sensorDataController.posttest);
router.post("/sensordata",sensorDataController.sensordataHandler);
router.get("/sensordata",sensorDataController.getdataHandler);


module.exports = router;