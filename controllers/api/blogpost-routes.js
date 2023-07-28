const router = require('express').Router();

const {
    Post,
    Comment,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');


//i need to get all of the blog posts
router.get("/", (req, res) => {
    Post.findAll({
            attributes: ["id", "content", "title", "created_at"],
            order: [
                ["created_at", "DESC"]
            ],
            include: [{
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: Comment,
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((PostData) => res.json(PostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//then i need to get a single post
router.get("/:id", (req, res) => {
    Post.findOne({
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
                    attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["username"],
                    },
                },
            ],
        })
        .then((PostData) => {
            if (!PostData) {
                res.status(404).json({
                    message: "Not found"
                });
                return;
            }
            res.json(PostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//then need to create a post
router.post("/", withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then((PostData) => res.json(PostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//then need to be able to update the post
router.put("/:id", withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.Post_content,
        }, {
            where: {
                id: req.params.id,
            },
        })
        .then((PostData) => {
            if (!PostData) {
                res.status(404).json({
                    message: "Error"
                });
                return;
            }
            res.json(PostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
//the need to delete the post
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((PostData) => {
            if (!PostData) {
                res.status(404).json({
                    message: "Not found!"
                });
                return;
            }
            res.json(PostData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;