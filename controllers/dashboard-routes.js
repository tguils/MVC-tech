const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Blogpost,
    User,
    Comment
} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) => {
    Blogpost.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'Blogpost_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(BlogpostData => {
            const posts = BlogpostData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blogpost.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'Blogpost_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(BlogpostData => {
            if (!BlogpostData) {
                res.status(404).json({
                    message: 'not found'
                });
                return;
            }

            const post = BlogpostData.get({
                plain: true
            });

            res.render('editpost', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/new', (req, res) => {
    res.render('createpost', {
        loggedIn: true
    })
})

module.exports = router;