import { join, basename } from 'path'; // Import basename from path
import { createReadStream, promises as fsPromises , statSync } from 'fs';
import mime from 'mime';
import { getSession } from "next-auth/react";
import { checkUser } from '../checkUser';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
      if (session) {
      const { type, filePath } = req.query; // Retrieve the file path from the query parameter

      const basePath = process.env.BASE_PATH;
      

      try {

        const session = await getSession({ req });
      if(session){
          const fullPath = join(basePath, filePath); 
          const stats = statSync(fullPath);
          // Check if the file exists
          await fsPromises.access(fullPath);

          const fileName = basename(fullPath); 
          console.log(fileName);

          const mimeType = mime.getType(fileName) || 'application/octet-stream';

          // Set appropriate headers for the file download
          res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
          res.setHeader('Content-Type', mimeType);
          res.setHeader('Content-Length', stats.size.toString());

          // Stream the file to the response
          const readStream = createReadStream(fullPath);
          readStream.pipe(res);
      }

      } catch (error) {
        console.error('Error downloading the file:', error);
        res.status(500).send('Error downloading the file');
      }
    }else{
      return res.status(401).send('Unauthorized');
    }
}
