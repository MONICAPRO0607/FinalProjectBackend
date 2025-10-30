const mongoose = require("mongoose");

const dedicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  file: { type: String, default: null},
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" }
},
{ timestamps: true,
  collection: "dedication"
   });

const Dedication = mongoose.model("Dedication", dedicationSchema, "dedication");

module.exports = Dedication;