import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

/**
 * Database utility
 *
 * Creates and exports a Sequelize instance configured for SQLite.
 * Uses SQLite for easier development and testing.
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

export { sequelize };