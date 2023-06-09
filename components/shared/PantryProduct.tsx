import { Pressable, StyleSheet, Text, View } from 'react-native';
import { accentColor, dominantColor, error, success, textLight, warn } from '../../constants/colors'
import { err } from 'react-native-svg/lib/typescript/xml'
import { Cancel, DeleteCircle, Menu } from 'iconoir-react-native'


type ProductProps = {
   id?: string;
   name: string;
   expirationDate: Date;
   onPress: () => void;
}

const PantryProduct = ({id, name, expirationDate, onPress}: ProductProps) => {

   let today: Date = new Date();
   let dateDifference = (expirationDate.getDate() - today.getDate())

   const getColor = (): string => {
      if (dateDifference <= 7 && dateDifference >= 1)
         return warn;
      
      if (dateDifference <= 0)
         return error;

      return success;
   }

   const getExpiredText = (): string => {

      let prefix: string = "Expires on ";

      if (dateDifference == 0)
         prefix = "Expired today "

      if (dateDifference < 0)
         prefix = "Expired on " + expirationDate.toLocaleDateString();

      return prefix + expirationDate.toLocaleDateString();
   }

   return (
      <Pressable onPress={() => onPress()} style={ styles.container }>
         <View style={{ flexDirection: "row", justifyContent: "space-between"}} >
            <View style={[ styles.colorContainer, { backgroundColor: getColor()} ]}></View>
            <View style={ styles.textContainer }> 
               <Text>{ name }</Text>
               <Text style={{ color: dateDifference <= 0 ? error : textLight }} >{ getExpiredText() }</Text>
            </View>
            <Cancel style={styles.deleteButton} height={15} width={15} />
         </View>
      </Pressable>
    );
};

export const styles = StyleSheet.create({
   container: {
      borderRadius: 6,
      elevation: 3,
      alignSelf: "stretch",
      margin: 5,
      backgroundColor: "white",
   },
   textContainer: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      flexGrow: 1
   },
   rightSideContainer: {
      borderRadius: 6,
      width: 5,
      justifyContent: "flex-end"
   }, 
   colorContainer: {
      borderRadius: 6,
      width: 5
   },
   deleteButton: {
      margin: 7
   }
})

export default PantryProduct;