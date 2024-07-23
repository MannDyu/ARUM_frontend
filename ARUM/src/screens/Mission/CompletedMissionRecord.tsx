import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MissionHeader from './MissionHeader';
import MissionContent from './MissionContent';
import ActionButton from './ActionButton';
import Popup from '../../components/Popup';
import { CompletedMissionRecordProps } from '../../assets/types';
import { useMission } from '../../context/MissionContext';
import { currentDateTime } from '../../utils/currentDateTime' ;

export default function CompletedMissionRecord({ navigation, route }: CompletedMissionRecordProps) {
  const [text, setText] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [date, setDate] = useState(currentDateTime());
  const { addCompletedMission } = useMission();

  const handleSubmit = () => {
    if (text.trim() === '') {
      Alert.alert('오류', '텍스트를 입력해주세요.');
      return;
    }
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    const newMission = {
      title: '균형있는 식사 한 끼 하기',
      imageUri: imageUri || null,
      text,
      date,
      tag: route.params?.selectedArea || '일상',
    };
    const newMissionId = addCompletedMission(newMission);
    navigation.navigate('Mission', { completedMissionId: newMissionId, missionStatus: 'success' });
  };
  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <MissionHeader title="미션 완료" onBack={() => navigation.goBack()} />
      <MissionContent 
        title="균형있는 식사 한 끼 하기" 
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


