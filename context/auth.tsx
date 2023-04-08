import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { createContext, useContext, useState } from 'react'
import UserPool from './UserPool'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const getSession = async () => {
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

export const login = async (Username: string, Password: string) => {
   console.log("Attempting to log in with username:", Username);
   return await new Promise<CognitoUserSession>((resolve, reject) => {
      const user = new CognitoUser({
         Username,
         Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
         Username,
         Password
      });

      console.log("Auth details:", authDetails);

      user.authenticateUser(authDetails, {
         onSuccess: (session) => {
            console.log("Success! ", session);
            resolve(session);
         },
         onFailure: (err) => {
            console.error("Failed. ", err);
            reject(err);
         },
      })
   })
};

export const logout = () => {
   const user = UserPool.getCurrentUser();
   if (user) {
      user.signOut();
      console.log("Signed out");
      return;
   }
   console.log("Already signed out");
}

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
   accessToken: string | null;
   setAccessToken: (accessToken: string | null) => void;
 }
 
 export const AuthContext = createContext<AuthContextType>({
   accessToken: null,
   setAccessToken: () => {},
 });
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const [accessToken, setAccessToken] = useState(null);

   

   useProtectedRoute(accessToken);
 
   return (
     <AuthContext.Provider value={{ accessToken, setAccessToken }}>
       {props.children}
     </AuthContext.Provider>
   );
 };