import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { createContext, useContext, useState } from 'react'
import UserPool from './UserPool'
import React from 'react'
import { ACCESS_STORE_KEY, USER_DATA_STORE_KEY, REFRESH_STORE_KEY } from '@env';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { UserData } from '../types/user-data'
import { UserAPI } from '../api/user-api'

function useProtectedRoute(authToken) {
   const segments = useSegments();
   const router = useRouter();
 
   React.useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!authToken && !inAuthGroup) {
         // Redirect to the sign-in page.
         router.replace("/log-in");
      } else if (authToken && inAuthGroup) {
         console.log("User is Authed");

         // Redirect away from the sign-in page.
         router.replace("/tabs");
      }
   }, [authToken, segments]);
}

interface AuthContextType {
   getSession: () => Promise<CognitoUserSession>,
   login: (username: string, password: string) => Promise<CognitoUserSession>,
   logout: () => void,
   rememberUser: (sessionData: CognitoUserSession) => void;
   storeUserData: (userData: UserData) => void;
   getStoredUserData: () => Promise<string>;
   getRememberedUser: () => Promise<string>;
   forgetUser: () => void;
   userData: UserData | null;
   setUserData: (userData: string | null) => void;
   accessToken: string | null;
   setAccessToken: (accessToken: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
   getSession: () => Promise.reject(),
   login: (username: string, password: string) => Promise.reject(),
   logout: () => {},
   rememberUser: (sessionData: CognitoUserSession) => {},
   storeUserData: (userData: UserData) => {},
   getStoredUserData: () => Promise.reject(),
   getRememberedUser: () => Promise.reject(),
   forgetUser: () => {},
   userData: null,
   setUserData: () => {},
   accessToken: null,
   setAccessToken: () => {},
});
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const [accessToken, setAccessToken] = useState(null);
   const [userData, setUserData] = useState(null);

   useProtectedRoute(accessToken);

   const rememberUser = async (sessionData: CognitoUserSession) => {
      console.log("save user as remembered");
      await setItemAsync(ACCESS_STORE_KEY, sessionData.getAccessToken().getJwtToken());
      await setItemAsync(REFRESH_STORE_KEY, sessionData.getRefreshToken().getToken());
      console.log("User remembered.");
   }

   const storeUserData = async (userData: UserData) => {
      await setItemAsync("UserData", JSON.stringify(userData));
      setUserData(userData);
   }

   const getStoredUserData = async () => {
      return await new Promise<string>((resolve, reject) => {
         getItemAsync(USER_DATA_STORE_KEY).then(response => {
            resolve(JSON.parse(response));
         }, err => {
            console.error("There was no stored user data: ", err);
            reject();
         }
      );
      })
   }

   const getRememberedUser = async () => {
      console.log("Get remembered user");
      return await getItemAsync(ACCESS_STORE_KEY);
   }

   const forgetUser = async () => {
      await deleteItemAsync(ACCESS_STORE_KEY)
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
            onSuccess: async (session) => {
               setAccessToken(session.getAccessToken().getJwtToken())
               rememberUser(session)

               const email = session.getIdToken().payload["email"];

               await UserAPI.getUserData(Username).then(response => {
                  if (response.status === 200) {
                     storeUserData(response.data)
                  } else {
                     console.error("There was a status problem fetching user data for: ", email)
                  }
               }, err => {
                  console.error("There was a problem fetching user data for: ", email, err)
               });

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
      storeUserData,
      getStoredUserData,
      getRememberedUser,
      forgetUser,
      userData,
      setUserData,
      accessToken,
      setAccessToken
   }
 
   return (
     <AuthContext.Provider value={value}>
       {props.children}
     </AuthContext.Provider>
   );
 };

 
axios.interceptors.request.use(
   async config => {
      await getItemAsync(ACCESS_STORE_KEY).then(data => {
         if (data)
            config.headers['Authorization'] = 'Bearer ' + data
      }, err => {
         console.log("There was an error: ", err);
      });
      return config;
   },
   error => {
      Promise.reject(error)
   }
)