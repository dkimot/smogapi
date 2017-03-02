'use strict'
const restify = require('restify');

let smogJSON = {
  smogLevel: 4
}

// Fixed duplicate res, res and changed smogLevel to smogJSON to solve reference error
const respondWithSmog = (req, res, next) => {
  res.send(smogJSON);
  next();
}

// I forgot, server.use is for middleware as opposed to request handling. So I changed it to get and specified the root path
const server = restify.createServer();
server.get('/', respondWithSmog);

server.listen(3030, () => {
  console.log('%s listening at %s', server.name, server.url);
});
