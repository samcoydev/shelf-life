import { Input } from '@rneui/themed'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { primaryColor, textDark } from '../../constants/colors'
import HeaderText from '../../components/shared/HeaderText'
import UserPool from '../../context/UserPool'
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { useRouter, useSearchParams } from 'expo-router'

type Inputs = {
   code: string
 };

const ConfirmEmail = () => {  
   const router = useRouter();
   const { username, extra } = useSearchParams();
   const {
      control, 
      handleSubmit, 
      formState: {errors, isValid}
    } = useForm({mode: 'onBlur'})

    const onSubmit: SubmitHandler<Inputs> = data => {
      const userData = {
         Username: username.toString(),
         Pool: UserPool,
       };

      const cognitoUser = new CognitoUser(userData);
      cognitoUser.confirmRegistration(data.code, true, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);

          router.push({pathname: "log-in"})
        }
      });
    };

   return (
      <View style={styles.container}>
         <HeaderText>Verify your Email</HeaderText>
         <Text>{username}</Text>

         <Text style={styles.label}>Verification Code</Text>
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
            name="code"
            rules={{ required: true }}
         />

         <View style={styles.button}>
            <Button
               title="Button"
               onPress={handleSubmit(onSubmit)}
            />
         </View>

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

export default ConfirmEmail;