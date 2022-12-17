const { Sequelize } = require('sequelize');
const Playlist = require('../models/playlist');
const Track = require('../models/track');

const { Op } = Sequelize;

Playlist.belongsToMany(Track, {
  through: 'PlaylistTrack',
  foreignKey: 'PlaylistId',
  timestamps: false,
});

const getAllPlaylists = async (req, res, next) => {
  let filter = {};
  let { q } = req.query;
  if (q) {
    filter = {
      where: {
        name: {
          [Op.like]: `${q}%`,
        },
      },
    };
  }
  Playlist.findAll(filter).then((playlist) => {
    res.json(playlist);
  });
};

const getPlaylistById = async (req, res, next) => {
  const { id } = req.params;

  Playlist.findByPk(id, {
    include: [Track],
  }).then((playlist) => {
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({});
    }
  });
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
};
