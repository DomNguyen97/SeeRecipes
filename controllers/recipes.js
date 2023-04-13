const Recipe = require("../models/recipe");
const Ingredient = require("../models/ingredient");


module.exports = {
    index,
    show,
    new: newRecipe,
    delete: deleteRecipe,
    create,
    edit,
    update
  };
  
  
  async function index(req, res) {
    const recipe = await Recipe.find({});
    res.render('recipes/index', { recipe });
  }
  
  async function show(req, res) {
    // Populate the cast array with performer docs instead of ObjectIds
    const recipe = await Recipe.findById(req.params.id).populate('list');
    // Mongoose query builder approach to retrieve performers not the movie:
      // Performer.find({}).where('_id').nin(movie.cast)
    // The native MongoDB approach uses a query object to find 
    // performer docs whose _ids are not in the movie.cast array like this:
    const ingredients = await Ingredient.find({ _id: { $nin: recipe.list } }).sort('name');
    res.render('recipes/show', { title: 'Recipe Detail', recipe, ingredients });
  }
  
  
  function newRecipe(req, res) {
    res.render('recipes/new', { title: 'New Recipes' });
  }
  
  async function deleteRecipe(req, res) {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  }
  

  async function create(req, res) {
    req.body.allergies = !!req.body.allergies;
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      await Recipe.create(req.body);
      res.redirect('/recipes');
    } catch (err) {
      console.log(err);
      res.render('recipes/new', { errorMsg: err.message });
    }
  }
  
  async function edit(req, res){
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/edit' , {title: "Edit Recipe", recipe});
}



  async function update(req, res) {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/recipes/${recipe.id}`);
  } catch (err) {
    console.log(err);
    res.render('error', { errorMsg: err.message})
  }
}