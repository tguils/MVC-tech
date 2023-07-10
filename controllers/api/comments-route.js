const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('.../../models');

const withAuth = require('../../utils/auth');
//i need to get all of the blog comments

//then i need to get a single comments

//then need to create a comments

//then need to be able to update the comments

//the need to delete the comments

module.exports = router;