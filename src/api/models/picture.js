const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    section: { type: String, enum: ["antes", "durante", "después"], required: true },
    comment: { type: String },
    uploadedBy: { type: String },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" }
  },
  { timestamps: true,
    collection: "picture"
   }
);

const Picture = mongoose.model("Picture", pictureSchema, "picture");
module.exports = Picture;