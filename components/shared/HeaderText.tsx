import { Text, StyleSheet } from 'react-native';
import { textLight } from '../../constants/colors'

const HeaderText = props => {
  return(
    <Text style={{ ...styles.headerText, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
      color: textLight,
      fontSize: 24,
  }
});

export default HeaderText