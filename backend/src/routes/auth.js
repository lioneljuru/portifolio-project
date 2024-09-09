import { Router } from "express";
import { resolveUserId } from "../middleware/validation.js";
import passport from "passport";
import AuthController from "../Controller/AuthController.js";

const router = Router();

router.get('/auth', AuthController.getLogin);
router.post('/auth', passport.authenticate('local'), AuthController.loginUser);
router.get('/auth/signup', AuthController.getSignUp);
router.post('/auth/signup', AuthController.createUser);
router.post('/auth/logout', AuthController.logout)

export {router};