import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, NavigationProp } from '../../navigation/types'; 

type HomeScreenNavigationProp = NavigationProp<'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToDiary = () => navigation.navigate('Diary');
  
  const navigateToMission = (params: RootStackParamList['Mission']) => navigation.navigate('Mission', params); 
  
  const navigateToSelfTest = () => navigation.navigate('SelfTest');
  
  const navigateToFindCenter = () => navigation.navigate('FindCenter');

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={navigateToDiary}>
          <Text style={styles.cardText}>감정일기 쓰기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigateToMission({ missionStatus: 'select' })}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',      
    backgroundColor: '#FDFDED', 
    paddingBottom: 1,        
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
