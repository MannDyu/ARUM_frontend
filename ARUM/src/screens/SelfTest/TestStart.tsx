import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MissionHeader from '../Mission/MissionHeader';
import Header from '../../components/Header';
import TestPage from '../SelfTest/TestPage'; 
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';


const { width, height } = Dimensions.get('window');
type TestStartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TestStart'>;

const TestStart: React.FC = () => {
  const navigation = useNavigation<TestStartScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="우울증 자가진단 테스트" onBack={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/test.png')}
          style={styles.image}
        />
        <Text style={styles.description}>
          지난 일주일동안 당신의 상태에 관한 질문입니다.{'\n'}
          이런 일들이 얼마나 자주 일어났는지 응답해주세요.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          정식 검사가 아닌 간이테스트입니다.{'\n'}
          정확한 검사를 위해서는 전문기관을 방문하세요.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('TestPage')}>
          <Text style={styles.startButtonText}>자가진단 시작</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#181818',
  },
  startButton: {
    backgroundColor: '#181818',
    borderRadius: 10,
    width: width - 54,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default TestStart;