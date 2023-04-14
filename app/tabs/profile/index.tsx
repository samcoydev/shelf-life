import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../../context/auth'
import { useContext } from 'react'
import { ShoppingListAPI } from '../../../api/shopping-list-api'
import { dominantColor } from '../../../constants/colors'
import axios from 'axios';
import { UserAPI } from '../../../api/user-api'
import { useRouter } from 'expo-router'
import { useEffect } from 'react';


const Profile = () => {
   const router = useRouter();
   const { forgetUser, logout, userData } = useContext(AuthContext);

   const onSubmit = () => {
      forgetUser();
      logout();
   };

   const leaveHousehold = async () => {
      await UserAPI.leaveHousehold().then(res => {
         console.log("Left household.");
         router.push("/welcome-page")
      })
   }
   
   const getUsers = () => {
      console.log(userData);

      UserAPI.getUsersByHouseholdId(userData.household_id.id).then(data => {
         console.log("Got users by household: ", data.data);
      }, err => console.error("Error getting users by household: ", err));
   }

   useEffect(() => {
      getUsers();
   }, [])

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
                  title="Leave Household"
                  onPress={() => leaveHousehold()}
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

export default Profile;