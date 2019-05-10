import * as jwt from 'jsonwebtoken';

import User from '../models/user';
import BaseCtrl from './base';
const SECRET_TOKEN: any = 'reactpockey';
export default class UserCtrl extends BaseCtrl {
  model = User;
  
  login = (req:any, res:any) => {
    console.log(req.body);      
    this.model.findOne({ email: req.body.email }, (err:Error, user:any) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error:Error, isMatch:boolean) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token, _id:user._id });
      });
    });
  }
  register =  (req:any, res:any) => {
    const today = new Date()
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    console.log(userData);
  }
}
