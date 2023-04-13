const express = require('express');
const router = express.Router();
const ingredientsCtrl = require('../controllers/ingredients');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)
router.get('/ingredients/new',ensureLoggedIn, ingredientsCtrl.new);
// POST /performers (create functionality)
router.post('/ingredients',ensureLoggedIn, ingredientsCtrl.create);
// POST /movies/:id/performers (associate a performer with a movie)
router.post('/recipes/:id/ingredients',ensureLoggedIn, ingredientsCtrl.addToList);

module.exports = router; 