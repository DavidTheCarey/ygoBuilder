const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/reviews (create review for a movie)
router.post('/cards/:id/comments', ensureLoggedIn, commentsCtrl.create);
// DELETE /reviews
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);

module.exports = router;