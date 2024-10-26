import http from "node:http"; 
import fs from "node:fs/promises"; 
import logger from "loglevel"; // Importer le module loglevel

const host = "localhost";
const port = 8000;

// Définir le niveau de log souhaité
logger.setLevel(logger.levels.WARN); // Vous pouvez ajuster le niveau ici

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  
  try {
    const urlParts = request.url.split("/");
    const firstPart = urlParts[1];
    const secondPart = urlParts[2]; // Ici, secondPart sera :nb

    switch (firstPart) {
      case "index.html":
      case "":
        const indexContents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        logger.info("Index page served.");
        return response.end(indexContents);
        
      case "random.html":
        const randomValue = Math.floor(100 * Math.random());
        response.writeHead(200);
        logger.info("Random value generated: ", randomValue);
        return response.end(`<html><p>${randomValue}</p></html>`);
        
      case "random":
        const nb = parseInt(secondPart); // Convertit le paramètre en entier
        if (isNaN(nb) || nb <= 0) {
          logger.warn("Bad request: invalid number.");
          response.writeHead(400); // Mauvaise requête
          return response.end(`<html><p>400: BAD REQUEST</p></html>`);
        }
        const randomNumbers = Array.from({ length: nb }, () => Math.floor(Math.random() * 100)).join(", ");
        response.writeHead(200);
        logger.info(`Random numbers generated: ${randomNumbers}`);
        return response.end(`<html><p>Random Numbers: ${randomNumbers}</p></html>`);

      default:
        logger.warn(`Page not found: ${request.url}`);
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    logger.error("Internal server error: ", error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  logger.info(`Server is running on http://${host}:${port}`);
  logger.debug("NODE_ENV =", process.env.NODE_ENV);
});
