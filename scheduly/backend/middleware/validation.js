import { User } from '../models/userSchema.js';


export const resolveUserId = async(req, res, next) => {
  console.log(req.params);
  const { params: {id} } = req;
  const user = await User.findById(id);
  if (!user) return res.status(401).send("Bad request");
  request.user = user;
  next();
}