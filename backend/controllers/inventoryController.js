import { Inventory } from '../models/inventoryModel.js';
import { Product } from '../models/productModel.js';

/**
 * Get all inventory records with product details fro the authenticated user's products
 */
export const getAllInventories = async (req, res) => {
    try {
        const inventories = await Inventory.findAll({
            include: [
                {
                    model: Product,
                    as: 'productDetails',
                    where: { seller: req.user.id },
                },
            ],
        });

        res.status(200).json(inventories);
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
