const crypto = require("crypto");

const encryptData = (publicKey, data) => {
  const buffer = Buffer.from(data);
  console.log("Buffer\n", buffer);

  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    },
    buffer
  );
  return encryptedData.toString("base64");
};

module.exports = { encryptData };
