const Recipe = require("../models/recipe");

module.exports = {
    index,
    show,
    new: newRecipe,
    delete: deleteRecipe,
    create
  };
  
  
  async function index(req, res) {
    const recipe = await Recipe.find({});
    res.render('recipes/index', { recipe });
  }
  
  async function show(req, res) {
    const recipe = await Recipe.findById(req.params.id);
    res.render('recipes/show', { title: 'Recipe Detail', recipe });
  }
  
  
  function newRecipe(req, res) {
    res.render('recipes/new', { title: 'New Recipes' });
  }
  
  async function deleteRecipe(req, res) {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  }
  
  async function create(req, res) {
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
  


  // async function create(req, res) {
  //   req.body.user = req.user._id;
  //   req.body.userName = req.user.name;
  //   req.body.userAvatar = req.user.avatar;
  
  
  // for (let key in req.body){
  //   if (req.body[key] ==='') delete req.body[key];
  // }
  // try {
  //     const recipe = await Recipe.create(req.body)
  //     res.redirected(`/recipes/${recipe._id}` , {title: 'Recipe' , errorMsg:''});
  // } catch (err) {
  //     console.log(err);
  //     res.render('recipes/new', { title: 'Recipe Detail' , errorMsg: err.messge});
  // }
  // }
  