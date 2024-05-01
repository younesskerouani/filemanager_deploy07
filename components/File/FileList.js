import React, { useContext } from 'react'
import FileItem from './FileItem'
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';


export default function FileList({fileList , back}) {

  const {parentFolderURL} = useContext(ParentFolderURLContext);

  const handleBackClick = () => {
    window.history.back();
  };
   
  return (

    <div className="bg-white mt-5 p-5 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[18px] font-bold">Package to Download</h2>
        {
          back && <h2 className="text-17px font-bold items-center flex cursor-pointer" onClick={handleBackClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back
         </h2>
        }
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
          <h2>Name</h2>
          <div className="grid grid-cols-3">
            <h2>Size</h2>
          </div>
        </div>

        {fileList.length > 0 &&
          fileList.map((item, index) => (
            <div key={index}>
              <FileItem file={item} key={index} parentFolder={parentFolderURL} />
            </div>
          ))}
    </div>


    // <div className='bg-white mt-5 p-5
    // rounded-lg'>
    //     <h2 className='text-[18px] font-bold'>Package to Download</h2>
      
    //     <div className='grid grid-cols-1
    //     md:grid-cols-2 
    //     text-[13px] 
    //     font-semibold
    //     border-b-[1px]
    //     pb-2 mt-3
    //     border-gray-300
    //      text-gray-400'>
    //         <h2>Name</h2>
    //         <div className='grid grid-cols-3'>
           
    //         <h2>Size</h2>
            
            
    //         </div>
    //     </div>
        
    //     {fileList.length>0 && fileList.map((item,index)=>(
    //         <div key={index}>          
    //         <FileItem file={item} key={index} parentFolder={parentFolderURL}/> 
    //         </div>              
    //     ))}

    // </div>
  )
}
