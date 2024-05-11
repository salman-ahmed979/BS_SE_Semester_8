const { WebSocket } = require("ws");
const { decryptData } = require("./Decrypt");
const { encryptData } = require("./Encrypt");
const { getServerPublicKey } = require("./getServerKey");
const fs = require("fs");
const webSocket = new WebSocket("ws://localhost:5000/");

const sendDataToServer = (data) => {
  const ServerPublicKey = getServerPublicKey();
  const encryptedData = encryptData(ServerPublicKey, data.toString());
  return encryptedData;
};

webSocket.onopen = () => {
  console.log("Client open a connection");

  const encryptData = sendDataToServer(10);
  console.log(`${encryptData}`);
  webSocket.send(Buffer.from(encryptData, "base64"));
};

webSocket.onmessage = (message) => {
  console.log(`Received message from server: ${message.data}`);
  webSocket.close(1001, `Good bye server`);
};
