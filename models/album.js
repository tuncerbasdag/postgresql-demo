const sequelize = require('./../db/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Album', {
  id: {
    field: 'AlbumId',
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    field: 'Title',
    type: Sequelize.STRING,
  },
}, {
  timestamps:false
});

