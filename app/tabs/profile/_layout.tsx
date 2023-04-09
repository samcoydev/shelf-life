import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../../context/Auth'
import { useContext } from 'react'
import { ShoppingListAPI } from '../../../api/shopping-list-api'
import { dominantColor } from '../../../constants/colors'


const ProfileLayout = () => {

   const { forgetUser, logout, accessToken } = useContext(AuthContext);

   const onSubmit = () => {
      forgetUser();
      logout();
   };

   const ping = (secure: boolean) => {
      if (secure) ShoppingListAPI.pingSecured(accessToken).then(data => console.log("data: " + JSON.stringify(data)), err => console.error("Error: ", err));
      else ShoppingListAPI.ping().then(data => console.log("data: " + JSON.stringify(data)), err => console.error("Error: ", err));
   }

   return (
      <View style={ styles.container }>
         <View style={ styles.areaView }>
            <Text>profile</Text>

            <View style={styles.button}>
               <Button
                  title="Log Out"
                  onPress={() => onSubmit()}
               />
            </View>

            <View style={styles.button}>
               <Button
                  title="Ping Secured"
                  onPress={() => ping(true)}
               />
            </View>

            <View style={styles.button}>
               <Button
                  title="Ping Insecured"
                  onPress={() => ping(false)}
               />
            </View>
         </View>
      </View>
    );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,    
   },
   button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: dominantColor,
      borderRadius: 4,
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
   }
});

export default ProfileLayout;