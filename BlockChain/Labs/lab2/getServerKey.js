const fs = require("fs");

const publicKeyPath = `./Keys/Public.pem`;

const getServerPublicKey = () => {
  const publicKey = fs.readFileSync(publicKeyPath, { encoding: "utf8" });
  return publicKey;
};

module.exports = { getServerPublicKey };
