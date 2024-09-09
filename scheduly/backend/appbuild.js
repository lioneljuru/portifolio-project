import express from "express";
import passport from 'passport';
//import bodyParser from 'body-parser'
import session from 'express-session';
import './AuthStrategy/local-strategy.js';
//import {router as userRoutes} from './routes/user.js';
import {route as indexRoutes} from './routes/index.js';
import { route as authRoutes } from './routes/auth.js';


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
  //app.use(userRoutes);
  app.use(indexRoutes);
  app.use(authRoutes);
  app.use(express.urlencoded({
    extended: true
  }));
  return app
}