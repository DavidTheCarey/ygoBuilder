const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const cardSchema = new Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Monster", "Spell", "Trap"],
    default: "Monster"
  },
  level: {
    type: Number,
    min: 1,
    max: 12
  },
  attribute:{
    type: String,
    enum: ["LIGHT", "DARK", "FIRE", "WATER", "WIND", "EARTH", "DIVINE"]
  },
  monsterType: {
    type: String,
    enum: ["Aqua", "Beast", "Beast-Warrior", "Cyberse", "Dinosaur",
    "Divine-Beast", "Dragon", "Fairy", "Fiend", "Fish", "Insect",
    "Machine", "Plant", "Psychic", "Pyro", "Reptile", "Rock",
    "Sea Serpent", "Spellcaster", "Thunder", "Warrior", 
    "Winged Beast", "Wyrm", "Zombie"]
  },
  atk: { 
    type: Number, 
    min: 0,
    max: 9999
  },
  def: { 
    type: Number, 
    min: 0,
    max: 9999
  },
  effect: {
    type: String
  },
  trapType: {
    type: String,
    enum: ["Normal", "Continuous", "Counter"],
    default: null
  },
  spellType: {
    type: String,
    enum: ["Normal", "Continuous", "Quick-Play", "Field", "Equip"],
    default: null
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Card', cardSchema);