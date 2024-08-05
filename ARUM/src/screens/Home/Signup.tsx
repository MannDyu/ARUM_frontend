import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignupScreenNavigationProp } from '../../navigation/types';
import { validateEmail, validatePassword, storeToken } from '../../utils/authUtils';
import axios from 'axios';


// import { API_URL, API_HOST } from '../../ngrok_url';  // ngrok_url 파일에서 변수 가져오기
const API_URL = 'http://localhost:8080'

export default function Signup() {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
 

  const handleSignup = async () => {
    console.log('Sending registration request...');
    setError('');

    // 클라이언트 측 유효성 검사
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

    if (username.length < 3) {
      setError('사용자 이름은 최소 3자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/users/register/`,
        {
          username,
          email,
          password,
          password2,
        },
        { timeout: 30000 }
      );
      console.log('Registration response:', response.data);

      // 회원가입 성공 시 Home 화면으로 이동하고 사용자 이름 전달
      // navigation.navigate('HomeMain', { username: response.data.username });
      navigation.navigate('MyPage');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response && error.response.data) {
          console.error('Server response:', error.response.data);
          setError(`서버 오류: ${JSON.stringify(error.response.data)}`);
        } else {
          setError('서버에 연결할 수 없습니다.');
        }
      } else {
        console.error('Non-Axios error:', error);
        setError('예기치 못한 오류가 발생했습니다.');
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