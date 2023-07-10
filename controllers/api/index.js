const router = require('express').Router();

const commentRoutes = require('./comments-route.js');
const userRoutes = require('./user-routes.js');
const blogpostRoutes = require('./blogpost-routes.js');


router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes)

module.exports = router;