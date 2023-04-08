import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Container from '../../../components/shared/Container'
import PantryProduct from '../../../components/shared/PantryProduct'
import { textDark, textLight } from '../../../constants/colors'


const Pantry = () => {
   const router = useRouter();

   const today = new Date();
   const withinAFewDays = new Date(today.getFullYear(), today.getMonth(), today.getDate()+2);
   const withinTheWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
   const laterThanAWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+9);

   const testUrl: string = "/pantry/productModal"

   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={ styles.headerContainer }>
               <Text style={ styles.headingText }>Pantry</Text>
               <Text style={ styles.subtitleText }>Swipe right to add a product to your list and hide from your pantry.</Text>
            </View>

            <PantryProduct onPress={() => router.push(testUrl)} name={"Cupcakes"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Bananas"} expirationDate= {today} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Grapes"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Chai Tea"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Apples"} expirationDate= {withinAFewDays} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Watermelon"} expirationDate= {withinTheWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Cinnamon"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Taco Meat"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Steak"} expirationDate= {laterThanAWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Pork tips"} expirationDate= {withinAFewDays} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Lettuce"} expirationDate= {withinTheWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Strawberries"} expirationDate= {withinTheWeek} />
            <PantryProduct onPress={() => router.push(testUrl)} name={"Cereal"} expirationDate= {today} />
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