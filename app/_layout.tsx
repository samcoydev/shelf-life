import { Tabs } from 'expo-router'
import { accentColor, ctaColor, dominantColor, textLight } from '../constants/colors'
import { BoxIso, Cart, HomeSimple, IconoirProvider, Settings, User } from 'iconoir-react-native'
import { StyleSheet, Text } from 'react-native'
import Header from '../components/Header'

export default function AppLayout() {
   return (
      <IconoirProvider
         iconProps={{
            color: textLight,
            strokeWidth: 1,
            height: 32,
            width: 32
         }}>
         <Header />
         <Tabs screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: dominantColor,
                  tabBarInactiveTintColor: textLight,
                  tabBarStyle: {
                     position: "absolute",
                     height: 80
                  },
               }}>
            <Tabs.Screen 
               name="home" 
               options={{ 
                  href: "/home",
                  tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Home</Text>,
                  tabBarIcon: ({focused}) => { return <HomeSimple color={focused ? dominantColor : textLight} /> }
               }} 
            />
            <Tabs.Screen 
               name="pantry" 
               options={{ 
                  tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Pantry</Text>,
                  tabBarIcon: ({focused}) => { return <BoxIso color={focused ? dominantColor : textLight} /> }
               }} 
            />
            <Tabs.Screen 
               name="list" 
               options={{ 
                  tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>List</Text>,
                  tabBarIcon: ({focused}) => { return <Cart color={focused ? dominantColor : textLight} /> } 
               }} 
            />
            <Tabs.Screen 
               name="profile" 
               options={{ 
                  tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Profile</Text>,
                  tabBarIcon: ({focused}) => { return <User color={focused ? dominantColor : textLight} /> } 
               }} 
            />
            <Tabs.Screen 
               name="settings" 
               options={{ 
                  tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Settings</Text>,
                  tabBarIcon: ({focused}) => { return <Settings color={focused ? dominantColor : textLight} /> } 
               }} 
            />
         </Tabs>
      </IconoirProvider> 
   )
};

export const styles = StyleSheet.create({
   tabButtonStyle: {
      fontSize: 14,
      alignItems: "center",
      justifyContent: "center",
      bottom: 14,
      color: textLight
   },
   activeButton: {
      color: dominantColor,
      borderBottomColor: ctaColor,
      borderBottomWidth: 2,
   }
})