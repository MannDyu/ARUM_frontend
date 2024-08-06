import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../api_url';

const { width, height } = Dimensions.get('window');

type SelfTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelfTestMain'>;

export default function SelfTest() {
  const navigation = useNavigation<SelfTestScreenNavigationProp>();
  const [isRetest, setIsRetest] = useState(false);

  const handleStartTest = () => {
    navigation.navigate('TestStart');
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token');
      return null;
    }
  };

  useEffect(() => {
    const needRetest = async () => {
      try {
        const userToken = await getToken();
        if (!userToken) {
          console.error(`Token not found`);
          return;
        }

        const response = await fetch(`${API_URL}/selfTest/getSelfTestDate`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`,
          },
        });
        const responseData = await response.json();
        const testDate = new Date(responseData.test_date);
        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

        setIsRetest(testDate < oneMonthAgo);
      } catch (error) {
        console.error(`Error fetching self test date: ${error}`);
      }
    };

    needRetest();
  }, []);

  const getPrevScore = async () => {
    try {
      const userToken = await getToken();
      if (!userToken) {
        console.error(`Token not found`);
        return;
      }

      const response = await fetch(`${API_URL}/selfTest/getSelfTestScore/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${userToken}`,
        },
      });

      const responseData = await response.json();
      const score = responseData?.test_score ?? 0;  // Fallback to 0 if test_score is undefined

      navigation.navigate('TestReport', { score: score });
    } catch (error) {
      console.error(`Error fetching self test data: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>우울증 자가진단</Text>
        <Text style={styles.subtitle}>1달마다 나의 마음 상태를 살펴보아요</Text>
      </View>

      <View style={styles.content}>
        {isRetest && (
          <View style={styles.infoBar}>
            <View style={styles.infoBarDot} />
            <Text style={styles.infoBarText}>마지막 테스트로부터 30일이 경과했어요!</Text>
          </View>
        )}

        <View style={{ position: 'relative' }}>
          <View style={styles.character}>
            <Image
              source={
                isRetest
                  ? require('../../assets/images/selfTest/tookTest.png') // 기존 검사를 했을 때 
                  : require('../../assets/images/selfTest/firstTest.png') // 검사를 한 번도 안 했을 때 
              }
              style={styles.characterImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <Text style={styles.timeEstimate}>소요시간 약 10분</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
          <Text style={styles.startButtonText}>자가진단 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={getPrevScore}>
          <Text style={styles.reportButtonText}>자가진단 결과 보고서</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  header: {
    width: '100%',
    height: height * 0.25,
    backgroundColor: '#6487E5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 15,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBar: {
    width: 311,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 10,
  },
  infoBarText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#333333',
  },
  character: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  characterImage: {
    marginTop: 30,
    width: 240,
    height: 240,
  },
  timeEstimate: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    bottom: 15,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  startButton: {
    backgroundColor: '#6487E5',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});