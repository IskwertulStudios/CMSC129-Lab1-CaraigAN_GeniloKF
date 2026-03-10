import mongoose from 'mongoose';

// Mirrors the Item interface in Inventory.tsx exactly.
// 'id' is stored as a Number to match the frontend's numeric id field.
const itemSchema = new mongoose.Schema({
  id:         { type: Number, required: true },
  name:       { type: String, required: true },
  type:       { 
    type: String, 
    required: true,
    enum: ['Weapon', 'Head Wear', 'Body Armor', 'Pants', 'Consumable']
  },
  level:      { type: Number, required: true },
  rarity:     { 
    type: String, 
    required: true,
    enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
  },
  stat:       { type: String, required: true },
  flavorText: { type: String, required: true },
}, { _id: false }); // _id: false — items use their own numeric 'id', no need for Mongo ObjectIds

// Mirrors the equipped Record<EquipmentSlot, Item | null> in Inventory.tsx.
// Each slot stores either a full item sub-document or null.
const equippedSchema = new mongoose.Schema({
  'Weapon':     { type: itemSchema, default: null },
  'Head Wear':  { type: itemSchema, default: null },
  'Body Armor': { type: itemSchema, default: null },
  'Pants':      { type: itemSchema, default: null },
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format.',
    },
  },
  password:     { type: String, required: true },

  // --- Core RPG stats ---
  hp:           { type: Number, default: 100 },
  maxHp:        { type: Number, default: 100 }, // Needed by GameLayout's ProgressBar
  gold:         { type: Number, default: 0 },
  exp:          { type: Number, default: 0 },
  level:        { type: Number, default: 1 },
  // expThreshold is derived from level on the client, so it is NOT stored here.

  // --- Inventory ---
  inventory:    { type: [itemSchema], default: [] },
  equippedItems: { type: equippedSchema, default: () => ({
    'Weapon': null, 'Head Wear': null, 'Body Armor': null, 'Pants': null,
  })},

  // --- Save tracking ---
  lastSaved:    { type: Date, default: null },
});

const User = mongoose.model('User', userSchema);

export default User;