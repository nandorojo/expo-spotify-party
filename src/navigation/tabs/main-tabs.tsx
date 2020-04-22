import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AnimatedTabBar from '@gorhom/animated-tabbar'
import { NavigationRoutes } from '../routes'
import Home from '../../../pages/index'
import { TextStyle } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import { BaseStack } from '../stacks/base-stack'
import { ThemeUi } from '../../theme'
import Animated from 'react-native-reanimated'

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

const Icon = Animated.createAnimatedComponent(Ionicons)

const tabs: TabsConfigsType<MainTabsParams> = {
  dashboard: {
    labelStyle: {
      color: ThemeUi.colors.text,
    },
    icon: {
      component: ({ color, size }) => (
        <Icon size={size} color={color} name="ios-musical-note" />
      ),
      activeColor: `${ThemeUi.colors.text}`,
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: `${ThemeUi.colors.primary}`,
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

const DashboardTab = () => <BaseStack initialRouteName="dashboard" />
// const SpotifyTab = () => <BaseStack initialRouteName="spotifyAuth" />

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props =>
        null && (
          <AnimatedTabBar
            style={{ backgroundColor: ThemeUi.colors.background }}
            tabs={tabs}
            {...props}
          />
        )
      }
    >
      <Tab.Screen
        name={NavigationRoutes.dashboard}
        options={() => ({
          title: 'Parties',
        })}
        component={DashboardTab}
      />
      {/*<Tab.Screen
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
      />*/}
    </Tab.Navigator>
  )
}
