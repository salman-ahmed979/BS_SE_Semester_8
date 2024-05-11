const http = require("http");
const WebSocketServer = require("websocket").server;

const httpServer = http.createServer((req, res) => {
  console.log("Creating a http server");
});

const port = 5000;

httpServer.listen(port, () => {
  console.log(`HttpServer is listening on port ${port}...`);
});

const websocket = new WebSocketServer({
  httpServer: httpServer,
});

let connection = null;
websocket.on("request", (request) => {
  console.log(`Request Origin: ${request.origin}`);
  connection = request.accept(null, request.origin);
});

websocket.on("connect", (socket) => {
  socket.send("Server is saying Hello!");
  
  socket.on("message", (message) => {
    console.log(`Message Received: ${message.utf8Data}`);
  });
});

websocket.on("close", (connection, reason, desc) => {
  console.log(`Connection closed ${desc}`);
});
