// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import * as React from 'react'
import AuthenticateSpotify from './src/views/Authenticate-Spotify'
import FuegoProvider from './src/providers/fuego'
import Doorman from './src/providers/Doorman'
import { AuthGate, AuthFlow } from 'react-native-doorman'

export default function App() {
  return (
    <FuegoProvider>
      <Doorman>
        <AuthGate>
          {({ loading, user }) => {
            if (loading) return <></>
            if (!user) return <AuthFlow />
            return <AuthenticateSpotify />
          }}
        </AuthGate>
      </Doorman>
    </FuegoProvider>
  )
}
