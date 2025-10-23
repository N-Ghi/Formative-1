import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';
import { Op } from 'sequelize';

/**
 * Product controller
 *
 * Provides handlers to list, fetch, create, update and delete products. Handlers use
 * Express (req, res) parameters and consistently return JSON responses with
 * appropriate HTTP status codes.
 */

/**
 * Get a paginated list of products with optional seller filtering.
 *
 * Query params: seller, limit, offset
 * Success response: 200 { products: Array, total: Number, limit: Number, offset: Number }
 * Error responses: 500 on unexpected errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getAllProducts = async (req, res) => {
    try {
        const { seller, limit = 10, offset = 0 } = req.query;

        const whereClause = {};

        if (seller) {
            whereClause[Op.or] = [
                { seller: { [Op.like]: `%${seller}%` } },
            ];
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [
                { model: User, as: 'sellerDetails', attributes: ['id', 'firstName', 'lastName', 'username', 'email'] },
            ],
            limit: Number(limit),
            offset: Number(offset),
            distinct: true,
        });

        res.json({ products: rows, total: count, limit: Number(limit), offset: Number(offset) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

/**
 * Get a single product by its primary key (id).
 *
 * Path param: id
 * Success response: 200 product object
 * Error responses: 404 if not found, 500 on unexpected errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: User, as: 'sellerDetails', attributes: ['id', 'firstName', 'lastName', 'username', 'email'] }],
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

/**
 * Get products belonging to a specific user.
 *
 * Path param: userId
 * Query params: limit, offset
 * Success response: 200 { products, total, limit, offset }
 * Error responses: 500 on unexpected errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getMyProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { limit = 10, offset = 0 } = req.query;

        const whereClause = { seller: userId };

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            include: [
                { model: User, as: 'sellerDetails', attributes: ['id', 'firstName', 'lastName', 'username', 'email'] },
            ],
            limit: Number(limit),
            offset: Number(offset),
            order: [['createdAt', 'DESC']],
        });
        res.json({ products: rows, total: count, limit: Number(limit), offset: Number(offset) });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user products', error: err.message });
    }
};

/**
 * Create a new product. 705daef3-36ca-41be-825b-7d16b4c18093
 *
 * Expected body: product fields required by the Product model.
 * Success response: 201 created product
 * Error responses: 400 on validation/creation error.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        product.seller = req.user.id;  // Ensure the seller is set to the authenticated user
        const createdProduct = await Product.create(product);
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(400).json({ message: 'Error creating product', error: err.message });
    }
};

/**
 * Update an existing product by id.
 *
 * Path param: id
 * Body: fields to update
 * Success response: 200 updated product
 * Error responses: 404 if not found, 500 on unexpected errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: User, as: 'sellerDetails', attributes: ['id', 'firstName', 'lastName', 'username', 'email'] }],
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.update(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

/**
 * Delete a product by id.
 *
 * Path param: id
 * Success response: 204 No Content
 * Error responses: 404 if not found, 500 on unexpected errors.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(204).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};