import { User } from "../models/userModel.js";
import { signToken } from "../utils/jwt.js";

/**
 * Authentication controller
 *
 * Exposes handlers for register, login and getting the authenticated user's profile.
 * Each handler expects Express-style (req, res) parameters. Errors are returned
 * as JSON with a relevant HTTP status code.
 */

/**
 * Register a new user.
 *
 * Expected request body: { email, password, firstName, lastName, ... }
 * Success response: 201 { token, user: { email, firstName, lastName } }
 * Error responses: 400 on validation/creation error.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ message: "User registration failed" });
        }

        const token = signToken(user.id);
        res.status(201).json({
            token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
            },
        });
    } catch (err) {
        // Return the error message, but avoid leaking stack traces in production
        res.status(400).json({
            message: "Registration failed",
            error: err.message,
        });
    }
};

/**
 * Login an existing user.
 *
 * Expected request body: { username, password }
 * Success response: 200 { token, user: { email, firstName, lastName, username } }
 * Error responses: 401 for invalid credentials.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user.id);
    res.json({
        token,
        user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        },
    });
};

/**
 * Return the authenticated user's profile.
 *
 * Assumes an authentication middleware attaches the user to req.user.
 * Success response: 200 with the user object.
 * Error responses: 404 if req.user is not set.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getProfile = async (req, res) => {
    if (!req.user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(req.user);
};
