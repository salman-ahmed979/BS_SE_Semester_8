const http = require("http");
const fs = require("fs");
const httpServer = http.createServer();
const { WebSocket } = require("ws");

const port = 5000;

httpServer.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const webSocketServer = new WebSocket.Server({ server: httpServer });

const filePath = "../lab1/message.json";

webSocketServer.on("connection", (socket, request) => {
  console.log(`Request Headers: ${request.headers}`);
  console.log(`Client is connected`);

  socket.on("message", (data) => {
    console.log(`Client sent: ${data}`);
    const file = fs.readFileSync(filePath);
    if (file.length == 0) {
      const userData = {
        currentValue: parseInt(data),
        prevValue: 0,
      };

      fs.writeFileSync(filePath, JSON.stringify(userData), "utf8");
    } else {
      const jsonData = JSON.parse(file);
      jsonData.prevValue = jsonData.currentValue;
      jsonData.currentValue = parseInt(data) + jsonData.currentValue;
      
      fs.writeFileSync(filePath, JSON.stringify(jsonData), "utf8");
    }
    socket.send("Record updated Successfully");
  });

  socket.on("close", (code, reason) => {
    console.log(`Client is closing`);
  });
});
