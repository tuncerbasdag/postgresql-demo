const { Sequelize } = require('sequelize');
const redis = require('../services/cache');

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
  let query = req.query.q || null;
  if (query) {
    filter = {
      where: {
        name: {
          [Op.like]: `${query}%`,
        },
      },
    };
  }

  const cacheKey = `playlists-q=${query}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const playlists = await Playlist.findAll(filter);

  if (playlists) {
    await redis.set(cacheKey, playlists);
    res.json(playlists);
  } else {
    res.status(404).json({});
  }
};

const getPlaylistById = async (req, res, next) => {
  const { id } = req.params;

  const cacheKey = `playlist-${id}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const playlist = await Playlist.findByPk(id, {
    include: [Track],
  });

  if (playlist) {
    await redis.set(cacheKey, playlist);
    res.json(playlist);
  } else {
    res.status(404).json({});
  }
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
};
