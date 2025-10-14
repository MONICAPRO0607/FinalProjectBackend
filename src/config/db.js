const mongoose = require('mongoose');

const connectDB = async () => {
try {
	await mongoose.connect(process.env.DB_URL);
	console.log('Base de datos conectada');
} catch (error) {
	console.log("error al conectar en la base de datos", error);
}
};

module.exports = { connectDB };