import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import path from "path" 


import toDoRoutes from "./Routes/toDoRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


//middleware
if (process.env.NODE_ENV !== "production"){app.use(cors())}

app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes", toDoRoutes);

if (process.env.NODE_ENV === "production"){

app.use(express.static(path.join(__dirname,"../frontend/dist")))
console.log(__dirname)
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"))
})
}
connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Serverd started on PORT:5001")
});
})
//