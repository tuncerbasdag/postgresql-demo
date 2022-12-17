const Album = require('../models/album');
const Artist = require('../models/artist');

Album.hasMany(Artist, {
  foreignKey: 'ArtistId',
});

const getAlbumById = async (req, res, next) => {
  const { id } = req.params;

  Album.findByPk(id, {
    include: [Artist],
  }).then((album) => {
    if (album) {
      res.json(album);
    } else {
      res.status(404).json({});
    }
  });
};

module.exports = {
  getAlbumById,
};
