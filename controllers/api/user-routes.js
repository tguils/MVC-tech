const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('.../../models');

const withAuth = require('../../utils/auth');

//i need to get all of the users

//then i need to get a single users

//then need to create a users

//then need to be able to update the users

//the need to delete the users

module.exports = router;