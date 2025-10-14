const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wedding-dedications",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "mp4"],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };