const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage-routes.js');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');


router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/home', homeRoutes)
router.use('/', homepageRoutes);


router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;