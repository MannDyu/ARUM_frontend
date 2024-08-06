import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MissionStackParamList } from '../../assets/MissionTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '../../api_url';

type DailyMissionRouteProp = RouteProp<MissionStackParamList, 'DailyMission'>;
type DailyMissionProps = {
  route: DailyMissionRouteProp;
  navigation: StackNavigationProp<MissionStackParamList, 'DailyMission'>;
};


const DailyMission: React.FC<DailyMissionProps> = ({ route, navigation }) => {
  const { selectedArea, questData, missionStatus, onMissionComplete, onMissionSuccess } = route.params;
  const [currentQuest, setCurrentQuest] = useState(questData);
  
  type IconContentType = 'none' | 'dy' | 'ex' | 'hb' | 'me' | 'cl';

  useEffect(() => {
    if (missionStatus === 'select') {
      fetchRandomQuest();
    }
  }, [missionStatus]);


  const fetchRandomQuest = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log('Current token:', token);
      if (!token) {
        throw new Error('User token not found.');
      }
      const response = await axios.post(`${API_URL}/quest/questPerform`,
        { qs_theme: selectedArea },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentQuest(response.data);
    } catch (error) {
      console.error('Error fetching random quest:', error);
      Alert.alert('Error', 'Failed to fetch a random quest. Please try again.');
    }
  };


  // const handleMissionComplete = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (!token) {
  //       throw new Error('User token not found.');
  //     }
  //     const response = await axios.post(`${API_URL}/quest/questPerform`,
  //       { qs_perform_yn: true },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log('Mission complete response:', response.data);
  //     onMissionComplete();
  //     // CompletedMissionRecord로 네비게이션
  //     navigation.navigate('CompletedMissionRecord', { 
  //       selectedArea, 
  //       questData: currentQuest 
  //     });
  //   } catch (error) {
  //     console.error('Error completing mission:', error);
  //     Alert.alert('Error', 'Failed to complete the mission. Please try again.');
  //   }
  // };

  const handleMissionNavigate = () => {
    if (missionStatus === 'select') {
      navigation.navigate('SelectSection');
    } else if (missionStatus === 'finish') {
      // handleMissionComplete();
      navigation.navigate('CompletedMissionRecord', { 
        selectedArea, 
        questData: currentQuest 
      });
    } else if (missionStatus === 'success') {
      onMissionSuccess();
    }
  };
  
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}.${month}.${day}`;

  const iconContent: Record<IconContentType, string> = {
    none: '?',
    dy: '📅',
    ex: '🏋️',
    hb: '🎨',
    me: '👤',
    cl: '🧹',
  }; // 선택된 영역: none, daily, exercise, hobby, me, tidy
  
  console.log('미션 버튼 상태', missionStatus)
  
  

  return (
    <>
      <Text style={{ margin: '3%', marginLeft: '7%' }}>미션은 매일 오전 6시에 초기화됩니다.</Text>
      <MissionContainer>
        <Text style={{ marginTop: -10, }}>{currentDate}</Text>
        <Text style={styles.missionText}>일일 랜덤미션</Text>
        {/* 며칠째 랜덤미션 수행? 데이터 수신 */}
        <MissionSelectContainer>
          <Icon>
            <Text style={styles.missionText}>{iconContent[selectedArea as IconContentType] || '?'}</Text>
          </Icon>
          <View>
            {missionStatus === "finish" ?
              //! 미션 텍스트 SelectSection에서 받아오기!!
              //! quest data 중 qs_content만 보여줘야됨
              <Text style={[styles.missionText, { margin: 15 }]}>{questData?.qs_content}</Text> :
              <MissionTextContainer>
                <Text style={styles.missionText}>{`오늘은\n어떤 미션을 해볼까요?`}</Text>
              </MissionTextContainer>}
          </View>
          <Button
            title={missionStatus === 'select' ? "미션 선택" : missionStatus === 'finish' ? "미션 완료" : missionStatus === 'success' ? "미션 성공" : "완료됨"}
            buttonStyle={{ borderRadius: 10, borderWidth: 1, borderColor: 'black' }}
            containerStyle={{ width: 250 }}
            onPress={handleMissionNavigate}
            disabled={missionStatus === 'completed'}
            titleStyle={{ fontSize: 22 }}
          />
        </MissionSelectContainer>
      </MissionContainer>
    </>
  )
}


import { RootStackParamList, RootStackScreenProps } from '../../navigation/types'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MissionContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 15px;
  margin-top: 0px;
`;

const MissionSelectContainer = styled.View`
  border: 1px solid black;
  width: 100%;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 7%;
  position: relative;
  background-color: #fff;
  box-shadow: 0 3px 1px black;
`;

const Icon = styled.View`
  border: 1px solid black;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -25px;
  background-color: #fff;
`;

const MissionTextContainer = styled.View`
  margin: 3%;
`;

const styles = StyleSheet.create({
  missionText: {
    fontSize: 20,
    textAlign: 'center',
    padding: 3,
    margin: 10,
  },
})

export default DailyMission;

function fetchRandomQuest() {
  throw new Error('Function not implemented.');
}
