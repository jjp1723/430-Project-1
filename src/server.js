// Built off of http-api-assignment-ii

const http = require('http');
const url = require('url');
const query = require('querystring');

// Initializing handlers to import response methods
const jsonHandler = require('./jsonResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// parseBody Method - Recompiles the body of a request and calls the appropriate handler
const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', (err) => {
    //console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);

    handler(request, response, bodyParams);
  });
};

// handlePost Method - Handles post requests to '/addTank'
const handlePost = (request, response, parsedURL) => {
  if (parsedURL.pathname === '/addTank') {
    parseBody(request, response, jsonHandler.addTank);
  }
};

// urlStruct Object - Assigns different response methods to different methods and urls
//  (Attempted to put handlePost functionality within, but could get functioning properly)
const urlStruct = {
  GET: {
    '/': mediaHandler.getClient,
    '/client.html': mediaHandler.getClient,
    '/collection.html': mediaHandler.getCollection,
    '/documentation.html': mediaHandler.getDocumentation,
    '/tank-default.png': mediaHandler.getTankDefault,
    '/tank-leopard.jpg': mediaHandler.getTankLeopard,
    '/tank-t90.jpg': mediaHandler.getTankT90,
    '/documentation.pdf': mediaHandler.getPDFDocumentation,
    '/getTanks': jsonHandler.getTanks,
    '/notReal': jsonHandler.notFound,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getTanks': jsonHandler.getTanksMeta,
    '/notReal': jsonHandler.notFoundMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// onRequest Method - Receives requests from the client and determines the
//  response based on the requested url and the request method
const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  //console.dir(request.method);
  //onsole.dir(request.pathname);

  if (request.method === 'POST') {
    return handlePost(request, response, parsedURL);
  }

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  if (urlStruct[request.method][parsedURL.pathname]) {
    return urlStruct[request.method][parsedURL.pathname](request, response);
  }

  return urlStruct[request.method].notFound(request, response);
};

// Creating the server
http.createServer(onRequest).listen(port, () => {
  //console.dir(`Listening on 127.0.0.1:${port}`);
});
