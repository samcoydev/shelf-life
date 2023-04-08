import { useRouter, useSearchParams } from 'expo-router'
import { Text, View } from 'react-native';
import HeaderText from '../../../components/shared/HeaderText'
import Container from '../../../components/shared/Container'


const RecipeCategory = () => {
   const router = useRouter();

   const { name } = useSearchParams();

   return (
      <Container>
         <HeaderText>{name} Category</HeaderText>
      </Container>
    );
};


export default RecipeCategory;