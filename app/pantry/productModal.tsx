import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Alert from '../../components/shared/Alert'
import { accentColor, error, success, textDark, textLight, warn } from '../../constants/colors'
import Container from '../../components/shared/Container'
import PantryProduct from '../../components/shared/PantryProduct'
import HeaderText from '../../components/shared/HeaderText'
import Row from '../../components/shared/Row'


const ProductModal = () => {

   return (
      <Container>
         <HeaderText>Product name</HeaderText>

         <Row style={styles.rowMargin}>
            <Text style={styles.container}>Expiration Date</Text>
            <Text style={styles.container}>When last scanned</Text>
         </Row>
         <Row style={styles.rowMargin}>
            <Text style={styles.container}>Add to your list</Text>
            <Text style={styles.container}>Remove from your pantry</Text>
         </Row>
      </Container>
    );
};

const styles = StyleSheet.create({
   rowMargin: {
      marginVertical: 10,
   },
   container: {
      borderRadius: 6,
      elevation: 3,
      padding: 15,
      alignSelf: "stretch",
      margin: 5,
      backgroundColor: "white",
   },
})

export default ProductModal;