import encryptionService from '../services/encryption.js';
import UserPassword from '../models/UserPassword.js';
import User from '../models/User.js';

export default {
    savePassword: async (req, res) => {
        const { website, login, password } = req.body;
        const userId = req.user.id;
        console.log(userId)

        try {
            const user = await User.findByPk(userId);
            const { secretKey } = user;
            const encryptedData = encryptionService.encryptPassword(password, secretKey);

            await UserPassword.create({
                userId,
                website,
                login,
                password: encryptedData.password, 
                iv: encryptedData.iv
            });

            res.redirect('/dashboard?passwordsaved');
        } catch (error) {   
            console.error(error);
            res.render('Dashboard', { error: 'Failed to save password' });
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

    deleteUserPassword: async(req, res) => {
        const { id } = req.params;
        try {
            const passwords = await UserPassword.findAll({ where: { userId } });
            await UserPassword.destroy({ where: { id } });
            res.render('Dashboard', { passwords });
        } catch (error) {
            console.error(error);
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
    
};
