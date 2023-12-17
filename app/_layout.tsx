import { Slot } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { RootProvider } from '../context/Root'
import { RootSiblingParent } from 'react-native-root-siblings';
import { ScannerProvider } from '../context/Scanner'

export default function RootLayout() {
   return (
      <RootSiblingParent>
         <RootProvider>
            <AuthProvider>
               <ScannerProvider>
                  <Slot />
               </ScannerProvider>
            </AuthProvider>
         </RootProvider>
      </RootSiblingParent>
   )
}