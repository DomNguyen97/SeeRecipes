const Recipe = require("../models/recipes");

module.exports = {
    index,
    new: newRecipe,
    create
};


async function index(req, res) {
    const recipes = await Recipe.find({});
    res.render('recipes/index', { recipes });
}


function newRecipe(req, res) {
    res.render('recipes/new', { title: 'New Recipes' });
}

// async function create(req, res) {
//     for (let key in req.body) {
//       if(req.body[key] === '') delete req.body[key];
//     }
//     try {
//       await Recipe.create(req.body);
//       res.redirect('/recipes');
//     }catch (err){
//     console.log(err);
//    res.render('recipes/new',{ errorMsg: err.message });
//     }
//   }

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