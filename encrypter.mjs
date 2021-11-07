import { createHmac, randomBytes } from 'crypto';
import fs from 'fs'

const args = process.argv.slice(2);
if (args[0]) {
    const secret = randomBytes(127).toString('hex');
    const hmac = createHmac('sha256', secret)
        .update(args[0])
        .digest('hex');

    fs.writeFile('secret.key', secret, function (err) {
        if (err) return console.log(err);
        console.log('Secret key created!');
    });

    fs.writeFile('admin.key', hmac, function (err) {
        if (err) return console.log(err);
        console.log('Admin key hash saved!');
    });
} else {
    console.error(`Called without parameters for hashing - please try again with a password to encrypt like 'node ${process.argv[1]} mySecretPassword'`);
}