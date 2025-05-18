import { createHmac, randomBytes } from "crypto";
import fs from "fs";

const args = process.argv.slice(2);
const argPassword = args[0];
if (!argPassword) {
  console.error(
    `\nCalled without parameters for hashing
Please try again with a password argument like: 'node encrypter.mjs mySecretPassword'`
  );
} else {
  _encryptPassword(argPassword);
}

function _encryptPassword(argPassword) {
  const secret = randomBytes(127).toString("hex");
  const hmac = createHmac("sha256", secret).update(argPassword).digest("hex");

  fs.writeFile("secret.key", secret, function (err) {
    if (err) return console.log(err);
    console.log("Secret key created!");
  });

  fs.writeFile("admin.key", hmac, function (err) {
    if (err) return console.log(err);
    console.log("Admin key hash saved!");
  });
}
