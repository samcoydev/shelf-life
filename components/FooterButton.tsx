import { Link } from 'expo-router'
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { ctaColor, dominantColor, textLight } from '../constants/colors'


const FooterButton = ({icon, link, title, styles, onPress, isActive}) => {
   return (
      <>
      <Link href={link} asChild >
            <Pressable onPress={onPress}>
               {({ pressed }) => (
                  <View style={[
                     styles.footerButton, 
                     pressed && { backgroundColor: "rgba(0,0,0,0.2)" },
                     isActive && styles.activeButton]}>
                     {icon}
                     <Text style={{ fontSize: 14, color: isActive ? dominantColor : textLight }}>
                        {title}
                     </Text>
                  </View>
               )}
            </Pressable>
      </Link>
      </>
    );
};

export default FooterButton;