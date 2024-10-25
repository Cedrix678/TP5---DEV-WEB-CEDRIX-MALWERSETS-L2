import http from "node:http";  // Import du module HTTP pour créer un serveur
import fs from "node:fs/promises";  // Import de fs avec promesses pour lire les fichiers de manière asynchrone

const host = "localhost";
const port = 8000;

// Fonction de gestion des requêtes asynchrone
async function requestListener(_request, response) {
  try {
    // Lecture du contenu du fichier index.html en UTF-8
    const contents = await fs.readFile("index.html", "utf8");
    
    // Définit le type de contenu de la réponse en HTML
    response.setHeader("Content-Type", "text/html");
    
    // Envoie un statut 200 (succès)
    response.writeHead(200);
    
    // Envoie le contenu du fichier en réponse
    response.end(contents);
  } catch (error) {
    // En cas d'erreur, définit le type de contenu en texte brut
    response.setHeader("Content-Type", "text/plain");
    
    // Envoie un statut 500 (erreur interne du serveur)
    response.writeHead(500);
    
    // Envoie un message d'erreur simple en réponse
    response.end("Erreur 500, interne du serveur : fichier introuvable.");
    
    // Affiche l'erreur dans la console pour le débogage
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
