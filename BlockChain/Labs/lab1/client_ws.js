const { WebSocket } = require("ws");
const webSocket = new WebSocket("ws://localhost:5000/");

webSocket.onopen = () => {
  console.log("Client open a connection");

  webSocket.send(10);
};

webSocket.onmessage = (message) => {
  console.log(`Received message from server: ${message.data}`);
  webSocket.close(1001, `Good bye server`);
};

