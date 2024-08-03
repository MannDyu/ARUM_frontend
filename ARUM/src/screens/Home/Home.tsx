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
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('FindCenter')}>
        <Text style={styles.buttonText}>센터 찾기</Text>
      </TouchableOpacity>
    </View>
  );
};

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