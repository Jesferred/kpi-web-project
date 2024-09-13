import bcrypt from 'bcryptjs'
import User from '../models/User.js';

export default {
    registerView: (req, res) => res.render('register'),
  
    loginView: (req, res) => {
      // ...
    },
  
    registerUser: async (req, res) => {
        const { login, email, password} = req.body;
        if(!login || !email || !password) {
            return res.render('register', { error: 'Please fill all fields'});
        }
        
        if (await User.findOne({where: {email}})) {
            return res.render('register', { error: 'A user account already exist with thie email' });
        }

        await User.create({ login, email, password: bcrypt.hashSync(password, 8)});

        res.redirect('login?registrationdone');
    },
  
    loginUser: (req, res) => {
      // ...
    },
  
    logoutUser: (req, res) => {
      // ...
    }
  };