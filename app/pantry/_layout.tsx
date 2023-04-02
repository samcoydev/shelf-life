import { Link, Tabs } from 'expo-router'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/HomeHeader'
import { primaryColor } from '../../constants/colors'


const PantryLayout = () => {
   return (
      <View style={ styles.container }>
         <View style={ styles.areaView }>
            <Text>Pantry</Text>
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

export default PantryLayout;