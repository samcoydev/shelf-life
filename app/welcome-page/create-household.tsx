import { Link, useRouter } from 'expo-router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import HeaderText from '../../components/shared/HeaderText'
import { textDark, dominantColor, textLight } from '../../constants/colors'
import { HouseholdAPI } from '../../api/household-api'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { UserAPI } from '../../api/user-api'
import { RootContext } from '../../context/Root'

type Inputs = {
   householdName: string,
   householdRecipient: string,
 };

const CreateHousehold = () => {
   const router = useRouter();
   const { user, setUser } = useContext(RootContext);
   const { logout } = useContext(AuthContext);
   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

   const onSubmitNewHousehold: SubmitHandler<Inputs> = async data => {
      const cleanedName = data.householdName.replace(" ", "_");
      await HouseholdAPI.postHousehold({id: -1, name: cleanedName}).then(res => {
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
      UserAPI.welcomeUser(user.email).then(res => {
         console.log("successfully welcomed user. ", res.data);
         
         const newUser = {
            ...user
         }

         newUser.hasBeenWelcomed = true;

         setUser(newUser);

         router.push("/tabs/home")
      }, err => {
         console.error("Error welcoming user. ", err);
      });
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

         <Pressable style={styles.button} onPress={handleSubmit(logout)}>
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