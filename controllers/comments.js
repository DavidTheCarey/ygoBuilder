const Card = require('../models/card');

module.exports = {
  create,
  // Add this export
  delete: deleteComment
};

async function deleteComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const card = await Card.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  // Rogue user!
  if (!card) return res.redirect('/');
  // Remove the review using the remove method available on Mongoose arrays
  card.comments.remove(req.params.id);
  // Save the updated movie doc
  await card.save();
  // Redirect back to the movie's show view
  res.redirect(`/cards/${card._id}`);
}

async function create(req, res) {
  const card = await Card.findById(req.params.id);
  // Add the user-centric info to req.body (the new review)
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  // We can push (or unshift) subdocs into Mongoose arrays
  card.comments.push(req.body);
  try {
    // Save any changes made to the movie doc
    await card.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/cards/${card._id}`);
}