const fs = require("fs");
const path = require("path");
require("dotenv").config();

const caCertPath = path.join(__dirname, "../../certs/DigiCertGlobalRootCA.crt");

module.exports = {
    development: {
        username: process.env.AZURE_DB_USER,
        password: process.env.AZURE_DB_PASSWORD,
        database: process.env.AZURE_DB_NAME,
        host: process.env.AZURE_DB_HOST,
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        logging: console.log,
    },
    test: {
        username: process.env.AZURE_DB_USER,
        password: process.env.AZURE_DB_PASSWORD,
        database: process.env.AZURE_DB_NAME,
        host: process.env.AZURE_DB_HOST,
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        logging: false,
    },
    production: {
        username: process.env.AZURE_DB_USER,
        password: process.env.AZURE_DB_PASSWORD,
        database: process.env.AZURE_DB_NAME,
        host: process.env.AZURE_DB_HOST,
        port: 5432,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: true, // local dev
                ca: fs.readFileSync(caCertPath).toString(),
            },
        },
        logging: false,
    },
};
