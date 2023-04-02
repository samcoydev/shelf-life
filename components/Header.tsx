import { useRouter } from 'expo-router'
import { StyleSheet, SafeAreaView, Text, View, Button, Pressable, Platform } from 'react-native';
import { accentColor, ctaColor, dominantColor, primaryColor, textDark, textLight } from '../constants/colors'
import { ArrowLeft, DewPoint, HelpCircle, IconoirProvider, InfoEmpty, Leaf } from 'iconoir-react-native'


const Header = () => {
   const router = useRouter();

   return (
      <IconoirProvider
         iconProps={{
            color: textDark,
            strokeWidth: 1.5,
            height: 20,
            width: 20
         }}>
         <SafeAreaView style={ styles.headerContainer }>
            <Pressable onPress={() => router.back()}>
               <ArrowLeft style={ styles.backButton } />
            </Pressable>
            <Leaf color={ dominantColor } width={32} height={32} style={ styles.logo } />
            <InfoEmpty style={ styles.info } />
         </SafeAreaView>
      </IconoirProvider>
    );
};

const styles = StyleSheet.create({
   headerContainer: {
      height: 90,
      flexDirection: "row",
      justifyContent: "space-evenly"
   },
   backButton: {
      paddingTop: Platform.OS === "android" ? 125 : 0,
      marginRight: 100,
   },
   logo: {
      paddingTop: Platform.OS === "android" ? 125 : 0,
   },
   info: {
      paddingTop: Platform.OS === "android" ? 125 : 0,
      marginLeft: 100,
   }
});

export default Header;