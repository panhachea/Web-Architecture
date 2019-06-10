const express = require('express');
const jwt = require('jsonwebtoken');
// const bodyPaser = require('body-parser');
const bcrypt = require('bcrypt');
// const expressValidator = require('express-validator');
// const session = require('express-session');

const saltRounds = 10;
const userMiddleware = require('../middleware/user');
const response = require('../service/response');
const Routes = express.Router();
const config = require('../config');
// Require Business model in our routes module
const session = require('express-session');
const Users = require('../model/user');
// Defined store route


Routes.route('/signup').post(async(req, res) => {
  try{
const userExit = await Users.findOne({
  email: req.body.email,
});
if(userExit) {
 response.error (res, 400, 'Douplicate data!');
}

bcrypt.hash(req.body.password, saltRounds,(err,   hash) => {
    Users.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    }).then(data => {
      res.status(200).json({'data': 'Create user successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
  })
} catch(error) {
  response.error(res, error.message);
}
});

Routes.route('/signin').post(async (req, res) => {
  try {
    const userInfo = await Users.findOne({
      email: req.body.email,
    });
    if (!userInfo) {
      throw new Error('User is not exit !');
    }
    if (userInfo) {
      if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({
            _id: userInfo._id,
          },
          config.secret, {
            expiresIn: '1h',
          }
        );
        // hide password
        const userObj = userInfo.toObject();
        userObj.password = null;
        delete userObj.password; // userObj = _.omit(userObj, 'password', '_id');
        res.json({
          status: 'success',
          message: 'user found!!!',
          data: {
            user: userObj,
            token,
          },
        });
      } else {
        throw new Error('Invalid Email/Password !');
      }
    }
} catch(error){
  response.error(res, error.message);
}

});

Routes.route('/me').get(userMiddleware, (req, res) => {
  try {
    const user = req.user;
    const userObj = user.toObject();
    userObj.password = null;
    delete userObj.password;
   
    // hide password,deletedBy,deletedAt,deleted
    if (!user) {
      throw new Error('Error data user');
    } else {
      res.json({message: "Successfullly!", userObj});
    }
  } catch (err) {
    response.error(res, err.message);
  }
});

Routes.route("/logout").get((req, res, next) => {
  if(req.session){
    // deleted session obj
    req.session.destroy((err) => {
      if (err) {
        res.status(404);
      } else {
       res.json({message: 'Logout successfully!'});
      }
    })
  }
});
module.exports = Routes;