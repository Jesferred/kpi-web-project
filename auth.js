import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'; 
import bcrypt from 'bcryptjs';
import User from './models/User.js'; 

export const initPassport = () => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false); 

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return done(null, false); 

        return done(null, user); 
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); 
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); 
    } catch (error) {
      done(error);
    }
  });
};

export const protectRoute = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.redirect(`/login?next=${req.url}`); 
};
