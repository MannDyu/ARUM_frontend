import { Button, StyleSheet, Text, TextInput, View, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { TextInput as RNTextInput } from 'react-native';
import React, { useRef, useState } from 'react'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'
import *  as ImagePicker from 'expo-image-picker'; 
import { useNavigation } from '@react-navigation/native';
import { useMission } from '../../context/MissionContext';
import CompletedMissionDetail from './CompletedMissionDetail';
import { StackNavigationProp } from '@react-navigation/stack';
import { MissionStackParamList } from '../../assets/types';

type RootStackParamList = {
  CompletedMissionDetail: { missionId: string };
  // 다른 화면들도 여기에 추가
};
type NavigationProp = StackNavigationProp<MissionStackParamList, 'CompletedMissionRecord'>;

// export default function CompletedMissionRecord() {
  export default function CompletedMissionRecord({ navigation }: { navigation: NavigationProp }) {
  const [text, setText] = useState("")
  const [imageUri, setImageUri] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const textInputRef = useRef<TextInput>(null)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const navigation = useNavigation();
  // const navigation = useNavigation<NavigationProp>();
  const { addCompletedMission } = useMission();

  
  // Text Field 관련
  const handleTextChange = (newText : string )=> {
    setText(newText);
  }
  const focusTextInput = () => {
    textInputRef.current?.focus()
  }
  const keyboardAwareScrollViewProps: KeyboardAwareScrollViewProps = {
    contentContainerStyle: styles.container,
    extraScrollHeight: 20,
    enableOnAndroid: true,
    keyboardShouldPersistTaps: "handled"
  }

  // Image Upload 관련
  const mockUpload = (uri: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // 90% 확률로 성공, 10% 확률로 실패
        if (Math.random() < 0.9) {
          console.log('Image uploaded (mock):', uri);
          resolve();
        } else {
          reject(new Error('Mock upload failed'));
        }
      }, 2000); // 2초 후 업로드 완료 또는 실패로 가정
    });
  };
  const handleImageUpload = async () => {
    // 라이브러리에 접근하기 위한 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      // 권한 확인 코드 : 권한 없으면 물어보고, 승인하지 않으면 함수 종류
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      // 이미지 업로드 기능 
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        setIsUploading(true);
        try {
          await mockUpload(result.assets[0].uri);
          alert('Upload successful!');
        } catch (error) {
          console.error('Upload failed:', error);
          alert('Upload failed. Please try again.');
        } finally {
          setIsUploading(false);
        }
      }
  }

  const handleSubmit = () => {
    if (text.trim() === '' || !imageUri) {
      Alert.alert('오류', '텍스트와 이미지를 모두 입력해주세요.');
      return;
    }
    const newMission = {
      id: Date.now().toString(), // 임시 ID
      title: '오늘의 미션 타이틀', // 실제 타이틀로 교체 필요
      imageUri,
      text,
    };
    addCompletedMission(newMission);
    navigation.navigate('CompletedMissionDetail', { missionId: newMission.id });
  };


  return (

    <KeyboardAwareScrollView {...keyboardAwareScrollViewProps}>
      <View style={styles.content}>
        <Text style={styles.title}>오늘의 미션 타이틀 ex. 균형있는 식사 한 끼 하기</Text>
        
        <Button title='이미지 업로드' onPress={handleImageUpload} disabled={isUploading} />
        {isUploading && <ActivityIndicator size="large" color="#0000ff" />}
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
        
        <TouchableOpacity onPress={focusTextInput} style={styles.textInputWrapper}>
          <RNTextInput
            ref={textInputRef}
            style={styles.textInput}
            multiline
            numberOfLines={10}
            onChangeText={handleTextChange}
            value={text}
            placeholder="미션 완료 기록을 입력하세요..."

          />
        </TouchableOpacity>

        <Button title="제출" onPress={handleSubmit} disabled={isUploading} />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   alignItems: 'center',
  // },
  container: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  textInputWrapper: {
    width: '100%',
    marginTop: 20,
  },
  textInput: {
    width: '100%',
    height: 300,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});



