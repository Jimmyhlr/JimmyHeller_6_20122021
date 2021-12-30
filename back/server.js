const http = require('http');
// NODE.js utilise le module CommonJS donc pour importer un élément on utilise "require" au lieu de "import"

const server = http.createServer ((req, res) => {
    res.end('This is the reply from the server'/*ce qui est affiché dans la console en réponse à la requête*/); 
});
// "req" = request, "res" = response
// utiliser la méthode "end" de la réponse pour renvoyer une réponse de type "string" à l'appelant

server.listen(process.env.PORT || 3000);
// configure le serveur pour qu'il écoute soit la variable d'environnement du port (process.env.PORT), soit (||) le port 3000