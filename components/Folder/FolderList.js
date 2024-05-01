// import React, { useContext, useState } from "react";
// import FolderItem from "./FolderItem";
// import { useRouter } from "next/router";
// import Documentation from "../Release/Documentation";
// import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';


// function FolderList({ folderList , isBig , back}) {
//   const [activeFolder, setActiveFolder] = useState();
//   const router = useRouter();
//   const {parentFolderURL,setParentFolderURL} = useContext(ParentFolderURLContext);

// const onFolderClick = (index, item) => {
//     console.log(index);
//      setActiveFolder(index);
//     //  router.push({
//     //   pathname: "/folder/" + item.name,
//     //   query: {
//     //     name: item.name
//     //   },
//     // });
//     const PathName = parentFolderURL && parentFolderURL ==='' ? item.name : `${parentFolderURL}/${item.name}`;
//     router.push(`/${PathName}`);
    
//     };

//     const handleBackClick = () => {
//        window.history.back();
//     };
  
//   return (

//       <div className="p-5 mt-5 bg-white rounded-lg">
//       <div className="flex items-center justify-between">
//         <h2 className="text-17px font-bold items-center">
//         {folderList.length > 0  && 'Folders'}
//         </h2>
        
//         {
//             back && folderList.length > 0  &&
//             <h2 className="text-17px font-bold items-center flex cursor-pointer" onClick={handleBackClick}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-4"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//             </svg>
//             Back
//           </h2>
//         }
        
//       </div>
//     {folderList.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4 ">
//         { folderList.map((item, index) => (
//           <div key={index} onClick={() => onFolderClick(index, item)}>
//             <FolderItem folder={item} />
//           </div>
//         ))}
//       </div> :  <h2 className="text-17px font-bold text-gray-400 flex items-center justify-center">
//                    No Folder Found
//                  </h2> }
      
//     </div>
  
//     // <div
//     //   className="p-5 mt-5 
//     // bg-white rounded-lg"
//     // >
//     // {isBig?  <h2
//     //     className="text-17px] 
//     //     font-bold 
//     //     items-center"
//     //   >
//     //     Major Versions
        
//     //   </h2>:<h2
//     //     className="text-17px] 
//     //     font-bold 
//     //     items-center"
//     //   >
//     //     Minor Versions
//     //   </h2>}

//     //   <h2
//     //     className="text-17px] 
//     //     font-bold 
//     //     items-center flex ml-11"
//     //   >
//     //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4">
//     //   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//     //     </svg>
//     //     Back        
//     //   </h2>

//     //   <div
//     //     className="grid grid-cols-2
//     //     md:grid-cols-3
//     //     lg:grid-cols-4
//     //     xl:grid-cols-5 mt-3
//     //     gap-4"
//     //   >
//     //     {folderList.map((item, index) => (
//     //        <div key={index} onClick={() => onFolderClick(index, item)}>
//     //       <FolderItem folder={item} />
//     //       </div>
          
//     //     ))}
//     //   </div>
      
//     // </div>
//   );
// }

// export default FolderList;

import React, { useContext, useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
import Documentation from "../Release/Documentation";
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';
import { ShowToastContext } from "@/context/ShowToastContext";



function FolderList({ folderList, isBig, back }) {
  const [activeFolder, setActiveFolder] = useState();
  const [activeMenuIndex, setActiveMenuIndex] = useState(null); 
  const router = useRouter();
  const { parentFolderURL, setParentFolderURL } = useContext(ParentFolderURLContext);
  const { showToastMsg , setShowToastMsg } = useContext(ShowToastContext);


  const onFolderClick = (index, item) => {
    console.log(index);
    setActiveFolder(index);
    const PathName = parentFolderURL && parentFolderURL === '' ? item.name : `${parentFolderURL}/${item.name}`;
    router.push(`/${PathName}`);
  };

  const handleBackClick = () => {
    window.history.back();
  };

  const toggleMenu = (index) => {
    setActiveMenuIndex(activeMenuIndex === index ? null : index); 
  };

  const deleteFolder=async(folderName)=>{

    try {
      const PathName = parentFolderURL && parentFolderURL === '' ? folderName : `${parentFolderURL}/${folderName}`;
      await axios.post(`/api/folder/deleteFolder?folderPath=${PathName}`);
      setShowToastMsg('Folder Deleted successfully!!!')
      // router.push(`/${parentFolderURL}`);
    } catch (error) {
      console.error(error);
      console.log('File deletion failed');
    }
 }

  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-17px font-bold items-center">
          {folderList.length > 0 && 'Folders'}
        </h2>
        {back && folderList.length > 0 &&
          <h2 className="text-17px font-bold items-center flex cursor-pointer" onClick={handleBackClick}>
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
      {folderList.length > 0 ?
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4 ">
          {folderList.map((item, index) => (
            <div key={index} className="relative">
              {/* Folder Item */}
              <div onClick={() => onFolderClick(index, item)}>
                <FolderItem folder={item} />
              </div>
              {/* Three Dots Icon */}
              <div className="absolute top-0 right-1 mt-1  z-10">
                <FaPencilAlt className="text-gray-500 cursor-pointer w-3 h-4" onClick={() => toggleMenu(index)} />
                {activeMenuIndex === index && (
                  <div className="absolute top-0 left-full mt-0 ml-1 bg-white p-2 rounded-md shadow-md z-20">
                    <button className="block text-gray-600 hover:text-gray-800 py-1 px-2" onClick={() => console.log('Edit clicked')}>Edit</button>
                    <button className="block text-gray-600 hover:text-gray-800 py-1 px-2" onClick={()=>deleteFolder(item.name)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        :
        <h2 className="text-17px font-bold text-gray-400 flex items-center justify-center">
          No Folder Found
        </h2>
      }
    </div>
  );
}

export default FolderList;








