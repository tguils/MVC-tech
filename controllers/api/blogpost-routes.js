const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('.../../models');

const withAuth = require('../../utils/auth');


//i need to get all of the blog posts

//then i need to get a single post

//then need to create a post

//then need to be able to update the post

//the need to delete the post

module.exports = router;