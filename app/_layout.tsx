import { Slot } from 'expo-router'
import { AuthProvider } from '../context/auth'
import { RootProvider } from '../context/Root'

export default function RootLayout() {
   return (
      <RootProvider>
         <AuthProvider>
            <Slot />
         </AuthProvider>
      </RootProvider>
   )
}