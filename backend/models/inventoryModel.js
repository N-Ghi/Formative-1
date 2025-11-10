import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Product } from "./productModel.js";

/** * Inventory model
 *
 * Represents inventory records for products.
 */
const Inventory = sequelize.define(
    "Inventory",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: Product, key: "id" },
            onDelete: "CASCADE",
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: { min: 0 },
        },
        restockValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10,
            validate: { min: 1 },
        },
    },
    { tableName: "inventories", timestamps: true },
);

/** * Associations
 *
 * Each inventory record belongs to a single product.
 * A product has one inventory record.
 */
Inventory.belongsTo(Product, { foreignKey: "productId", as: "productDetails" });
Product.hasOne(Inventory, { foreignKey: "productId", as: "inventory" });

export { Inventory };
