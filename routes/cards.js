const express = require('express');
const router = express.Router();
const cardsCtrl = require('../controllers/cards');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get("/", cardsCtrl.index);
router.get("/new", ensureLoggedIn, cardsCtrl.new);
router.get("/new/monster", ensureLoggedIn, cardsCtrl.newMonster);
router.get("/new/spell", ensureLoggedIn, cardsCtrl.newSpell);
router.get("/new/trap", ensureLoggedIn, cardsCtrl.newTrap);
router.get("/:id", cardsCtrl.show);
router.post("/", ensureLoggedIn, cardsCtrl.create);
router.get("/:id/edit", ensureLoggedIn, cardsCtrl.edit);
router.put("/:id", ensureLoggedIn, cardsCtrl.update);
router.delete("/:id", ensureLoggedIn, cardsCtrl.delete);


module.exports = router;