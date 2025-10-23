import { Inventory } from '../models/inventoryModel.js';
import { Product } from '../models/productModel.js';
import { Op } from 'sequelize';

/**
 * Get all inventories (with pagination and optional filtering)
 *
 * Supports:
 *  - limit / offset for pagination
 *  - quantityMin / quantityMax filtering
 *  - restockMin / restockMax filtering
 *  - scoped to the authenticated seller
 */
export const getAllInventories = async (req, res) => {
    try {
        const {
            limit = 10,
            offset = 0,
            quantityMin,
            quantityMax,
            restockMin,
            restockMax,
        } = req.query;

        // Build dynamic where clause for Inventory filters
        const whereClause = {};

        if (quantityMin || quantityMax) {
            whereClause.quantity = {};
            if (quantityMin) whereClause.quantity[Op.gte] = Number(quantityMin);
            if (quantityMax) whereClause.quantity[Op.lte] = Number(quantityMax);
        }

        if (restockMin || restockMax) {
            whereClause.restockValue = {};
            if (restockMin) whereClause.restockValue[Op.gte] = Number(restockMin);
            if (restockMax) whereClause.restockValue[Op.lte] = Number(restockMax);
        }

        // Query with pagination + filtering + seller scoping
        const { count, rows } = await Inventory.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Product,
                    as: 'productDetails',
                    where: { seller: req.user.id },
                },
            ],
            limit: Number(limit),
            offset: Number(offset),
            distinct: true,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            inventories: rows,
            total: count,
            limit: Number(limit),
            offset: Number(offset),
        });
    } catch (error) {
        console.error('Error fetching inventories:', error);
        res.status(500).json({
            message: 'Failed to fetch inventories',
            error: error.message,
        });
    }
};


/**
 * Get a single inventory record by ID
 */
export const getInventoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.findByPk(id, {
        include: [{ model: Product, as: 'productDetails' }],
        });
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
        res.status(200).json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch inventory', error });
    }
};

/**
 * Create a new inventory record
 */
export const createInventory = async (req, res) => {
    try {
        const { productId, quantity, restockValue } = req.body;

        // Ensure product exists
        const product = await Product.findByPk(productId);
        if (!product) return res.status(400).json({ message: 'Invalid productId' });

        const inventory = await Inventory.create({ productId, quantity, restockValue });
        res.status(201).json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create inventory', error });
    }
};

/**
 * Update an existing inventory record by ID
 */
export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity, restockValue } = req.body;

        const inventory = await Inventory.findByPk(id);
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

        if (quantity !== undefined) inventory.quantity = quantity;
        if (restockValue !== undefined) inventory.restockValue = restockValue;

        await inventory.save();
        res.status(200).json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update inventory', error });
    }
};


/**
 * Delete an inventory record by ID
 */
export const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const inventory = await Inventory.findByPk(id);
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

        await inventory.destroy();
        res.status(200).json({ message: 'Inventory deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete inventory', error });
    }
};
