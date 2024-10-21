# CC3 Développement Web

## Partie 1

### 1.1

Voici la liste des en-têtes de la réponse HTTP du serveur :

- connection: keep-alive
- date: Mon, 30 Sep 2024 05:41:13 GMT
- keep-alive: timeout=5
- transfer-encoding: chunked

### 1.2

La liste des en-têtes qui ont changé depuis la version précédente est :

- content-length: 20
- content-type: application/json

### 1.3

La réponse reçue par le client est vide, il y a une erreur car le fichier index.html est manquant.

### 1.4

L'erreur dans la console est :

```
Error: ENOENT: no such file or directory, open 'C:\Users\Utilisateur\Desktop\devweb-tp5\index.html'
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1242:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\Utilisateur\\Desktop\\devweb-tp5\\index.html'
}
```

On peut trouver sur le site https://nodejs.org/api à quoi ce message d'erreur correspond exactement : ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

### 1.5

Voici le code de la fonction requestListener() avec la gestion d'erreur et async/await :

```javascript
import fs from "node:fs/promises";

async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end("500 Internal Server Error");
  }
}
```

### 1.6

Ces commandes ont ajouté 2 modules à mon projet :

- cross-env, qui gère les variables d'environnement
- nodemon, un outil de développement

### 1.7

La différence entre les scripts http-dev et http-prod est que http-dev utilise nodemon pour recharger automatiquement le serveur quand il y a des modifications, alors que http-prod utilise node pour exécuter le serveur, donc il n'y a pas de rechargement automatique.

### 1.8

- http://localhost:8000/index.html renvoie : 200 OK
- http://localhost:8000/random.html renvoie : 200 OK
- http://localhost:8000/ renvoie : 404 Not Found
- http://localhost:8000/dont-exist renvoie : 404 Not Found

## Partie 2

### 2.1

Voici les URLs des documentations des modules installés :

- Express : https://expressjs.com/en/4x/api.html
- http-errors : https://github.com/jshttp/http-errors#readme
- loglevel : https://github.com/pimterry/loglevel#readme
- morgan : https://github.com/expressjs/morgan#readme

### 2.2

Les 3 routes fonctionnent. http://localhost:8000/ et http://localhost:8000/index.html renvoient le code : 304 Not Modified, tandis que http://localhost:8000/random/:nb renvoie le code : 200 OK.

### 2.3

Les en-têtes des réponses fournies par Express sont :

- accept-ranges: bytes
- cache-control: public, max-age=0
- connection: keep-alive
- date: Mon, 30 Sep 2024 10:37:40 GMT
- etag: W/"110-1924236fa5c"
- keep-alive: timeout=5
- last-modified: Mon, 30 Sep 2024 09:15:52 GMT
- x-powered-by: Express

Celles qui sont nouvelles par rapport au serveur HTTP sont :

- accept-ranges: bytes
- cache-control: public, max-age=0
- etag: W/"110-1924236fa5c"
- last-modified: Mon, 30 Sep 2024 09:15:52 GMT
- x-powered-by: Express

### 2.4

L'événement listening se déclenche quand le serveur est prêt à recevoir des requêtes, donc quand le serveur a effectué une liaison avec le port avec app.listen(port, host).

### 2.5

L'option qui redirige / vers /index.html est l'option index.

### 2.6

Quand je rafraîchis normalement avec Ctrl + R, le code HTTP qui s'affiche pour le fichier style.css est 304 Not Modified. Mais en forçant le rafraîchissement avec Ctrl + Shift + R, le code HTTP qui s'affiche est : 200 OK. Cela est dû au fait que le rafraîchissement forcé ignore le cache et le serveur renvoie le fichier en entier, alors que lors du rafraîchissement normal, si le fichier n'a pas changé depuis le dernier téléchargement, le navigateur utilise son cache pour actualiser la page.

### 2.7

L'affichage change bien entre le mode développement et le mode production. Le mode développement affiche l'erreur complète tandis que le mode production affiche seulement le code et le nom de l'erreur.

Voici 2 exemples, qui utilisent cet URL : http://localhost:8000/random/abc:

Exemple mode production :

```
Error 400
Bad Request
```

Exemple mode développement :

```
Error 400
Bad Request

BadRequestError: Bad Request
    at file:///C:/Users/Utilisateur/Desktop/devweb-tp5/server-express.mjs:22:17
    at Layer.handle [as handle_request] (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\layer.js:95:5)
    at next (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\route.js:149:13)
    at Route.dispatch (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\route.js:119:3)
    at Layer.handle [as handle_request] (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\layer.js:95:5)
    at C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\index.js:284:15
    at param (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\index.js:365:14)
    at param (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\index.js:376:14)
    at Function.process_params (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\index.js:421:3)
    at next (C:\Users\Utilisateur\Desktop\devweb-tp5\node_modules\express\lib\router\index.js:280:10)
```
