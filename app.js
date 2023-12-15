const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const http = require('http');
const socketIo = require('socket.io'); 
// const base64Stream = require('base64-stream');
const server = http.createServer(app);
const io = socketIo(server); 
const router = express.Router();


const sensorDataRoutes = require("./routes/sensordataRoutes");

const usersRoutes = require("./routes/usersRoutes");
const sensordataRoutes = require('./routes/sensordataRoutes');



app.use('/sensordata', sensordataRoutes);
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", usersRoutes);
app.use("/api", sensorDataRoutes);
app.use('/api', router);


// Attach the router to the '/api' path





mongoose.set('strictQuery', false);
mongoose
  .connect("mongodb+srv://iotcourse:harishakula880@cluster0.xiofhbu.mongodb.net/iotcourse?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
  .then((result) => {
    console.log("app is running...");
    console.log("MongoDB connected successfully");

    // app.listen(port);
  }).catch((err) => {
    console.error("MongoDB connection error:", err);  });



// const videoPath = '/video-frame'; // Replace with the path to your video file

// io.on('connection', (socket) => {
//   console.log('Socket connected:', socket.id);

//   // Read the video file and emit frames to clients
//   const readStream = fs.createReadStream(videoPath);
//   readStream.on('data', (chunk) => {
//     const base64EncodedFrame = Buffer.from(chunk).toString('base64');
//     io.emit('videoFrame', base64EncodedFrame);
//   });

//   socket.on('disconnect', () => {
//     console.log('Socket disconnected:', socket.id);
//     readStream.close();
//   });
// });

// // Create an endpoint for receiving video frames
// app.post('/video-frame', (req, res) => {
//   // Handle the incoming frame, save it to the database, or broadcast it to clients
//   const frameData = req.body;  // Adjust this based on how the ESP32-CAM sends the frame
//   io.emit('videoFrame', frameData);  // Broadcast the frame to connected clients using Socket.IO
//   res.send('Frame received successfully');
// });

const port = process.env.PORT || 10000;   

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});