import { Link, useRouter } from 'expo-router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import HeaderText from '../../components/shared/HeaderText'
import { textDark, dominantColor, textLight } from '../../constants/colors'
import { HouseholdAPI } from '../../api/household-api'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { UserAPI } from '../../api/user-api'

type Inputs = {
   householdName: string,
   householdRecipient: string,
 };

const CreateHousehold = () => {
   const router = useRouter();
   const { userData, logout, forgetUser, storeUserData } = useContext(AuthContext);
   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

   const onSubmitNewHousehold: SubmitHandler<Inputs> = async data => {
      await HouseholdAPI.postHousehold({id: -1, name: data.householdName}).then(res => {
         console.log("successfully posted household ", res);
         welcomeUser();
      }, err => {
         console.error("Error posting household ", err);
      });
   }

   const onSubmitRequest: SubmitHandler<Inputs> = async data => {
      await HouseholdAPI.requestToJoinHousehold(data.householdRecipient).then(res => {
         console.log("awaiting request from: ", data.householdRecipient)
      }, err => {
         console.error("Error posting household ", data.householdRecipient, err);
      })
   }

   const welcomeUser = () => {
      UserAPI.welcomeUser(userData.email).then(res => {
         console.log("successfully welcomed user. ", res.data);
         
         const newUser = {
            ...userData
         }

         newUser.hasBeenWelcomed = true;

         storeUserData(newUser);

         router.push("/tabs/home")
      }, err => {
         console.error("Error welcoming user. ", err);
      });
   }

   const logUserOut = () => {
      forgetUser()
      logout()
   }

   return (
      <View style={styles.container}>
         <HeaderText>Welcome to Shelf Life</HeaderText>
         <Text style={{ color: textLight }}>Would you like to create a new Household, or request to join an existing one?</Text>

         <Text style={styles.label}>Household Name</Text>
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
            name="householdName"
         />

         <Pressable style={styles.button} onPress={handleSubmit(onSubmitNewHousehold)}>
            <Text style={ styles.buttonText }>Create Household</Text>
         </Pressable>
         
         <Text style={styles.label}>Household Name to Request</Text>
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
         name="householdRecipient"
         />

         <Pressable style={styles.button} onPress={handleSubmit(onSubmitRequest)}>
            <Text style={ styles.buttonText }>Send Request</Text>
         </Pressable>

         <Pressable style={styles.button} onPress={handleSubmit(welcomeUser)}>
            <Text style={ styles.buttonText }>Welcome</Text>
         </Pressable>

         <Pressable style={styles.button} onPress={handleSubmit(logUserOut)}>
            <Text style={ styles.buttonText }>Log Out</Text>
         </Pressable>

      </View>
    );
};

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


export default CreateHousehold;