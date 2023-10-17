const fs = require('fs');

// References to static images in local directory
const tankDefault = fs.readFileSync(`${__dirname}/../client/tank-default.png`);
const tankLeopard = fs.readFileSync(`${__dirname}/../client/tank-leopard.jpg`);
const tankT90 = fs.readFileSync(`${__dirname}/../client/tank-t90.jpg`);

// Reference to documentation pdf in local directory
const pdfDocumentation = fs.readFileSync(`${__dirname}/../client/documentation.pdf`);

// References to html files in the local directory
const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const collection = fs.readFileSync(`${__dirname}/../client/collection.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);

// getImage Method - Returns requests to individual images
const getMedia = (request, response, media, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(media);
  response.end();
};

// getTankDefault Method - Returns any requests to 'tank-default.png'
const getTankDefault = (request, response) => getMedia(request, response, tankDefault, 'image/png');

// getTankLeopard Method - Returns any requests to 'tank-dleopard.jpg'
const getTankLeopard = (request, response) => getMedia(request, response, tankLeopard, 'image/jpeg');

// getTankT90 Method - Returns any requests to 'tank-t90.jpg'
const getTankT90 = (request, response) => getMedia(request, response, tankT90, 'image/jpeg');

// getPDFDocumentation Method - Returns any requests to 'client.html'
const getPDFDocumentation = (request, response) => getMedia(request, response, pdfDocumentation, 'application/pdf');

// getClient Method - Returns any requests to 'client.html'
const getClient = (request, response) => getMedia(request, response, client, 'text/html');

// getCollection Method - Returns any requests to 'client.html'
const getCollection = (request, response) => getMedia(request, response, collection, 'text/html');

// getCollection Method - Returns any requests to 'client.html'
const getDocumentation = (request, response) => getMedia(request, response, documentation, 'text/html');

// Exporting Methods
module.exports = {
  getTankDefault,
  getTankLeopard,
  getTankT90,
  getPDFDocumentation,
  getClient,
  getCollection,
  getDocumentation,
};
