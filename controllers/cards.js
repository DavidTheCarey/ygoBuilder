const Card = require('../models/card');

module.exports = {
    index,
    new: newCard,
    newMonster,
    newSpell,
    newTrap,
    create,
    show,
    edit,
    update,
    delete: deleteCard
}

async function index(req, res) {
    const cards = await Card.find({});
    res.render('cards/index', { title: 'Card Feed', cards });
}

function newCard (req, res){
    res.render('cards/new', {title: 'Pick a Type'});
}



function newMonster (req, res){
    res.render("cards/types/monster", {
        title: "Create a Monster", type: "Monster"});
}

function newSpell (req, res){
    res.render("cards/types/spell", {
        title: "Create a Spell", type: "Spell"});
}

function newTrap (req, res){
    res.render("cards/types/trap", {
        title: "Create a Trap", type: "Trap"});
}

async function show (req, res){
    const card = await Card.findById(req.params.id);
    res.render("cards/show", {
        title: `${card.name}`, 
        card,
        creator: card.user
    })
}
async function edit (req, res){
    const card = await Card.findById(req.params.id);
    res.render("cards/edit", {title: `Edit ${card.name}`, card})
}

async function create(req, res) {

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
      // Update this line because now we need the _id of the new movie
      const card = await Card.create(req.body);
      // Redirect to the new movie's show functionality 
      res.redirect(`/cards/`);
    } catch (err) {
      // Typically some sort of validation error
      console.log(err);
      res.render('cards/new', { title: "Pick a Type", errorMsg: err.message });
    }
}

async function update (req, res){
   const card = await Card.findById(req.params.id);
    try {
        //  if (card.user != req.user._id ) throw new Error('Unauthorized')
        await card.updateOne(req.body);
        res.redirect(`${card._id}`)

    } catch (err) {
        console.log(err);
        res.render("cards/show", {title: card.name, card, errorMsg: err.message})
    }
}

async function deleteCard (req,res){
    const card = await Card.findById(req.params.id);
    try {
        await card.deleteOne(req.body);
        res.redirect("./"); 
    } catch (err){
        console.log(err);
        res.render("index", {title: "Yu-Gi-Oh Card Builder"});
    }
}