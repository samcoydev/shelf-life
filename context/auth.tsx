import { Platform } from 'react-native'
import { useRouter, useSegments } from 'expo-router'
import { createContext, useContext, useEffect, useState } from 'react'
import { ACCESS_STORE_KEY } from '@env';
import { setItemAsync } from 'expo-secure-store'
import axios from 'axios'
import { ResponseType, TokenTypeHint, dismiss, makeRedirectUri, revokeAsync, useAuthRequest } from 'expo-auth-session'
import { RootContext } from './Root'

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
   const [ accessToken, setAccessToken ] = useState(null);

   const discovery = {
      authorizationEndpoint: "https://coycafe.ddns.net:8080/realms/shelf-life-dev/protocol/openid-connect/auth",
      revocationEndpoint: "https://coycafe.ddns.net:8080/realms/shelf-life-dev/protocol/openid-connect/logout",
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
      if (bearerToken !== null)
         getUserData()
   }, [bearerToken])

   useEffect(() => {
      if (response && response.type === 'success') {
         setBearerToken(response.authentication.accessToken)
         setAccessToken(response.authentication)
         console.log(response.authentication)
         setItemAsync(ACCESS_STORE_KEY, JSON.stringify(bearerToken));
      }
   }, [response])

   useEffect(() => {
      if (request !== null)
         getAccessToken();
   }, [request])

   useProtectedRoute(bearerToken);

   
   const getAccessToken = async () => {
      promptAsync();
   }

   const logout = async () => {
      if (!bearerToken) console.error("Not logged in.")
      if (discovery.revocationEndpoint) {
         await revokeAsync({ token: bearerToken, tokenTypeHint: TokenTypeHint.AccessToken }, discovery)
         .catch((e) => console.error(e));
         // .then(data => { 
         //    console.log(data) 
         //    setBearerToken(null)
         //    setAccessToken(null);
         // }, err => console.error(err))
      }
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