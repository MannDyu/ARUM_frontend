import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignupScreenNavigationProp } from '../../navigation/types';
import { validateEmail, validatePassword, storeToken } from '../../utils/authUtils';
import axios from 'axios';

const API_URL = 'http://172.24.161.71:8000'; // 실제 서버 주소로 변경 필요

export default function Signup() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  
  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log('Testing connection...');
      const response = await axios.get(`${API_URL}/users/test/`);
      console.log('Test response:', response.data);
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  const handleSignup = async () => {
    console.log('here')
    setError('');

    if (!validateEmail(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (!validatePassword(password)) {
      setError('비밀번호는 8자 이상이며, 문자, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (password !== password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      console.log('Sending registration request...');
      const response = await axios.post(`${API_URL}/users/register/`, {
        username,
        email,
        password,
        password2
      }, { timeout: 10000 }); // 10초 타임아웃 설정
      console.log('Registration response:', response.data);
      // ... 나머지 코드
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timed out');
          setError('요청 시간이 초과되었습니다. 네트워크 연결을 확인하고 다시 시도해주세요.');
        } else if (error.response) {
          console.error('Server responded with an error:', error.response.data);
          setError(`서버 오류: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.');
        } else {
          console.error('Error setting up the request:', error.message);
          setError(`요청 설정 중 오류: ${error.message}`);
        }
      } else {
        console.error('Non-Axios error:', error);
        setError(`예기치 못한 오류:`);
      }
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        placeholder="사용자 이름"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText} >가입하기</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});