import '@/styles/globals.css'
import SideNavBar from "../components/SideNavBar";
import React, { useState } from "react";
import { ParentFolderURLContext } from '@/context/ParentFolderURLContext';
import { MyDocReleaseURLContext } from '@/context/MyDocReleaseURLContext';
import { SessionProvider, useSession } from "next-auth/react";
import { ShowToastContext } from "../context/ShowToastContext";
import Toast from '@/components/Toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps: { session, ...pageProps }  }) {
  
 const [parentFolderURL,setParentFolderURL]=useState();
 const [showToastMsg,setShowToastMsg]=useState();
 const [MyDocURL, setMyDocURL]=useState();
 
  return (
    <SessionProvider session={session}>
    <ShowToastContext.Provider value={{showToastMsg,setShowToastMsg}}>
       <ParentFolderURLContext.Provider value={{parentFolderURL,setParentFolderURL}}>
       
          <ToastContainer position="top-right" autoClose={3000} />
              <Component {...pageProps} />
              {showToastMsg?<Toast msg={showToastMsg} />:null}
         
       </ParentFolderURLContext.Provider>
    </ShowToastContext.Provider>
    </SessionProvider>
  );
  
}
