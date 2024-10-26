import createError from 'http-errors';
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; // Importer fileURLToPath
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();

// Définir __filename et __dirname pour le module ES
const __filename = fileURLToPath(import.meta.url); // Obtenir le chemin du fichier courant
const __dirname = path.dirname(__filename); // Définir __dirname

logger.setLevel(logger.levels.DEBUG); // Définir le niveau de log

// Définir le moteur de vue à utiliser EJS
app.set("view engine", "ejs"); // Ajout de cette ligne

// Middleware pour afficher les en-têtes de réponse
app.use((req, res, next) => {
    const originalSend = res.send; // Sauvegarder la méthode send originale

    res.send = function (body) {
        // Avant d'envoyer la réponse, afficher les en-têtes
        logger.info('Response Headers:', res.getHeaders()); // Remplacer console.log par logger.info
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
app.get("/random/:nb", (request, response, next) => {
    const length = Number.parseInt(request.params.nb, 10); // Convertir en nombre entier

    // Vérification si length n'est pas un nombre
    if (Number.isNaN(length)) {
        logger.warn('Le paramètre doit être un nombre'); // Ajouter un log de warning
        return next(createError(400, 'Le paramètre doit être un nombre')); // Produire une erreur 400
    }

    // Générer des nombres aléatoires si length est valide
    const numbers = Array.from({ length }, () => Math.floor(100 * Math.random()));
    const welcome = "Bienvenue sur la page des nombres aléatoires"; // Message de bienvenue
    logger.info(`Generated ${length} random numbers`); // Log de l'information sur le nombre de nombres générés
    return response.render("random", { numbers, welcome }); // Rendre la vue
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    logger.error(err.stack); // Utiliser logger pour les erreurs
    res.status(500).send('Quelque chose a mal tourné !');
});

app.use((request, response, next) => {
    logger.debug(`default route handler : ${request.url}`); // Remplacer console.debug
    return next(createError(404));
});

app.use((error, _request, response, _next) => {
    logger.debug(`default error handler: ${error}`); // Remplacer console.debug
    const status = error.status ?? 500;
    const stack = app.get("env") === "development" ? error.stack : "";
    const result = { code: status, message: error.message, stack };
    return response.render("error", result);
});

// Démarrer le serveur
const server = app.listen(port, host);

server.on("listening", () =>
    logger.info( // Remplacer console.info
        `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
    ),
);

logger.info(`File ${import.meta.url} executed.`); // Remplacer console.info
