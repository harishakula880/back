const SensorData = require("../models/sensordata");


const hello = (req, res, next) => {

    res.status(200).json({
        message: "hello from server"
    });       
}
const posttest = (req, res, next) => {
    // console.log(req.body);
    res.status(200).json({
        message: "post request recieved successfully"
    });
}

const sensordataHandler = async (req, res, next) => {  
    const { temperature, humidity, flame, gas, aqi, ldr, ir, uv } = req.body;
    let exists = false;
    let sensordata;
    try {
        sensordata = await SensorData.find();
        if (sensordata.length == 1) {
            exists = true;
        }
        //console.log(sensordata);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Updating Data Failed",
        });
    }

    if (exists) {
        const result = await SensorData.findOneAndUpdate(
            { _id: sensordata[0]._id },
            {
                temperature: temperature,
                humidity: humidity,
                flame: flame,
                gas: gas,
                aqi: aqi,
                ldr: ldr,
                ir: ir,
                uv: uv,
            }
        );
    } else {
        try {
            const newSensorData = new SensorData({
                temperature: temperature,
                humidity: humidity,
                flame: flame,
                gas: gas,
                aqi: aqi,
                ldr: ldr,
                ir: ir,
                uv: uv
            });
            await newSensorData.save();
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "updating Data failed!",
            })
        }
    }

    res.status(200).json({
        message: "Data updated successfully!!",
    });
};
const addHours = (numOfHours, date = new Date()) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

    return date;
}

const getdataHandler = async (req, res, next) => {
    let sensordata, updatedAtnew;
    try {
        sensordata = await SensorData.find();
        //console.log(sensordata);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Getting Data Failed",
        });
    }
    if (sensordata.length == 1) {
        const updatedAtold = new Date(sensordata[0].updatedAt);
        updatedAtnew = addHours(5.511, updatedAtold);
        console.log(updatedAtnew);
    }
    res.status(200).json({
        temperature: sensordata[0].temperature,
        humidity: sensordata[0].humidity,
        flame: sensordata[0].flame,
        gas: sensordata[0].gas,
        aqi: sensordata[0].aqi,
        ldr: sensordata[0].ldr,
        ir: sensordata[0].ir,
        uv: sensordata[0].uv,
        timestamp: updatedAtnew,
    });

}

exports.hello = hello;
exports.posttest = posttest;
exports.sensordataHandler = sensordataHandler;
exports.getdataHandler = getdataHandler;