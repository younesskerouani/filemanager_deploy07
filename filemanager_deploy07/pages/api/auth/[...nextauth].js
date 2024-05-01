// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import path from 'path';
// import fs from 'fs';

// export default NextAuth({
//    session: {
//     strategy: "jwt",
//     maxAge: 60*30
//    },
   
//    providers: [
//     CredentialsProvider({
//       type: "credentials",
//       credentials: {},
//       authorize: async (credentials, req) => {
//         const { username, password } = credentials;
        
//         // Read the users from the JSON file
//         const usersFilePath = path.join(process.env.AUTH_PATH, 'users.json');
//         const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//         // Find the user based on the provided username
//         const user = users.find(u => u.username === username);

//         if (!user || user.password !== password) {
//           throw new Error("Invalid credentials");
//         }
        
//         return {
//           id: user.id, 
//           username: user.username,
//           role: user.role,
//         };

//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
   
//     async session({ session, user, token }) {
//       session.user = token.user;
//       return session;
//     },
 
//     async jwt({ token, user, account, profile, isNewUser }) {
//       if (user) {
//           token.user = user;
//         }
//         return token;
//      }

// }
// });


import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 30
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        if (username === 'youness' && password === "10203040") {
          return Promise.resolve({ username });
        } else {
          return Promise.resolve(null); // Return null if authentication fails
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    }
  }
});
