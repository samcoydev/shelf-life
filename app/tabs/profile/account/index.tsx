import { Link, Tabs } from 'expo-router'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../../components/HomeHeader'
import { dominantColor, primaryColor } from '../../../../constants/colors'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/auth'


const Account = () => {
   const { logout } = useContext(AuthContext)

   return (
      <View style={ styles.container }>
         <View style={ styles.areaView }>
            <Text>Account</Text>

            
            <View style={styles.buttonRow}>
               <Pressable
                        style={styles.button}
                        onPress={logout}>
                        <Text style={{color: "white"}}>Logout</Text>
               </Pressable>
            </View>
         </View>
         
      </View>
    );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,    
    },
   header: {
      justifyContent: 'center',
      alignItems: 'center',      
      left: 0,
      right: 0,
      paddingTop: 10         
   },
   areaView: {
      flex: 1,
      alignItems: "center"
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: "90%",
   },
   button: {
      flexDirection: "row",
      width: "100%",
      borderRadius: 6,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 25,
      marginHorizontal: 15,
      paddingVertical: 12,
      backgroundColor: dominantColor,
      elevation: 3,
   },
});

export default Account;