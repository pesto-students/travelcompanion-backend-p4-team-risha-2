import {JWT_SECRET} from "../constants";
import * as jwt from "jsonwebtoken"
import {Request} from "express";
import {User} from "../models/User";

class JwtService {
  sign(data) {
    return jwt.sign(data, JWT_SECRET);
  }

  async verify(req: Request) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const verify = jwt.verify(token, JWT_SECRET);
      if (!verify) {
        throw new Error('Invalid token');
      }
      const {id} = verify;
      const user = await User.findOne({_id: id})
      if (!user) {
        throw new Error('Invalid user');
      }
      return user;
    } catch (err) {
      throw(err)
    }
  }
}

const jwtService = new JwtService();
export default jwtService;
