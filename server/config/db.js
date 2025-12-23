// const { Sequelize } = require('sequelize');
// require('dotenv').config();  // Must be at top

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,  // must be set
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false
//   }
// );

// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// sequelize.authenticate()
//   .then(() => console.log('Database connected successfully'))
//   .catch(err => console.log('Database connection failed:', err));

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection failed:', err));

module.exports = sequelize;
