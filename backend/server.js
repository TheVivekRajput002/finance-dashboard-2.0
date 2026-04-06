
import connectDB from "./src/db/db.js";
import app from "./src/app.js"

app.listen(process.env.PORT, (req,res) => {
    console.log("server is running");
})

connectDB();