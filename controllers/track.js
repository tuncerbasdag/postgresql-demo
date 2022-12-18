const redis = require('../services/cache');

const Track = require('../models/track');
const Playlist = require('../models/playlist');

Track.belongsToMany(Playlist, {
  through: 'PlaylistTrack',
  foreignKey: 'TrackId',
  timestamps: false,
});

const getTrackById = async (req, res, next) => {
  const { id } = req.params;

  const cacheKey = `track-${id}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const track = await Track.findByPk(id, {
    include: [Playlist],
  });

  if (track) {
    await redis.set(cacheKey, track);
    res.json(track);
  } else {
    res.status(404).json({});
  }
};

module.exports = {
  getTrackById,
};
