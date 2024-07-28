import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DiaryStackParamList } from '../../assets/DiaryTypes';

type DiaryScreenNavigationProp = StackNavigationProp<DiaryStackParamList, 'Diary'>;

export default function Diary() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Diary Emotion</Text>
      <Header title="" onBack={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({})