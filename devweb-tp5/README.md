TP 5 - Realiser par CEDRIX MALWERSETS L2 info TREC 7 


PARTIE 1 :

#Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.

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

#Question 1.3 que contient la réponse reçue par le client ?

La réponse reçue par le client est vide, il y a une erreur car le fichier index.html est manquant.

#Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

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

#


