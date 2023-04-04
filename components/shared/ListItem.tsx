import { Pressable, StyleSheet, Text, View } from 'react-native';
import { accentColor, dominantColor, error, success, textDark, textLight, warn } from '../../constants/colors'
import { err } from 'react-native-svg/lib/typescript/xml'
import { Cancel, DeleteCircle, Menu } from 'iconoir-react-native'
import { CheckBox } from '@rneui/themed';
import { useState } from 'react'


type ProductProps = {
   name: string;
   checked: boolean;
}

const ListItem = ({name, checked}: ProductProps) => {
   const [check, setCheck] = useState(checked);

   return (
      <View style={ styles.container }>
         <CheckBox
            size={25}
            containerStyle={{paddingLeft: 5, paddingRight: 0}}
            onPress={() => setCheck(!check)}
            checked={check}
         />
         <View style={ styles.textContainer }> 
            
            <Text style={ styles.nameText }>{ name }</Text>
         </View>
         <Cancel style={styles.deleteButton} height={15} width={15} />
      </View>
    );
};

export const styles = StyleSheet.create({
   container: {
      borderRadius: 6,
      elevation: 3,
      alignSelf: "stretch",
      flexDirection: "row",
      margin: 5,
      backgroundColor: "white",
   },
   textContainer: {
      paddingVertical: 15,
      paddingLeft: 0,
      alignSelf: "center",
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
      alignSelf: "center",
      marginRight: 10
   },
   nameText: {
      fontSize: 16,
      color: textDark
   }
})

export default ListItem;