import http from "node:http"; // Import du module HTTP pour créer un serveur
import fs from "node:fs/promises"; // Import de fs avec promesses pour lire les fichiers de manière asynchrone

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const urlParts = request.url.split("/");
    const path = urlParts[1]; // Récupérer la partie de chemin
    const nb = urlParts[2]; // Récupérer le paramètre nb

    switch (path) {
      case "index.html":
      case "": // Traiter / et /index.html de la même manière
        const contents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        return response.end(contents);

      case "random.html":
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      
      case "random": // Ajouter la route pour /random/:nb
        const count = parseInt(nb, 10); // Convertir nb en entier
        if (isNaN(count) || count < 1) {
          response.writeHead(400); // Mauvaise requête
          return response.end(`<html><p>400: BAD REQUEST - Please provide a valid number.</p></html>`);
        }
        
        const randomNumbers = Array.from({ length: count }, () => Math.floor(Math.random() * 100)).join(", ");
        response.writeHead(200);
        return response.end(`<html><p>Random Numbers: ${randomNumbers}</p></html>`);

      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

// Création du serveur avec la fonction requestListener comme gestionnaire de requêtes
const server = http.createServer(requestListener);

// Le serveur écoute les requêtes sur le port et l'hôte spécifiés
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV); // Affiche la variable d'environnement NODE_ENV
});
