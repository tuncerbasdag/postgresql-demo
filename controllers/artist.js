const Album = require('../models/album');
const Artist = require('../models/artist');

Artist.hasMany(Album, {
  foreignKey: 'ArtistId',
});

const createArtist = async (req, res, next) => {
  console.log(req.body);
  Artist.create({
    name: req.body.name,
  })
    .then((artist) => {
      res.json(artist);
    })
    .catch((err) => {
      res.status(400).json({
        msg: err.errors.map((error) => {
          return {
            field: error.path,
            msg: error.message,
          };
        }),
      });
    });
};

const getArtistById = async (req, res, next) => {
  const { id } = req.params;

  Artist.findByPk(id, {
    include: [Album],
  }).then((artists) => {
    if (artists) {
      res.json(artists);
    } else {
      res.status(404).json({});
    }
  });
};

const deleteArtistById = async (req, res, next) => {
  const { id } = req.params;
  Artist.findByPk(id)
    .then((artist) => {
      artist.destroy().then(() => {
        res.json({ msg: 'Artist deleted' });
      });
      res.json(artist);
    })
    .catch((err) => {
      res.json({ msg: 'artist was not deleted', err });
    });
};

module.exports = {
  createArtist,
  getArtistById,
  deleteArtistById,
};
