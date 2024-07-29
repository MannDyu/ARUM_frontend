// src/screens/Diary/Diary.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Diary = () => {
  const navigation = useNavigation();

  const navigateToRecordDiary = () => {
    navigation.navigate('RecordDiary');
  };

  return (
    <View style={styles.container}>
      <Text>Diary Screen</Text>
      <Button title="Record Diary" onPress={navigateToRecordDiary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Diary;
