import fs from 'fs';
import { join } from 'path';
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
  const session = await getSession({ req });

    //  if (session) {

      const { fileName } = req.body; 
      const basePath = process.env.BASE_PATH;
      const { filePath } = req.query;
      const targetDirectory = join(basePath, filePath);
      const targetPath = join(targetDirectory, fileName);

      try {

        await fs.promises.unlink(targetPath);
        return res.status(200).json({ message: 'File deleted successfully' });

      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'File deletion failed' });
      }
//  }
}
