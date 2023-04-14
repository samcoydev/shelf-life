import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter, useSearchParams, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import UserPool from './UserPool'
import React from 'react'
import { ACCESS_STORE_KEY, USER_DATA_STORE_KEY, REFRESH_STORE_KEY } from '@env';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { UserData } from '../types/user-data'
import { UserAPI } from '../api/user-api'

function useProtectedRoute(userData) {
   const segments = useSegments();
   const router = useRouter();
 
   React.useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!userData && !inAuthGroup) {
         // Redirect to the sign-in page.
         router.replace("/log-in");
      } else if (userData && inAuthGroup) {
         console.log("User is Authed");

         // Redirect away from the sign-in page.
         router.replace("/tabs");
      }
   }, [userData, segments]);
}
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const [accessToken, setAccessToken] = useState(null);
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      getInitValues();
   }, [])

   const getInitValues = async () => {
      await getItemAsync(USER_DATA_STORE_KEY).then(data => {
         console.log("Recieved this data: ", data);
         setUserData(JSON.parse(data));
      }, err => {
         console.error("Got an error recieving data: ", err);
      })
   }

   useProtectedRoute(userData);

   const rememberUser = async (sessionData: CognitoUserSession) => {
      console.log("Remembering User...");
      await setItemAsync(ACCESS_STORE_KEY, sessionData.getAccessToken().getJwtToken());
      await setItemAsync(REFRESH_STORE_KEY, sessionData.getRefreshToken().getToken());
      console.log("User remembered.");
   }

   const storeUserData = async (userData: UserData) => {
      setUserData(userData);
      await deleteItemAsync(USER_DATA_STORE_KEY);
      await setItemAsync(USER_DATA_STORE_KEY, JSON.stringify(userData));
   }

   const getStoredUserData = async () => {
      return await new Promise<string>((resolve, reject) => {
         getItemAsync(USER_DATA_STORE_KEY).then(response => {
            resolve(response);
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
      await deleteItemAsync(USER_DATA_STORE_KEY)
      setUserData(null);
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

               await UserAPI.getUserData(Username).then(response => {
                  if (response.status === 200) {
                     console.log("Storing user data");
                     storeUserData(response.data)
                     rememberUser(session)
                     resolve(session);
                  } else {
                     console.error("There was a status problem fetching user data for: ", Username)
                     reject();
                  }
               }, err => {
                  console.error("There was a problem fetching user data for: ", Username, err)
                  reject(err);
               });

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

   axios.interceptors.request.use(
      config => {
         if (accessToken)
            config.headers['Authorization'] = 'Bearer ' + accessToken
         if (userData) {
            config.headers['User-Email'] = userData.email;
         }
   
         config.headers['Content-Type'] = "application/json"
         return config;
      },
      error => {
         Promise.reject(error)
      }
   )

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
      accessToken,
      setAccessToken
   }
 
   return (
     <AuthContext.Provider value={value}>
       {props.children}
     </AuthContext.Provider>
   );
};



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
   accessToken: null,
   setAccessToken: () => {},
});