const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sensordataSchema = new Schema(
  {
    temperature: {
      type: Schema.Types.Number,
      required: true,
    },
    humidity: {
      type: Schema.Types.Number,
      required: true,
    },
    flame: {
      type: Schema.Types.String, // Change to String
      required: true,
    },
    gas: {
      type: Schema.Types.Number,
      required: true,
    },
    aqi: {
      type: Schema.Types.Number,
      required: true,
    },
    ldr: {
      type: Schema.Types.String, // Change to String
      required: true,
    },
    ir: {
      type: Schema.Types.String, // Change to String
      required: true,
    },
    uv: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sensordata", sensordataSchema);
  


  // date:{
         //    type: Schema.Types.Date,
         //    required:true,
         //    default: Date.now,
         // },