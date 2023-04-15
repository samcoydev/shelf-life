import { createContext, useState, useEffect } from 'react'
import { UserData } from '../types/user-data'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { ACCESS_STORE_KEY, USER_DATA_STORE_KEY } from '@env'
import { UserAPI } from '../api/user-api'

interface RootContextType {
   user: UserData | null;
}

export const RootContext = createContext<RootContextType>({
   user: null
})

const ROOT_TAG = "[ROOT] "

export const RootProvider = (props: { children: React.ReactNode}) => {
   const [ appInitialized, setAppInitialized ] = useState(false)
   const [ user, setUser ] = useState(null)

   useEffect(() => {
      initApp();
   }, [])

   const checkForAccessToken = async () => {
      return await new Promise<string>((resolve, reject) => {
         getItemAsync(ACCESS_STORE_KEY).then(result => {
            if (result === null) resolve(null)
            resolve(result)
         }, err => {
            reject(err);
         })
      })
   }

   const initApp = async () => {

      // Check if our access token is stored.
      const accessToken = await checkForAccessToken();
      if (accessToken !== null) {

         //await UserAPI.getUserData(accessToken);

      }
      // If this is true, then get our user data from the API and
      // change the state here.

      // If it is not stored, we will leave the user state as null
      // and let the auth provider do it's job in redirecting to
      // the sign in page.

      setAppInitialized(true);
   }

   const values = {
      user
   }

   return (
      <RootContext.Provider value={values}>
         {props.children}
      </RootContext.Provider>
   )
}