import { User } from 'iconoir-react-native'
import { View, Text, StyleSheet } from 'react-native'
import { textDark, textLight } from '../../constants/colors'
import { UserData } from '../../types/user-data'

const UserRow = ({user}: {user: UserData}) => {
   return (
      <View style={ styles.userContainer }>
         <View style={{ flexDirection: "row", alignItems: "center" }} >
            <User style={{marginLeft: 10}} height={40} width={40} />
            <View style={ styles.textContainer }> 
               <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
               <Text style={styles.emailText}>{user.email}</Text>
            </View>
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   userContainer: {
      borderRadius: 6,
      elevation: 3,
      alignSelf: "stretch",
      margin: 5,
      backgroundColor: "white",
   },
   nameText: {
      color: textDark,
      paddingRight: 10
   },
   emailText: {
      color: textLight
   },
   textContainer: {
      paddingVertical: 15,
      paddingHorizontal: 15,
   },
});

export default UserRow;