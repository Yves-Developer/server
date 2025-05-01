import express from "express";
import router from "./routes";
import cors from "cors";
import e from "express";
const app = express();
app.use(express.json());
app.use(cors({origin: "*",methods: ["GET", "POST", "PUT", "DELETE"]}));
app.use("/api", router);
export default app;
