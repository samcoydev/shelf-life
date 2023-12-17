import { useRouter } from 'expo-router'
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native'
import Container from '../../../components/shared/Container'
import PantryProduct from '../../../components/shared/PantryProduct'
import {success, textDark, textLight} from '../../../constants/colors'
import {useEffect, useState} from "react";
import {PantryAPI} from "../../../api/pantry-api";
import {AlertData} from "../../../types/alert-data";
import Alert from "../../../components/shared/Alert";
import {PantryItemData} from "../../../types/pantry-item-data";


const Pantry = () => {
   const router = useRouter();
   const [ pantryItems, setPantryItems ] = useState(null);

   useEffect(() => {
      initPantry();
   }, [])

   const initPantry = async () => {
      PantryAPI.getPantryItems().then(response => {
         if (response.status === 200) {
            console.log("Data is: ", response.data);
            setPantryItems(response.data);
         }
      })
   }

   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={ styles.headerContainer }>
               <Text style={ styles.headingText }>Pantry</Text>
               <Text style={ styles.subtitleText }>Swipe right to add a product to your list and hide from your pantry.</Text>
            </View>

            {pantryItems ? pantryItems.map((pantryItem: PantryItemData, index)=>{
               return (
                   <PantryProduct key={index} onPress={() => {}} pantryItem={pantryItem} />
               )
            }) : ""}
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

export default Pantry;
