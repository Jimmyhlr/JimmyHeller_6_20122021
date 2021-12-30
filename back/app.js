const express = require('express');
// importation du framework Express

const app = express();
// crée une application Express

app.use((req, res, next) =>{
    console.log('Request received');
    next();
});
// req = request, res = response, next = fonction qui permet de passer au middleware suivant
// example middleware :
//
//   app.use((req, res, next) =>{
//       console.log('Request received');
//       next();
//   });
//

app.use((req, res, next) =>{
    res.status(201);
    next();
});
// ajoute un code d'état 201 à la réponse

app.use((req, res, next) => {
    res.json({ message: 'Your request has been received' });
    next();
});
// indique à l'application ce qu'elle doit répondre après avoir reçu une requête
// sans cette fonction, le serveur générera une erreur 404 en réponse à toute requête

app.use((req, res, next) => {
    console.log('Response sent successfully');
})

module.exports = app;
// exporte l'application pour qu'elle soit accessible depuis les autres fichiers du projet