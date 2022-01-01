const mongoose = require('mongoose');

const productSchema = mongoose.Schema({ // mongoose.Schema permet de créer un schéma de données pour la BDD
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { /*/////////////////////////*/ },
    usersDisliked: { /*/////////////////////////*/ },
    // le champ "Id" est automatiquement généré par Mongoose
});

module.exports = mongoose.model('products', productSchema); // mongoose.model transforme le schéma en modèle utilisable