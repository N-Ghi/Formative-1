/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventories", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: { model: "products", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        restockValue: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 10,
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

    // Add unique index on productId (one-to-one relationship)
    await queryInterface.addIndex("inventories", ["productId"], {
        name: "inventories_product_id_unique_index",
        unique: true,
    });
}

export async function down(queryInterface, _Sequelize) {
    // Remove index first
    await queryInterface.removeIndex(
        "inventories",
        "inventories_product_id_unique_index",
    );

    // Drop the table
    await queryInterface.dropTable("inventories");
}
