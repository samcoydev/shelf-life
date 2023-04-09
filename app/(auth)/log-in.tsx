import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native'
import { accentColor, dominantColor, textDark, textLight } from '../../constants/colors'
import HeaderText from '../../components/shared/HeaderText'
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Link, useRouter, useSearchParams } from 'expo-router'
import UserPool from '../../context/UserPool'
import { useContext, useEffect } from "react"
import { AuthContext } from '../../context/Auth'

type Inputs = {
   email: string,
   password: string,
 };

const Login = () => {  
   const router = useRouter();
   const { rememberUser, getRememberedUser, login, setAccessToken } = useContext(AuthContext);
   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

   const onSubmit: SubmitHandler<Inputs> = data => {
      login(data.email, data.password)
         .then((data) => {
            console.log("Logged in!");
         })
         .catch((err) => {
            alert("Oops, " + err);
            console.error("Failed to log in.", err);
         });
   };

   useEffect(() => {
      getRememberedUser().then(
         data => {
            if (data !== null)
               setAccessToken(data);
         }
      )
   }, [])

   return (
      <View style={styles.container}>
         <HeaderText>Log In</HeaderText>

         <Text style={styles.label}>Email</Text>
         <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
               <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
               />
            )}
            name="email"
            rules={{ required: true }}
         />
         
         <Text style={styles.label}>Password</Text>
         <Controller
            control={control}
            render={({field: { onChange, onBlur, value }}) => (
               <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
               />
            )}
         name="password"
         rules={{ required: true }}
         />

         <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={ styles.buttonText }>Log In</Text>
         </Pressable>

         <Link style={ styles.label } href="/sign-up">Sign Up</Link>

      </View>
   )
}

const styles = StyleSheet.create({
   label: {
     color: textDark,
     margin: 20,
     marginLeft: 0,
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