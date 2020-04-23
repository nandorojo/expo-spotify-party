import * as React from 'react'
import { useAuthGate } from 'react-native-doorman'
import LoadingScreen from './Loading-Screen'
import Account from './Account'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { ScrollView } from 'react-native'
import { Container } from '../components/Container'
import ColorCard from '../components/Color-Card'

export default function MaybeAccount() {
  const { user, loading } = useAuthGate()
  const { navigate } = useRouting()
  if (loading) return <LoadingScreen />

  if (user) return <Account />

  return (
    <ScrollView>
      <Container>
        {/*<ColorCard color="muted" text="👋 Welcome" marginBottom={2} />*/}
        <ColorCard
          text="Get Started"
          description="Start listening to songs with friends in seconds."
          color="primary"
          onPress={() =>
            navigate({
              routeName: NavigationRoutes.auth,
            })
          }
          marginBottom={2}
        />
        <ColorCard
          text="How it works"
          // description="Share your Spotify Party link with friends to listen to music together in real-time."
          color="muted"
          description={`👋 Create an account.
          
🥳 Create a Spotify party.

🎹 Share your party link with friends & listen to music together in real-time.`}
        />
        {/*<ColorCard
          text="Create Account"
          description="It takes about 28 seconds."
          color="secondary"
          onPress={() =>
            navigate({
              routeName: NavigationRoutes.auth,
            })
          }
          marginBottom={2}
        />
        <ColorCard
          text="😅"
          description="I forget if I made an account."
          color="muted"
          onPress={() =>
            navigate({
              routeName: NavigationRoutes.auth,
            })
          }
        />*/}
      </Container>
    </ScrollView>
  )
}
