const express = require('express');
const router = express.Router();
const cardsCtrl = require('../controllers/cards');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get("/", cardsCtrl.index);
router.get("/new", cardsCtrl.new);


module.exports = router;