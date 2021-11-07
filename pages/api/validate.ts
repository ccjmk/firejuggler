import { NextApiRequest, NextApiResponse } from "next";
import { createHmac } from 'crypto';
import { promises as fs } from 'fs';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const now = new Date().toISOString();
  if (req.method !== 'POST') {
    return res.status(400).send({ message: 'Only POST requests allowed' })
  }
  const key = JSON.parse(req.body).key;

  let secret = await fs.readFile('./secret.key', { encoding: 'utf8' });
  let adminKey = await fs.readFile('./admin.key', { encoding: 'utf8' });

  const hmac = createHmac('sha256', secret)
    .update(key + "")
    .digest('hex');

  if (hmac === adminKey) {
    console.log("Successful login at " + now);
    return res.status(200).json({ key: hmac });
  } else {
    console.log("Invalid login attempt at " + now);
    return res.status(403).send('auth forbidden');
  }
}