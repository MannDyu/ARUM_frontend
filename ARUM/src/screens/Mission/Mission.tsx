import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import DailyMission from './DailyMission'; 
import CompletedMission from './CompletedMission';
import { RootStackScreenProps, NavigationProp } from '../../navigation/types';

type MissionProps = RootStackScreenProps<'MissionMain'>;

export default function Mission({ route, navigation }: MissionProps) {
  const [selectedButton, setSelectedButton] = useState<'left' | 'right'>('left');
  const [missionStatus, setMissionStatus] = useState<'select' | 'finish' | 'completed' | 'success'>('select');
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined);
  const [completedMissionId, setCompletedMissionId] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    if (route.params?.selectedArea) {
      setSelectedArea(route.params.selectedArea);
      setMissionStatus('finish');
    }
    if (route.params?.completedMissionId) {
      setCompletedMissionId(route.params.completedMissionId);
      setMissionStatus('success');
    }
    if (route.params?.missionStatus) {
      setMissionStatus(route.params.missionStatus);
    }
  }, [route.params]);

  const handleToggle = (button: 'left' | 'right') => {
    setSelectedButton(button);
  };

  const handleMissionComplete = () => {
    navigation.navigate('CompletedMissionRecord', { selectedArea });
  };

  const handleMissionSuccess = () => {
    if (completedMissionId) {
      navigation.navigate('CompletedMissionDetail', { missionId: completedMissionId });
    }
  };

  const renderCharacterImage = () => {
    if (missionStatus === 'success') {
      return (
        <Image
          source={require('../../assets/images/mission/missionCompleteCharacter.png')}
          style={styles.characterImage}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Image
          source={require('../../assets/images/mission/missionCharacter.png')}
          style={styles.characterImage}
          resizeMode="cover"
        />
      );
    }
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
      {selectedButton === 'left' ? 
        <>
          <DailyMission
            navigation={navigation as NavigationProp<'DailyMission'>}
            route={{
              params: {
                selectedArea,
                missionStatus,
                onMissionComplete: handleMissionComplete,
                onMissionSuccess: handleMissionSuccess
              },
              key: '',
              name: 'DailyMission'
            }}
          />
          {renderCharacterImage()}
        </> : 
        <CompletedMission />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FDFDED',
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
  characterImage: {
    width: '100%',
    height: 250,  
    position: 'absolute',
    bottom: -70,
  },
});
