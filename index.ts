import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./API/Routes/route";
import { authMiddleware } from "./API/Middlewares/auth";
dotenv.config();



const PORT = process.env.APP_PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());



// index routers
app.use("/api",router);


app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at ${PORT}`)
)
