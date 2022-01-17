const bcrypt = require('bcrypt'); // importe le module "bcrypt" => cryptage de mdp, installé avec npm install --save bcrypt
const jwt = require('jsonwebtoken'); // importe le module "jsonwebtoken" => création de token d'authentification, installé avec npm install --save jsonwebtoken

const User = require('../models/User');



exports.signup = (req, res, next) => {
    console.log('demande de création de nouvel utilisateur');
    bcrypt.hash(req.body.password, 10) // appelle la fonction de hachage bcrypt et demande de hasher le mdp 10x (plus la valeur est élevée, plus le mdp est sécurisé mais la procédure prend du temps)
    .then(hash => {
        console.log('mot de passe haché');
        const user = new User({         // crée un nouvel utilisateur
            email: req.body.email,      // avec l'adresse email saisie dans la requête
            password: hash              // et le mdp haché
        });
        console.log('enregistrement nouvel utilisateur');
        user.save()                     // enregistre le nouvel utilisateur
        .then(() => res.status(201).json({ message: 'utilisateur créé'}))      // envoie la réponse "utilisateur créé"
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(503).json({ error }));
};



exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // user.findOne => trouve 1 seul utilisateur dans la BDD
    .then(user => {
        if (!user) { // = si aucun user n'a été trouvé
            return res.status(401).json({ error: 'Utilisateur non trouvé' }); // renvoi l'erreur "utilisateur non trouvé"
        }
        console.log(user._id);
        bcrypt.compare(req.body.password, user.password) // bcrypt compare le mdp envoyé par l'utilisateur avec le mdp haché enregistré pour ce user dans la BDD
        .then(valid => { // boolean // revient à demander si la comparaison est valable ou non
            if (!valid) {  // = si la comparaison n'est pas valable
                return res.status(401).json({ error: 'Mot de passe incorrect' }); // renvoi l'erreur "mot de passe incorrect"
            }
            // arrivé à ce stade, on assume que la comparaison a retourné "true"
            res.status(200).json({ // status 200 = statut OK // renvoi un objet JSON avec :
                userId: user._id,                            // l'userID de la BDD pour cet utilisateur
                token: jwt.sign(                             // le token d'authentification
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )                               
            });
        })
        .catch(error => res.status(500).json({ error })); // uniquement pour renvoyer un problème de connexion, car MongoDB renverra une réponse même si aucun utilisateur n'a été trouvé
    })
    .catch(error => res.status(500).json({ error })); // uniquement pour renvoyer un problème de connexion, car MongoDB renverra une réponse même si aucun utilisateur n'a été trouvé
};

