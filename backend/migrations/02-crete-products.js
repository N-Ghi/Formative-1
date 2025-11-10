/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
        id: { type: Sequelize.STRING, primaryKey: true, allowNull: false },
        name: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        category: {
            type: Sequelize.ENUM(
                "Electronics",
                "Books",
                "Clothing",
                "Home",
                "Sports",
            ),
            allowNull: false,
        },
        price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
        seller: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
    });

    // Add index on seller for faster queries
    await queryInterface.addIndex("products", ["seller"], {
        name: "products_seller_index",
    });

    // Add index on category for filtering
    await queryInterface.addIndex("products", ["category"], {
        name: "products_category_index",
    });
}

export async function down(queryInterface, _Sequelize) {
    // Remove indexes first
    await queryInterface.removeIndex("products", "products_category_index");
    await queryInterface.removeIndex("products", "products_seller_index");

    // Drop the table
    await queryInterface.dropTable("products");
}
