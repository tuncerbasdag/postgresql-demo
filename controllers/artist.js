const redis = require('../services/cache');
const Album = require('../models/album');
const Artist = require('../models/artist');

Artist.hasMany(Album, {
  foreignKey: 'ArtistId',
});

const createArtist = async (req, res, next) => {
  Artist.create({
    name: req.body.name,
  })
    .then((artist) => {
      res.json(artist);
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors.map((error) => {
          return {
            field: error.path,
            message: error.message,
          };
        }),
      });
    });
};

const getArtistById = async (req, res, next) => {
  const { id } = req.params;

  const cacheKey = `artist-${id}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData);
  }

  const artist = await Artist.findByPk(id, {
    include: [Album],
  });

  if (artist) {
    await redis.set(cacheKey, artist);
    res.json(artist);
  } else {
    res.status(404).json({});
  }
};

const deleteArtistById = async (req, res, next) => {
  const { id } = req.params;
  Artist.findByPk(id)
    .then((artist) => {
      artist.destroy().then(() => {
        res.json({ message: 'Artist deleted' });
      });
      res.json(artist);
    })
    .catch((err) => {
      res.json({ message: 'artist was not deleted', err });
    });
};

module.exports = {
  createArtist,
  getArtistById,
  deleteArtistById,
};
