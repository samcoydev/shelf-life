import { Link, Tabs } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/HomeHeader'
import { primaryColor } from '../../constants/colors'


const Home = () => {
   return (
      <View style={ styles.container }>
         <Header />
         <View style={ styles.areaView }>
            <Text>Home</Text>
            <Link href="/home/household">Go to House Hold</Link>
            <Link href="/home/Recipes">Go to Recipes</Link>
         </View>
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
      paddingTop: 10         
   },
   areaView: {
      flex: 1,
      alignItems: "center"
   }
});

export default Home;