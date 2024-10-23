
import UserPassword from '../models/UserPassword.js';
import encryptionService from '../services/encryption.js';
import generator from 'generate-password';
import User from '../models/User.js';

export default {
    dashboardView: async (req, res) => {
        const userId = req.user.id;

        try {
            const passwords = await UserPassword.findAll({ where: { userId } });
            res.render('Dashboard', { passwords, login: req.user.login });
        } catch (error) {
            console.error(error);
            res.render('Dashboard', { error: 'Failed to retrieve passwords', passwords: [] });
        }
    },

    savePassword: async (req, res) => {
        const { website, login, password } = req.body;
        const userId = req.user.id;
        try {
            const user = await User.findByPk(userId);
            const { secretKey } = user;
            const encryptedData = encryptionService.encryptPassword(password, secretKey);
            if ( website != '' && login != '' && password != '') {
            await UserPassword.create({
                userId,
                website,
                login,
                password: encryptedData.password,
                iv: encryptedData.iv
            });
            res.redirect('/dashboard?passwordsaved');
         }
        } catch (error) {
            console.error(error);
            res.render('Dashboard', { error: 'Failed to save password' });
        }
    },

    updateUserPassword: async (req, res) => {
        const { id } = req.params;
        const { website, login, password } = req.body;
        const userId = req.user.id;
        try {
            const userPassword = await UserPassword.findByPk(id);

            if (!userPassword || userPassword.userId !== userId) {
                return res.status(404).json({ success: false, message: 'Password not found' });
            }

            const user = await User.findByPk(userId);
            const { secretKey } = user;

            const encryptedData = encryptionService.encryptPassword(password, secretKey);

            userPassword.website = website || userPassword.website;
            userPassword.login = login || userPassword.login;
            userPassword.password = encryptedData.password || userPassword.password;
            userPassword.iv = encryptedData.iv || userPassword.iv;

            await userPassword.save();

            res.json({ success: true, message: 'Password updated successfully' });

        } catch (error) {
            console.error(catchError);
            res.status(500).json({ success: false, message: 'An error occurred' });

        }
    },

    getUserPassword: async (req, res) => {
        const userId = req.user.id;
        try {
            const passwords = await UserPassword.findAll({ where: { userId } });
            res.render('Dashboard', { passwords });
        } catch (error) {
            console.error(error);
            res.render('Dashboard', { error: 'Failed to retrieve passwords' });
        }
    },

    getUserPasswordById: async (req, res) => {
        const { id } = req.params;
        try {
            const password = await UserPassword.findByPk(id);
            if (!password) {
                return res.status(404).json({ success: false, message: 'Password not found' });
            }
            res.json({ password });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred' });
        }
    },
    
    deleteUserPassword: async (req, res) => {
        const { id } = req.params;
        try {
            const userPassword = await UserPassword.findByPk(id);
            
            if (!userPassword) {
                return res.status(404).json({ success: false, message: 'Password not found' });
            }
    
            await userPassword.destroy();
            res.json({ success: true, message: 'Password deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'An error occurred' });
        }
    },


    decryptPassword: async (req, res) => {
        const { id } = req.params;
        try {
            const userPassword = await UserPassword.findByPk(id);
            const user = await User.findByPk(userPassword.userId);
            const { secretKey } = user;
            const decryptedData = encryptionService.decryptPassword(userPassword.password, userPassword.iv, secretKey);
            res.json({ decryptedPassword: decryptedData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to decrypt password' });
        }
    },

    viewTestPage: (req, res) => {
        res.render('Test');
    },

    generateNewPassword: async (req, res) => {
        const { length, numbers, symbols, uppercase, excludeSimilarCharacters, strict } = req.body;

        const password = generator.generate({
            length: parseInt(length),
            numbers: numbers === 'on',
            symbols: symbols === 'on',
            uppercase: uppercase === 'on',
            excludeSimilarCharacters: excludeSimilarCharacters === 'on',
            strict: strict === 'on',
        });
        res.json({ password });
    }

};


