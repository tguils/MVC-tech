require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.HEROKU_POSTGRESQL_MAUVE_URL
  ? new Sequelize(process.env.HEROKU_POSTGRESQL_MAUVE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
