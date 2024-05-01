import { statSync } from 'fs';
import path from 'path';
import { join, extname } from 'path';
import fs from 'fs/promises';
import { getSession } from "next-auth/react";


export default async function handler(req, res) {

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
    try {
    const basePath = process.env.BASE_PATH; 
    const dynamicPath = req.query.path || ''; 
    const fileName = req.query.fileName; 

    const fullPath = path.join(basePath, dynamicPath);
    const filePath = join(fullPath, fileName);

    const fileExists = await fs.access(filePath)
      .then(() => true)
      .catch(() => false);

    const fileStats = statSync(filePath);
    const fileType = extname(fileName).substring(1);

    const fileData = {
      name: fileName,
      size: fileStats.size,
      type: fileType,
    };

    res.status(200).json(fileData);

  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Failed to fetch file' });
  }
}
