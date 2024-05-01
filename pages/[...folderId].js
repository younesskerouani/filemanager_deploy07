import React from 'react'
import { useRouter } from "next/router";
import SearchBar from '@/components/SearchBar';
import { useContext, useEffect, useState } from 'react';
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { MyDocReleaseURLContext } from '@/context/MyDocReleaseURLContext';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import RightSide from '@/components/RightSide';
import SideNavBar from "@/components/SideNavBar";
import { ShowToastContext } from '../context/ShowToastContext';


export default function FolderDetails() {

    const {data:session}=useSession();
    const router = useRouter();
    const {parentFolderURL,setParentFolderURL} = useContext(ParentFolderURLContext);
    const {MyDocURL, setMyDocURL} = useContext(MyDocReleaseURLContext);
    const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext);
    const [folderList,setFolderList]=useState([]); 
    const [fileList,setFileList]=useState([]);
    const { folderId } = router.query;
    const [pathDocs , setPathDocs] = useState('');
    const [name , setName]=useState();

    const PathName = `/${folderId?.join('/')}`;

     useEffect(()=>{
  
       setParentFolderURL(PathName);
       
           getFolderList(PathName);   
           getFileList(PathName);
          
          // Set up popstate event listener to handle browser navigation
              const handlePopstate = () => {
                getFolderList(parentFolderURL);
                getFileList(parentFolderURL);
                // setMyDocURL(parentFolderURL);
                setParentFolderURL(parentFolderURL?.replace(new RegExp(`/${folderId[folderId.length - 1]}$`), ''));
              };

            window.addEventListener('popstate', handlePopstate);

            return () => {
                window.removeEventListener('popstate', handlePopstate);
              };     

      },[folderId]);

   useEffect(()=>{
    if(!folderId || !session){
      return
    }
      
        setName(folderId[0]);
    },[session]);

    useEffect(()=>{
      setParentFolderURL(PathName);
      console.log(PathName);
      if(showToastMsg!=null){
          getFolderList(PathName);
          getFileList(PathName);
      }
   },[showToastMsg])
      
    const getFolderList = async(PathName)=>{
      
          setFolderList([]);
          if(!PathName){
                 return;
          }else{
              try {
                const response = await axios.get(`/api/folder/folders?path=${PathName}`); 
                setFolderList(response.data);
              } catch (error) {
                console.error('Error fetching folders:', error);   
              }
          }
       
      }
   

      const getFileList = async(PathName)=>{
      
        setFileList([]);
        if(!PathName){   
              return;  
         }else{
            try {
              const response = await axios.get(`/api/file/files?path=${PathName}`); 
              setFileList(response.data);
            } catch (error) {
              console.error('Error fetching files:', error);
            }
        } 
       
      }
     

  return session &&(
    <div className="flex">
      <SideNavBar/> 
      <div className= "grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-2">
    <div className='p-5'>
         <SearchBar/>
         <FolderList 
        folderList={folderList} isBig={false} back={true}/>
        
         <FileList fileList={fileList} back={!folderList.length>0}/> 
     
    </div>
    </div>
        <RightSide parent ={name}/>   
     </div>
    </div>
   
  )
}
