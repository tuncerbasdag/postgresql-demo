const Track = require('../models/track');
const Playlist = require('../models/playlist');

Track.belongsToMany(Playlist, {
  through: 'PlaylistTrack',
  foreignKey: 'TrackId',
  timestamps: false,
});

const getTrackById = async (req, res, next) => {
  const { id } = req.params;

  Track.findByPk(id, {
    include: [Playlist],
  }).then((track) => {
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({});
    }
  });
};

module.exports = {
  getTrackById,
};
