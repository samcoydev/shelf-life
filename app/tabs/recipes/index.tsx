import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Alert from '../../../components/shared/Alert'
import { accentColor, ctaColor, dominantColor, error, success, textDark, textLight, warn } from '../../../constants/colors'
import { BirthdayCake, BreadSlice, Clutery, CoffeeCup, GlassHalf, GlassHalfAlt, Home, IconoirProvider, Leaf } from 'iconoir-react-native'
import { useRouter } from 'expo-router'
import Container from '../../../components/shared/Container'


const RecipeCategories = () => {
   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <IconoirProvider
               iconProps={{
                  color: dominantColor,
                  strokeWidth: 1.5,
                  height: 32,
                  width: 32
               }}>
               <Category icon={ <BreadSlice /> } title="Appetizers" />
               <Category icon={ <Clutery /> } title="Entrees" />
               <Category icon={ <GlassHalf /> } title="Soups" />
               <Category icon={ <Leaf /> } title="Salads" />
               <Category icon={ <BirthdayCake /> } title="Deserts" />
               <Category icon={ <CoffeeCup /> } title="Drinks" />
            </IconoirProvider>
         </ScrollView>
      </Container>
    );
};

const Category = ({title, icon}) => {
   const router = useRouter();

   return (
      <Pressable 
         style={ styles.categoryContainer }
         onPress={() => {router.push({pathname: "/recipes/category", params: { name: title }})} }>
         {icon}
         <Text style={ styles.headingText }>{title}</Text>
      </Pressable>
    );
};

const styles = StyleSheet.create({
   scrollContainer: {
      flex: 1,
      width: "100%",
   },
   categoryContainer: {
      flexDirection: "row",
      borderRadius: 6,
      borderWidth : 1,
      borderColor : accentColor,
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: "white",
   },
   headingText: {
      color: textLight,
      paddingLeft: 10,
      fontSize: 24,
   },
   sideArrow: {
      justifyContent: "flex-end"
   },
})

export default RecipeCategories;