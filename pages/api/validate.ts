import { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from 'crypto';
import fs from 'fs';


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(400).send({ message: 'Only POST requests allowed' })
      }
    
    const key = JSON.parse(req.body).key;
    console.log('=======================================================')

    let secret = '';
    fs.readFile('./secret.key', 'utf8', function (err,data) {
        if (err) {
          return console.error(`Error retrieving secret key: ${err}`);
        }
        console.log(`READ FROM SECRET.KEY: \n\t${data}`);
        secret = data;
      });

    const hash = createHmac('sha256', secret)
        .update(key + "")
        .digest('hex');

    console.log(`Hash for key [${key}] = [${hash}]`);

    let adminKey = '';
    fs.readFile('./admin.key', 'utf8', function (err,data) {
            if (err) {
              return console.error(`Error retrieving saved admin key: ${err}`);
            }
            console.log(`READ FROM ADMIN.KEY: \n\t${data}`);
            adminKey = data;
          });

    console.log(`hash == adminkey ? ${hash === adminKey}`)

    if (hash === adminKey) {
        return res.status(200).send('auth ok');
    } else {
        return res.status(403).send('auth forbidden');
    }
}