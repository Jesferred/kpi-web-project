import { Sequelize } from 'sequelize';
import User from '../models/User.js';
import UserPassword from '../models/UserPassword.js';
import db from '../db.js';
import encryptionService from '../services/encryption.js';


describe('Database connection', () => {
    it('should connect to the database', async () => {
        try {
            await db.authenticate();
            expect(true).toBe(true);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            expect(true).toBe(false);
        }
    });
});


beforeAll(async () => {
    await db.sync({ force: true }); 
});

describe('User Model', () => {
    let testUserId;

    it('should create a User successfully', async () => {
        const userData = {
            login: 'testUser',
            email: 'testuser1@example.com',
            password: 'testPassword',
            secretKey: encryptionService.generateSecretKey(),
        };

        const user = await User.create(userData);
        testUserId = user.id;

        expect(user).toHaveProperty('id');
        expect(user.login).toBe(userData.login);
        expect(user.email).toBe(userData.email);
        expect(user.secretKey).toHaveLength(64);
    });

    it('should not create a User with duplicate email', async () => {
        const userData = {
            login: 'testUser3',
            email: 'testuser1@example.com',
            password: 'anotherPassword',
            secretKey: encryptionService.generateSecretKey(),
        };

        await expect(User.create(userData)).rejects.toThrow();
    });

    it('should not allow null password', async () => {
        const userData = {
            login: 'testUser3',
            email: 'testuser3@example.com',
            password: null,
            secretKey: encryptionService.generateSecretKey(),
        };

        await expect(User.create(userData)).rejects.toThrow();
    });

    afterAll(async () => {
        await User.destroy({ where: { id: testUserId } });
    });
});

describe("UserPassword Model", () => {
    let testUserId;
    let testPasswordId;

    beforeAll(async () => {
        const userData = {
            login: 'testUser',
            email: 'testuser1@example.com',
            password: 'testPassword',
            secretKey: encryptionService.generateSecretKey(),
        };
        const user = await User.create(userData);
        testUserId = user.id;
    });

    it('should create a user password correctly', async () => {
        const userData = {
            password: 'testPassword',
            secretKey: encryptionService.generateSecretKey(),
        };
        let newPassword = encryptionService.encryptPassword(userData.password, userData.secretKey);

        const userPasswordData = {
            website: 'testWebsite',
            login: 'testLogin',
            password: newPassword.password,
            iv: newPassword.iv,
            userId: testUserId,
        };

        const password = await UserPassword.create(userPasswordData);
        testPasswordId = password.id;

        expect(password).toHaveProperty('id');
        expect(password.website).toBe(userPasswordData.website);
        expect(password.login).toBe(userPasswordData.login);
        expect(password.password).toBe(userPasswordData.password);
    });

    afterAll(async () => {
        await UserPassword.destroy({ where: { userId: testUserId } });
        await User.destroy({ where: { id: testUserId } });
    });
});

afterAll(async () => {
    await db.close();
});