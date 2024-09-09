import { Router } from "express";
import { resolveUserId } from "../middleware/validation.js";
import passport from "passport";
import AuthController from "../Controller/AuthController.js";

const route = Router();

route.get('/auth', AuthController.getLogin);
route.post('/auth', passport.authenticate('local'), AuthController.loginUser);
route.get('/auth/signup', AuthController.getSignUp);
route.post('/auth/signup', AuthController.createUser);
route.post('/auth/logout', AuthController.logout)

export {route};