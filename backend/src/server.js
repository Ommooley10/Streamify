import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDB } from './lib/db.js';
import path from "path";

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({  //used when frontend and backend are on different domains
    origin: "http://localhost:5173",
    credentials: true //alow frontend to send cookies
}));
app.use(express.json());
app.use(cookieParser());

app.use(
  '/avatars',
  express.static(path.join(__dirname, 'public', 'avatars'))
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

//This is for setting up the app for deployment, meaning that the frontend and th backend will be rendered as a single entity (through a single link)
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) =>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});