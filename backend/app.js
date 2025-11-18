import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./utils/db.js";
import authRouter from "./routes/authRouter.js";
import protectedRouter from "./routes/protectedRouter.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

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

sequelize
    .authenticate()
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("DB connection error:", err));

// eslint-disable-next-line no-unused-vars
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running at http://127.0.0.1:${process.env.PORT}`);
});
