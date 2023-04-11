var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
 // All actual paths start with "/skills"

// GET /recipes
router.get('/', recipesCtrl.index);
// GET /recipes/new 
router.get('/new', recipesCtrl.new);
// GET /recipes/:id
router.get('/:id', recipesCtrl.show);
// POST /recipes
router.post('/', recipesCtrl.create);  
// DELETE
router.delete('/:id', recipesCtrl.delete);
//  GET /recipes/:id/edit
router.get('/:id/edit', recipesCtrl.edit);
//  PUT /recipes/:id
router.put('/:id', recipesCtrl.update);

module.exports = router;