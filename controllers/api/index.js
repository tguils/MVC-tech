const router = require('express').Router();


const userRoutes = require('./user-routes.js');
const postRoutes = require('./blogpost-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/User', userRoutes);
router.use('/Post', postRoutes);
router.use('/Comments', commentRoutes)

module.exports = router;