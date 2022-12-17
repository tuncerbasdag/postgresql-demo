const express = require('express');
const router = express.Router();

const {
  createArtist,
  getArtistById,
  deleteArtistById,
} = require('../controllers/artist');

const { getAlbumById } = require('../controllers/album');
const { getAllPlaylists, getPlaylistById } = require('../controllers/playlist');
const { getTrackById } = require('../controllers/track');

router.post('/api/artists', createArtist);

router.route('/api/artists/:id').get(getArtistById).delete(deleteArtistById);

router.get('/api/playlists', getAllPlaylists);
router.get('/api/playlists/:id', getPlaylistById);

router.get('/api/tracks/:id', getTrackById);

router.get('/api/album/:id', getAlbumById);

module.exports = router;
