import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./utils/db.js";
import authRouter from "./routes/authRouter.js";
import protectedRouter from "./routes/protectedRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import loadenv from "dotenv";

loadenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    }),
);

app.use(express.json());

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRouter);
app.use("/api", protectedRouter);
app.use("/health", (req, res) => res.status(200).send("OK"));

sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("DB connection error:", err));

// eslint-disable-next-line no-unused-vars
const server = app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});
