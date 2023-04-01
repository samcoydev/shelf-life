import { Link, Slot } from "expo-router";
import { IconoirProvider, HomeSimple, BoxIso, Cart, User, Settings } from 'iconoir-react-native'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { textLight, accentColor } from '../constants/colors'

export default function Layout() {
   return (
      <>
         <View style={styles.container}>
            <Slot />
         </View>
         <IconoirProvider
            iconProps={{
               color: textLight,
               strokeWidth: 2.5,
               height: 32,
               width: 32
            }}>
            <Footer />
         </IconoirProvider>
      </>
   )
}

function Footer() {
   return (
      <View
         style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            padding: 8,
            alignItems: "flex-start",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 8,
            backgroundColor: "white",
            borderTopColor: accentColor,
            borderTopWidth: 2,
         }}
      >
         <Link href="/home" asChild >
            <Pressable>
               {({ pressed }) => (
                  <View style={ [styles.footerButton, pressed && { backgroundColor: "rgba(0,0,0,0.2)" }] }>
                     <HomeSimple />
                     <Text style={{ color: textLight, fontSize: 14 }}>
                        Home
                     </Text>
                  </View>
               )}
            </Pressable>
         </Link>

         <Link href="/pantry" asChild >
            <Pressable>
               {({ pressed }) => (
                  <View style={ [styles.footerButton, pressed && { backgroundColor: "rgba(0,0,0,0.2)" }] }>
                     <BoxIso />
                     <Text style={{ color: textLight, fontSize: 14 }}>
                        Pantry
                     </Text>
                  </View>
               )}
            </Pressable>
         </Link>

         <Link href="/list" asChild >
            <Pressable>
               {({ pressed }) => (
                  <View style={ [styles.footerButton, pressed && { backgroundColor: "rgba(0,0,0,0.2)" }] }>
                     <Cart />
                     <Text style={{ color: textLight, fontSize: 14 }}>
                        List
                     </Text>
                  </View>
               )}
            </Pressable>
         </Link>

         <Link href="/profile" asChild >
            <Pressable>
               {({ pressed }) => (
                  <View style={ [styles.footerButton, pressed && { backgroundColor: "rgba(0,0,0,0.2)" }] }>
                     <User />
                     <Text style={{ color: textLight, fontSize: 14 }}>
                        Profile
                     </Text>
                  </View>
               )}
            </Pressable>
         </Link>

         <Link href="/settings" asChild >
            <Pressable>
               {({ pressed }) => (
                  <View style={ [styles.footerButton, pressed && { backgroundColor: "rgba(0,0,0,0.2)" }] }>
                     <Settings />
                     <Text style={{ color: textLight, fontSize: 14 }}>
                        Settings
                     </Text>
                  </View>
               )}
            </Pressable>
         </Link>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: 'center',
      justifyContent: 'center',
   },
   footerContainer: {
      backgroundColor: "white",
   },
   footerButton: { 
      flexDirection: "column", 
      alignItems: "center", 
      paddingHorizontal: 16,
      borderRadius: 8,
   },
})
