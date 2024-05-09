import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';

const init = (passport) => {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};

export default init;
