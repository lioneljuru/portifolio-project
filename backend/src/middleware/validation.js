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

export const valInvite = async(req, res, next) => {
  const invitedUsers = (req.body.invitedUsers) ? req.body.invitedUsers : [];
  if (invitedUsers[0] === "@users"){
    req.nonExistingUsers = [];
    return next();
  }
  let nonExistingUsers = [];
  if(invitedUsers.length !== 0) {
    for(let user = 0; user < invitedUsers.length; user++) {
      const existingUser = await User.findOne({email: invitedUsers[user]});
      if (!existingUser) {
        nonExistingUsers.push(user);
      };
  }
  req.nonExistingUsers = nonExistingUsers;
  }
  next();
}