import { Slot } from 'expo-router'
import HomeHeader from '../../components/HomeHeader'

export default function HomeLayout() {
   return (
      <>
         <HomeHeader />
         <Slot />
      </>
   );
}