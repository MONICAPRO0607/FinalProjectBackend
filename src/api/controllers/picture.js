const Picture = require("../models/picture");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const getPictures = async (req, res) => {
  try {
    const pictures = await picture.find().sort({ createdAt: -1 });
    res.json(pictures);
  } catch (error) {
    console.error("Error al obtener imágenes:", error);
    res.status(500).json({ message: "Error al obtener imágenes" });
  }
};

const addPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" });
    }

    const { section, comment, uploadedBy } = req.body;

    const newPicture = new Picture({
      section,
      comment,
      uploadedBy,
      imageUrl: req.file.path,
    });

    await newPicture.save();

    res.status(201).json({
      message: "Imagen subida correctamente",
      picture: newPicture,
    });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
};

const deletePicture = async (req, res) => {
  try {
    const { id } = req.params;
    const picture = await picture.findById(id);

    if (!picture) {
      return res.status(404).json({ message: "Imagen no encontrada" });
    }

    await Picture.findByIdAndDelete(id);
    res.json({ message: "Imagen eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar imagen:", error);
    res.status(500).json({ message: "Error al eliminar imagen" });
  }
};

module.exports = { getPictures, addPicture, deletePicture };