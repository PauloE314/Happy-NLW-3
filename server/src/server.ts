import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import "express-async-errors";

import routes from "./routes";
import handler from "./errors";
import "./database/connection";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(routes);
app.use(handler);

// Runs server
app.listen(process.env.PORT || 3333, () => console.log("Server Working!"));
console.log(process.env.PORT)