# TP 5 - Realiser par CEDRIX MALWERSETS L2 info TREC 7 


# PARTIE 1 :

# installation

# Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.

HTTP/1.1 200 OK
Date: Fri, 25 Oct 2024 04:28:32 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

#Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 25 Oct 2024 04:37:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20

# Servir différents types de contenus

# Question 1.3 que contient la réponse reçue par le client ?

La réponse reçue par le client est vide, il y a une erreur car le fichier index.html est manquant.

# Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

Voila la'erreur afficher au console :

Error: ENOENT: no such file or directory, open 'index.html'
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1242:14) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: 'index.html'
}

On peut trouver sur le site https://nodejs.org/api à quoi ce message d'erreur correspond exactement : ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

# Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.

---JAVA SCRIPT---

import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    response.setHeader("Content-Type", "text/plain");
    response.writeHead(500);
    response.end("Erreur interne du serveur : fichier introuvable.");
    console.error("Erreur 500:", error.message);
  }
}


// Création du serveur avec la fonction requestListener comme gestionnaire de requêtes

const server = http.createServer(requestListener);

// Le serveur écoute les requêtes sur le port et l'hôte spécifiés

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);  // Affiche la variable d'environnement NODE_ENV
});

# Mode Developpement

# Question 1.6 indiquer ce que cette commande a modifié dans votre projet.

Ces commandes ont ajouté 2 modules à mon projet exacement au fichier package.json :

- cross-env, qui gère les variables d'environnement
- nodemon, un outil de développement

# Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?

La différence entre les scripts http-dev et http-prod est que http-dev utilise nodemon pour recharger automatiquement le serveur quand il y a des modifications, alors que http-prod utilise node pour exécuter le serveur, donc il n'y a pas de rechargement automatique.


# Gestion manuelle des routes

# Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

URL : http://localhost:8000/index.html

HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/html
Date: Fri, 25 Oct 2024 10:14:59 GMT
Keep-Alive: timeout=5
Transfer-Encoding: Identity

----------------------------------

URL : http://localhost:8000/random.html

HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/html
Date: Fri, 25 Oct 2024 10:16:03 GMT
Keep-Alive: timeout=5
Transfer-Encoding: Identity

----------------------------------

URL : http://localhost:8000/

HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Type: text/html
Date: Fri, 25 Oct 2024 10:16:36 GMT
Keep-Alive: timeout=5
Transfer-Encoding: Identity

----------------------------------

URL : http://localhost:8000/dont-exist

HTTP/1.1 404 Not Found
Connection: keep-alive
Content-Type: text/html
Date: Fri, 25 Oct 2024 10:17:17 GMT
Keep-Alive: timeout=5
Transfer-Encoding: Identity



# Partie 2 : framework Express


# Question 2.1 donner les URL des documentations de chacun des modules installés par la commande précédente.



Voici les URLs des documentations des modules installés :

- Express : https://expressjs.com/en/4x/api.html
- http-errors : https://github.com/jshttp/http-errors#readme
- loglevel : https://github.com/pimterry/loglevel#readme
- morgan : https://github.com/expressjs/morgan#readme

# Question 2.2 vérifier que les trois routes fonctionnent.

Les 3 route fonctionnent  :


URL: http://localhost:8000/index.html
État: 200 OK
Source: Réseau
Adresse: 127.0.0.1:8000

URL: http://localhost:8000/random/5
État: 200 OK
Source: Réseau
Adresse: 127.0.0.1:8000

URL: http://localhost:8000/dont-exist
État: 404 Not Found
Source: Réseau
Adresse: 127.0.0.1:8000


# Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?


Réponse
HTTP/1.1 304 Not Modified
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Connection: keep-alive
Date: Fri, 25 Oct 2024 12:29:05 GMT
ETag: W/"c1-192c399620a"
Keep-Alive: timeout=5
Last-Modified: Fri, 25 Oct 2024 12:14:22 GMT
X-Powered-By: Express


Réponse
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 81
Content-Type: text/html; charset=utf-8
Date: Fri, 25 Oct 2024 12:30:14 GMT
ETag: W/"51-7wztDAsjNv3qTJEfK7hYp4PpuMk"
Keep-Alive: timeout=5
X-Powered-By: Express



# Question 2.4 quand l’événement listening est-il déclenché ?

L'événement listening est déclenché après que le serveur a été démarré et est prêt à traiter des requêtes.

# Ajout de middlewares

# Question 2.5 indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?

L'option qui redirige automatiquement les requêtes vers / vers /index.html dans une application Express est généralement la méthode express.static()

# Question 2.6 visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.

Sur mon Mac, après avoir visité la page d’accueil, j’ai d’abord rafraîchi la page avec Command + R, puis j’ai forcé le rafraîchissement avec Command + Shift + R.

Premier Chargement : Lors de la première visite, le serveur a renvoyé le fichier style.css avec le code HTTP 200 OK, indiquant que la ressource a été trouvée et servie correctement.

Rafraîchissement Normal (Command + R) : Lors du rafraîchissement normal, si le fichier était déjà en cache et n’avait pas été modifié, j’ai obtenu un code HTTP 304 Not Modified, ce qui signifie que le fichier n’avait pas changé depuis la dernière demande.

Rafraîchissement Forcé (Command + Shift + R) : En forçant le rafraîchissement, le navigateur a ignoré le cache et a demandé à nouveau style.css, ce qui a renvoyé un code HTTP 200 OK, confirmant que le fichier a été servi directement par le serveur.

Ainsi, les codes HTTP reçus pour le fichier style.css sont 200 OK et 304 Not Modified, selon que le fichier est servi depuis le cache ou non.










