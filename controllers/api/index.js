const router = require('express').Router();

const commentRoutes = require('./comments-route.js');
const userRoutes = require('./user-routes.js');
const blogpostRoutes = require('./blogpost-routes.js');


router.use('/User', userRoutes);
router.use('/Blogpost', blogpostRoutes);
router.use('/Comments', commentRoutes)

module.exports = router;