// Home.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeScreenNavigationProp, RootStackParamList } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL, API_HOST } from '../../../ngrok_url';  // ngrok_url 파일에서 변수 가져오기



export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const [username, setUsername] = useState<string>('Guest');

  useEffect(() => {
    console.log('Route params:', route.params);
    if (route.params?.username) {
      console.log('Updating username to:', route.params.username);
      setUsername(route.params.username);
    }
  }, [route.params?.username]);
  
  
  

  
  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };


  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Token for logout:', token);
  
      if (!token) {
        console.log('No token found, proceeding with local logout');
        setUsername('Guest');
        navigation.navigate('Login');
        return;
      }
  
      await axios.post(
        `${API_URL}/users/logout/`,
        {},
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        }
      );
  
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      }
      // 오류가 발생해도 계속 진행
      console.log('Proceeding with local logout despite error');
    } finally {
      // 항상 실행되는 부분
      try {
        await AsyncStorage.removeItem('userToken');
        setUsername('Guest');
        navigation.navigate('Login');
      } catch (e) {
        console.error('Error removing token from AsyncStorage:', e);
      }
    }
  };
  // const handleLogout = async () => {
  //   try {
  //     // 저장된 토큰 가져오기
  //     const token = await AsyncStorage.getItem('userToken');

  //     if (!token) {
  //       Alert.alert('로그아웃 오류', '토큰을 찾을 수 없습니다.');
  //       navigation.navigate('Login');
  //       return;
  //     }
  //     // 서버에 로그아웃 요청
  //     const response = await axios.post(
  //       `${API_URL}/users/logout/`,
  //       {},
  //       {
  //         headers: {
  //           'Authorization': `${token}`, // "Token " 접두사 제거
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     );

  //     console.log('Logout response:', response.data); // 응답 로깅
      
  //     // 토큰 삭제
  //     await AsyncStorage.removeItem('userToken');

  //     // 성공 메시지 표시
  //     Alert.alert('로그아웃 성공', '로그인 화면으로 이동합니다.');

  //     // 로그인 화면으로 이동
  //     navigation.navigate('Login');
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       console.error('Logout error response:', error.response.data);
  //       console.error('Logout error status:', error.response.status);
  //     }
  //     console.error('Logout error:', error);
  //     Alert.alert('로그아웃 실패', '다시 시도해 주세요.');
  //   }
  // };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}</Text>
      <Text style={styles.title}>Home</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});