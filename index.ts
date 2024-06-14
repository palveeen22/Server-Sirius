import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./API/Routes/route";
dotenv.config();

// import FarmerRoute from "./api/Routes/farmerRoute";
// import { authMiddleware } from "./api/middleware/auth";



const PORT = process.env.APP_PORT || 3000;

const app = express();


app.use(cors());
app.use(express.json());


// // authentication
// app.use(authMiddleware);

// index routers
app.use(router);


app.listen(PORT, () =>
  console.log(`⚡️[server]: Server is running at ${PORT}`)
)
