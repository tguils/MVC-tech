const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4],
              },
        },
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updateUserData) {
                updateUserData.password = await bcrypt.hash(
                    updateUserData.password,
                    10
                );
                return updateUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    });
//utilized this https://plainenglish.io/blog/password-encryption-using-bcrypt-sequelize-and-nodejs-fb9198634ee7 and https://stackoverflow.com/questions/48798372/beforecreate-hook-for-postgre-not-hashing-password-using-bcryptjs   
module.exports = User;