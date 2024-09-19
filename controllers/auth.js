import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import passport from 'passport';

export default {
    registerView: (req, res) => res.render('Registration'),
  
    loginView: (req, res) => res.render('Log_in'),
  
    registerUser: async (req, res) => {
        const { login, email, password} = req.body;
        if(!login || !email || !password) {
            return res.render('Registration', { error: 'Please fill all fields'});
        }
        
        if (await User.findOne({where: {email}})) {
            return res.render('Registration', { error: 'A user account already exist with this email' });
        }

        await User.create({ login, email, password: bcrypt.hashSync(password, 8)});

        res.redirect('/login');
    },
  
    loginUser: (req, res) => {
      passport.authenticate('local', {
        successRedirect: '/dashboard/?loginsuccess',
        failureRedirect: '/login?error'
      }) (req, res);
    },
  
    logoutUser: (req, res) => {
      req.logout(() => res.redirect('/login?loggedout'))
    }
  };