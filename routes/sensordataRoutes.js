const express = require('express');
const router = express.Router();
// const cron = require('node-cron');
const app = express();
const http = require('http');
const server = http.createServer(app);



const {
  sensordataHandler,
  storeddataHandler,
  livedataHandler,
} = require('../controllers/sensordataController');


router.post('/sensordata', sensordataHandler); // To post  sensor data to server

router.get('/storeddata', storeddataHandler); // to get by date and time from server

router.get('/livedata', livedataHandler);  // To get live sensor data from server

module.exports = router;
