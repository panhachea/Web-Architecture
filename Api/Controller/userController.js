const express = require('express');
const businessRoutes = express.Router();

// Require Business model in our routes module

const Users = require('../model/user');
// Defined store route
businessRoutes.route('/').post(function (req, res) {

const User  = new Users(req.body);
User.save()
    .then(data => {
      res.status(200).json({'data': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

module.exports = businessRoutes;