import fs from 'fs/promises'; 
import path from 'path';
import { join, basename } from 'path';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {

    const session = await getSession({ req });

    const basePath = process.env.BASE_PATH;
    const { folderName } = req.body;
    const FolderDir = req.query.path || '';
    const fullPath = path.join(basePath, FolderDir);
    

    const folderPath = `${fullPath}/${folderName}`;
    
    // Create the folder
    await fs.mkdir(folderPath);

    res.status(200).json({ message: 'Folder created successfully' });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'An error occurred while creating the folder' });
  }
}
