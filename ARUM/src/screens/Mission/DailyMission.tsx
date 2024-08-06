import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { MissionStackParamList } from '../../assets/MissionTypes';
import { StackNavigationProp } from '@react-navigation/stack';

type DailyMissionProps = RootStackScreenProps<'DailyMission'>;

const DailyMission: React.FC<DailyMissionProps> = ({ route, navigation }) => {
  const { selectedArea, questData, missionStatus, onMissionComplete, onMissionSuccess } = route.params || {};
  
  type IconContentType = 'none' | 'dy' | 'ex' | 'hb' | 'me' | 'cl';
  
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}.${month}.${day}`;

  //! 다른 파일에서 가져와야할 변수값들
  const days = 1; // 며칠째 도전 중?
  const iconContent: Record<IconContentType, string> = {
    none: '?',
    dy: '📅',
    ex: '🏋️',
    hb: '🎨',
    me: '👤',
    cl: '🧹',
  }; // 선택된 영역: none, daily, exercise, hobby, me, tidy
  
  console.log('미션 버튼 상태', missionStatus)
  
  //! 네비게이션 지정!!
  const handleMissionNavigate = () => {
    console.log(missionStatus)
    if (missionStatus === 'select') {
      console.log('미션 선택 가능 상태');
      navigation.navigate('SelectSection');
    } else if (missionStatus === 'finish') {
      console.log('미션 완료 가능 상태');
      onMissionComplete?.();
    } else if (missionStatus === 'success') {
      console.log('미션 완료 상태');
      onMissionSuccess?.();
    }
  };

  return (
    <>
      <Text style={{ margin: '3%', marginLeft: '7%' }}>미션은 매일 오전 6시에 초기화됩니다.</Text>
      <MissionContainer>
        <Text style={{ marginTop: -10, }}>{currentDate}</Text>
        <Text style={styles.missionText}>{days}번째 일일 랜덤미션</Text>
        {/* 며칠째 랜덤미션 수행? 데이터 수신 */}
        <MissionSelectContainer>
          <Icon>
            <Text style={styles.missionText}>{iconContent[selectedArea as IconContentType] || '?'}</Text>
            </Icon>
          <View>
            { missionStatus === "finish" ? 
              //! 미션 텍스트 SelectSection에서 받아오기!!
              //! quest data 중 qs_content만 보여줘야됨
              <Text style={[styles.missionText, {margin: 15}]}>{questData}</Text> :
              <MissionTextContainer>
                <Text style={styles.missionText}>{`오늘은\n어떤 미션을 해볼까요?`}</Text>
              </MissionTextContainer> }
          </View>
          <Button
            title={missionStatus === 'select' ? "미션 선택" : missionStatus === 'finish' ? "미션 완료" : missionStatus === 'success' ? "미션 성공" : "완료됨"}
            buttonStyle={{borderRadius: 10, borderWidth: 1, borderColor: 'black' }}
            containerStyle={{width: 250}}
            onPress={handleMissionNavigate}
            disabled={missionStatus === 'completed'}
            titleStyle={{ fontSize: 22 }}
          />
        </MissionSelectContainer>
      </MissionContainer>
    </>
  )
}

import { RootStackScreenProps } from '../../navigation/types'; 

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