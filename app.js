const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const sensorDataRoutes = require("./routes/sensordataRoutes");

const usersRoutes = require("./routes/usersRoutes");


 
app.use(cors());        
app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api", sensorDataRoutes);


 
const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://iotcourse:harishakula880@cluster0.xiofhbu.mongodb.net/iotcourse?retryWrites=true&w=majority")
    .then((result) => {    


        console.log("app is running...");
        app.listen(port);
    }).catch((err) => {
        console.log(err);
    });