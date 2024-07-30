import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DiaryList from './DiaryList'

export default function Diary() {
  return (
    <View>
      <Text>Diary</Text>
      <DiaryList/>
    </View>
  )
}

const styles = StyleSheet.create({})