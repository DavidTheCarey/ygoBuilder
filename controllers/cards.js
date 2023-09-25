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
// extra lines here can be removed


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
    // .findById can give you back an empty query object if it doesn't find anything. This can cause some errors in some edge cases.
    // Best practice is to check to see if your `card` variable is a document and if it is then render if it's not render a 404.
    // Here is some custom error that I used to teach in the express lessons https://git.generalassemb.ly/ga-wdi-boston/express-api-template/blob/main/lib/custom_errors.js
    const card = await Card.findById(req.params.id);
    res.render("cards/show", {
        title: `${card.name}`, 
        card,
        creator: card.user
    })
}
async function edit (req, res){
    const card = await Card.findById(req.params.id);
    // handle for 404
    res.render("cards/edit", {title: `Edit ${card.name}`, card})
}

async function create(req, res) {

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    try {
        // update comment to reflect data you are using. It's no longer a movie
      // Update this line because now we need the _id of the new movie
      const card = await Card.create(req.body);
      // same as above
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
        // the below commented out code is missing an `=` <if (card.user !== req.user._id ) throw new Error('Unauthorized')> if you commented it out because it was
        // not working that is why. Also a good thing to have in there. 
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
        // should check for user owned and throw error if the user who owns this is not the one to remove it.
        await card.deleteOne(req.body);
        res.redirect("./"); 
    } catch (err){
        console.log(err);
        res.render("index", {title: "Yu-Gi-Oh Card Builder"});
    }
}