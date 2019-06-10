const Users = require('../model/user');
const jwt = require('jsonwebtoken');
const response = require('../service/response');
const config = require('../config');

module.exports = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      // check token that user store in db
      if (req.token) {
          jwt.verify(req.token, config.secret, async (err, user) => {
            try {
              if (err) {
                throw new Error('There was an error on verifying token');
              }
              const userId = await Users.findOne({
                _id: user._id,
              });
              if (userId) {
                req.user = userId;
                next();
              } else {
                throw new Error('Invalid user token');
              }
             
            } catch (e) {
              response.error(res, e.message);
            }
          });
        } else {
          throw new Error('Changed the message to Invalid user token or the token is expired !');
        }
      
    } else {
      response.forbidenResult(res, 'Forbbid');
    }
  } catch (er) {
    response.error(res, er.message);
  }
};
