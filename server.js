const { createServer } = require("node:http");

let db = [
  {
    title: "Some code like they dress",
    comedian: "Moyes",
    year: "2000",
    id: "1",
  },
  {
    title: "What did the mic tell the user? Stop spitting on me.",
    comedian: "John Doe",
    year: "1994",
    id: "2",
  },
  {
    title: "Life is a journey... your meant to laugh at this joke",
    comedian: "Woodie Spark",
    year: "2014",
    id: "3",
  },
];

const server = createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.end("Welcome to the home page");
  } else if (req.url === "/jokes" && req.method === "GET") {
    return getJoke(req, res);
  } else if (req.url === "/jokes" && req.method === "POST") {
    return postJoke(req, res);
  } else if (req.method === "PATCH") {
    return updateJoke(req, res);
  } else if (req.method === "DELETE") {
    return deleteJoke(req, res);
  } else {
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

//GET all jokes
function getJoke(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(db));
}

//POST a joke
function postJoke(req, res) {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    let bodyString = Buffer.concat(body).toString();
    let data = JSON.parse(bodyString);
    let updatedDB = [...db, data];
    res.end(JSON.stringify(updatedDB));
  });
}

//PATCH a joke
function updateJoke(req, res) {
  let id = req.url.split("/")[2];
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    let bodyString = Buffer.concat(body).toString();
    let data = JSON.parse(bodyString);
    let copyDB = [...db];
    const findObject = copyDB.find((item) => item.id === id);
    const selectedJoke = { ...findObject, ...data };
    res.end(JSON.stringify(selectedJoke));
  });
}

//DELETE a joke
function deleteJoke(req, res) {
  let id = req.url.split("/")[2];
  let copyDB = [...db];
  const deletedObject = copyDB.find((item) => item.id === id);
  res.end(JSON.stringify(deletedObject));
}

const port = 8080;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
