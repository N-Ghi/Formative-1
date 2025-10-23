/**
 * Seeder: 03-seed-inventories
 *
 * Inserts inventory records for all seeded products.
 * Intended for development and testing.
 */

export const up = async (queryInterface, Sequelize) => {
    const inventories = [
        // Jane Doe's product inventories
        {
            id: '11111111-1111-1111-1111-111111111111',
            productId: '23102024-electronics-janedoe-a1b2c3',
            quantity: 45,
            restockValue: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '22222222-2222-2222-2222-222222222222',
            productId: '23102024-books-janedoe-d4e5f6',
            quantity: 30,
            restockValue: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '33333333-3333-3333-3333-333333333333',
            productId: '23102024-clothing-janedoe-g7h8i9',
            quantity: 100,
            restockValue: 25,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '44444444-4444-4444-4444-444444444444',
            productId: '23102024-home-janedoe-j1k2l3',
            quantity: 20,
            restockValue: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '55555555-5555-5555-5555-555555555555',
            productId: '23102024-sports-janedoe-m4n5o6',
            quantity: 60,
            restockValue: 15,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // John Smith's product inventories
        {
            id: '66666666-6666-6666-6666-666666666666',
            productId: '23102024-electronics-johnsmith-p7q8r9',
            quantity: 15,
            restockValue: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '77777777-7777-7777-7777-777777777777',
            productId: '23102024-books-johnsmith-s1t2u3',
            quantity: 40,
            restockValue: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '88888888-8888-8888-8888-888888888888',
            productId: '23102024-clothing-johnsmith-v4w5x6',
            quantity: 35,
            restockValue: 12,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '99999999-9999-9999-9999-999999999999',
            productId: '23102024-home-johnsmith-y7z8a9',
            quantity: 25,
            restockValue: 8,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
            productId: '23102024-sports-johnsmith-b1c2d3',
            quantity: 18,
            restockValue: 6,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        // Alice Johnson's product inventories
        {
            id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
            productId: '23102024-electronics-alicejohnson-e4f5g6',
            quantity: 12,
            restockValue: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
            productId: '23102024-books-alicejohnson-h7i8j9',
            quantity: 50,
            restockValue: 25,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
            productId: '23102024-clothing-alicejohnson-k1l2m3',
            quantity: 28,
            restockValue: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
            productId: '23102024-home-alicejohnson-n4o5p6',
            quantity: 32,
            restockValue: 12,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            productId: '23102024-sports-alicejohnson-q7r8s9',
            quantity: 22,
            restockValue: 8,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await queryInterface.bulkInsert('inventories', inventories, {});
};

export const down = async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('inventories', null, {});
};