import { readdirSync, statSync } from 'fs';
import path from 'path';
import { getSession } from "next-auth/react";
import fs from 'fs';
import { checkUser } from '../checkUser';


export default async function handler(req, res) {
  

    const session = await getSession({ req });
    
      if (session) {
        try {
            const basePath = process.env.BASE_PATH; // Read the BASE_PATH from the environment variable
            const dynamicPath = req.query.path || ''; // Read the dynamic path from the request query

            const fullPath = path.join(basePath, dynamicPath);
            
            const files = readdirSync(fullPath, { withFileTypes: true });
            const folderList = files
              .filter((file) => file.isDirectory())
              .map((folder) => ({
                name: folder.name,
              }));
            res.status(200).json(folderList);
          } catch (error) {
            console.error('Error fetching folders:', error);
            res.status(500).json({ error: 'Failed to fetch folders' });
          }
      }else{
        return res.status(401).send('Unauthorized');
      }
}
