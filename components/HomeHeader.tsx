import { Link, Tabs } from 'expo-router'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { accentColor, primaryColor, textLight } from '../constants/colors'


const Header = () => {
   return (
      <View style={ styles.headerContainer }>
         <Text style={ styles.headerButton }>Household</Text>
         <Text style={ styles.headerButton }>Dashboard</Text>
         <Text style={ styles.headerButton }>Recipes</Text>
      </View>
    );
};

const styles = StyleSheet.create({
   headerContainer: {
      height: 160,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomColor: accentColor,
      borderBottomWidth: 2   
   },
   headerItems: {},
  headerButton: {
    backgroundColor: primaryColor,
    fontSize: 16,
    color: textLight,
    marginHorizontal: 15,
    paddingVertical: 16,
    textAlign: "center",
    alignSelf: "flex-end",
  },
});

export default Header;