import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';



type MissionProps = {
  navigation: NavigationProp<any, any>;
}

export default function Mission() {
  const navigation = useNavigation<NavigationProp<any, any>>();

  return (
    <View>
      <Text>Mission</Text>
      <Button 
        title="완료된 미션 기록 보기" 
        onPress={() => navigation.navigate('CompletedMissionRecord')}
      />
    </View>
  )
}