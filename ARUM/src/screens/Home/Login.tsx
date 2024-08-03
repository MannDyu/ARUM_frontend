import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../navigation/types';
import { validateEmail } from '../../utils/authUtils';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage를 사용하여 토큰 저장



const API_URL = 'https://90b0-1-240-231-249.ngrok-free.app'

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
      const response = await axios.post(`${API_URL}/users/login/`, {
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
        // navigation.navigate('Home', { username });
        navigation.navigate('Home', { username: response.data.username });
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
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={styles.input}
        placeholder="사용자 이름"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
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
