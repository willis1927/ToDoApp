import express from "express"
import cors from "cors"
import dotenv from "dotenv";
 
import toDoRoutes from "./Routes/toDoRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors())
app.use(express.json())
app.use(rateLimiter)


app.use("/api/notes", toDoRoutes);

connectDB().then(() =>{
app.listen(PORT, () => {
    console.log("Serverd started on PORT:5001")
});
})
//