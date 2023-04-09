import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { createContext, useContext, useState } from 'react'
import UserPool from './UserPool'
import React from 'react'
import SecureStore from 'expo-secure-store'
import { SECURE_STORE_KEY } from '@env';

function useProtectedRoute(authToken) {
   const segments = useSegments();
   const router = useRouter();
 
   React.useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
     if (
       // If the user is not signed in and the initial segment is not anything in the auth group.
       !authToken &&
       !inAuthGroup
     ) {
       // Redirect to the sign-in page.
       router.replace("/log-in");
     } else if (authToken && inAuthGroup) {
       // Redirect away from the sign-in page.
       router.replace("/");
     }
   }, [authToken, segments]);
}

interface AuthContextType {
   getSession: () => Promise<CognitoUserSession>,
   login: (username: string, password: string) => Promise<CognitoUserSession>,
   logout: () => void,
   rememberUser: (token: string) => void;
   getRememberedUser: () => void;
   forgetUser: () => void;
   accessToken: string | null;
   setAccessToken: (accessToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
   getSession: () => Promise.reject(),
   login: (username: string, password: string) => Promise.reject(),
   logout: () => {},
   rememberUser: (token: string) => {},
   getRememberedUser: () => {},
   forgetUser: () => {},
   accessToken: null,
   setAccessToken: () => {},
});
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const [accessToken, setAccessToken] = useState(null);

   useProtectedRoute(accessToken);

   const rememberUser = async (token: string) => {
      console.log("Get remembered");
      //await SecureStore.setItemAsync(SECURE_STORE_KEY, token);
      console.log("User remembered.");
   }

   const getRememberedUser = async () => {
      console.log("Get remembered");
      //let result = await SecureStore.getItemAsync(SECURE_STORE_KEY);

      // if (result) {
      //    console.log("Found User!");
      //    setAccessToken(result);
      // }
      // else {
      //    console.log("There was no user found.");
      // }
   }

   const forgetUser = async () => {
      //await SecureStore.deleteItemAsync(SECURE_STORE_KEY)
      console.log("User forgotten.");
   }

   const getSession = async () => {
      return await new Promise<CognitoUserSession>((resolve, reject) => {
         const user = UserPool.getCurrentUser();
   
         if (user) {
            user.getSession((err, session) => {
               if (err) {
                  reject();
               } else {
                  resolve(session);
               }
            });
         } else {
            reject();
         }
      })
   }

   const login = async (Username: string, Password: string) => {
      return await new Promise<CognitoUserSession>((resolve, reject) => {
         const user = new CognitoUser({
            Username,
            Pool: UserPool,
         });
   
         const authDetails = new AuthenticationDetails({
            Username,
            Password
         });
   
         user.authenticateUser(authDetails, {
            onSuccess: (session) => {
               console.log("Success! ", session);
               setAccessToken(session.getAccessToken().getJwtToken())
               resolve(session);
            },
            onFailure: (err) => {
               console.error("Failed. ", err);
               reject(err);
            },
         })
      })
   };
   
   const logout = () => {
      const user = UserPool.getCurrentUser();
      if (user) {
         user.signOut();
         setAccessToken(null);
         console.log("Signed out");
         return;
      }
      console.log("Already signed out");
   }

   const value = {
      getSession,
      login,
      logout,
      rememberUser,
      getRememberedUser,
      forgetUser,
      accessToken,
      setAccessToken
   }
 
   return (
     <AuthContext.Provider value={value}>
       {props.children}
     </AuthContext.Provider>
   );
 };