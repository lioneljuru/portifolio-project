import express from "express";
import passport from 'passport';
import session from 'express-session';
import './AuthStrategy/local-strategy.js';
import router from './routes/main.js';



export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(session({
    secret: process.env.SESSIONSECRET || "scheduly",
		saveUninitialized: true,
		resave: false,
		cookie: {
			maxAge: 60000 * 60,
		}
  }))
  //app.use(express.bodyParser);

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.urlencoded({
    extended: true
  }));

  app.use(router);

  return app
}