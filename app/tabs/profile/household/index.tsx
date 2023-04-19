import { Link, Tabs } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../../../components/HomeHeader'
import { primaryColor, textDark, textLight } from '../../../../constants/colors'
import { User } from 'iconoir-react-native'
import UserRow from '../../../../components/shared/UserRow'
import { UserData } from '../../../../types/user-data'
import { useContext, useEffect, useState } from 'react'
import { UserAPI } from '../../../../api/user-api'
import { RootContext } from '../../../../context/Root'


const Household = () => {
   const { user } = useContext(RootContext);
   const [ users, setUsers ] = useState(null) 

   useEffect(() => {
      initUserList();
   }, [])

   const initUserList = async () => {
      UserAPI.getUsersByHouseholdId(user.householdId).then(response => {
         if (response.status === 200) {
            setUsers(response.data);     
         }
      }, err => {
         console.error(err);
      })
   }

   return (
      <View style={ styles.container }>
      <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>

            <View style={styles.header}>
               <Text style={styles.headerText}>Manage Your Household</Text>
               <Text style={styles.subtitleText}>@The_Coys</Text>
            </View>

            <View style={styles.userListContainer}>

               {users ? users.map((_user: UserData, index)=>{
                  return <UserRow user={_user} key={index} />
               }) : ""}

            </View>
         </ScrollView>
      </View>
    );
};

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
   }
});

export default Household;