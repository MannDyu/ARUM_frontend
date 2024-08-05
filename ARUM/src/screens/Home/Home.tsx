import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, NavigationProp } from '../../navigation/types'; 
import { API_URL, API_HOST } from '../../ngrok_url';  // ngrok_url 파일에서 변수 가져오기
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


type HomeScreenNavigationProp = NavigationProp<'HomeMain'>;


type TabParamList = {
  "홈": undefined;
  "감정일기": undefined;
  "랜덤미션": undefined;
  "자가테스트": undefined;
  "마이페이지": undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const navigateToDiary = () => navigation.navigate('DiaryMain');
  
  const navigateToMission = (params: RootStackParamList['MissionMain']) => navigation.navigate('MissionMain', params); 
  
  const navigateToSelfTest = () => navigation.navigate('SelfTestMain');
  
  const navigateToFindCenter = () => navigation.navigate('FindCenter');
  const [username, setUsername] = useState<string>('Guest');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  



  // 일단 주석처리
  // useEffect(() => {
  //   console.log('Route params:', route.params);
  //   if (route.params?.username) {
  //     console.log('Updating username to:', route.params.username);
  //     setUsername(route.params.username);
  //   }
  // }, [route.params?.username]);


  // function handleNavigation(
  //   screen: keyof RootStackParamList,
  //   params?: RootStackParamList[keyof RootStackParamList]
  // ): void {
  //   if (params !== undefined) {
  //     navigation.navigate(screen as any, params);
  //   } else {
  //     navigation.navigate(screen);
  //   }
  // }

  // 로그아웃
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
      <View style={styles.grid}>
        {/* <Text style={styles.title}>Welcome, {username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.card}  onPress={navigateToDiary}>
          <Text style={styles.cardText}>감정일기 쓰기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}  onPress={() => navigateToMission({ missionStatus: 'select' })}>
          <Text style={styles.cardText}>일일 랜덤미션</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={navigateToSelfTest}>
          <Text style={styles.cardText}>우울증 자가테스트</Text>
          <View style={styles.redDot} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={navigateToFindCenter}>
          <Text style={styles.cardText}>가까운 상담센터</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // 화면 중앙에 컨텐츠 배치
    // alignItems: 'center',       // 화면 중앙에 컨텐츠 배치
    backgroundColor: '#FDFDED', // 배경색상
    paddingBottom: 1,         // 하단 바와의 여백
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
  grid: {
    width: 330,
    height: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '49%',
    height: 165,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 9,
    paddingBottom: 15,
    position: 'relative',
  },
  cardText: {
    fontSize: 19,
    color: 'black',
  },
  redDot: {
    width: 10,
    height: 10,
    backgroundColor: '#E86273',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default HomeScreen;