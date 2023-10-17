const fs = require('fs');

// References to 'client.html' and 'style.css' files in the local directory
const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const collection = fs.readFileSync(`${__dirname}/../client/collection.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);

// getPage Method - Returns requests to individual pages
const getPage = (request, response, page) => {
  response.writeHead(200, {'Content-Type':'text/html'});
  response.write(page);
  response.end();
}

// getClient Method - Returns any requests to 'client.html'
const getClient = (request, response) => getPage(request, response, client);

// getCollection Method - Returns any requests to 'client.html'
const getCollection = (request, response) => getPage(request, response, collection);

// getCollection Method - Returns any requests to 'client.html'
const getDocumentation = (request, response) => getPage(request, response, documentation);

// Exporting Methods
module.exports = {
  getClient,
  getCollection,
  getDocumentation,
};
