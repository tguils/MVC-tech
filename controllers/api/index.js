const router = require('express').Router();


const userRoutes = require('./user-routes.js');
const blogpostRoutes = require('./blogpost-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/User', userRoutes);
router.use('/Blogpost', blogpostRoutes);
router.use('/Comments', commentRoutes)

module.exports = router;