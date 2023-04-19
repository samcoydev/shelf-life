import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../../context/auth'
import { useContext } from 'react'
import { ShoppingListAPI } from '../../../api/shopping-list-api'
import { dominantColor, primaryColor, textDark, textLight } from '../../../constants/colors'
import axios from 'axios';
import { UserAPI } from '../../../api/user-api'
import { useRouter } from 'expo-router'
import { useEffect } from 'react';
import { RootContext } from '../../../context/Root'
import { Group, Home, HomeAlt, HomeUser, Settings, User } from 'iconoir-react-native'


const Profile = () => {
   const router = useRouter();
   const { user } = useContext(RootContext);
   const { logout } = useContext(AuthContext);

   return (
      <View style={ styles.container }>
         <View style={ styles.areaView }>
            <View style={ styles.avatar }>
               <User style={{alignSelf: "center", marginTop: 8}} height={100} width={100} />
            </View>

            <View style={styles.profileNameContainer }>
               <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
               <Text style={{ color: textLight }}>{user.email}</Text>
            </View>

            <View style={ styles.buttonContainer }>
               <Pressable style={styles.button}  onPress={() => router.push("/tabs/profile/household")}>
                  <Home style={{marginLeft: 15}} height={35} width={35} />
                  <Text style={ styles.buttonText }>Household</Text>
               </Pressable>
               
               <Pressable style={styles.button} onPress={() => router.push("/tabs/profile/friends")}>
                  <Group style={{marginLeft: 15}} height={35} width={35} />
                  <Text style={ styles.buttonText }>Friends</Text>
               </Pressable>
            </View>

            <View style={ styles.buttonContainer }>
               <Pressable style={styles.button} onPress={() => router.push("/tabs/profile/account")}>
                  <HomeUser style={{marginLeft: 15}} height={35} width={35} />
                  <Text style={ styles.buttonText }>Account</Text>
               </Pressable>
               
               <Pressable style={styles.button} onPress={() => router.push("/tabs/profile/settings")}>
                  <Settings style={{marginLeft: 15}} height={35} width={35} />
                  <Text style={ styles.buttonText }>Settings</Text>
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
   avatar: {
      width: 125,
      height: 125,
      borderRadius: 125,
      marginTop: 25,
      backgroundColor: "white"
   },
   nameText: {
      fontSize: 22,
      color: textDark
   },
   profileNameContainer: {
      alignItems: "center"
   },
   buttonContainer: {
      marginTop: 20, 
      flexDirection: "row"
   },
   button: {
      marginHorizontal: 10,
      height: 55,
      width: "43%",
      flexDirection: "row",
      backgroundColor: "white",
      elevation: 3,
      alignItems: "center",
      borderRadius: 4,
   },
   buttonText: {
      margin: 16,
      color: textDark,
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