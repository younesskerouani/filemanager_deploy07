import fs from 'fs';
import { join } from 'path';
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

    const basePath = process.env.BASE_PATH;
    const { folderPath } = req.query; 
    const targetDirectory = join(basePath, folderPath); 

    try {
      await fs.promises.rmdir(targetDirectory, { recursive: true }); 
      return res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Folder deletion failed' });
    }
}
