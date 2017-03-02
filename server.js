'use strict'
const restify = require('restify');
const airNowRequest = require('./utils/airNowRequest');

let smogJSON = {
  smogLevel: 4
}

const respondWithSmog = (req, res, next) => {
  airNowRequest.makeZipRequest('84108').then((data) => {
    res.send(data);
    next();
  }).catch(err => console.log(err));
}

const server = restify.createServer();
server.get('/', respondWithSmog);

server.listen(3030, () => {
  console.log('%s listening at %s', server.name, server.url);
});
