
// dashboard.js
import UserPassword from '../models/UserPassword.js';

export default {
    dashboardView: async (req, res) => {
        const userId = req.user.id;

        try {
            const passwords = await UserPassword.findAll({ where: { userId } });
            res.render('Dashboard', { passwords, login: req.user.login }); // Убедись, что передаешь passwords
        } catch (error) {
            console.error(error);
            res.render('Dashboard', { error: 'Failed to retrieve passwords', passwords: [] }); // Передай пустой массив, если ошибка
        }
    }
};
