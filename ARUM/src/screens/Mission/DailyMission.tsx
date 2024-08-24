import styled from "styled-components/native";
import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MissionStackParamList } from '../../assets/MissionTypes';
import { API_URL } from '../../api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, RootStackScreenProps } from '../../navigation/types';

type DailyMissionRouteProp = RouteProp<MissionStackParamList, 'DailyMission'>;
type DailyMissionProps = {};
type IconContentType = 'none' | 'dy' | 'ex' | 'hb' | 'me' | 'cl';

const DailyMission: React.FC<DailyMissionProps> = () => {
  const navigation = useNavigation<RootStackScreenProps<'DailyMission'>['navigation']>();
  const route = useRoute<RouteProp<MissionStackParamList, 'DailyMission'>>();
  const { responseData } = route.params;

  //! 필요한 데이터 추출
  const questData = responseData.qs_content;
  const selectedArea = responseData.qs_theme;

  const [currentQuest, setCurrentQuest] = useState(questData);
  const [missionStatus, setMissionStatus] = useState<'select' | 'finish' | 'success'>('select'); // 상태로 관리

  useEffect(() => {
    handleMissionStatus(); // 컴포넌트가 처음 렌더링될 때 미션 상태를 가져옴
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token');
      return null;
    }
  };

  const handleMissionStatus = async () => {
    try {
      const userToken = await getToken();
      if (!userToken) {
        console.error(`Token not found`);
        return;
      }

      const response = await fetch(`${API_URL}/quest/checkQuestCreatePerformToday`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        }
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const responseData = await response.json();
      console.log(`response data: ${JSON.stringify(responseData.data)}`);

      const newMissionStatus = !responseData.quest_created_today ? "select" : responseData.qs_perform_yn ? "success" : "finish";
      console.log(`missionStatus: ${newMissionStatus}`);
      setMissionStatus(newMissionStatus); // 상태 업데이트
    } catch (error) {
      console.error('Error handleMissionStatus', error);
    }
  };

  const handleMissionNavigate = async () => {
    try {
      switch (missionStatus) {
        case 'select':
          setMissionStatus('finish');
          navigation.navigate('SelectSection');
          break;
        case 'finish':
          setMissionStatus('success');
          navigation.navigate('CompletedMissionRecord', { selectedArea, questData: currentQuest });
          break;
        case 'success':
          // 성공 상태일 때의 로직
          break;
        default:
          // 기타 처리
          break;
      }
    } catch (error) {
      console.error('Error navigating based on mission status', error);
    }
  };

  const date = new Date();
  const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

  const iconContent: Record<IconContentType, string> = {
    none: '?',
    dy: '📅',
    ex: '🏋️',
    hb: '🎨',
    me: '👤',
    cl: '🧹',
  };

  return (
    <>
      <Text style={{ margin: '3%', marginLeft: '7%' }}>미션은 매일 오전 6시에 초기화됩니다.</Text>
      <MissionContainer>
        <Text style={{ marginTop: -10, }}>{currentDate}</Text>
        <Text style={styles.missionText}>일일 랜덤미션</Text>
        <MissionSelectContainer>
          <Icon>
            <Text style={styles.missionText}>{iconContent[selectedArea as IconContentType] || '?'}</Text>
          </Icon>
          <View>
            {missionStatus === "finish" ?
              <Text style={[styles.missionText, { margin: 15 }]}>{questData?.qs_content}</Text> :
              <MissionTextContainer>
                <Text style={styles.missionText}>{`오늘은\n어떤 미션을 해볼까요?`}</Text>
              </MissionTextContainer>}
          </View>
          <Button
            title={
              missionStatus === 'select' 
              ? "미션 선택" 
              : missionStatus === 'finish' 
              ? "미션 완료" 
              : missionStatus === 'success' 
              ? "미션 성공" 
              : "완료됨"
            }
            buttonStyle={{ borderRadius: 10, borderWidth: 1, borderColor: 'black' }}
            containerStyle={{ width: 250 }}
            onPress={handleMissionNavigate}
            disabled={missionStatus === 'success'}
            titleStyle={{ fontSize: 22 }}
          />
        </MissionSelectContainer>
      </MissionContainer>
    </>
  );
};

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