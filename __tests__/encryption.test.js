import encryptionService from '../services/encryption.js';

describe('Encryption - Decryption', () => {
    let secretKey;
    let password = 'mySecretPassword';
    let encryptedData;

    beforeAll(() => {
        secretKey = encryptionService.generateSecretKey();
    });

    it('should generate key for encryption', () => {
        expect(secretKey).toHaveLength(64); 
    });

    it('should encrypt password', () => {
        encryptedData = encryptionService.encryptPassword(password, secretKey);
        expect(encryptedData).toHaveProperty('iv');
        expect(encryptedData).toHaveProperty('password');
        expect(encryptedData.password).not.toBe(password); 
    });

    it('should decrypt password', () => {
        const decryptedPassword = encryptionService.decryptPassword(encryptedData.password, encryptedData.iv, secretKey);
        expect(decryptedPassword).toBe(password); 
    });
});
