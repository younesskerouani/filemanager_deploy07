// import React, { useState } from "react";
// import Image from "next/image";
// import menu from "../data/menu";
// import { useRouter } from "next/router";
// import { signOut, useSession } from 'next-auth/react'
// import CreateFolderModal from "./Folder/CreateFolderModal";
// import UploadFileModal from "./File/UploadFileModal";

// const SideNavBar = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const { data: session } = useSession();
//     const router = useRouter();
//     const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

//     const onMenuClick = (item, index) => {
//         setActiveIndex(index);
//         if (item.name === "Logout") {
//             signOut();
//         }
//         router.push('/');
//     }

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     }

//     return session && (
//         <div className="relative">
//             <button onClick={toggleMenu} className="lg:hidden fixed top-5 right-5 z-50 focus:outline-none">
//                 <svg className="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                 </svg>
//             </button>
//             <div className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}></div>
//             <div className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//                 <div className="p-5">
//                     <div className="flex justify-center">
//                         <Image src="/logo.png" alt="logo" className="cursor-pointer" width={150} height={60} onClick={() => router.push('/')} />
//                     </div>
//                     <div className="mt-7">
//                         {menu.list.map((item, index) => (
//                             <h2 key={index} onClick={() => onMenuClick(item, index)} className={`flex gap-2 items-center p-2 mt-3 text-gray-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ${activeIndex == index ? 'bg-blue-500 text-white' : null}`}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d={item.logo} />
//                                 </svg>
//                                 {item.name}
//                             </h2>
//                         ))}
//                     </div>
//                 </div>
//                 <button onClick={toggleMenu} className="absolute top-5 right-5">
//                     <svg className="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                 </button>
//             </div>

//             {/* Desktop view */}
//             <div className="hidden lg:block w-[300px] bg-white h-screen sticky top-0 z-10 shadow-blue-200 shadow-md p-5">
//                 <div className="flex justify-center">
//                     <Image src="/logo.png" alt="logo" className="cursor-pointer" width={150} height={60} onClick={() => router.push('/')} />
//                 </div>
//                 <button onClick={() => window.upload_file.showModal()} className="flex gap-2 items-center text-[13px] bg-blue-500 p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center">
//                     Add New File
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                 </button>
//                 <button className="flex gap-2 items-center text-[13px] bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3 hover:scale-105 transition-all mt-1" onClick={() => window.my_modal_3.showModal()}>
//                     Create Folder
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                 </button>
//                 <div className="mt-7">
//                     {menu.list.map((item, index) => (
//                         <h2 key={index} onClick={() => onMenuClick(item, index)} className={`flex gap-2 items-center p-2 mt-3 text-gray-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ${activeIndex == index ? 'bg-blue-500 text-white' : null}`}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d={item.logo} />
//                             </svg>
//                             {item.name}
//                         </h2>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SideNavBar;

import Image from "next/image";
import React, { useState } from "react";
import menu from "../data/menu";
import CreateFolderModal from "./Folder/CreateFolderModal";
import UploadFileModal from "./File/UploadFileModal";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react'

function SideNavBar() {
    const [activeIndex,setActiveIndex]=useState(0);
    const router=useRouter();
  const {data:session}=useSession();

     const onMenuClick = (item, index) => {
            setActiveIndex(index);
            if (item.name === "Logout") {
                signOut();
            }
            router.push('/');
      }
  
 return session&&(
    <div
      className="w-[300px]
    bg-white h-screen sticky top-0
    z-10 shadow-blue-200 shadow-md
    p-5"
    >
      <div className="flex justify-center">
        <Image src="/logo.png" alt="logo" 
        className="cursor-pointer"
        width={150} height={60} 
        onClick={()=>router.push('/')}/>
      </div>
      <button
 onClick={()=>window.upload_file.showModal()}
        className="flex gap-2 items-center text-[13px]
        bg-blue-500 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
      >
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button
        className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        onClick={()=>window.my_modal_3.showModal()}
      >
        Create Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <div className="mt-7">
        {menu.list.map((item,index) => (
         
            <h2 
            key={index}
            onClick={()=>onMenuClick(item,index)}
            className={`flex gap-2 items-center
            p-2 mt-3 text-gray-500 rounded-md cursor-pointer
            hover:bg-blue-500 hover:text-white
            ${activeIndex==index?'bg-blue-500 text-white'
                :null}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}</h2>
       
        ))}
      </div>
     
        <dialog id="my_modal_3" className="modal">
            <CreateFolderModal/>
        </dialog>
        <dialog id="upload_file" className="modal">
            <UploadFileModal 
            closeModal={()=>window.upload_file.close()}/>
        </dialog>
      
    </div>
  );
}

export default SideNavBar;
