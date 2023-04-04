import { Slot, Stack } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'

export default function RecipeLayout() {
   return (
      <>
         <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="[category]" options={{ presentation: "modal" }}/>
         </Stack>
      </>   
   );
}