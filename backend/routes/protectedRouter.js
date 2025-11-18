import { protect } from "../middlewares/authMiddleware.js";
import { Router } from "express";
const router = Router();

import {
    getAllInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
} from "../controllers/inventoryController.js";
import {
    getAllProducts,
    getProductById,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

//===================Product Routes===================
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: |
 *       Retrieves paginated product records. Supports optional filtering by seller ID or partial seller name.
 *       Each product includes its seller details.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: seller
 *         schema:
 *           type: string
 *         description: Filter products by seller ID or name (partial match supported).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of products to return per page.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of products to skip before starting to collect the result set.
 *     responses:
 *       200:
 *         description: Paginated list of products matching filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                   description: Total number of matching records.
 *                   example: 120
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 offset:
 *                   type: integer
 *                   example: 0
 *       401:
 *         description: Unauthorized – Missing or invalid authentication token.
 *       500:
 *         description: Server error – Failed to fetch products.
 */
router.get("/products", protect, getAllProducts);
/**
 * @swagger
 * /api/products/get/{id}:
 *   get:
 *     summary: Get product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 */
router.get("/products/get/:id", protect, getProductById);
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post("/products", protect, createProduct);
/**
 * @swagger
 * /api/products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put("/products/update/:id", protect, updateProduct);
/**
 * @swagger
 * /api/products/delete/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete("/products/delete/:id", protect, deleteProduct);

router.delete("/products/delete/:id", protect, deleteProduct);
/**
 * @swagger
 * /api/products/mine:
 *   get:
 *     summary: Get products of the authenticated user
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of user's products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/products/mine", protect, getMyProducts);

//===================Inventory Routes===================
/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get all inventory items for the authenticated user's products
 *     description: |
 *       Retrieves paginated inventory records belonging to the authenticated seller.
 *       Supports optional filtering by quantity and restock value ranges.
 *     tags:
 *       - Inventory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items to return per page.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items to skip before starting to collect the result set.
 *       - in: query
 *         name: quantityMin
 *         schema:
 *           type: integer
 *         description: Minimum inventory quantity to filter results.
 *       - in: query
 *         name: quantityMax
 *         schema:
 *           type: integer
 *         description: Maximum inventory quantity to filter results.
 *       - in: query
 *         name: restockMin
 *         schema:
 *           type: integer
 *         description: Minimum restock value to filter results.
 *       - in: query
 *         name: restockMax
 *         schema:
 *           type: integer
 *         description: Maximum restock value to filter results.
 *     responses:
 *       200:
 *         description: Paginated list of inventory items matching filters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Inventory'
 *                 total:
 *                   type: integer
 *                   description: Total number of matching records.
 *                   example: 42
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 offset:
 *                   type: integer
 *                   example: 0
 *       401:
 *         description: Unauthorized – Missing or invalid authentication token.
 *       500:
 *         description: Server error – Failed to fetch inventories.
 */
router.get("/inventory", protect, getAllInventories);
/**
 * @swagger
 * /api/inventory/get/{id}:
 *   get:
 *     summary: Get inventory by id
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.get("/inventory/get/:id", protect, getInventoryById);
/**
 * @swagger
 * /api/inventory:
 *   post:
 *     summary: Create inventory item
 *     tags:
 *       - Inventory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryCreate'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.post("/inventory", protect, createInventory);
/**
 * @swagger
 * /api/inventory/update/{id}:
 *   put:
 *     summary: Update inventory item
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryCreate'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
router.put("/inventory/update/:id", protect, updateInventory);
/**
 * @swagger
 * /api/inventory/delete/{id}:
 *   delete:
 *     summary: Delete inventory item
 *     tags:
 *       - Inventory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 */
router.delete("/inventory/delete/:id", protect, deleteInventory);

export default router;
