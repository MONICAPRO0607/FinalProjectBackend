const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameNormalized: { type: String, required: true, index: true },
  relation: { type: String, default: "" },
  party: { type: String, default: "" },
  menu: { type: String, default: ""  },
  allergies: { type: String, default: "" },
  specialNeeds: { type: String, default: "" },
  message: { type: String, default: "" },
  confirmed: { type: Boolean, default: false },
  dedications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dedication" }],
  idea: { type: mongoose.Schema.Types.ObjectId, ref: "Idea" },
  picture: { type: mongoose.Schema.Types.ObjectId, ref: "Picture" }
}, 

{ timestamps: true,
  collection: "guest"
 }
);

const Guest = mongoose.model("Guest", guestSchema, "guest");
module.exports = Guest;