import dotenv from "dotenv";
dotenv.config();

export default {
    development: {
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false,
    },
    test: {
        dialect: "sqlite",
        storage: "./test-database.sqlite",
        logging: false,
    },
    production: {
        dialect: "sqlite",
        storage: "./production-database.sqlite",
        logging: false,
    },
};
