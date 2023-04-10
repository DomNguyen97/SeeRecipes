const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recipeSchema = new mongoose.Schema({
  recipeName:{type: String, required: true},
  ingredients: [String],
  difficult: {
    type: String,
    enum: ['Easy','Medium','Hard','Very Hard']
  },
  allergies: { type: Boolean, default: true },
  cookingInstructions:[String]
}, {
  timestamps: true
});




module.exports = mongoose.model('Recipe', recipeSchema);