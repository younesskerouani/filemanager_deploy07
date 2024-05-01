import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ShowToastContext } from "../../context/ShowToastContext";
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { useRouter } from "next/router";
import axios from 'axios';
 

const CreateFolderModal = () => {
    const [folderName,setFolderName]=useState();
    const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext);
    const router = useRouter();
    const { folderId } = router.query;
    const PathName = folderId ? `/${folderId?.join('/')}` : '/';
    const [folderList,setFolderList]=useState([]); 


    const onCreate=async()=>{
      
        try {
          const response = await axios.post(`/api/folder/addFolder?path=${PathName}`, { folderName: folderName });
          console.log(response.data.message); 
          setShowToastMsg('Folder Created!');
           // Trigger a refetch of folder list after creating a new folder
          const updatedFolderListResponse = await axios.get(`/api/folder/folders?path=${PathName}`);
          setFolderList(updatedFolderListResponse.data);
        } catch (error) {
          console.error('Error creating folder:', error);
        }
       
    }

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className="w-full items-center 
        flex flex-col justify-center gap-3">
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
                onChange={(e)=>setFolderName(e.target.value)}
          />
          <button className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
          onClick={()=>onCreate()}
          >Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateFolderModal