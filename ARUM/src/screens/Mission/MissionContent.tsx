import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface MissionContentProps {
  title: string;
  tag?: string;
  imageUri?: string | null;
  text: string;
  date: string;
  onImageUpload?: (uri: string) => void;
  onTextChange?: (text: string) => void;
  editable?: boolean; // 추가: 텍스트 필드 수정 가능 여부를 제어
}

const MissionContent: React.FC<MissionContentProps> = ({
  title,
  tag,
  imageUri,
  text,
  date, 
  onImageUpload,
  onTextChange,
  editable = true, // 기본값은 true
}) => {
  const textInputRef = useRef<TextInput>(null);

  const focusTextInput = () => {
    if (editable) {
      textInputRef.current?.focus();
    }
  };
  const handleImageUpload = async () => {
    if (!onImageUpload) return;

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onImageUpload(result.assets[0].uri);
    }
  };


  return (
    <View style={styles.container}>
      {tag && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      
      {onImageUpload ? (
        <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
          ) : (
            <>
              <Text style={styles.plusSign}>+</Text>
              <Text style={styles.imageUploadText}>사진을 추가하여 기록할 수 있어요</Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.imageUploadContainer} >
          {imageUri && <Image source={{ uri: imageUri }} style={styles.uploadedImage} />}
        </TouchableOpacity>
      )}

      {editable && onTextChange ? (
        <TouchableOpacity style={styles.textInputWrapper} onPress={focusTextInput}>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            multiline
            placeholder="어떻게 미션을 완료했는지 간단하게 기록해보세요.."
            placeholderTextColor="#AFAFAF"
            value={text}
            onChangeText={onTextChange}
            editable={editable} // 텍스트 필드 수정 가능 여부
          />
        </TouchableOpacity>
      ) : (
        <Text style={styles.textDisplay}>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 20,
    marginTop: 40,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  tagContainer: {
    position: 'absolute',
    top: -29,
    backgroundColor: '#FFFFFF',
    borderRadius: 29,
    borderWidth: 1,
    borderColor: '#000000',
    width: 58,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  imageUploadContainer: {
    width: 275,
    height: 275, // 이미지의 최대 높이를 제한
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // 이미지가 컨테이너를 넘지 않도록 설정
  },
  detailimageContainer: {
    width: 275,
    height: 275, // 이미지의 최대 높이를 제한
    borderWidth: 1,
    // borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // 이미지가 컨테이너를 넘지 않도록 설정
  },
  uploadedImage: {
    // width: 275,
    // height: 275,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plusSign: {
    fontSize: 40,
  },
  imageUploadText: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  textInputWrapper: {
    width: '100%',
    marginTop: 20,
  },
  textInput: {
    height: 100,
    borderTopWidth: 1,
    borderColor: '#000000',
    paddingTop: 10,
    fontSize: 17,
    textAlignVertical: 'top',
  },
  textDisplay: {
    fontSize: 17,
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});

export default MissionContent;