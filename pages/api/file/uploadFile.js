import { getSession } from 'next-auth/react';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { join } from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Set the temporary directory
const upload = multer({ dest: 'temp/' }); 

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const basePath = process.env.BASE_PATH;
  const { filePath } = req.query;
 
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  upload.single('uploadedFile')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' });
    }

    const uploadedFile = req.file;
    const tempPath = uploadedFile.path;

    const targetDirectory = join(basePath, filePath);
    const targetPath = path.join(targetDirectory, uploadedFile.originalname);

    try {

      await fs.promises.rename(tempPath, targetPath);

      return res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
}