// import { useRouter, useSegments } from "expo-router";
// import React from "react";
// import { useAuthRequest, makeRedirectUri, useAutoDiscovery } from 'expo-auth-session';

// const AuthContext = React.createContext(null);

// // This hook can be used to access the user info.
// export function useAuth() {
//   return React.useContext(AuthContext);
// }

// // This hook will protect the route access based on user authentication.
// function useProtectedRoute(user) {
//   const segments = useSegments();
//   const router = useRouter();

//   React.useEffect(() => {
//     const inAuthGroup = segments[0] === "(auth)";

//     if (
//       // If the user is not signed in and the initial segment is not anything in the auth group.
//       !user &&
//       !inAuthGroup
//     ) {
//       // Redirect to the sign-in page.
//       router.replace("/sign-in");
//     } else if (user && inAuthGroup) {
//       // Redirect away from the sign-in page.
//       router.replace("/");
//     }
//   }, [user, segments]);
// }

// export function Provider(props) {
//   const [user, setAuth] = React.useState(null);
//   const discovery = useAutoDiscovery("https://coycafe.ddns.net:8080/realms/shelf-life-dev");

//   // Request
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: 'shelf-life-app',
//       scopes: ['openid', 'profile'],
//       // For usage in managed apps using the proxy
//       redirectUri: makeRedirectUri({
//         // For usage in bare and standalone
//         native: 'com.samcodesthings.react://oauth2redirect',
//         useProxy: true,
//       }),
//     },
//     discovery
//   );

//   // Redirect the user to the sign-in page if they are not authenticated
//   useProtectedRoute(user);

//   return (
//     <AuthContext.Provider
//       value={{
//         signIn: async () => {
//           // Prompt the user to sign in
//           setAuth(await promptAsync());
//         },
//         signOut: () => setAuth(null),
//         user,
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// }
