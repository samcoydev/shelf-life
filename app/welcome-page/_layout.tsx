import { Stack } from 'expo-router'

export default function WelcomePageLayout() {

   
   return (
      <>
         <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="create-household" />
         </Stack>
      </>   
   );
}