import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploaderProps {
  imageUri: string;
  onUpload: (uri: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUri, onUpload }) => {
  const handleImageUpload = async () => {
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
      onUpload(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImageUpload}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <>
          <Text style={styles.plusSign}>+</Text>
          <Text style={styles.text}>사진을 추가하여 기록할 수 있어요</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 275,
    height: 275,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plusSign: {
    fontSize: 40,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ImageUploader;