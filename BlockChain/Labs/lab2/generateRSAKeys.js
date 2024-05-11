const crypto = require("crypto");

const generateKeyPair = () => {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });
  return keyPair;
};

module.exports = { generateKeyPair };
