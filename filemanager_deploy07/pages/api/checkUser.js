import fs from 'fs';
import path from 'path';

export async function checkUser(req, res, users) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).send('Unauthorized');
  }

  const credentials = Buffer.from(authHeader.replace('Basic ', ''), 'base64').toString();
  const [username, password] = credentials.split(':');
  
  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).send('Invalid credentials');
  }
  
}
