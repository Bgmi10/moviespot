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

app.get('/log', async (req, res) => {
  let count: number = 0;
  count++
  try {
    await prisma.log.create({
      data: {}
    });
  } catch (e) {
    console.log(e);
  }
  
  res.status(200).json({ message: "Log success" })
})

app.get('/logs', async (req, res) => {
  const logs = await prisma.log.findMany({});
  
  res.status(200).json({ message: "success", logCount: logs.length })
});

app.get('/category/all', async (req, res) => {
  try {
    const category = await prisma.category.findMany({});
    const clientFormat = {
      movies: category.filter(cat => cat.type === "MOVIE"),
      series: category.filter(cat => cat.type === "SERIE")
    }
    res.status(200).json({ message: "success", data: clientFormat })
  } catch (e) {
    console.log(e)
  }
});

app.post('/category', async (req, res) => {
  const { type, title } = req.body;

  try {
    await prisma.category.create({
      data: {
        type,
        title
      }
    });

    res.status(200).json({ message: "success" })
  } catch (e) {
    console.log(e)
  }
});

app.put('/category/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    await prisma.category.update({
      where: { id },
      data: { title }
    });
    res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error updating category" });
  }
});

app.delete('/category/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id }
    });
    res.status(200).json({ message: "success" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "error deleting category" });
  }
})

app.post('/generate-upload-url', uploadVideo);

app.post('/convert-hls', convertVideoToHLS);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

