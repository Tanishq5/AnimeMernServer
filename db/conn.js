const mongoose = require("mongoose");

const ADB = process.env.MONGO_DB_PATH;

exports.connect = () =>
{try {
    mongoose.connect(
        ADB,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
} catch (error) {
    console.log(error)
    process.exit();
}}