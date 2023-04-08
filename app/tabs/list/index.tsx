import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Alert from '../../../components/shared/Alert'
import { accentColor, error, success, textDark, textLight, warn } from '../../../constants/colors'
import Container from '../../../components/shared/Container'
import PantryProduct from '../../../components/shared/PantryProduct'
import { useRouter } from 'expo-router'
import ListItem from '../../../components/shared/ListItem'
import { SearchBar } from 'react-native-screens'


const ShoppingList = () => {
   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={ styles.headerContainer }>
               <Text style={ styles.headingText }>Shopping List</Text>
            </View>
            
            <ListItem name="Bananas" checked={false} />
            <ListItem name="Apples" checked={false} />
            <ListItem name="Grapes" checked={false} />

         </ScrollView>
      </Container>
    );
};

const styles = StyleSheet.create({
   headerContainer: {
      width: "90%",
      paddingTop: 5,
      paddingBottom: 15,
   },
   headingText: {
      color: textDark,
      fontSize: 24,
   },
   subtitleText: {
      color: textLight,
      fontSize: 14,
   },
   scrollContainer: {
      flex: 1,
      width: "100%",
      marginBottom: 60
   }
})

export default ShoppingList;