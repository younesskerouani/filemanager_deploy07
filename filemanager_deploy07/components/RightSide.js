import React from 'react'
import { useRouter } from "next/router";
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { useContext , useState , useEffect} from 'react';
import HomeSideBar from '@/data/HomeSideBar';
import axios from 'axios';
import Documentation from '@/components/Release/Documentation';

const RightSide = ({parent}) => {

  const {parentFolderURL,setParentFolderURL} = useContext(ParentFolderURLContext);
  const [description, setDescription] = useState('');
  const [releaseFile ,setReleaseFile ]= useState();
  const [fileData, setFileData] = useState(null);
  const router = useRouter();


    useEffect(() => {
      console.log(parent);
      if(!parent){  return;  }

      fetchFileData(parent);

    }, [parent]);

  // const fetchDescription = async (parent) => {
  //     try {
  //       const response = await axios.get('/api/file/sideBarDesc', {
  //         params: {parent}
  //       });
  //       setDescription(response.data.description);
  //     } catch (error) {
  //       console.error('Error fetching description:', error);
  //     }
  //   }

   const fetchFileData = async (parent) => {
        try {
          const response = await fetch(`/api/file/getFile?path=${parent}&fileName=Feature-Release.xlsx`);
          const data = await response.json();
          if (response.ok) {
            setFileData(data);
          }
        } catch (error) {
          console.error('Error fetching file:', error);
          return;
        }
    }


  return (
      <div className="bg-white p-5 h-screen sticky top-0">
        <div className="bg-gray-100 p-6 border border-gray-300 mt-6">
          
              {HomeSideBar.list.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">{item.title}</h2>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              ))}
                
        </div>
      </div>
    
     
  );
}

export default RightSide;