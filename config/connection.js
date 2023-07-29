require('dotenv').config();

const Sequelize = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql', 
    dialectOptions: {
      decimalNumbers: true,
    },
  });
} else {
  // For local development or other environments
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql', 
      dialectOptions: {
        decimalNumbers: true,
      },
    }
  );
}

module.exports = sequelize;


module.exports = sequelize;