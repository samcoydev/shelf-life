import { StyleSheet, Text, View } from 'react-native';
import { accentColor } from '../../constants/colors'
import { AlertData } from '../../types/alert-data'


const Alert = ({ alertData, color }: { alertData: AlertData, color: string }) => {
   return (
     <View style={ styles.container }>
       <View style={[ styles.colorContainer, { backgroundColor: color} ]}></View>
       <View style={ styles.textContainer }> 
         <Text>{alertData.text}</Text>
       </View>
     </View>
   );
 };

export const styles = StyleSheet.create({
   container: {
      flexDirection: "row",
      borderRadius: 6,
      elevation: 3,
      alignSelf: "stretch",
      margin: 5,
      backgroundColor: "white",
   },
   textContainer: {
      paddingVertical: 15,
      paddingHorizontal: 15,
   },
   colorContainer: {
      borderRadius: 6,
      width: 5
   }
})

export default Alert;