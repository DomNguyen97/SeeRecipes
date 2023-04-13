const Ingredient = require('../models/ingredient');
const Recipe = require('../models/recipe');

module.exports = {
    new: newIngredient,
    create,
    addToList
  };
      
  async function addToList(req, res) {
    const recipe = await Recipe.findById(req.params.id);
      // The cast array simply holds the performer's ObjectId
      recipe.list.push(req.body.ingredientId);
      await recipe.save();
        res.redirect(`/recipes/${recipe._id}`);
    }
  
  async function newIngredient(req, res) {
    //Sort performers by their name
    const ingredients = await Ingredient.find({}).sort('name');
    res.render('ingredients/new', { title: 'Add Ingredient', ingredients });
  }
  
  async function create(req, res) {
    try {
      await Ingredient.create(req.body);
    } catch (err) {
      console.log(err);
    }
    res.redirect('/ingredients/new');
  }