import { ThemeProvider, createTheme } from '@rneui/themed'
import { Tabs, useFocusEffect, useRouter } from 'expo-router'
import { ArrowLeft, Book, BoxIso, Cart, HomeSimple, IconoirProvider, InfoEmpty, Leaf, User } from 'iconoir-react-native'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ctaColor, dominantColor, textDark, textLight } from '../../constants/colors'
import { AuthContext } from '../../context/auth'
import { useContext, useEffect } from 'react'

export default function AppLayout() {
   const router = useRouter();
   const { userData } = useContext(AuthContext);

   useEffect(() => {
      if (userData && !userData.hasBeenWelcomed)
         router.push("/welcome-page")
   }, [])

   return (
      <ThemeProvider theme={theme}>
         <IconoirProvider
            iconProps={{
               color: textLight,
               strokeWidth: 1,
               height: 32,
               width: 32
            }}>
               <Tabs initialRouteName={"home"} screenOptions={{
                  headerTitle: (props) => <Leaf color={ dominantColor }  />,
                  headerLeft: (props) => (
                     <Pressable onPress={() => router.back()}>
                        <ArrowLeft style={{marginLeft: 15}} width={25} height={25} />
                     </Pressable>
                  ),
                  headerRight: (props) => <InfoButton />,
                  headerTitleAlign: "center",
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
                  name="recipes" 
                  options={{ 
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Recipes</Text>,
                     tabBarIcon: ({focused}) => { return <Book color={focused ? dominantColor : textLight} /> } 
                  }} 
               />
               <Tabs.Screen 
                  name="profile" 
                  options={{ 
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Profile</Text>,
                     tabBarIcon: ({focused}) => { return <User color={focused ? dominantColor : textLight} /> } 
                  }} 
               />
            </Tabs>
         </IconoirProvider> 
      </ThemeProvider>
   )
};

const InfoButton = () => {
   return (
      <Pressable onPress={() => alert("Info Button!")}>
         <InfoEmpty style={{marginRight: 15}} width={25} height={25} />
      </Pressable>
   )
}


const theme = createTheme({
   components: {
     CheckBox: {
         iconType: "material-community",
         checkedIcon: "checkbox-outline",
         uncheckedIcon: 'checkbox-blank-outline',
         checkedColor: dominantColor,
         uncheckedColor: textDark
     },
   },
 });

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

