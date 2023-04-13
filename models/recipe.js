const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
},
  { timestamps: true
});

const recipeSchema = new mongoose.Schema({
  recipeName:{type: String, required: true},
  creator: [String],
  difficult: {
    type: String,
    enum: ['Easy','Medium','Hard','Very Hard']
  },
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  allergies: { type: Boolean, default: true },
  cookingInstructions:[String],
  comments: [commentSchema] 
}, {
  timestamps: true
});





module.exports = mongoose.model('Recipe', recipeSchema);