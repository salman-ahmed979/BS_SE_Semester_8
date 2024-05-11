const crypto = require("crypto");

const decryptData = (privateKey, ciphertext) => {
  const buffer = ciphertext; //Buffer.from(ciphertext, "base64");
  console.log("Buffer in decrypt\n", buffer);

  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      passphrase: "",
    },
    buffer
  );

  return decrypted.toString("utf8");
};

module.exports = { decryptData };
