import { Tabs, useRouter } from 'expo-router'
import { accentColor, ctaColor, dominantColor, textDark, textLight } from '../constants/colors'
import { ArrowLeft, Book, BoxIso, Cart, HomeSimple, IconoirProvider, InfoEmpty, Leaf, Settings, User } from 'iconoir-react-native'
import { Alert, Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { ThemeProvider, createTheme } from '@rneui/themed'
import { ResponseType, exchangeCodeAsync, makeRedirectUri, revokeAsync, useAuthRequest } from 'expo-auth-session';
import { useState } from 'react'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';

import Container from '../components/shared/Container'

WebBrowser.maybeCompleteAuthSession();

const clientId = '5eugb9ip6tdpvd9gmjdr9h0q6h';
const userPoolUrl =
  'https://shelf-life-alpha.auth.us-east-2.amazoncognito.com';
const redirectUri = 'com.samcodesthings.shelflife://oauth2redirect';

export default function AppLayout() {
   const router = useRouter();

   const [authTokens, setAuthTokens] = React.useState(null);
   const discoveryDocument = React.useMemo(() => ({
     authorizationEndpoint: userPoolUrl + '/oauth2/authorize',
     tokenEndpoint: userPoolUrl + '/oauth2/token',
     revocationEndpoint: userPoolUrl + '/oauth2/revoke',
   }), []);

   const [request, response, promptAsync] = useAuthRequest(
      {
        clientId,
        responseType: ResponseType.Code,
        redirectUri,
        usePKCE: true,
      },
      discoveryDocument
    );
   
   React.useEffect(() => {
      const exchangeFn = async (exchangeTokenReq) => {
        try {
          const exchangeTokenResponse = await exchangeCodeAsync(
            exchangeTokenReq,
            discoveryDocument
          );
          setAuthTokens(exchangeTokenResponse);
        } catch (error) {
          console.error(error);
        }
      };
      if (response) {
        if (response.type == "error") {
          Alert.alert(
            'Authentication error',
            response.params.error_description || 'something went wrong'
          );
          return;
        }
        if (response.type === 'success') {
          exchangeFn({
            clientId,
            code: response.params.code,
            redirectUri,
            extraParams: {
              code_verifier: request.codeVerifier,
            },
          });
        }
      }
    }, [discoveryDocument, request, response]);
  
    const logout = async () => {
      const revokeResponse = await revokeAsync(
        {
          clientId: clientId,
          token: authTokens.refreshToken,
        },
        discoveryDocument
      );
      if (revokeResponse) {
        setAuthTokens(null);
      }
    };
    console.log('authTokens: ' + JSON.stringify(authTokens));
   return (
    <ThemeProvider theme={theme}>
         <IconoirProvider
            iconProps={{
               color: textLight,
               strokeWidth: 1,
               height: 32,
               width: 32
            }}>

            {!authTokens ? (
               <Container>
                  <View style={{ alignItems: "center" }}>
                     <Button 
                        disabled={!request}
                        title="Log In"
                        onPress={() => {
                           promptAsync();
                        }} />
                  </View>
               </Container> ) : (
                  <Tabs initialRouteName={"home"} screenOptions={{
                     headerTitle: (props) => <Leaf color={ dominantColor }  />,
                     headerLeft: (props) => (
                        <Pressable onPress={() => router.back()}>
                           <ArrowLeft style={{marginLeft: 15}} width={25} height={25} />
                        </Pressable>
                     ),
                     headerRight: (props) => <InfoButton />,
                     headerTitleAlign: "center",
                     tabBarActiveTintColor: dominantColor,
                     tabBarInactiveTintColor: textLight,
                     tabBarStyle: {
                        position: "absolute",
                        height: 80
                     },
                  }}>
               <Tabs.Screen 
                  name="home" 
                  options={{ 
                     href: "home",
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Home</Text>,
                     tabBarIcon: ({focused}) => { return <HomeSimple color={focused ? dominantColor : textLight} /> }
                  }} 
               />
               <Tabs.Screen 
                  name="pantry" 
                  options={{
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Pantry</Text>,
                     tabBarIcon: ({focused}) => { return <BoxIso color={focused ? dominantColor : textLight} /> }
                  }} 
               />
               <Tabs.Screen 
                  name="list" 
                  options={{ 
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>List</Text>,
                     tabBarIcon: ({focused}) => { return <Cart color={focused ? dominantColor : textLight} /> } 
                  }} 
               />
               <Tabs.Screen 
                  name="recipes" 
                  options={{ 
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Recipes</Text>,
                     tabBarIcon: ({focused}) => { return <Book color={focused ? dominantColor : textLight} /> } 
                  }} 
               />
               <Tabs.Screen 
                  name="profile" 
                  options={{ 
                     tabBarLabel: ({ focused }) => <Text style={[ styles.tabButtonStyle, focused ? styles.activeButton : null ]}>Profile</Text>,
                     tabBarIcon: ({focused}) => { return <User color={focused ? dominantColor : textLight} /> } 
                  }} 
               />
               <Tabs.Screen name="index" options={{href: null}} />
            </Tabs>
                )}

            
         </IconoirProvider> 
      </ThemeProvider>
   )
};

const InfoButton = () => {
   return (
      <Pressable onPress={() => alert("Info Button!")}>
         <InfoEmpty style={{marginRight: 15}} width={25} height={25} />
      </Pressable>
   )
}


const theme = createTheme({
   components: {
     CheckBox: {
         iconType: "material-community",
         checkedIcon: "checkbox-outline",
         uncheckedIcon: 'checkbox-blank-outline',
         checkedColor: dominantColor,
         uncheckedColor: textDark
     },
   },
 });

export const styles = StyleSheet.create({
   tabButtonStyle: {
      fontSize: 14,
      alignItems: "center",
      justifyContent: "center",
      bottom: 14,
      color: textLight
   },
   activeButton: {
      color: dominantColor,
      borderBottomColor: ctaColor,
      borderBottomWidth: 2,
   }
})

