import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../../context/auth'
import { useContext } from 'react'
import { ShoppingListAPI } from '../../../api/shopping-list-api'
import { dominantColor } from '../../../constants/colors'
import axios from 'axios';


const ProfileLayout = () => {

   const { forgetUser, logout, accessToken } = useContext(AuthContext);

   const onSubmit = () => {
      forgetUser();
      logout();
   };

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