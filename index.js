import express from 'express';
import path from 'path';
import ejs from 'ejs';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import flash from 'express-flash';
import { connectMongoose } from './src/database/mongoose.js'; 
import passportInit from './src/passport/passport.js';
import webRoutes from './routes/web.js';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Settting Template Engine
app.set("view engine", "ejs");
app.set('views', path.join('views'));
console.log(app.get("view engine"));

// Database Connection
connectMongoose();

// Session Configuration
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Passport Configuration
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


const publicPath = path.join("public");
app.use(express.static(publicPath));
app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
webRoutes(app);

// Port Start
app.listen(3100, () => {
  console.log('Server is listening on port 3100');
})
