'use strict'
const restify = require('restify');

let smogJSON = {
  smogLevel: 4
}

const respondWithSmog = (req, res, next) => {
  res.send(smogJSON);
  next();
}

const server = restify.createServer();
server.get('/', respondWithSmog);

server.listen(3030, () => {
  console.log('%s listening at %s', server.name, server.url);
});
