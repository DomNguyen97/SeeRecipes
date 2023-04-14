const Recipe = require('../models/recipe');

module.exports = {
  create,
  delete: deleteComment

};
async function deleteComment(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const recipe = await Recipe.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  // Rogue user!
  if (!recipe) return res.redirect('/recipes');
  // Remove the review using the remove method available on Mongoose arrays
  recipe.comments.remove(req.params.id);
  // Save the updated  doc
  await recipe.save();
  // Redirect back to the recipe's show view
  res.redirect(`/recipes/${recipe._id}`);
}

async function create(req, res) {
  const recipe = await Recipe.findById(req.params.id);

  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  // We can push (or unshift) subdocs into Mongoose arrays
  recipe.comments.push(req.body);
  try {
    // Save any changes made to the recipe doc
    await recipe.save();
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/recipes/${recipe._id}`);
}

