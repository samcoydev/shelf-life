import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js'
import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { ACCESS_STORE_KEY } from '@env';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { ResponseType, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { RootContext } from './Root'

function useProtectedRoute(accessToken) {
   const segments = useSegments();
   const router = useRouter();
 
   useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!accessToken && !inAuthGroup) {
         // Redirect to the sign-in page.
         router.replace("/log-in");
      } else if (accessToken && inAuthGroup) {
         console.log("User is Authed");

         // Redirect away from the sign-in page.
         router.replace("/tabs");
      }
   }, [accessToken, segments]);
}
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const { getUserData } = useContext(RootContext);
   const [accessToken, setAccessToken] = useState(null);

   const discovery = {
      authorizationEndpoint: "https://coycafe.ddns.net:8080/realms/shelf-life-dev/protocol/openid-connect/auth",
   };

   const [request, response, promptAsync] = useAuthRequest(
      {
         responseType: ResponseType.Token,
         clientId: 'shelf-life-app',
         scopes: ['openid', 'profile', 'email'],
         redirectUri: makeRedirectUri({
            scheme: 'com.samcodesthings.com'
         }),
      },
      discovery
   );

   useEffect(() => {
      if (response && response.type === 'success') {
         setAccessToken(response.authentication.accessToken)
         setItemAsync(ACCESS_STORE_KEY, JSON.stringify(accessToken));
         getUserData()
      }
   }, [response])

   useEffect(() => {
      if (request !== null)
         getAccessToken();
   }, [request])

   useProtectedRoute(accessToken);

   
   const getAccessToken = async () => {
      // First check if token exists
      
      promptAsync();
      // const storedToken = await getItemAsync(ACCESS_STORE_KEY);
      // if (storedToken !== null) {
      //    console.log("Found token stored")
      //    setAccessToken(storedToken)
      //    getUserData()
      // } else {
      //    console.log("Could not find token stored")
      // }
   }

   axios.interceptors.request.use(
      config => {
         if (accessToken)
            config.headers['Authorization'] = 'Bearer ' + accessToken
   
         config.headers['Content-Type'] = "application/json"
         return config;
      },
      error => {
         Promise.reject(error)
      }
   )

   const value = {
      accessToken
   }
 
   return (
     <AuthContext.Provider value={value}>
       {props.children}
     </AuthContext.Provider>
   );
};



interface AuthContextType {
   accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType>({
   accessToken: null,
});