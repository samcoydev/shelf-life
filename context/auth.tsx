import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { ACCESS_STORE_KEY, AUTH_ENDPOINT, CLIENT_ID } from '@env';
import { setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { ResponseType, makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { RootContext } from './Root'
import { UserAPI } from '../api/user-api'

function useProtectedRoute(bearerToken) {
   const segments = useSegments();
   const router = useRouter();
 
   useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!bearerToken && !inAuthGroup) {
         // Redirect to the sign-in page.
         router.replace("/log-in");
      } else if (bearerToken && inAuthGroup) {
         console.log("User is Authed");

         // Redirect away from the sign-in page.
         router.replace("/tabs");
      }
   }, [bearerToken, segments]);
}
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const { getUserData } = useContext(RootContext);
   const [ bearerToken, setBearerToken ] = useState(null);

   const discovery = {
      authorizationEndpoint: AUTH_ENDPOINT,
   };

   const [request, response, promptAsync] = useAuthRequest(
      {
         responseType: ResponseType.Token,
         clientId: CLIENT_ID,
         scopes: ['openid', 'profile', 'email'],
         redirectUri: makeRedirectUri({
            scheme: 'com.samcodesthings.com'
         }),
      },
      discovery
   );

   useEffect(() => {
      console.log(bearerToken);
      if (bearerToken !== null)
         getUserData()
   }, [bearerToken])

   useEffect(() => {
      if (response && response.type === 'success') {
         console.log("Setting token to: " + response.authentication.accessToken)
         setBearerToken(response.authentication.accessToken)
         setItemAsync(ACCESS_STORE_KEY, JSON.stringify(bearerToken));
      }
   }, [response])

   useEffect(() => {
      if (request !== null)
         getAccessToken();
   }, [request])
   
   const getAccessToken = async () => {
      promptAsync();
   }

   const logout = async () => {
      UserAPI.logout().then(res => {
            setBearerToken(null)
         }, err => {console.error(err)}
      )
    }

   axios.interceptors.request.use(
      config => {
         if (bearerToken)
            config.headers['Authorization'] = 'Bearer ' + bearerToken
   
         config.headers['Content-Type'] = "application/json"

         return config;
      },
      error => {
         Promise.reject(error)
      }
   )
   
   useProtectedRoute(bearerToken);

   const value = {
      bearerToken,
      getAccessToken,
      logout
   }
 
   return (
     <AuthContext.Provider value={value}>
       {props.children}
     </AuthContext.Provider>
   );
};

interface AuthContextType {
   bearerToken: string | null;
   getAccessToken: () => void;
   logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
   bearerToken: null,
   getAccessToken: () => {},
   logout: () => {}
});