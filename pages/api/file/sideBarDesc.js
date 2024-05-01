import path from 'path';
import fs from 'fs';
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  try {
    
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { parent } = req.query;
    const txtFilePath = path.join(process.env.BASE_PATH, parent, 'Release.txt');
    const txtFileContent = fs.readFileSync(txtFilePath, 'utf-8');
    res.status(200).json({ description: txtFileContent });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
}
