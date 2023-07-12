const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');

//i need to get all of the users
router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(UserData => res.json(UserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//then i need to get a single users
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Blogpost,
                    attributes: ['id', 'title', 'content', 'created_at']
                },
                {
                    model: Comments,
                    attributes: ['id', 'comments_text', 'created_at'],
                    include: {
                        model: Blogpost,
                        attributes: ['title']
                    }
                }
            ]
        })
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({
                    message: 'No user!'
                });
                return;
            }
            res.json(UserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//then need to create a users
router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(UserData => {
            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.username = UserData.username;
                req.session.loggedIn = true;

                res.json(UserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

//log user in 
router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(UserData => {
            if (!UserData) {
                res.status(400).json({
                    message: 'No user found!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.username = UserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: UserData,
                    message: 'You are now logged in!'
                });
            });

            const validPassword = UserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({
                    message: 'Incorrect password!'
                });
                return;
            }

            req.session.save(() => {
                req.session.user_id = UserData.id;
                req.session.username = UserData.username;
                req.session.loggedIn = true;

                res.json({
                    user: UserData,
                    message: 'Log in successful!'
                });
            });
        });
});
  //logout user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }

});

module.exports = router;