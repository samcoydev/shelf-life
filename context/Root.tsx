import { createContext, useState, useEffect } from 'react'
import { UserData } from '../types/user-data'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { ACCESS_STORE_KEY, USER_DATA_STORE_KEY } from '@env'
import { UserAPI } from '../api/user-api'

interface RootContextType {
   user: UserData | null;
   getUserData: () => void;
}

export const RootContext = createContext<RootContextType>({
   user: null,
   getUserData: () => {}
})

const ROOT_TAG = "[ROOT] "

export const RootProvider = (props: { children: React.ReactNode}) => {
   const [ appInitialized, setAppInitialized ] = useState(false)
   const [ user, setUser ] = useState(null)

   useEffect(() => {
      if (user !== null)
         initApp();
   }, [user])

   const initApp = async () => {

      // If this is true, then get our user data from the API and
      // change the state here.

      // If it is not stored, we will leave the user state as null
      // and let the auth provider do it's job in redirecting to
      // the sign in page.

      setAppInitialized(true);
   }

   const getUserData = async () => {
      await UserAPI.getUserData().then(userData => {
         setUser(userData)
      }, err => {
         console.error(err)
      })
   }

   const values = {
      user,
      getUserData
   }

   return (
      <RootContext.Provider value={values}>
         {props.children}
      </RootContext.Provider>
   )
}