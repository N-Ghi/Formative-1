import { Sequelize } from "sequelize";
// eslint-disable-next-line no-unused-vars
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to certificate relative to this file
// eslint-disable-next-line no-unused-vars
const caCertPath = path.join(__dirname, "../../certs/DigiCertGlobalRootCA.crt");

export const sequelize = new Sequelize(
    process.env.AZURE_DB_NAME,
    process.env.AZURE_DB_USER,
    process.env.AZURE_DB_PASSWORD,
    {
        host: process.env.AZURE_DB_HOST,
        dialect: "postgres",
        port: 5432,
        // dialectOptions: {
        //     ssl: {
        //         ca: fs.readFileSync(caCertPath).toString(),
        //         rejectUnauthorized: true,
        //     },
        // },
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false, // skips cert validation
            },
        },

        logging: console.log,
    },
);
