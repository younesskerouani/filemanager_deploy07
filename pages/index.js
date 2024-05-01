import Image from 'next/image'
import { Cookie, Inter } from 'next/font/google'
import SearchBar from '../components/SearchBar';
import FolderList from '../components/Folder/FolderList';
import FileList from '../components/File/FileList';
import { useContext, useEffect, useState } from 'react';
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { MyDocReleaseURLContext } from '@/context/MyDocReleaseURLContext';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from "next/router";
import RightSide from '@/components/RightSide';
import SideNavBar from "@/components/SideNavBar";
import { ShowToastContext } from '@/context/ShowToastContext';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data:session ,status}=useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const {parentFolderURL,setParentFolderURL}=useContext(ParentFolderURLContext);
  const {MyDocURL, setMyDocURL} = useContext(MyDocReleaseURLContext);
  const [folderList, setFolderList] = useState([]);
  const [fileList,setFileList]=useState([]);
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext);


  useEffect(()=>{ 
   
    try {
      if(!session){
          router.push("/login");
        }else{
          fetchFolders();
          getFileList();
        }  

    setParentFolderURL(''); 
  } finally {
    // Set loading to false when the session check is complete
    setLoading(false);
  }
  },[])

  useEffect(()=>{

    if(showToastMsg){
      fetchFolders();
      getFileList();
      return;
     }

    if (showToastMsg === null) {
      return;
    }
    
 },[showToastMsg]);

  
  const fetchFolders = async () => {
    try {
      const response = await axios.get('/api/folder/folders'); // Use the new API endpoint "/api/folders"
      setFolderList(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const getFileList = async()=>{
    try {
      const response = await axios.get(`/api/file/files`); 
      setFileList(response.data);
       console.log(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return session && (
    <div className="flex">
       <SideNavBar/>  
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-2">
            <div className='p-5'>
            <SearchBar/>
            <FolderList folderList={folderList}  isBig={true}/>
            {fileList.length>0 && <FileList fileList={fileList} />}
            </div>
         </div>
       <RightSide/>    
     </div>
    </div>
  )
}
