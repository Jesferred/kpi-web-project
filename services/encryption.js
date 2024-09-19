import crypto from 'crypto'

export default {
    generateSecretKey: () => {
        return crypto.randomBytes(32).toString('hex');
    },

    encryptPassword: (password, secretKey) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(secretKey, 'hex'), iv);
        const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
        return {
            iv: iv.toString('hex'),
            password: encrypted.toString('hex'),
        };
    },

    decryptPassword: (encryptedPassword, iv, secretKey) => {
        const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(secretKey, 'hex'), Buffer.from(iv, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedPassword, 'hex')), decipher.final()]);
        return decrypted.toString();
    }
}

