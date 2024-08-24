import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { MyPageNavigationProp } from '../../navigation/types';
// import { API_URL } from '../../ngrok_url';  // ngrok_url 파일에서 API_URL 가져오기
import {API_URL} from '../../api_url'

export default function MyPage() {
  const navigation = useNavigation<MyPageNavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem('userToken');
    const storedUsername = await AsyncStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('Guest');
    }
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      checkLoginStatus();
    }, [checkLoginStatus])
  );

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
        setIsLoggedIn(false);
        navigation.navigate('MyPage');
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
      console.log('Proceeding with local logout despite error');
    } finally {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('username');
        setUsername('Guest');
        setIsLoggedIn(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } catch (e) {
        console.error('Error removing data from AsyncStorage:', e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <View style={styles.content}>
        <Text style={styles.subtitle}>회원정보</Text>
        <View style={styles.infoBox}>
          {isLoggedIn ? (
            <>
              <Text style={styles.infoText}>Welcome, {username}</Text>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>로그아웃</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.guestText}>Welcome, Guest</Text>
              <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>회원가입</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>로그인</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <View style={styles.statsSection}>
        <Text style={styles.subtitle}>어루만짐 1일째</Text>
        <View style={styles.statsBox}>
          <TouchableOpacity style={styles.statsButton}>
            <Text style={styles.statsTitle}>감정일기</Text>
            <Text style={styles.statsDescription}>1번의 감정기록</Text>
            <Icon name="chevron-forward-outline" size={24} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.statsButton}>
            <Text style={styles.statsTitle}>일일미션</Text>
            <Text style={styles.statsDescription}>1번의 시도</Text>
            <Icon name="chevron-forward-outline" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.adBox}>
        <Icon name="close-circle-outline" size={24} color="white" style={styles.adIcon} />
        <Text style={styles.adTitle}>광고 제거 상품</Text>
        <Text style={styles.adDescription}>어루만짐을 광고 없이 편하게 이용할 수 있어요!</Text>
        <Text style={styles.adWarning}>아직 개발 중이에요!</Text>
        <Icon name="chevron-forward-outline" size={24} color="white" style={styles.adArrow} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFEB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  guestText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#353535',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '48%',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  statsDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  adBox: {
    backgroundColor: '#6487E5',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
  },
  adIcon: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  adTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  adDescription: {
    color: 'white',
    fontSize: 14,
  },
  adWarning:{
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    padding: 10,
    paddingBottom: 0,
    textAlign: 'center',
  },
  adArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -12,
  },
});