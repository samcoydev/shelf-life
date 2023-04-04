import { SafeAreaView, StyleSheet } from 'react-native';

const Row = props => {
  return(
    <SafeAreaView style={{ flexDirection: "row", ...props.style }}>{props.children}</SafeAreaView>
  );
};

export default Row