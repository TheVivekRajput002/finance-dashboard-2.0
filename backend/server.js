const app = require("./src/app")
const connectDB = require("./src/db/db")

app.listen(process.env.PROT, (req,res) => {
    console.log("server is running");
})

connectDB();