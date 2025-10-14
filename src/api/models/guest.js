const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameNormalized: { type: String, required: true, index: true },
  relation: { type: String },
  party: { type: String },
  menu: { type: String, default: ""  },
  allergies: { type: String, default: "" },
  specialNeeds: { type: String, default: "" },
  message: { type: String, default: "" },
  confirmed: { type: Boolean, default: false },
}, 
{ timestamps: true,
  collection: "guest"
 }
);

const Guest = mongoose.model("guest", guestSchema, "guest");
module.exports = Guest;