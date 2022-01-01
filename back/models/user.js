const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator'); // importe le module "mongoose-unique-validator" => prévalidation d'information, installé avec npm install --save mongoose-unique-validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);