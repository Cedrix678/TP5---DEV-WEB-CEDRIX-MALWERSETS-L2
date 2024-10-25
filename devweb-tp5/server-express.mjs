import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; // Importer fileURLToPath

const host = "localhost";
const port = 8000;

const app = express();

// Définir __filename et __dirname pour le module ES
const __filename = fileURLToPath(import.meta.url); // Obtenir le chemin du fichier courant
const __dirname = path.dirname(__filename); // Définir __dirname

// Middleware pour afficher les en-têtes de réponse
app.use((req, res, next) => {
    const originalSend = res.send; // Sauvegarder la méthode send originale

    res.send = function (body) {
        // Avant d'envoyer la réponse, afficher les en-têtes
        console.log('Response Headers:', res.getHeaders());
        return originalSend.call(this, body); // Appeler la méthode send originale
    };

    next();
});

// Utiliser morgan pour logger les requêtes seulement en mode développement
if (app.get("env") === "development") app.use(morgan("dev"));


// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'static')));

// Route pour la page d'accueil
app.get(["/", "/index.html"], (request, response) => {
    response.sendFile("index.html", { root: path.join(__dirname, 'static') });
});

// Route pour générer des nombres aléatoires
app.get("/random/:nb", (request, response) => {
    const length = parseInt(request.params.nb, 10); // Convertir en nombre entier
    const contents = Array.from({ length })
        .map(() => `<li>${Math.floor(100 * Math.random())}</li>`)
        .join("\n");
    return response.send(`<html><ul>${contents}</ul></html>`);
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});

// Démarrer le serveur
const server = app.listen(port, host);

server.on("listening", () =>
    console.info(
        `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
    ),
);

console.info(`File ${import.meta.url} executed.`);
