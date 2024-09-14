import { Router } from "express";
import passport from "passport";
import AuthController from "../Controller/AuthController.js";

const router = Router();

router.get('/auth', AuthController.getLogin);
router.post('/auth', (req, res, next ) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
  if (err) {
    return res.status(500).json({ error: 'Login failed.' });
  }
  const loggedUser = {
    id: user._id,
    name: `${user.firstname} ${user.lastname}`,
    email: user.email,
    dob: user.dob
  }
  return res.json({ message: 'Login successful!', loggedUser});
});
})(req, res, next);
});

router.get('/auth/signup', AuthController.getSignUp);
router.post('/auth/signup', AuthController.createUser);
router.post('/auth/logout', AuthController.logout)

export {router};