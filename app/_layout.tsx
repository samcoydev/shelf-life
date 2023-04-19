import { Slot } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { RootProvider } from '../context/Root'
import { RootSiblingParent } from 'react-native-root-siblings';

export default function RootLayout() {
   return (
      <RootSiblingParent>
         <RootProvider>
            <AuthProvider>
               <Slot />
            </AuthProvider>
         </RootProvider>
      </RootSiblingParent>
   )
}