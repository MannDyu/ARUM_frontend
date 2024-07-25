import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Keyboard, TouchableOpacity, Text} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompletedMission, MissionStackParamList } from '../../assets/MissionTypes';
import { useMission } from '../../context/MissionContext';
import MissionHeader from './MissionHeader';
import ImageUploader from './ImageUploader';
import MissionTextInput from './MissionTextInput';
import ActionButton from './ActionButton';
import Popup from '../../components/Popup';

type EditCompletedMissionRouteProp = RouteProp<MissionStackParamList, 'EditCompletedMission'>;
type EditCompletedMissionNavigationProp = StackNavigationProp<MissionStackParamList, 'EditCompletedMission'>;

interface EditCompletedMissionProps {
  route: EditCompletedMissionRouteProp;
  navigation: EditCompletedMissionNavigationProp;
}

const EditCompletedMission: React.FC<EditCompletedMissionProps> = ({ route, navigation }) => {
  const { missionId } = route.params;
  const { completedMissions, updateCompletedMission } = useMission();
  const [mission, setMission] = useState<CompletedMission | null>(null);
  const [text, setText] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    const foundMission = completedMissions.find(m => m.id === missionId);
    if (foundMission) {
      setMission(foundMission);
      setText(foundMission.text);
      setImageUri(foundMission.imageUri || '');
    }
  }, [completedMissions, missionId]);

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  
  const handleImageUpload = (uri: string) => {
    setImageUri(uri);
  };

  const handleSubmit = () => {
    if (text.trim() === '') {
      Alert.alert('오류', '텍스트를 입력해주세요.');
      return;
    }
    setIsPopupVisible(true);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    if (mission) {
      const updatedMission = {
        ...mission,
        imageUri,
        text,
      };
      updateCompletedMission(updatedMission);
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleComplete = () => {
    Keyboard.dismiss();
    handleSubmit();
  };

  const CompleteButton = () => (
    <TouchableOpacity onPress={handleComplete}>
      <Text style={styles.completeButtonText}>완료</Text>
    </TouchableOpacity>
  );

  if (!mission) {
    return (
      <View style={styles.container}>
        <MissionHeader title="미션 수정" onBack={() => navigation.goBack()} />
        <View style={styles.content}>
          <MissionTextInput value="미션을 찾을 수 없습니다." onChangeText={() => {}} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MissionHeader 
        title="미션 수정" 
        onBack={() => navigation.goBack()} 
        rightButton={<CompleteButton />} 
      />
      <View style={styles.content}>
        <ImageUploader imageUri={imageUri} onUpload={handleImageUpload} />
        <MissionTextInput value={text} onChangeText={handleTextChange} />
      </View>
      <Popup
        isVisible={isPopupVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={'미션 수정'}
        description={'미션을 수정하시겠습니까? \n 이후에는 다시 수정할 수 없습니다.'}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default EditCompletedMission;