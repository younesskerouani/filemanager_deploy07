// import { useState, useEffect } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useSession } from 'next-auth/react';

// export default function Login() {
//   const [userInfo, setUserInfo] = useState({ username: "", password: "" });
//   const router = useRouter();
//   const [error, setError] = useState(null);
//   const {data:session}=useSession();

//   useEffect(()=>{
//     console.log("User Session",)
//     if(session){
//       router.push("/")
//     }
   
//   },[session])

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       username: userInfo.username,
//       password: userInfo.password,
//       redirect: false,
//       callbackUrl: "/"
//     });

//     if (res.error) {
//       setError(res.error);
//     } else {
//       setError(null);
//     }

//     console.log(res);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-96">
//         <h1 className="text-2xl font-semibold mb-4">Login</h1>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             value={userInfo.email}
//             onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
//             type="username"
//             placeholder="Username"
//             className="border p-2 w-full rounded"
//           />
//           <input
//             value={userInfo.password}
//             onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
//             type="password"
//             placeholder="Password"
//             className="border p-2 w-full rounded"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white rounded p-2 w-full"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState(null);
  const {data:session}=useSession();

  useEffect(()=>{
    console.log("User Session",)
    if(session){
      router.push("/")
    }
   
  },[session])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
      callbackUrl: "/"
    });

    if (res.error) {
      setError(res.error);
    } else {
      setError(null);
    }

    console.log(res);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white flex flex-col justify-center pt-4 px-2 sm:px-4 lg:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-xs">
      {/* <img
          className="mx-auto h-14 w-auto mt-10"
          src="../public/logo2.png"
          alt="GitHub"
        /> */}
         <Image src="/logo2.jpg" alt="logo2" 
         className="mx-auto h-24 w-auto mt-5"
         width={150} height={60} 
         />

        <h2 className="mt-4 text-center text-2xl font-thin text-gray-900">Sign in to your account</h2>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xs">
        <div className="bg-white py-4 px-2 sm:px-4 shadow sm:rounded-lg sm:px-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
              <input
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                  type="username"
                  placeholder="Username"
                  onKeyDown={handleEnterKeyPress}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
              <input
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                type="password"
                placeholder="Password"
                onKeyDown={handleEnterKeyPress}
                className="border p-2 w-full rounded"
              />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

