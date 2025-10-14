const mongoose = require("mongoose");

const dedicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  file: { type: String, default: null},
},
{ timestamps: true,
  collection: "dedication"
   });

const dedication = mongoose.model("dedication", dedicationSchema, "dedication");

module.exports = dedication;