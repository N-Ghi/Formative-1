const fs = require("fs");
const path = require("path");
require("dotenv").config();

const caCertPath = path.join(__dirname, "../../certs/DigiCertGlobalRootCA.crt");

// Only read the cert if it exists (for production)
let caCert;
try {
    if (fs.existsSync(caCertPath)) {
        caCert = fs.readFileSync(caCertPath).toString();
    }
} catch (err) {
    console.warn("Certificate file not found, SSL will use default settings");
}

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
        storage: "test-db",
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
                rejectUnauthorized: true,
                ...(caCert && { ca: caCert }),
            },
        },
        logging: false,
    },
};
