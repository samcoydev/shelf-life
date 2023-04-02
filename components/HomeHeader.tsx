import { Link, Tabs, useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, Text, View, Button, Pressable, Platform } from 'react-native';
import { accentColor, ctaColor, dominantColor, primaryColor, textLight } from '../constants/colors'
import { useState } from 'react'
import { ArrowLeft } from 'iconoir-react-native'


const HomeHeader = () => {
   const router = useRouter();
   const [buttonStates, setButtonStates] = useState({activeButtonId: 1});

   const handleButtonPress = (id) => () => {
      setButtonStates((prevState) => ({
         ...prevState,
         activeButtonId: id,
      }));
   };

   return (
      <SafeAreaView style={ styles.headerContainer }>
         <HomeHeaderButton 
            title="Household" 
            link="/home/household" 
            onPress={ handleButtonPress(0) }
            isActive={ buttonStates.activeButtonId === 0 } />
         <HomeHeaderButton 
            title="Home" 
            link="/home" 
            onPress={ handleButtonPress(1) }
            isActive={ buttonStates.activeButtonId === 1 } />
         <HomeHeaderButton 
            title="Recipes" 
            link="/home/recipes" 
            onPress={ handleButtonPress(2) }
            isActive={ buttonStates.activeButtonId === 2 } />
      </SafeAreaView>
    );
};

const HomeHeaderButton = ({link, title, onPress, isActive}) => {
   return (
      <Link style={styles.headerButton} href={link} asChild >
         <Pressable onPress={onPress}>
            {({ pressed }) => (
               <View style={ isActive && styles.activeButton }>
                  <Text style={ styles.headerButtonText }>
                     {title}
                  </Text>
               </View>
            )}
         </Pressable>
      </Link>
   );
}

const styles = StyleSheet.create({
   headerContainer: {
      height: 60,
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "white",
      borderBottomColor: accentColor,
      borderBottomWidth: 2   
   },
   headerButton: {
      marginHorizontal: 20,
      width: 75,
      paddingVertical: 16,
      alignSelf: "flex-end",
  },
  headerButtonText: {
     fontSize: 16,
     color: textLight,
     textAlign: "center"
  },
  activeButton: {
     borderBottomColor: ctaColor,
     borderBottomWidth: 2,
  },
});

export default HomeHeader;