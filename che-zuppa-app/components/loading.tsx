import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loading(props : any) {
  return (
    <View className='flex 1 flex justify-center items-center'>
        <ActivityIndicator {...props} />
    </View>
  )
}