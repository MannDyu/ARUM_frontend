import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProp } from '../../navigation/types';

export default function Auth() {

  const navigation = useNavigation<AuthScreenNavigationProp>();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>어루만짐</Text>
      <Text style={styles.subtitle}>우울증 예방 및 케어 서비스</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signupButtonText}>회원가입</Text>
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
    backgroundColor: '#FDFDED', // 배경색 변경
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#6487E5', // 로그인 버튼 색상 변경
    padding: 8,
    borderRadius: 25, // 버튼 모서리를 더 둥글게
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: 'transparent', // 배경색 투명
    padding: 8,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});