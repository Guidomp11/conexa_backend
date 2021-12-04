const express = require('express');
const router = express.Router();

const validateJWT = require('../middlewares/validateJWT');

const listingController = require('../controllers/listingController');

router.get('/posts', validateJWT, listingController.listPosts);
router.get('/photos', validateJWT, listingController.listPhotos);

module.exports = router;