import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MissionContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  margin: 15px;
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
  margin: 10%;
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

const MissionText = styled.Text`
  font-size: 20px;
  text-align: center;
  padding: 3px;
`;

const MissionTextContainer = styled.View`
  margin: 10%;
`;

const DailyMission = () => {
  const [selected, setSelected] = useState<'none' | 'daily' | 'exercise' | 'hobby' | 'me' | 'tidy'>('none');
  const [missionStatus, setMissionStatus] = useState<'select' | 'finish' | 'completed'>('select');
  const navigation = useNavigation();

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDate = `${year}.${month}.${day}`;

  //! 다른 파일에서 가져와야할 변수값들
  const days = 1; // 며칠째 도전 중?
  const missionSelected = false; // 미션이 선택되었는지
  const iconContent = {
    none: '?',
    daily: '📅',
    exercise: '🏋️',
    hobby: '🎨',
    me: '👤',
    tidy: '🧹',
  }; // 선택된 영역: none, daily, exercise, hobby, me, tidy

  const handleMissionNavigate = () => {
    if (missionStatus === 'select') {
      navigation.navigate('SelectSection');
    } else if (missionStatus === 'finish') {
      navigation.navigate('CompleteMissionRecord');
    }
  };

  return (
    <MissionContainer>
      <Text>{currentDate}</Text>
      <MissionText>{days}번째 일일 랜덤미션</MissionText>
      <MissionSelectContainer>
        <Icon>
          <MissionText>{iconContent[selected]}</MissionText>
        </Icon>
        <View>
          { missionSelected ? 
            <MissionText>임시 미션 텍스트</MissionText> :
            <MissionTextContainer>
              <MissionText>오늘은</MissionText>
              <MissionText>어떤 미션을 해볼까요?</MissionText>
            </MissionTextContainer> }
        </View>
        <Button
          title={missionStatus === 'select' ? "미션 선택" : missionStatus === 'finish' ? "미션 완료" : "미션 성공"}
          buttonStyle={{borderRadius: 10, borderWidth: 1, borderColor: 'black' }}
          containerStyle={{width: 250}}
          onPress={handleMissionNavigate}
          disabled={missionStatus === 'completed'}
          titleStyle={{ fontSize: 22 }}
        />
      </MissionSelectContainer>
    </MissionContainer>
  )
}

export default DailyMission;