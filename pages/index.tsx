export { default } from './dashboard'

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { useAuthGate } from 'react-native-doorman'
// import dynamic from 'next/dynamic'
// const MaybeAccount = dynamic(() => import('../src/views/Maybe-Account'), {
//   loading: () => <LoadingScreen />,
//   ssr: false,
// })
// import LoadingScreen from '../src/views/Loading-Screen'
// import { ThemeUi } from '../src/theme'

// export default function Home() {
//   const { user, loading } = useAuthGate()
//   if (loading) return <LoadingScreen />
//   if (user) return <MaybeAccount />

//   return (
//     <View style={styles.container}>
//       <Text
//         style={styles.text}
//         // onPress={
//         //   user ? signOut : () => navigate({ routeName: NavigationRoutes.auth })
//         // }
//       >
//         Welcome to Spotify Party 👋 This is a landing page...
//       </Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 16,
//     color: ThemeUi.colors.text,
//   },
// })
