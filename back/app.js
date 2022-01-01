const express = require('express');
// importation du framework Express

const mongoose = require('mongoose');
// importation du package mongoose, facilite les interactions avec MongoDB
// permet à la BDD de :
// valider le format des données
// gérer les relations entre les documents
// communiquer directement avec la BDD pour la lecture et l'écriture des documents

const products = require('./models/products');

const app = express();
// crée une application Express

mongoose.connect('mongodb+srv://JimmyHeller:4z4gpa0301@p6-heller-jimmy.hn0gh.mongodb.net/P6HellerJimmy?retryWrites=true&w=majority', // adresse copiée depuis le cluster MongoDB correspondant
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(() => console.log('Connexion to MongoDB failed!'));

app.use(express.json());
// middleware du framework Express => permet d'extraire le corps JSON d'une requête POST venant du front-end
// en résumé : prend toutes les requêtes qui ont Content-Type : application/json et met à dispo leur body sur l'objet req
// "app.use(express.json())" est la même chose que "body-parser"

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'accéder à l'API depuis n'importe quelle origine ( '*' )
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'ajouter les headers mentionnés aux requêtes envoyées vers l'API (Origin , X-Requested-With , etc.)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    next();
  });

module.exports = app;
// exporte l'application pour qu'elle soit accessible depuis les autres fichiers du projet