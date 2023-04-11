import { Link, useRouter } from 'expo-router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import HeaderText from '../../components/shared/HeaderText'
import { textDark, dominantColor, textLight } from '../../constants/colors'
import { HouseholdAPI } from '../../api/household-api'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

type Inputs = {
   householdName: string,
   emailRecipient: string,
 };

const CreateHousehold = () => {
   const router = useRouter();
   const { getStoredUserData } = useContext(AuthContext);
   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

   const onSubmitNewHousehold: SubmitHandler<Inputs> = data => {
      getStoredUserData().then(email => {
         HouseholdAPI.postHousehold({id: -1, name: data.householdName}, email);
         console.log("Attempting to post new household with email: " + email);
      }, err => {
         console.error("There was a problem getting the users stored data. ", err);
      });
   }

   const onSubmitRequest: SubmitHandler<Inputs> = data => {
      console.log("Req");
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
         
         <Text style={styles.label}>Email to Request</Text>
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
         name="emailRecipient"
         />

         <Pressable style={styles.button} onPress={handleSubmit(onSubmitRequest)}>
            <Text style={ styles.buttonText }>Send Request</Text>
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