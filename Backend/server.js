import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import resumeRouter from "./routes/ResumeRoutes.js";
import aiRouters from "./routes/aiRoutes.js";

// Database Connection
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

app.get('/' ,(req , res) => res.send("Server is live..."))


app.use('/api/users' , userRouter)
app.use('/api/resumes' , resumeRouter)
app.use('/api/ai' , aiRouters)



app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})