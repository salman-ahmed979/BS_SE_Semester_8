const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();
const { WebSocket } = require("ws");
const { decryptData } = require("./Decrypt");
const { generateKeyPair } = require("./generateRSAKeys");

const port = 5000;

const webSocketServer = new WebSocket.Server({ server: httpServer });

const filePath = "../lab2/message.json";

const generateKeyPairs = () => {
  const Keys = generateKeyPair();

  const publicKey = Keys.publicKey;
  const privateKey = Keys.privateKey;

  // Store Keys in a file
  const publicFile = `./Keys/Public.pem`;
  const privateFile = `./Keys/Private.pem`;

  fs.writeFileSync(publicFile, publicKey, { encoding: "utf8" });
  fs.writeFileSync(privateFile, privateKey, { encoding: "utf8" });
};

webSocketServer.on("connection", (socket, request) => {
  console.log(`Client is connected`);

  socket.on("message", (data) => {
    const privateFile = `./Keys/Private.pem`;

    const privateKey = fs.readFileSync(privateFile, { encoding: "utf8" });
    const dataClient = data.toString("utf8");
    
    console.log(data);
    console.log(dataClient);
    
    const decryptedData = decryptData(privateKey, data);
    console.log(`DecrptedData: ${decryptedData}`);

    const file = fs.readFileSync(filePath);
    if (file.length == 0) {
      const userData = {
        currentValue: parseInt(decryptedData),
        prevValue: 0,
      };

      fs.writeFileSync(filePath, JSON.stringify(userData), "utf8");
    } else {
      const jsonData = JSON.parse(file);
      jsonData.prevValue = jsonData.currentValue;
      jsonData.currentValue = parseInt(decryptedData) + jsonData.currentValue;

      fs.writeFileSync(filePath, JSON.stringify(jsonData), "utf8");
    }
    socket.send("Record updated Successfully");
  });

  socket.on("close", (code, reason) => {
    console.log(`Client is closing`);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  generateKeyPairs();
});
