import { Input } from '@rneui/themed'
import { Controller, SubmitHandler, useController, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { primaryColor, textDark } from '../../constants/colors'
import HeaderText from '../../components/shared/HeaderText'
import UserPool from '../../context/UserPool'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Link, useRouter } from 'expo-router'
import { UserAPI } from '../../api/user-api'
import { UserData } from '../../types/user-data'

type Inputs = {
   email: string,
   password: string,
   given_name: string,
   family_name: string
 };

const Signup = () => {  
   const router = useRouter();

   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

    const onSubmit: SubmitHandler<Inputs> = async data => {

      const newUserData: UserData = {id: -1, email: data.email, hasBeenWelcomed: false}
      let userPosted: boolean = false;

      await UserAPI.postUserData(newUserData).then(res => {
        console.log("Posted user successfully");
        userPosted = true;
      }, err => {
        console.error("There was a problem posting the user data: ", err);
      })

      if (!userPosted) return;

      UserPool.signUp(data.email, data.password, [
         new CognitoUserAttribute({Name: "given_name", Value: data.given_name}), 
         new CognitoUserAttribute({Name: "family_name", Value: data.family_name})], null, (err, data) => {
         if (err) {
            console.error(err);
         }
         console.log(data);
         router.push({pathname: "confirm-email", params: { username: data.user.getUsername()}})
      });
    };

   return (
      <View style={styles.container}>
         <HeaderText>Sign Up</HeaderText>

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

         <Text style={styles.label}>First Name</Text>
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
            name="given_name"
            rules={{ required: true }}
         />

         <Text style={styles.label}>Last Name</Text>
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
            name="family_name"
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

         <View style={styles.button}>
            <Button
               title="Button"
               onPress={handleSubmit(onSubmit)}
            />
         </View>
         
         <Link style={ styles.label } href="/log-in">Log In</Link>

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
     marginTop: 40,
     color: 'white',
     height: 40,
     backgroundColor: '#ec5990',
     borderRadius: 4,
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

export default Signup;