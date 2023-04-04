import { Link, Slot, Stack, Tabs } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/HomeHeader'
import { primaryColor } from '../../constants/colors'


const PantryLayout = () => {
   return (
      <>
         <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" />
            <Stack.Screen name="productModal" options={{ presentation: "modal" }}/>
         </Stack>
      </>   
   )
};

export default PantryLayout;