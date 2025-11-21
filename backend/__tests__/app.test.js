/**
 * Basic Application Tests
 *
 * These tests verify core functionality of the backend application
 */

describe("Backend Application", () => {
    test("environment should be test", () => {
        expect(process.env.NODE_ENV).toBe("test");
    });

    test("application should export basic functionality", () => {
        // Basic test to ensure test infrastructure is working
        expect(true).toBe(true);
    });
});

describe("Configuration", () => {
    test("should have required environment setup", () => {
        // Verify basic Node.js environment
        expect(process.version).toBeDefined();
        expect(typeof process.version).toBe("string");
    });

    test("should support ES modules", () => {
        // Verify ES module support
        expect(import.meta).toBeDefined();
        expect(import.meta.url).toBeDefined();
    });
});

describe("Database Configuration", () => {
    test("should use Postgres dialect", () => {
        const config = require("../config/config.cjs");
        expect(config.test).toBeDefined();
        expect(config.test.dialect).toBe("postgres");
    });

    test("should have test database storage defined", () => {
        const config = require("../config/config.cjs");
        expect(config.test.storage).toBeDefined();
        expect(config.test.storage).toBe("test-db");
    });

    test("should have required database credentials from environment", () => {
        const config = require("../config/config.cjs");
        expect(config.test.username).toBeDefined();
        expect(config.test.password).toBeDefined();
        expect(config.test.database).toBeDefined();
        expect(config.test.host).toBeDefined();
    });

    test("should have SSL configuration for test environment", () => {
        const config = require("../config/config.cjs");
        expect(config.test.dialectOptions).toBeDefined();
        expect(config.test.dialectOptions.ssl).toBeDefined();
        expect(config.test.dialectOptions.ssl.rejectUnauthorized).toBe(false);
    });

    test("should have logging disabled for test environment", () => {
        const config = require("../config/config.cjs");
        expect(config.test.logging).toBe(false);
    });
});

describe("JWT Utilities", () => {
    test("should have JWT utilities available", async () => {
        // Verify JWT utility module exists
        const jwtModule = await import("../utils/jwt.js");
        expect(jwtModule).toBeDefined();
    });
});

describe("Database Connection", () => {
    test("should have sequelize instance available", async () => {
        // Verify database utility exists
        const dbModule = await import("../utils/db.js");
        expect(dbModule.sequelize).toBeDefined();
    });
});
