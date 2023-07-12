const User = require('./User');
const Comment = require('./Comments');
const Blogpost = require('./Blogpost');

//add onDeletes to any of these? need to look up where to add
User.hasMany(Blogpost, {
    foreignKey: 'userId',
});

User.hasMany(Comment, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(Blogpost, {
    foreignKey: 'blogBlogpd',
});

Blogpost.belongsTo(User, {
    foreignKey: 'userId',
});

Blogpost.hasMany(Comment, {
    foreignKey: 'blogpostId',
});

module.exports = { User, Comment, Blogpost };