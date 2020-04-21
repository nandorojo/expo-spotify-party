import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainTabs from './tabs/main-tabs'

export default function Navigator() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  )
}
