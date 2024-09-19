export default {
    dashboardView: (req, res) => {
        res.render('Dashboard', {login: req.user.login});
    }
}