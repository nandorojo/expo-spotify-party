import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AnimatedTabBar from '@gorhom/animated-tabbar'
import { NavigationRoutes } from '../routes'
import Home from '../../../pages/index'
import { TextStyle } from 'react-native'
// @ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons'
// @ts-ignore
import Entypo from '@expo/vector-icons/Entypo'
import { BaseStack } from '../stacks/base-stack'
import { ThemeUi } from '../../theme'
import Animated from 'react-native-reanimated'
import { AccountStack } from '../stacks/account-stack'
import { Linking } from 'expo'
import * as NavigationService from '../navigation-service'
import { useDeepLinking } from '../../hooks/use-deep-linking'

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
        <Icon size={size} color={ThemeUi.colors.text} name="ios-home" />
      ),
      activeColor: ThemeUi.colors.text,
      inactiveColor: ThemeUi.colors.text,
    },
    background: {
      activeColor: `${ThemeUi.colors.primary}`,
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  account: {
    labelStyle: {
      color: ThemeUi.colors.text,
    },
    icon: {
      component: ({ color, size }) => (
        <Icon size={size} color={ThemeUi.colors.text} name="ios-person" />
      ),
      activeColor: ThemeUi.colors.text,
      inactiveColor: ThemeUi.colors.text,
    },
    background: {
      activeColor: ThemeUi.colors.primary,
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
}

type MainTabsParams = {
  dashboard: undefined
  account: undefined
  // spotifyAuth: undefined
}

const Tab = createBottomTabNavigator<MainTabsParams>()

// const DashboardTab = () => <BaseStack initialRouteName="dashboard" />
const AccountTab = () => <AccountStack initialRouteName="account" />

export default function MainTabs() {
  useDeepLinking()
  return (
    <Tab.Navigator
      tabBar={props =>
        null && (
          <AnimatedTabBar
            style={{ backgroundColor: ThemeUi.colors.muted }}
            tabs={tabs}
            {...props}
          />
        )
      }
    >
      {/*<Tab.Screen
        name={NavigationRoutes.dashboard}
        options={() => ({
          title: 'Parties',
        })}
        component={DashboardTab}
      />*/}
      {/*<Tab.Screen
        name={NavigationRoutes.spotifyAuth}
        options={() => ({
          title: 'Spotify',
        })}
        component={SpotifyTab}
      /> <Tab.Screen
        name={NavigationRoutes.dashboard}
        options={() => ({
          title: 'Home',
        })}
        component={DashboardTab}
      />*/}
      <Tab.Screen
        name={NavigationRoutes.account}
        options={() => ({
          title: 'Account',
        })}
        component={AccountTab}
      />
    </Tab.Navigator>
  )
}
