const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');


//add onDeletes to any of these? need to look up where to add
User.hasMany(Blogpost, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Blogpost, {
    foreignKey: 'Blogpost_id',
});

Blogpost.belongsTo(User, {
    foreignKey: 'user-id',
});

Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost-id',
});

module.exports = { User, Comment, Blogpost };