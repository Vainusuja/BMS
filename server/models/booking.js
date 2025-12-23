const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Seat = require('./seat');

const Booking = sequelize.define('Booking', {
  user_id: DataTypes.INTEGER,
  status: { type: DataTypes.ENUM('pending', 'completed', 'failed'), defaultValue: 'pending' }
});

Seat.hasMany(Booking, { foreignKey: 'seat_id' });
Booking.belongsTo(Seat, { foreignKey: 'seat_id' });

module.exports = Booking;
