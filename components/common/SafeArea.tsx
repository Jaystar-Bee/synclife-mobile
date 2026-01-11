import React from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SafeArea = ({children, noPadding}: {noPadding?: boolean, children: React.ReactNode}) => {
  return (
    <SafeAreaView className="flex-1" style={{ paddingTop: noPadding ? 0 : Platform.OS === 'android' ? 40 : 20 }}>
        {children}
    </SafeAreaView>
  )
}

export default SafeArea