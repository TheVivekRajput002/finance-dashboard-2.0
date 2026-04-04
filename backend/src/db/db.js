const mongoose = require("mongoose");

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("database connected")
    } catch (error) {
        console.log("database not connected:", error)
    }
}

module.exports = connectDB