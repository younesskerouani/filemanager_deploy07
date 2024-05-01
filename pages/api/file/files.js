import { readdirSync, statSync } from 'fs';
import path from 'path';
import { join , extname} from 'path';
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt"


const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req, res) {
 
  const token = await getToken({ req, secret })
  // console.log("JSON Web Token", token)

  try { 

    const session = await getSession({ req });

    const basePath = process.env.BASE_PATH; 
    const dynamicPath = req.query.path || ''; 

    const fullPath = path.join(basePath, dynamicPath);

    const files = readdirSync(fullPath, { withFileTypes: true });
    
    const fileList = files
      .filter(file => !file.isDirectory())
      .filter(file => {
        const fileExtension = extname(file.name).toLowerCase();
        return !['.docx', '.pdf', '.xlsx', '.txt'].includes(fileExtension);
      })
      .map(file => {
        const filePath = join(fullPath, file.name);
        const fileStats = statSync(filePath);
        const fileType = extname(file.name).substring(1);;

        return {
          name: file.name,
          size: fileStats.size,
          type: fileType,
        };
      });

    res.status(200).json(fileList); 
 

  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
}
