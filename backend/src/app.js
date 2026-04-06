import express from "express"
import morgan from "morgan"
import authRoute from "./routes/auth.route.js"

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req,res) => {
    res.send("hello dost")
});

app.use("/api/auth", authRoute)

export default app