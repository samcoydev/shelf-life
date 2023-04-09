import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../../../context/Auth'
import { useContext } from 'react'


const ProfileLayout = () => {

   const { forgetUser, logout, getSession } = useContext(AuthContext);

   const onSubmit = () => {
      forgetUser();
      logout();
   };

   const test = () => {
      getSession().then(data => {console.log("Getting sesh ", data), err => {console.error("Couldnt get sesh my dude ", err)}})
   }

   return (
      <View style={ styles.container }>
         <View style={ styles.areaView }>
            <Text>profile</Text>

            <View style={styles.button}>
            <Button
               title="Log Out"
               onPress={() => onSubmit()}
            />

            <Button 
               title="test"
               onPress={() => test()}
            />
         </View>
         </View>
      </View>
    );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,    
   },
   button: {
      marginTop: 40,
      color: 'white',
      height: 40,
      backgroundColor: '#ec5990',
      borderRadius: 4,
   },
   header: {
      justifyContent: 'center',
      alignItems: 'center',      
      left: 0,
      right: 0,
      paddingTop: 10         
   },
   areaView: {
      flex: 1,
      alignItems: "center"
   }
});

export default ProfileLayout;