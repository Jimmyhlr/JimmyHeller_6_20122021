const mongoose = require('mongoose');

const productSchema = mongoose.Schema({ // mongoose.Schema permet de créer un schéma de données pour la BDD
    userId: { type: String, required: true }, // req.user
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
}); 

module.exports = mongoose.model('Product', productSchema); // mongoose.model transforme le schéma en modèle utilisable