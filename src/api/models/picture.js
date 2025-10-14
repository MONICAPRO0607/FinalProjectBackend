const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    section: { type: String, enum: ["antes", "durante", "después"], required: true },
    comment: { type: String },
    uploadedBy: { type: String },
  },
  { timestamps: true,
    collection: "picture"
   }
);

const picture = mongoose.model("picture", pictureSchema, "picture");
module.exports = picture;