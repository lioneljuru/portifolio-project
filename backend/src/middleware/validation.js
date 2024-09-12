import { User } from '../models/userSchema.js';

export const getUserFromSession = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.status(401).json({error: "Unauthorised"})
  }
}


export const resolveUserId = async(req, res, next) => {
  const { user } = req;
  const eUser = await User.findById(user.id);
  if (!eUser) return res.status(401).send("Bad request");
  req.user = eUser;
  next();
}