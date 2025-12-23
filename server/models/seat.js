const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Show = require('./show');

const Seat = sequelize.define('Seat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  show_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: { model: Show, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  seat_number: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM('AVAILABLE', 'HELD', 'BOOKED'), 
    defaultValue: 'AVAILABLE'
  },
  hold_id: { type: DataTypes.STRING, allowNull: true },
  hold_expire_at: { type: DataTypes.DATE, allowNull: true }
}, {
  tableName: 'seats',
  timestamps: true,
  indexes: [{ unique: true, fields: ['show_id', 'seat_number'] }]
});

Seat.belongsTo(Show, { foreignKey: 'show_id' });
Show.hasMany(Seat, { foreignKey: 'show_id' });

module.exports = Seat;
