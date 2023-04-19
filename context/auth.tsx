import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { ACCESS_STORE_KEY, AUTH_ENDPOINT, CLIENT_ID } from '@env';
import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { ResponseType, dismiss, makeRedirectUri, revokeAsync, useAuthRequest } from 'expo-auth-session'
import { RootContext } from './Root'
import { UserAPI } from '../api/user-api'
import jwtDecode from 'jwt-decode'

const AUTH_TAG = "[AUTH] "

function useProtectedRoute(user) {
   const segments = useSegments();
   const router = useRouter();
 
   useEffect(() => {
     const inAuthGroup = segments[0] === "(auth)";
 
      // If the user is not signed in and the initial segment is not anything in the auth group.
      if (!user && !inAuthGroup) {
         // Redirect to the sign-in page.
         router.replace("/log-in");
      } else if (user && inAuthGroup) {
         // Redirect away from the sign-in page.
         router.replace("/tabs");
      }
   }, [user, segments]);
}
 
export const AuthProvider = (props: { children: React.ReactNode }) => {  
   const { user, getUserData, setUser } = useContext(RootContext);
   const [ bearerToken, setBearerToken ] = useState(null);

   const discovery = {
      authorizationEndpoint: AUTH_ENDPOINT
   };

   const authConfig = {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri: makeRedirectUri({
         scheme: 'com.samcodesthings.com'
      }),
   }

   const [request, response, promptAsync] = useAuthRequest(authConfig, discovery);

   useEffect(() => {
      if (request !== null)
         getAccessToken();
   }, [request])
   
   const getAccessToken = async () => {
      promptAsync().then(async () => {
         if (!response) return;

         if (response.type === 'success') {
            setTokens(response.authentication.accessToken);
         } else {
            
         }
      }, err => console.error("Error was: ", err));
   }

   const setTokens = async (token: string) => {
      setBearerToken(token)
      await setItemAsync('token', token);
      getUserData();
   }

   const logout = async () => {
      UserAPI.logout().then(async res => {
            await deleteItemAsync('token');
            setBearerToken(null)
            setUser(null)
         }, err => {console.error(err)}
      )
    }

   axios.interceptors.request.use(
      async config => {
         const token = await getItemAsync('token');
         if (token)
            config.headers['Authorization'] = 'Bearer ' + token
   
         config.headers['Content-Type'] = "application/json"

         return config;
      },
      error => {
         Promise.reject(error)
      }
   )
   
   useProtectedRoute(user);

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