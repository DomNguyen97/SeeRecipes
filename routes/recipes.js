var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');
 // All actual paths start with "/skills"

// GET /skills
router.get('/', recipesCtrl.index);
// GET /skills/new 
router.get('/new', recipesCtrl.new);
// GET /skills/:id
router.get('/:id', recipesCtrl.show);
// POST /skills
router.post('/', recipesCtrl.create);  
// DELETE
router.delete('/:id', recipesCtrl.delete);


module.exports = router;