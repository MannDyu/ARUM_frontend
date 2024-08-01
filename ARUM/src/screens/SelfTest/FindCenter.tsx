import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';

type FindCenterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FindCenter'>;


const FindCenter: React.FC = () => {
  const navigation = useNavigation<FindCenterScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>심리 상담센터 찾기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FindCenter;
