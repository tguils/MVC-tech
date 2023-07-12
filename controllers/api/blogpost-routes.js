const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');


//i need to get all of the blog posts
router.get("/", (req, res) => {
    Blogpost.findAll({
            attributes: ["id", "content", "title", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comments,
                    attributes: ["id", "comments_text", "Blogpost_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((BlogpostData) => res.json(BlogpostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//then i need to get a single post
router.get("/:id", (req, res) => {
    Blogpost.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "content", "title", "created_at"],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comments_text", "Blogpost_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((BlogpostData) => {
            if (!BlogpostData) {
                res.status(404).json({
                    message: "Not found"
                });
                return;
            }
            res.json(BlogpostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//then need to create a post
router.post("/", withAuth, (req, res) => {
    Blogpost.create({
            title: req.body.title,
            content: req.body.Blogpost_content,
            user_id: req.session.user_id
        })
        .then((BlogpostData) => res.json(BlogpostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//then need to be able to update the post
router.put("/:id", withAuth, (req, res) => {
    Blogpost.update({
            title: req.body.title,
            content: req.body.Blogpost_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((BlogpostData) => {
            if (!BlogpostData) {
                res.status(404).json({
                    message: "Error"
                });
                return;
            }
            res.json(BlogpostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//the need to delete the post
router.delete("/:id", withAuth, (req, res) => {
    Blogpost.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((BlogpostData) => {
            if (!BlogpostData) {
                res.status(404).json({
                    message: "Not found!"
                });
                return;
            }
            res.json(BlogpostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;