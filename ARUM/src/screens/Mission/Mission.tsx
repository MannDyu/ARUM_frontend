import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import DailyMission from './DailyMission'; 
import CompletedMission from './CompletedMission';
import { RootStackScreenProps, NavigationProp } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../api_url';

type MissionProps = RootStackScreenProps<'MissionMain'>;

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token');
    return null;
  }
};

export default function Mission({ route, navigation, questData }: MissionProps) {
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
    console.log(JSON.stringify(questData));
    navigation.navigate('CompletedMissionRecord', { questData: questData });
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
    } else if (missionStatus === 'finish' || missionStatus === 'completed') {
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
      {/* //! quest Data 추가했는데, 어떻게 작동하는지 모르겠음 */}
      {selectedButton === 'left' ? 
        <>
          <DailyMission
            navigation={navigation as NavigationProp<'DailyMission'>}
            route={{
              params: {
                selectedArea,
                missionStatus,
                onMissionComplete: handleMissionComplete,
                onMissionSuccess: handleMissionSuccess,
                questData: {}, //! 이거 뭐지?
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
    bottom: -100,
  },
});
