import { Link, Tabs } from 'expo-router'
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../../../components/HomeHeader'
import { dominantColor, primaryColor, textDark, textLight } from '../../../../constants/colors'
import { UserData } from 'amazon-cognito-identity-js'
import { useContext, useState, useEffect } from 'react'
import { UserAPI } from '../../../../api/user-api'
import UserRow from '../../../../components/shared/UserRow'
import { RootContext } from '../../../../context/Root'
import { Cancel } from 'iconoir-react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'


const Friends = () => {
   const { user } = useContext(RootContext);
   const [ friends, setFriends ] = useState(null) 
   const [ modalVisible, setModalVisible] = useState(false);

   useEffect(() => {
      initUserList();
   }, [])

   const initUserList = async () => {
      UserAPI.getUsersFriends().then(response => {
         if (response.status === 200) {
            console.log("Found data: ", response.data);
            setFriends(response.data);     
         }
      }, err => {
         console.error(err);
      })
   }

   const closeModal = () => {
      setModalVisible(false);
   }

   return (
      <View style={ styles.container }>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={styles.header}>
               <Text style={styles.headerText}>Friends List</Text>
               <Text style={styles.subtitleText}>{user.email}</Text>
            </View>

            <View style={styles.userListContainer}>

               {friends ? friends.map((friend: UserData, index)=>{
                  return <UserRow user={friend} key={index} />
               }) : ""}

               <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={ styles.buttonText }>Send Friend Request</Text>
               </Pressable>

            </View>
         </ScrollView>
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
         }}>
            <FriendRequestModal closeModal={closeModal} />
         </Modal>
      </View>
    );
};

const FriendRequestModal = ({closeModal}) => {
   const { control, handleSubmit, formState: {errors, isValid} } = useForm({mode: 'onBlur'})

   const sendRequest: SubmitHandler<{email: string}> = async data => {
      console.log("Sending?");
      await UserAPI.sendFriendRequest(data.email).then(data => {
         console.log("Sent friend request");
      }, err => console.error("There was a problem: ", err));
   }
   
   return (
      <View style={styles.centeredView}>
         <View style={styles.modalView}>
            <View style={styles.modalHeaderContainer}>
               <View style={styles.modalHeaderLeft}>
                  <Text style={styles.modalHeaderText}>Friend Request</Text>
               </View>
               <TouchableOpacity onPress={closeModal}>
                  <Cancel height={20} width={20} />
               </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>Please Enter the Users Email</Text>
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
            <View style={styles.buttonRow}>
               <Pressable
                  style={ styles.modalButton }
                  onPress={handleSubmit(sendRequest)}>
                  <Text style={styles.buttonText}>Send Friend Request</Text>
               </Pressable>
            </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,    
    },
   header: {
      justifyContent: 'center',
      alignItems: 'center',      
      left: 0,
      right: 0,
      paddingTop: 20        
   },
   userListContainer: {
      paddingTop: 10,
      width: "90%"
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
   headerText: {
      fontSize: 20,
      color: textDark
   },
   subtitleText: {
      fontSize: 14,
      color: textLight
   },
   areaView: {
      flex: 1,
      alignItems: "center"
   },
   scrollContainer: {
      flex: 1,
      width: "100%",
      marginBottom: 60
   },

   
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
   },
   modalView: {
      margin: 20,
      width: '80%',
      height: 300,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      alignItems: 'center',
      elevation: 3,
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   modalButton: {
      padding: 10,
      borderRadius: 6,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      width: '90%',
      backgroundColor: dominantColor,
      elevation: 3,
      marginHorizontal: 25
   },
   modalText: {
      marginTop: 25,
      textAlign: 'center',
   },
   modalHeaderContainer: {
      width: "95%",
      paddingTop: 5,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   modalHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   modalHeaderText: {
      color: textDark,
      fontSize: 16,
   },
   input: {
     backgroundColor: 'white',
     borderColor: textDark,
     borderWidth: StyleSheet.hairlineWidth,
     height: 40,
     width: "90%",
     padding: 10,
     marginVertical: 30,
     borderRadius: 4,
   },
});

export default Friends;