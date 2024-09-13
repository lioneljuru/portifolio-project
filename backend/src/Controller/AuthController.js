import { hashPwd } from '../middleware/hasher.js';
import { User } from '../models/userSchema.js';

export default class AuthController {
  static getLogin (req, res) {
    return res.status(200).render('/auth')
  }

  static loginUser(req, res) {
      const user = req.user;
      return res.status(200).json({user});
  }

  static logout (req, res) {
    if (!req.user) return res.sendStatus(401);
    req.logout((err) => {
      if (err) return res.sendStatus(400);
      return res.status(200).send('logout successful');
    })
  }

  static getSignUp(req, res) {
    return res.status(200).render('/auth/signup')

  }

  static async createUser(req, res) {
    const data = req.body;
    if (!data) return res.status(401).json({error: "Bad Request"});
    data.password = hashPwd(data.password);
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send({savedUser});
    } catch(err) {
      return res.status(409).send(err);

    }

  }
}