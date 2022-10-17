import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../LayoutStyle'

export default function ProgressBar({loaded}) {
  return (
    <View style={{height: 12, width: '100%', backgroundColor: color.ink_light, borderRadius: 10}}>
      <View style={{height: '100%', width: loaded, backgroundColor: color.purple, borderRadius: 10}} />
    </View>
  )
}