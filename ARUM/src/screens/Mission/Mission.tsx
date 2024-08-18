import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import DailyMission from './DailyMission'; 
import CompletedMission from './CompletedMission';
import { RootStackScreenProps, NavigationProp } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../api_url';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { MissionStackParamList } from '../../assets/MissionTypes';

type MissionScreenNavigationProp = StackNavigationProp<MissionStackParamList, 'Mission'>;

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

export default function Mission({ route, navigation}: MissionProps) {
  const [selectedButton, setSelectedButton] = useState<'left' | 'right'>('left');
  const [missionStatus, setMissionStatus] = useState<'select' | 'finish' | 'completed' | 'success'>('select');
  const [selectedArea, setSelectedArea] = useState<string | undefined>(undefined);
  const [completedMissionId, setCompletedMissionId] = useState<string | undefined>(undefined);
  const [questData, setQuestData] = useState<any>(null);
  const [isQuestCreated, setIsQuestCreated] = useState(false);
  const [isQuestPerformed, setIsQuestPerformed] = useState(false);
  
  useEffect(() => {
    checkQuestStatus();
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


  const checkQuestStatus = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/quest/checkQuestCreatePerformToday`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });
      setIsQuestCreated(response.data.quest_created_today);
      setIsQuestPerformed(response.data.qs_perform_yn);
      if (response.data.quest_created_today && !response.data.qs_perform_yn) {
        fetchQuestData();
      }
    } catch (error) {
      console.error('Error checking quest status:', error);
    }
  };

  const fetchQuestData = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/quest/specificQuestInfo`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestData(response.data[0]); // Assuming the API returns an array with one item
    } catch (error) {
      console.error('Error fetching quest data:', error);
    }
  };

  const handleToggle = (button: 'left' | 'right') => {
    setSelectedButton(button);
  };

  const handleMissionComplete = async () => {
    try {
      const token = await getToken();
      await axios.put(`${API_URL}/quest/questPerform`, {
        qs_perform_content: '수행완료', // You might want to pass this from DailyMission component
        // qs_perform_image: imageFile, // If you have an image to upload
      }, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });
      setIsQuestPerformed(true);
      navigation.navigate('CompletedMissionRecord', { selectedArea });
    } catch (error) {
      console.error('Error completing mission:', error);
      Alert.alert('Error', 'Failed to complete mission. Please try again.');
    }
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
      {selectedButton === 'left' ? 
        <>
          <DailyMission />
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
