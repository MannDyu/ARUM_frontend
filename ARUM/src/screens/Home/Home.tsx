import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProp } from '../../navigation/types'; 

type HomeScreenNavigationProp = NavigationProp<'HomeMain'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToDiary = () => navigation.navigate('DiaryMain');
  
  const navigateToMission = (params: RootStackParamList['MissionMain']) => navigation.navigate('MissionMain', params); 
  
  const navigateToSelfTest = () => navigation.navigate('SelfTestMain');
  
  const navigateToFindCenter = () => navigation.navigate('FindCenter');

  return (
    <ImageBackground 
      source={require('../../assets/images/home/homemainCharacter.png')} 
      style={styles.backgroundImage}
      // resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.card} onPress={navigateToDiary}>
            <Image 
              source={require('../../assets/images/home/diaryHomebutton.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <Text style={styles.cardText}>감정일기 쓰기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => navigateToMission({ missionStatus: 'select' })}>
            <Image 
              source={require('../../assets/images/home/missionHomebutton.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <Text style={styles.cardText}>일일 랜덤미션</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigateToSelfTest}>
            <Image 
              source={require('../../assets/images/home/selftestHomebutton.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <Text style={styles.cardText}>우울증 자가테스트</Text>
            <View style={styles.redDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={navigateToFindCenter}>
            <Image 
              source={require('../../assets/images/home/findcenterHomebutton.png')} 
              style={styles.cardImage} 
              resizeMode="contain"
            />
            <Text style={styles.cardText}>가까운 상담센터</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
    backgroundColor: 'transparent',
          
  },
  grid: {
    width: 330,
    height: 30,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 9,
    position: 'relative',
    padding: 10,
  },
  cardImage: {
    width: 60,  // 이미지 너비를 설정
    height: 60,  // 이미지 높이를 설정
    marginBottom: 10,
  },
  cardText: {
    fontSize: 19,
    color: 'black',
    textAlign: 'center',
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


