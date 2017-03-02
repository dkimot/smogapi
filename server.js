const restify = require('restify');

let smogJSON = {
  smogLevel: 4
}

const respondWithSmog = (res, res, next) => {
  res.send(smogLevel);
  next();
}

const server = restify.createServer();
server.use(respondWithSmog);

server.listen(3030, () => {
  console.log('%s listening at %s', server.name, server.url);
});
