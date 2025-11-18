/**
 * Seeder: 02-seed-products
 *
 * Inserts 15 sample products distributed across 3 users.
 * Intended for development and testing.
 */

export const up = async (queryInterface, _Sequelize) => {
    const userIds = [
        "b6606e72-d22b-406c-bc3a-96fa13556362", // Jane Doe
        "a5506e72-d22b-406c-bc3a-96fa13556361", // John Smith
        "c7707e72-d22b-406c-bc3a-96fa13556363", // Alice Johnson
    ];

    const products = [
        // Jane Doe's products
        {
            id: "23102024-electronics-janedoe-a1b2c3",
            name: "Wireless Headphones",
            description:
                "High-quality noise-canceling wireless headphones with 30-hour battery life",
            category: "Electronics",
            price: 149.99,
            seller: userIds[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-books-janedoe-d4e5f6",
            name: "JavaScript: The Definitive Guide",
            description:
                "Comprehensive guide to JavaScript programming, 7th edition",
            category: "Books",
            price: 129.99,
            seller: userIds[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-clothing-janedoe-g7h8i9",
            name: "Cotton T-Shirt",
            description:
                "Premium organic cotton t-shirt, available in multiple colors",
            category: "Clothing",
            price: 124.99,
            seller: userIds[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-home-janedoe-j1k2l3",
            name: "Coffee Maker",
            description: "Programmable drip coffee maker with thermal carafe",
            category: "Home",
            price: 179.99,
            seller: userIds[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-sports-janedoe-m4n5o6",
            name: "Yoga Mat",
            description: "Eco-friendly non-slip yoga mat with carrying strap",
            category: "Sports",
            price: 139.99,
            seller: userIds[0],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // John Smith's products
        {
            id: "23102024-electronics-johnsmith-p7q8r9",
            name: "Smartphone",
            description:
                "Latest flagship smartphone with 5G connectivity and 128GB storage",
            category: "Electronics",
            price: 899.99,
            seller: userIds[1],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-books-johnsmith-s1t2u3",
            name: "Clean Code",
            description:
                "A handbook of agile software craftsmanship by Robert C. Martin",
            category: "Books",
            price: 144.99,
            seller: userIds[1],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-clothing-johnsmith-v4w5x6",
            name: "Running Shoes",
            description:
                "Lightweight running shoes with advanced cushioning technology",
            category: "Clothing",
            price: 189.99,
            seller: userIds[1],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-home-johnsmith-y7z8a9",
            name: "Air Purifier",
            description: "HEPA air purifier for large rooms up to 500 sq ft",
            category: "Home",
            price: 249.99,
            seller: userIds[1],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-sports-johnsmith-b1c2d3",
            name: "Dumbbells Set",
            description: "Adjustable dumbbells set ranging from 5 to 50 pounds",
            category: "Sports",
            price: 299.99,
            seller: userIds[1],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // Alice Johnson's products
        {
            id: "23102024-electronics-alicejohnson-e4f5g6",
            name: "Laptop",
            description: "High-performance laptop with 16GB RAM and 512GB SSD",
            category: "Electronics",
            price: 1299.99,
            seller: userIds[2],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-books-alicejohnson-h7i8j9",
            name: "Design Patterns",
            description: "Elements of reusable object-oriented software",
            category: "Books",
            price: 154.99,
            seller: userIds[2],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-clothing-alicejohnson-k1l2m3",
            name: "Winter Jacket",
            description: "Waterproof insulated winter jacket for extreme cold",
            category: "Clothing",
            price: 349.99,
            seller: userIds[2],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-home-alicejohnson-n4o5p6",
            name: "Blender",
            description:
                "Professional-grade blender with multiple speed settings",
            category: "Home",
            price: 199.99,
            seller: userIds[2],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "23102024-sports-alicejohnson-q7r8s9",
            name: "Tennis Racket",
            description: "Professional tennis racket with graphite frame",
            category: "Sports",
            price: 279.99,
            seller: userIds[2],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await queryInterface.bulkInsert("products", products, {});
};

export const down = async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
};
