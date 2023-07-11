const User = require('./User');
const Comment = require('./Comments');
const Post = require('./Blogpost');

//add onDeletes to any of these? need to look up where to add
User.hasMany(Blogpost, {
    foreignKey: 'userId',
});

User.hasMany(Comments, {
    foreignKey: 'userId',
});

Comments.belongsTo(User, {
    foreignKey: 'userId',
});

Comments.belongsTo(Blogpost, {
    foreignKey: 'blogpostId',
});

Blogpost.belongsTo(User, {
    foreignKey: 'userId',
});

Blogpost.hasMany(Comments, {
    foreignKey: 'postId',
});

module.exports = { User, Comments, Blogpost };