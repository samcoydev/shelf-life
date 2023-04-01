import { Link, Slot } from "expo-router";
import { IconoirProvider, HomeSimple, BoxIso, Cart, User, Settings } from 'iconoir-react-native'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { textLight, accentColor, primaryColor, dominantColor, ctaColor } from '../constants/colors'
import FooterButton from '../components/FooterButton'
import { useState } from 'react'

export default function Layout() {
   return (
      <>
         <IconoirProvider
         iconProps={{
            color: textLight,
            strokeWidth: 1,
            height: 32,
            width: 32
         }}>
            <View style={styles.container}>
               <Slot />
            </View>
         
            <Footer />
         </IconoirProvider>
      </>
   )
}

function Footer() {
   const [buttonStates, setButtonStates] = useState({
      activeButtonId: 0
    });

    const handleButtonPress = (id) => () => {
      setButtonStates((prevState) => ({
        ...prevState,
        activeButtonId: id,
      }));
    };
   
   return (
      <View style={styles.footerContainer}>
         <FooterButton 
            link="/home" 
            icon={<HomeSimple color={ buttonStates.activeButtonId == 0 ? dominantColor : textLight } />} 
            title="Home" 
            styles={ styles } 
            onPress={ handleButtonPress(0) }
            isActive={buttonStates.activeButtonId === 0} />
         <FooterButton 
            link="/pantry" 
            icon={<BoxIso color={ buttonStates.activeButtonId === 1 ? dominantColor : textLight } />} 
            title="Pantry" 
            styles={ styles } 
            onPress={ handleButtonPress(1) }
            isActive={buttonStates.activeButtonId === 1} />
         <FooterButton 
            link="/list" 
            icon={<Cart color={ buttonStates.activeButtonId === 2 ? dominantColor : textLight } />} 
            title="List" 
            styles={ styles } 
            onPress={ handleButtonPress(2) }
            isActive={buttonStates.activeButtonId === 2} />
         <FooterButton 
            link="/profile" 
            icon={<User color={ buttonStates.activeButtonId === 3 ? dominantColor : textLight } />} 
            title="Profile" 
            styles={ styles } 
            onPress={ handleButtonPress(3) }
            isActive={buttonStates.activeButtonId === 3} />
         <FooterButton 
            link="/settings" 
            icon={<Settings color={ buttonStates.activeButtonId === 4 ? dominantColor : textLight } />} 
            title="Settings" 
            styles={ styles } 
            onPress={ handleButtonPress(4) }
            isActive={buttonStates.activeButtonId === 4} />
      </View>
   );
}

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
   },
   footerContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 70,
      padding: 8,
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "center",
      paddingHorizontal: 8,
      backgroundColor: "white",
      borderTopColor: accentColor,
      borderTopWidth: 2,
   },
   footerButton: { 
      flexDirection: "column", 
      alignItems: "center", 
      marginHorizontal: 16,
   },
   activeButton: {
      borderBottomColor: ctaColor,
      borderBottomWidth: 4,
   }
})
