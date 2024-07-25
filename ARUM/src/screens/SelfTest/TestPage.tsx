import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import TestLoading from './TestLoading'

type SelfTestScreenNavigationProp = StackNavigationProp<SelfTestStackParamList, 'SelfTest'>;


export default function TestPage() {
  const navigation = useNavigation<SelfTestScreenNavigationProp>();
  
  return (
    <View>
      <Text>TestPage</Text>
      <TouchableOpacity onPress={() => navigation.navigate('TestLoading')}>
          <Text >로딩 페이지 보기 </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})