import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackScreenProps } from '../../navigation/types'; 
import MissionHeader from './MissionHeader';
import MissionContent from './MissionContent';
import ActionButton from './ActionButton';
import Popup from '../../components/Popup';
import { useMission } from '../../context/MissionContext';
import { currentDateTime } from '../../utils/currentDateTime';
import axios from 'axios';
import { API_URL } from '../../api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CompletedMissionRecordProps = RootStackScreenProps<'CompletedMissionRecord'>;

export default function CompletedMissionRecord({ navigation, route }: CompletedMissionRecordProps) {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [date, setDate] = useState(currentDateTime());
  const { addCompletedMission } = useMission();
  const [missionTitle, setMissionTitle] = useState('');

  useEffect(() => {
    if (route.params?.questData) {
      setMissionTitle(route.params.questData.qs_content);
    }
  }, [route.params?.questData]);

  
  const handleSubmit = () => {
    if (text.trim() === '') {
      Alert.alert('오류', '텍스트를 입력해주세요.');
      return;
    }
    setIsPopupVisible(true);
  };

  const handleConfirm = async () => {
    setIsPopupVisible(false);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('User token not found.');
      }
  
      const formData = new FormData();
      formData.append('qs_perform_content', text);
      if (imageUri) {
        formData.append('qs_perform_image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'mission_image.jpg',
        } as any);
      }
  
      const response = await axios.put(
        `${API_URL}/quest/questPerform`, 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Mission completion response:', response.data);
  
      // 미션 컨텍스트에 완료된 미션 추가
      const newMission = {
        title: missionTitle,
        imageUri: imageUri || null,
        text,
        date,
        tag: route.params?.selectedArea || '일상',
      };
      addCompletedMission(newMission);
  
      // 미션 페이지로 이동
      navigation.navigate('Mission');
  
    } catch (error) {
      console.error('Error completing mission:', error);
      Alert.alert('Error', 'Failed to complete the mission. Please try again.');
    }
  };
  


  const handleCancel = () => {
    setIsPopupVisible(false);
  };


  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <MissionHeader title="미션 완료" onBack={() => navigation.goBack()} />
      <MissionContent 
        title={missionTitle} 
        tag={route.params?.selectedArea || "일상"}
        imageUri={imageUri}
        onImageUpload={(uri) => setImageUri(uri)}
        text={text}
        date={date}
        onTextChange={(newText) => setText(newText)}
      />
      <ActionButton
        title="완료"
        onPress={handleSubmit}
        disabled={!text.trim()}
      />
      <Popup 
        isVisible={isPopupVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel} 
        title={route.params?.selectedArea || '일상'}
        description={'해당 미션 영역을 선택합니다. \n 이후에 미션은 수정할 수 없어요!'}
      />
    </KeyboardAwareScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FDFDED',
  },
});


