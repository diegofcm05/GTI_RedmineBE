import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import ticketsRoutes from "./routes/tickets.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketsRoutes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Backend corriendo en puerto ${process.env.PORT}`);
});

