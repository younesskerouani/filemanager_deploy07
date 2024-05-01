import React from 'react'
import Image from "next/image";
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function Documentation ({folderPath, file}){

  const downloadFile = async () => {
    try {
      const response = await axios.get(`/api/file/download?filePath=${folderPath}/Feature-Release.xlsx`, {
        responseType: 'blob',
      });
  
      // Create a Blob URL for the downloaded file
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Feature-Realease.xlsx'; // Set the correct file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      // Clean up the Blob URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  

  return (
   
    <div>
        <div className='grid grid-cols-2
        md:grid-cols-2 
        text-[13px] 
        font-semibold
        border-b-[1px]
        pb-2 mt-3
        border-gray-300
         text-gray-400 '></div>
   
     <div className="cursor-pointer hover:bg-gray-100 p-3 rounded-md" >
        <div className="flex gap-2 items-center ml-4 " >
        <Image src={"/xlsx.png"} alt="file-icon" width={26} height={20} on />
            <h2 className="text-[15px]"
            onClick={()=> downloadFile()}
            > Features Release
            </h2>
            <svg fill="none"onClick={()=> downloadFile()}  stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-7 ml-11, h-7 float-right text-red-500
           hover:scale-110 transition-all">
         <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
            </svg>
         </div>
     </div>
  </div> 
  )
}
