const sequelize = require('./../db/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Artist', {
  id: {
    field: 'ArtistId',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'Name',
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Name is required!'
      },
      len: {
        args: true,
        msg: 'Name is required!'
      }
    }
  },
}, {
  timestamps:false
});

