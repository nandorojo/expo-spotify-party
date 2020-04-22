import * as React from 'react'
import { useAuthGate } from 'react-native-doorman'
import LoadingScreen from './Loading-Screen'
import Account from './Account'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { ScrollView, Text } from 'react-native'
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
          text="Sign In"
          description="Jump right back in."
          color="primary"
          onPress={() =>
            navigate({
              routeName: NavigationRoutes.auth,
            })
          }
          marginBottom={2}
        />
        <ColorCard
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
        />
      </Container>
    </ScrollView>
  )
}
