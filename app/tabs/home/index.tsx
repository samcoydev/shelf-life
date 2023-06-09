import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Alert from '../../../components/shared/Alert'
import Container from '../../../components/shared/Container'
import { error, success, textDark } from '../../../constants/colors'
import { useContext, useEffect, useState } from 'react'
import { AlertData } from '../../../types/alert-data'
import { RootContext } from '../../../context/Root'
import { UserAPI } from '../../../api/user-api'
import { HouseholdAPI } from '../../../api/household-api'
import { Cancel } from 'iconoir-react-native'
import { AuthContext } from '../../../context/auth'
import Toast from 'react-native-root-toast'
import { showErrorToast } from '../../../util/custom-toasts'

enum AlertTypeEnum {
   REQUEST = "REQUEST",
   EXPIRY_ALERT = "EXPIRY_ALERT",
   NOTIFICATION = "NOTIFICATION"
}

export const EmptyAlertData: AlertData = {
   id: "",
   text: "",
   alertedHouseholdId: "",
   expiration: null,
   alertType: null,
   householdRequestId: ""
}

const Home = () => {
   const { user } = useContext(RootContext);
   const [ alerts, setAlerts ] = useState(null);
   const [ modalVisible, setModalVisible] = useState(false);
   const [ currentlyVisibleAlert, setCurrentlyVisibleAlert] = useState(EmptyAlertData);

   useEffect(() => {
      initWithUserData();
   }, [])

   const initWithUserData = async () => {
      if (!user) {
         return;
      }

      UserAPI.getUserAlerts().then(response => {
         if (response.status === 200) {
            setAlerts(response.data);
         }
      }, err => {
         showErrorToast(err.message)
      })
   }

   const closeModal = () => {
      setModalVisible(false);
   }

   const deleteAlert = () => {
      let newAlerts: AlertData[] = {...alerts}

      newAlerts.splice(newAlerts.indexOf(currentlyVisibleAlert));

      setAlerts(newAlerts);
   }

   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={ styles.headerContainer }>
               <Text style={ styles.headingText }>Dashboard</Text>
               <Text style={ styles.subtitleText }>Welcome, {user ? user.firstName : "User"}</Text>
            </View>

            {alerts ? alerts.map((alert: AlertData, index)=>{
               return (
                  <Pressable key={index} onPress={() => {
                     setModalVisible(true) 
                     setCurrentlyVisibleAlert(alerts[index]);
                  }}>
                     <Alert alertData={alert} color={success} />
                  </Pressable>
               )
            }) : ""}
         </ScrollView>
         <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               setModalVisible(!modalVisible);
         }}>
            <AlertModal closeModal={closeModal} alertData={currentlyVisibleAlert} deleteAlert={deleteAlert} />
         </Modal>
      </Container>
    );
};

const AlertModal = ({closeModal, alertData, deleteAlert}) => {

   const respond = async (didAccept: boolean) => {
      if (alertData.householdRequestId !== null) {
         console.log("Household Request")
         await HouseholdAPI.respondToHouseholdRequest(alertData.id, didAccept).then(res => {
            console.log("Responded to household request: ", alertData, didAccept);
         }, err => console.error("There was a problem: ", err));
      } else if (alertData.friendRequestId !== null) {
         console.log("Friend Request")
         await UserAPI.respondToFriendRequest(alertData.id, didAccept).then(res => {
            console.log("Responded to friend request: ", alertData, didAccept);
         }, err => console.error("There was a problem: ", err));
      }
      
      closeModal();
   }

   
   const submitOk = async () => {
      await UserAPI.deleteUserAlert(alertData.id).then(data => {
         deleteAlert;
      }, err => console.error("Error: ", err));
   }

   return (
      <View style={styles.centeredView}>
         <View style={styles.modalView}>
            <View style={styles.modalHeaderContainer}>
               <View style={styles.modalHeaderLeft}>
                  <Text style={styles.modalHeaderText}>Alert</Text>
               </View>
               <TouchableOpacity onPress={closeModal}>
                  <Cancel height={20} width={20} />
               </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>{alertData.text}</Text>
            <View style={styles.buttonRow}>
               {alertData.alertType !== AlertTypeEnum.NOTIFICATION ? 
               <>
                  <Pressable
                     style={[styles.button, {backgroundColor: error}]}
                     onPress={() => respond(false)}>
                     <Text style={styles.buttonText}>Reject</Text>
                  </Pressable>
                  <Pressable
                     style={[styles.button, {backgroundColor: success}]}
                     onPress={() => respond(true)}>
                     <Text style={styles.buttonText}>Accept</Text>
                  </Pressable>
               </>
                  :
                  <Pressable
                     style={[styles.button, {backgroundColor: success}]}
                     onPress={submitOk}>
                     <Text style={styles.buttonText}>OK</Text>
                  </Pressable>
               }
               </View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
   },
   modalView: {
      margin: 20,
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
   },
   button: {
      padding: 10,
      borderRadius: 6,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      width: '40%',
      elevation: 3,
      marginHorizontal: 25
   },
   buttonText: {
      color: 'white'
   },
   modalText: {
      marginBottom: 15,
      textAlign: 'center',
   },
   headerContainer: {
      width: "90%",
      paddingTop: 5,
      paddingBottom: 15
   },
   headingText: {
      color: textDark,
      fontSize: 24,
   },
   subtitleText: {
      color: textDark,
      fontSize: 16,
   },
   scrollContainer: {
      flex: 1,
      width: "100%",
      marginBottom: 60
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
})

export default Home;