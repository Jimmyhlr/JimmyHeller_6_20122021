const http = require('http'); // NODE.js utilise le module CommonJS donc pour importer un élément on utilise "require" au lieu de "import"
const app = require('./app'); // importe l'application "app.js"

const normalizePort = val => {          // la fonction normalizePort renvoie un port valide,
    const port = parseInt(val, 10);     // qu'il soit donné sous la forme d'un numéro ou d'une chaîne
    if (isNaN(port)) {      // NaN = Not a Number
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000'); // configure le port pour qu'il soit soit sur la variable d'environnement du port (process.env.PORT), soit (||) sur le port 3000
app.set('port', port); // indique à l'app express qu'elle tournera sur le port de la constante "port"

const errorHandler = error => {                     // la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée.
    if (error.syscall !== 'listen') {               // Elle est ensuite enregistrée dans le serveur
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app); // passe l'application "app" au serveur

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port); // indique au serveur d'écouter le port configuré ligne 15