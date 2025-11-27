import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prisma/index.js";
import jwt from 'jsonwebtoken';
import { convertVideoToHLS, uploadVideo } from "./controllers/uploadVideoController.js";

dotenv.config({ path: ".env" });
const app = express();
const PORT = process.env.PORT;


app.use(cors({
    origin: ['http://localhost:3000', process.env.FRONTEND_PROD_URL as string],
    credentials: true
}));
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: "Email and password are required" });
    return;
  }

  try{
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        res.status(400).json({ success: false, message: "User not found" });
        return;
    }

    const isValidPassword = user.password === password;
    
    if (!isValidPassword) {
        res.status(400).json({ success: false, message: "Password was wrong" });
        return;
    }

    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET as string);
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      domain: process.env.NODE_ENV === "local" ? "moveispot.fun" : "localhost",        
    });

    res.status(200).json({ success: true, message: "User authroized sucesss!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "server error" });
  }
});

app.post('/generate-upload-url', uploadVideo);

app.post('/convert-hls', convertVideoToHLS);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})