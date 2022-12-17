const sequelize = require('./../db/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Track', {
  id: {
    field: 'TrackId',
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    field: 'Name',
    type: Sequelize.STRING,
  },
}, {
  timestamps:false
});

