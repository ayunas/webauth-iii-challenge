const express = require("express");
const server = express();
const bodyParser = express.json();
const router = require("./router");
const cors = require("cors");

server.use(bodyParser, cors());
server.use("/api", router);

server.get("/", (req, res) => {
  res.send(`
        <h2>Welcome to Authenticator v.2</h2>
        <h4>Authenticator is built with SQLite3, Express.js, React.js, Node.js, Amazon DynamoDB</h4>
    `);
});

module.exports = server;
