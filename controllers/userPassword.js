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
            console.log(passwords)
            res.render('Dashboard', { passwords });
        } catch (error) {
            console.error(error);
            res.render('Dashboard', { error: 'Failed to retrieve passwords' });
        }
    },
};
