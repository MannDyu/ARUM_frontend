import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SignupScreenNavigationProp } from '../../navigation/types';
import { validateEmail, validatePassword } from '../../utils/authUtils'; // Remove storeToken if not used
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log('Sending signup request...');
      const signupResponse = await axios.post(
        `${API_URL}/users/register/`,
        {
          username,
          email,
          password,
          password2,
        },
        { timeout: 30000 }
      );

      console.log('Signup response:', signupResponse.status, signupResponse.data);

      if (signupResponse.status === 201) {
        console.log('Signup successful, attempting login...');
        try {
          const loginResponse = await axios.post(`${API_URL}/users/login/`, {
            username,
            password,
          });

          console.log('Login response:', loginResponse.status, loginResponse.data);

          if (loginResponse.status === 200) {
            const { token } = loginResponse.data;
            console.log('Login successful, token received:', token);
            
            try {
              await AsyncStorage.setItem('userToken', token);
              await AsyncStorage.setItem('username', username);

              const storedToken = await AsyncStorage.getItem('userToken');
              console.log('Stored token:', storedToken);

              if (storedToken !== token) {
                console.error('Token storage mismatch');
                throw new Error('Token storage failed');
              }

              console.log('Token stored successfully, navigating to HomeMain...');
              Alert.alert('회원가입 및 로그인 성공', '메인 화면으로 이동합니다.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });

              
            } catch (storageError) {
              console.error('Error storing token:', storageError);
              Alert.alert('오류', '토큰 저장 중 문제가 발생했습니다.');
            }
          } else {
            console.warn('Unexpected login response status:', loginResponse.status);
            Alert.alert('로그인 오류', '예기치 않은 응답을 받았습니다.');
          }
        } catch (loginError) {
          console.error('Login after signup error:', (loginError as AxiosError).response?.data || (loginError as Error).message);
          Alert.alert('회원가입 성공', '회원가입은 완료되었지만 자동 로그인에 실패했습니다. 로그인 화면으로 이동합니다.');
          navigation.navigate('Login');
        }
      } else {
        console.warn('Unexpected signup response status:', signupResponse.status);
        setError('회원가입 처리 중 오류가 발생했습니다.');
      }
    } catch (signupError) {
      console.error('Signup error:', (signupError as AxiosError).response?.data || (signupError as Error).message);
      if (axios.isAxiosError(signupError) && signupError.response) {
        const { data } = signupError.response;
        if (data && data.error) {
          setError(data.error);
        } else {
          setError('회원가입에 실패했습니다. 정보를 확인해주세요.');
        }
      } else {
        setError('서버에 연결할 수 없습니다.');
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
        <Text style={styles.buttonText}>가입하기</Text>
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