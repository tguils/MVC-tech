const router = require('express').Router();

const {
    Blogpost,
    Comments,
    User
} = require('../../models');

const withAuth = require('../../utils/auth');
//i need to get all of the blog comments
router.get("/", (req, res) => {
    Comments.findAll()
        .then((CommentsData) => res.json(CommentsData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//then i need to get comments from 1 blogpost

router.get("/", (req, res) => {
  const { id } = req.query;
  Comments.findAll({ where: { id } })
    .then((commentsData) => {
      if (commentsData.length === 0) {
        res.status(404).json({ message: `No comment` });
        return;
      }
      res.status(200).json(commentsData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//then need to create a comments
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comments.create({
                comments_text: req.body.comments_text,
                Blogpost_id: req.body.Blogpost_id,
                user_id: req.session.user_id
            })
            .then(CommentsData => res.json(CommentsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});


//then I need to delete the comments
router.delete('/:id', withAuth, (req, res) => {
    Comments.destroy({
      where: { id: req.params.id },
    })
      .then((CommentsData) => {
        if (!CommentsData) {
          res.status(404).json({
            message: `No comment!`,
          });
          return;
        }
        res.json(CommentsData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
module.exports = router;