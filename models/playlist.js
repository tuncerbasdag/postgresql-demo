const sequelize = require('./../db/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('Playlist', {
  id: {
    field: 'PlaylistId',
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

