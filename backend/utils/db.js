import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

/**
 * Database utility
 *
 * Creates and exports a Sequelize instance configured from environment
 * variables. Expected env vars:
 *  - DB_NAME
 *  - DB_USER
 *  - DB_PASSWORD
 *  - HOST
 *
 * The project uses MySQL (dialect: 'mysql').
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
});

export { sequelize };