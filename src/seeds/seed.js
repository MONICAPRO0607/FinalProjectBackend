require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const { connectDB } = require("../config/db");
const Guest = require("../models/guest"); 

const filePath = path.join(__dirname, "../config/guests.csv");

(async () => {
  try {
    await connectDB();
    console.log("✅ Conectado a MongoDB");

    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const name = row.name ? row.name.toString() : "";
        const relation = row.relation ? row.relation.toString() : "";
        const party = row.party ? row.party.toString() : "";

        if (name) {
          results.push({
            name,
            nameNormalized: name.toLowerCase().trim().normalize("NFD").replace(/\p{Diacritic}/gu, ""),
            relation,
            party,
            menu: "",
            allergies: "",
            specialNeeds: "",
            message: "",
            confirmed: false,
          });
        }
      })
      .on("end", async () => {
        console.log(`📥 ${results.length} registros leídos desde CSV`);

        await Guest.deleteMany({});
        console.log("🧹 Colección 'guest' vaciada");

        await Guest.insertMany(results);
        console.log("🌱 Seed completado con éxito!");

        mongoose.connection.close();
      })
      .on("error", (err) => {
        console.error("❌ Error leyendo CSV:", err);
        mongoose.connection.close();
      });
  } catch (error) {
    console.error("❌ Error cargando seed:", error);
    mongoose.connection.close();
  }
})();
