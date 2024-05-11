const { createServer } = require("http");

let db = [];

const server = createServer((req, res) => {
  res.end("Welcome Home");
});

const port = 5500;

server.listen(port, "localhost", () => {
  console.log(`Server is listening on port ${port}...`);
});
