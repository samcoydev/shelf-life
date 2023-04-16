import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native'
import { accentColor, dominantColor, textDark, textLight } from '../../constants/colors'
import HeaderText from '../../components/shared/HeaderText'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Link, useRouter, useSearchParams } from 'expo-router'
import UserPool from '../../context/UserPool'
import { useContext, useEffect } from "react"
import { AuthContext } from '../../context/auth'
import { UserAPI } from '../../api/user-api'
import { UserData } from '../../types/user-data';

type Inputs = {
   email: string,
   password: string,
 };

const Login = () => {  
   const router = useRouter();
   const { getAccessToken } = useContext(AuthContext)

   return (
      <View style={styles.container}>
         <Text style={styles.headerText}>Shelf Life</Text>

         <Pressable style={styles.button} onPress={getAccessToken}>
            <Text style={ styles.buttonText }>Log In With Email</Text>
         </Pressable>

      </View>
   )
}

const styles = StyleSheet.create({
   label: {
     color: textDark,
     margin: 20,
     marginLeft: 0,
   },
   headerText: {
      fontSize: 32,
      color: textDark,
      paddingBottom: 50
   },
   button: {
      flexDirection: "row",
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
   buttonText: {
      color: "white",
   },
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: "center",
     paddingTop: 10,
     padding: 8,
     backgroundColor: 'white',
   },
   input: {
     backgroundColor: 'white',
     borderColor: textDark,
     borderWidth: StyleSheet.hairlineWidth,
     height: 40,
     padding: 10,
     borderRadius: 4,
   },
 });

export default Login;