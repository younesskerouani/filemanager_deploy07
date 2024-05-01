import Image from "next/image";
import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { ShowToastContext } from "@/context/ShowToastContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FileItem({ file , parentFolder}) {

  const filePath = parentFolder+`/${file.name}`
  const { showToastMsg , setShowToastMsg } = useContext(ShowToastContext);
  const [progress, setProgress] = useState(0);
  const image="/" + file.type + ".png";
  const router = useRouter();

  const deleteFile=async(fileName)=>{

      try {

        await axios.post(`/api/file/deleteFile?filePath=${parentFolder}`, { fileName });
        setShowToastMsg('File Deleted successfully!!!')

      } catch (error) {
        console.error(error);
        console.log('File deletion failed');
      }
   }
  
   const downloadFile=async()=>{
   
      router.push({
        pathname: '/api/file/download',
        query: { filePath: filePath }
      });

  }


  return (
    <div
      className="grid grid-cols-1
    md:grid-cols-2 justify-between
    cursor-pointer hover:bg-gray-100
    p-3 rounded-md"
    >

      <div className="flex gap-2 items-center" >
        <Image
          src={image}
          alt="file-icon"
          width={26}
          height={20}
          on
        />
        
        <h2 className="text-[15px] truncate"
          onClick={()=> downloadFile()}
        >{file.name}</h2>
      </div>
      <div className="grid grid-cols-3 place-content-start">
        
        <h2 className="text-[15px]">
          
          {(file.size / 1024 ** 2).toFixed(2) + " MB"}
       
        <svg fill="none" onClick={()=> downloadFile()}  stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5 float-right text-green-700
           hover:scale-110 transition-all">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
        </svg>

        
        </h2>

        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>deleteFile(file.name)}
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor"
           className="ml-7  w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all">
       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>

      </div>
      
    </div>
  );
}

