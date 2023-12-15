const SensorData = require("../models/sensordata");
const moment = require('moment-timezone');

const sensordataHandler = async (req, res) => {
    const { temperature, humidity, flame, gas, aqi, ldr, ir, uv } = req.body;

    try {
        const currentUTC = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istTimestamp = new Date(currentUTC.getTime() + istOffset);

        const newSensorData = new SensorData({
            temperature: temperature,
            humidity: humidity,
            flame: flame,
            gas: gas,
            aqi: aqi,
            ldr: ldr,
            ir: ir,
            uv: uv,
            createdAt: istTimestamp.toISOString(),
        });

        await newSensorData.save();

        res.status(200).json({
            message: "Data updated successfully!!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Updating Data Failed",
        });
    }
};

const livedataHandler = async (req, res) => {
    try {
        const sensordata = await SensorData.find().sort({ createdAt: -1 });
        console.log(sensordata);

        const data = {
            temperature: sensordata[0].temperature,
            humidity: sensordata[0].humidity,
            flame: sensordata[0].flame,
            gas: sensordata[0].gas,
            aqi: sensordata[0].aqi,
            ldr: sensordata[0].ldr,
            ir: sensordata[0].ir,
            uv: sensordata[0].uv,
        };

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Getting Data Failed",
        });
    }
};

const storeddataHandler = async (req, res) => {
    try {
        const requestedDateTime = req.query.datetime;
        const requestedMoment = moment(requestedDateTime, "YYYY-MM-DD HH:mm:ss");

        if (!requestedMoment.isValid()) {
            return res.status(400).json({
                message: "Invalid date and time format",
            });
        }

        const sensordata = await SensorData.findOne({
            createdAt: requestedMoment.toDate(),
        });

        if (!sensordata) {
            return res.status(404).json({
                message: "No data found for the requested date and time",
            });
        }

        const timestampIST = moment(sensordata.createdAt).utcOffset('+05:30').toISOString();
        const formattedData = {
            temperature: sensordata.temperature,
            humidity: sensordata.humidity,
            flame: sensordata.flame,
            gas: sensordata.gas,
            aqi: sensordata.aqi,
            ldr: sensordata.ldr,
            ir: sensordata.ir,
            uv: sensordata.uv,
            timestamp: timestampIST,
        };

        res.status(200).json({
            data: formattedData,
            timestamp: requestedMoment.toISOString(),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Getting Data Failed",
        });
    }
};

module.exports = {
    sensordataHandler,
    storeddataHandler,
    livedataHandler,
};
