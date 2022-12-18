const redis = require('../services/cache');

const Album = require('../models/album');
const Artist = require('../models/artist');

Album.hasMany(Artist, {
  foreignKey: 'ArtistId',
});

const getAlbumById = async (req, res, next) => {
  const { id } = req.params;

  const cacheKey = `album-${id}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const album = await Album.findByPk(id, {
    include: [Artist],
  });

  if (album) {
    await redis.set(cacheKey, album);
    res.json(album);
  } else {
    res.status(404).json({});
  }
};

module.exports = {
  getAlbumById,
};
