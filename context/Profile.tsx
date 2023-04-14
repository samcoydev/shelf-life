import { createContext, useState } from 'react'
import { HouseholdData } from '../types/household-data'

interface ProfileContextType {
   household: HouseholdData | null;
}


export const ProfileContext = createContext<ProfileContextType>({
   household: null,
})

export const ProfileProvider = (props: { children: React.ReactNode}) => {
   const [ household, setHousehold ] = useState(null);

   const values = {
      household
   }

   return (
      <ProfileContext.Provider value={values}>
         {props.children}
      </ProfileContext.Provider>
   )
}