const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Show = sequelize.define('Show', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'shows',
  timestamps: true,
});

module.exports = Show;
