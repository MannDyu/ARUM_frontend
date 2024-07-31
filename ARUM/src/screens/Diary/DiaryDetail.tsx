// DiaryDetail.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DiaryDetail: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정일기 상세</Text>
      <Text style={styles.entry}>일기내용 요약</Text>
      <Button title="돌아가기" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entry: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default DiaryDetail;
