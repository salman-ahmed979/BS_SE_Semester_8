const WebSocketClient = require("websocket").client;
const client = new WebSocketClient();

client.on("connect", (connection) => {
  console.log(`Client connected with Connection: ${connection}`);

  connection.on("message", (message) => {
    console.log(`Server send message to client : ${message.utf8Data}`);
  });

  connection.send("Hotty is sexy");

  connection.send("My name is Salman");

  connection.close(1001, "Client bye")
});

client.connect("ws://localhost:5000");
