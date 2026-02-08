const mongoose = require('mongoose');

const connectDB = async () => {
try {
	await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
	console.log('Base de datos conectada');
} catch (error) {
	console.log("error al conectar en la base de datos", error);
	throw error;
}

	console.log("DB_URL:", process.env.DB_URL);
};

module.exports = { connectDB };