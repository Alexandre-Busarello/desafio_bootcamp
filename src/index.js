const express = require("express");
const routes = require("./routes");

const server = express();

server.use(express.json());

let countRequest = 0;
server.use((req, res, next) => {
  countRequest++;
  console.log(`Foram feitas ${countRequest} requisições até agora.`);

  return next();
});

server.use(routes);

server.listen(3000);
