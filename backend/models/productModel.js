import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/db.js';
import { User } from './userModel.js';
import { randomBytes } from 'crypto';

/**
 * Product categories
 * 
 * Centralized list for both model and validation logic.
 * To add new categories, update this list only.
 */
export const PRODUCT_CATEGORIES = [ 'Electronics', 'Books', 'Clothing', 'Home', 'Sports', ];

/**
 * Product model
 *
 * Represents application products.
 */
const Product = sequelize.define('Product', {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM(...PRODUCT_CATEGORIES), allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false, validate: { min: 100.00 } },
    seller: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: 'id', },
        onDelete: 'CASCADE',
    },
}, { tableName: 'products', timestamps: true, });

/**
 * Associations
 *
 * Each product belongs to a single seller (User).
 * A user can have many products.
 */
Product.belongsTo(User, { foreignKey: 'seller', as: 'sellerDetails' });
User.hasMany(Product, { foreignKey: 'seller', as: 'products' });

/**
 * Hooks
 * - Auto-generate product ID before creation
 */
Product.beforeCreate(async (product) => {
    // Fetch seller (to get username)
    const seller = await User.findByPk(product.seller);
    if (!seller) {
        throw new Error('Seller not found');
    }

    // Generate date part (DDMMYYYY) using UTC for consistency
    const now = new Date();
    const day = String(now.getUTCDate()).padStart(2, '0');
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const year = now.getUTCFullYear();
    const datePart = `${day}${month}${year}`;

    // Random 8-character string (4 bytes = better collision resistance)
    const randomPart = randomBytes(4).toString('hex');

    // Sanitize category and username for ID
    const safeCategory = product.category.replace(/\s+/g, '').toLowerCase();
    const safeUsername = seller.username.replace(/\s+/g, '').toLowerCase();

    // Final ID: DDMMYYYY-category-username-randomhex
    product.id = `${datePart}-${safeCategory}-${safeUsername}-${randomPart}`;
});

export { Product };