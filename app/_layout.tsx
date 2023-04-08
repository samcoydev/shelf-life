import { Slot } from 'expo-router'
import { AuthProvider } from '../context/Auth'

export default function RootLayout() {
   return (
      <AuthProvider>
         <Slot />
      </AuthProvider>
   )
}