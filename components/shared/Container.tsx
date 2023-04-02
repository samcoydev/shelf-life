import { SafeAreaView, StyleSheet } from 'react-native';

const Container = props => {
  return(
    <SafeAreaView style={{ ...styles.container, ...props.style }}>{props.children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "white",
      padding: 20
  }
});

export default Container