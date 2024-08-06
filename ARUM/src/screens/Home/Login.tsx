import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../navigation/types';
import { validateEmail } from '../../utils/authUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage를 사용하여 토큰 저장
// import { API_URL, API_HOST } from '../../ngrok_url';  // ngrok_url 파일에서 변수 가져오기
// const API_URL = 'http://localhost:8080'
import {API_URL} from '../../api_url'



export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState(''); // 사용자 이름 추가
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');

    if (username.trim() === '') {
      setError('유효한 사용자 이름을 입력해주세요.');
      return;
    }

    try {
      // const response = await axios.post(`${API_URL}/users/login/`, {
      const response = await axios.post(`http://52.78.233.229:8000/users/login/`, {
        username, // 사용자 이름으로 로그인
        password,
      });

      if (response.status === 200) {
        const { token, username } = response.data;
        console.log('Saving token:', token);
        console.log('Username:', username);
        // 토큰 저장
        try {
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('username', username);  // 여기에 username 저장 추가
          const storedToken = await AsyncStorage.getItem('userToken');
          console.log('Stored token:', storedToken);

          if (storedToken !== token) {
            throw new Error('Token storage failed');
          }
          


        } catch (error) {
          console.error('Error storing token:', error);
          Alert.alert('로그인 오류', '토큰 저장에 실패했습니다. 다시 시도해주세요.');
          return;
        }
        

        // 로그인 성공 시 사용자 이름을 Home 화면으로 전달
        // 네비게이션 전에 토큰이 정말 저장되었는지 확인
        const storedToken = await AsyncStorage.getItem('userToken');
        console.log('Stored token:', storedToken);

        Alert.alert('로그인 성공', '메인 화면으로 이동합니다.');
        console.log(username)

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        if (data && data.error) {
          setError(data.error);
        } else {
          setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
        }
      } else {
        setError('서버에 연결할 수 없습니다.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>로그인</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.forgotPassword}>아이디/비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <Text style={styles.signupText}>
          계정을 생성하여 어루만짐 서비스를 이용하세요
        </Text>
        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    width: 261,
    height: 401,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontFamily: 'Pretendard',
    fontWeight: '600',
    fontSize: 20,
    color: '#353535',
    marginBottom: 20,
  },
  input: {
    width: 216,
    height: 34,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 50,
    marginBottom: 10,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
  forgotPassword: {
    fontFamily: 'Pretendard',
    fontSize: 10,
    color: '#353535',
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  loginButton: {
    width: 216,
    height: 34,
    backgroundColor: '#6487E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  divider: {
    width: 217,
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 15,
  },
  signupText: {
    fontFamily: 'Pretendard',
    fontSize: 10,
    color: '#353535',
    textAlign: 'center',
    marginBottom: 10,
  },
  signupButton: {
    width: 216,
    height: 34,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  signupButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});