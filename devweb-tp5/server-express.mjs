import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();

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
  




app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
  const length = request.params.nb;
  const contents = Array.from({ length })
    .map((_) => `<li>${Math.floor(100 * Math.random())}</li>`)
    .join("\n");
  return response.send(`<html><ul>${contents}</ul></html>`);
});

app.listen(port, host);