import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import ToggleButton from '../../components/ToggleButton';
import DailyMission from './DailyMission';
import CompletedMission from './CompletedMission';



type MissionProps = {
  navigation: NavigationProp<any, any>;
}

export default function Mission() {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [selectedButton, setSelectedButton] = useState<'left' | 'right'>('left'); // 토글 버튼 관리
  const handleToggle = (button: 'left' | 'right') => {
    setSelectedButton(button);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>일일미션</Text>
      <ToggleButton
        leftButton="오늘의 미션"
        rightButton="완료한 미션"
        selectedButton={selectedButton}
        onToggle={handleToggle}
      />
      {selectedButton === 'left' ? <DailyMission /> : <CompletedMission />}

      <Button title='미션 인증 완료' onPress={() => navigation.navigate('CompletedMissionRecord')}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  missionTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});