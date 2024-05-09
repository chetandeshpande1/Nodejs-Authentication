

import User from '../models/user.js';
import passport from 'passport';

const authController = () => ({

    // SIGN IN SETUP
    
    signin: (req, res) => {
        res.render('signin');
    },

    postSignin: (req, res, next) => {
        const { username, password } = req.body;

        // Validate request
        if (!username || !password) {
            req.flash('error', 'All fields are required');
            return res.redirect('signin');
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                req.flash('error', info.message);
                return next(err);
            }
            if (!user) {
                req.flash('error', info.message);
                return res.redirect('signin');
            }

            req.logIn(user, (err) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                }
                return res.redirect('home');
            });
        })(req, res, next);
    },

    home: (req, res) => {
        res.render('home');
    },

    // SIGNUP SETUP
    signup: (req, res) => {
        res.render('signup');
    },

    

    postSignup: async (req, res) => {
        const { username, email, password } = req.body;
    
        if (!username || !email || !password) {
            req.flash('error', 'All fields are required');
            req.flash('username', username);
            req.flash('email', email);
            return res.redirect('/');
        }
    
        try {
            // Check if email exists
            const emailExists = await User.exists({ email: email });
            if (emailExists) {
                req.flash('error', 'Email already exist');
                req.flash('username', username);
                req.flash('email', email);
                return res.redirect('/');
            }
    
            // Register user
            await User.register({
                username: username,
                email: email
            }, password);
            
            return res.redirect('signin');
        } catch (err) {
            req.flash('error', 'Something went wrong');
            return res.redirect('/');
        }
    },
    

    // RESET PASSWORD SETUP//
    reset: (req, res) => {
        res.render('reset');
    },

    // resetPassword: (req, res) => {
    //     User.findByUsername(req.body.username, (err, user) => {
    //         if (err) {
    //             req.flash('error', 'plz check your password');
    //         } else {
    //             user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
    //                 if (err) {
    //                     return res.redirect('reset');
    //                 } else {
    //                     return res.redirect('signin');
    //                 }
    //             });
    //         }
    //     });
    // },


    resetPassword: (req, res) => {
        User.findByUsername(req.body.username, (err, user) => {
            if (err || !user) {
                req.flash('error', 'User not found or incorrect password');
                return res.redirect('/reset');
            }
            
            user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
                if (err) {
                    req.flash('error', 'Failed to reset password');
                    return res.redirect('/reset');
                } else {
                    req.flash('success', 'Password reset successful');
                    return res.redirect('/signin');
                }
            });
        });
    },


    // LOGOUT
    logout: (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    }
});

export default authController;
