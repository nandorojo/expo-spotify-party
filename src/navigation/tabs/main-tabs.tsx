import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AnimatedTabBar from '@gorhom/animated-tabbar'
import { NavigationRoutes } from '../routes'
import Home from '../../../pages/index'
import { TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { BaseStack } from '../stacks/base-stack'

console.log({ Ionicons })

export interface TabConfigsType {
  labelStyle: TextStyle
  icon: {
    component:
      | ((props: {
          color: Animated.Node<string | number>
          size: number
        }) => React.ReactNode)
      | React.ReactNode
    activeColor: string
    inactiveColor: string
  }
  background: {
    activeColor: string
    inactiveColor: string
  }
}
type TabsConfigsType<
  T = { [key: string]: TabConfigsType },
  K extends keyof T = keyof T
> = {
  [key in K]: TabConfigsType
}

const tabs: TabsConfigsType<MainTabsParams> = {
  dashboard: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: ({ color, size }) => (
        <Ionicons size={size} color={'black'} name="ios-musical-note" />
      ),
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  spotifyAuth: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ({ color, size }) => (
        <Entypo size={size} color={'black'} name="spotify" />
      ),
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
  account: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ({ color, size }) => (
        <Ionicons size={size} color={'black'} name="ios-person" />
      ),
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
}

type MainTabsParams = {
  dashboard: undefined
  account: undefined
  spotifyAuth: undefined
}

const Tab = createBottomTabNavigator<MainTabsParams>()

const PartiesTab = () => <BaseStack />
const SpotifyTab = () => <BaseStack initialRouteName="spotifyAuth" />

export default function MainTabs() {
  return (
    <Tab.Navigator tabBar={props => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen
        name={NavigationRoutes.dashboard}
        options={() => ({
          title: 'Parties',
        })}
        component={PartiesTab}
      />
      <Tab.Screen
        name={NavigationRoutes.spotifyAuth}
        options={() => ({
          title: 'Spotify',
        })}
        component={SpotifyTab}
      />
      <Tab.Screen
        name={NavigationRoutes.account}
        options={() => ({
          title: 'Account',
        })}
        component={Home}
      />
    </Tab.Navigator>
  )
}
