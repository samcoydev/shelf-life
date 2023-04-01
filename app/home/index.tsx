import { Link, Tabs } from 'expo-router'
import { Text, View } from 'react-native';


const Home = () => {
   return (
      <View>
         <Text>Home</Text>
         <Link href="/home/household">Go to House Hold</Link>
         <Link href="/home/Recipes">Go to Recipes</Link>
      </View>
    );
};

export default Home;