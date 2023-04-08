import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Alert from '../../../components/shared/Alert'
import Container from '../../../components/shared/Container'
import { error, success, textDark, warn } from '../../../constants/colors'


const Home = () => {
   return (
      <Container>
         <ScrollView style={ styles.scrollContainer } contentContainerStyle={{ alignItems: "center" }}>
            <View style={ styles.headerContainer }>
               <Text style={ styles.headingText }>Dashboard</Text>
               <Text style={ styles.subtitleText }>Welcome, Samuel.</Text>
            </View>


            <Alert color={success} title="Test Alert!" />
            <Alert color={warn} title="Test Long Alert! Lorem Ipsem stuff you know what I mean?" />
            <Alert color={error} title="Paige has added some items to your household shopping list." />
         </ScrollView>
      </Container>
    );
};

const styles = StyleSheet.create({
   headerContainer: {
      width: "90%",
      paddingTop: 5,
      paddingBottom: 15
   },
   headingText: {
      color: textDark,
      fontSize: 24,
   },
   subtitleText: {
      color: textDark,
      fontSize: 16,
   },
   scrollContainer: {
      flex: 1,
      width: "100%",
      marginBottom: 60
   }
})

export default Home;