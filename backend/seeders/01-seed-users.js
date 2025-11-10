/**
 * Seeder: 01-seed-users
 *
 * Inserts three sample users with pre-hashed passwords.
 * Intended for development and testing.
 */
import bcrypt from "bcryptjs";

export const up = async (queryInterface, _Sequelize) => {
    const plainPassword = process.env.SEED_PASSWORD;
    if (!plainPassword) throw new Error("SEED_PASSWORD is not set.");

    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    const users = [
        {
            id: "b6606e72-d22b-406c-bc3a-96fa13556362",
            firstName: "Jane",
            lastName: "Doe",
            username: "janedoe",
            email: "janedoe@email.com",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "a5506e72-d22b-406c-bc3a-96fa13556361",
            firstName: "John",
            lastName: "Smith",
            username: "johnsmith",
            email: "johnsmith@email.com",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "c7707e72-d22b-406c-bc3a-96fa13556363",
            firstName: "Alice",
            lastName: "Johnson",
            username: "alicejohnson",
            email: "alicejohnson@email.com",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await queryInterface.bulkInsert("users", users, {});
};

export const down = async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
};
