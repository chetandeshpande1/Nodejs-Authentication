import authController from "../src/controller/authController.js";
import isLoggedIn from "../src/middleware/guest.js";

const initRoutes = (app) => {
    app.get('/signin', authController().signin);
    app.post('/signin', authController().postSignin);
    app.get('/', authController().signup);
    app.post('/', authController().postSignup);
    app.post('/logout', authController().logout);
    app.get('/reset', authController().reset);
    app.post('/reset', authController().resetPassword);
    app.get('/home', isLoggedIn, authController().home);
};

export default initRoutes;
