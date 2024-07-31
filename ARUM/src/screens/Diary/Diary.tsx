import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ToggleButton from '../../components/ToggleButton';
import DiaryList from './DiaryList';
import DiaryReport from './DiaryReport';
import RecordDiary from './RecordDiary';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';

// type DiaryProps = StackScreenProps<RootStackParamList, 'Diary'>;
type DiaryProps = StackScreenProps<RootStackParamList, 'Diary'>;
type RecordDiaryNavigationProp = StackNavigationProp<RootStackParamList, 'RecordDiary'>;


const Diary: React.FC<DiaryProps> = ({ navigation, route }) => {
  const [selectedButton, setSelectedButton] = useState<'left' | 'right'>('left');
  const [diaryButtonState, setDiaryButtonState] = useState('작성하기'); // 나중에 백엔드에서 받아올 상태
  const [showRecordDiary, setShowRecordDiary] = useState(false);


  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const currentDay = currentDate.getDate().toString().padStart(2, '0');
  const daysInKorean = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
  const dayOfWeek = daysInKorean[currentDate.getDay()];

  

  const handleToggle = (button: 'left' | 'right') => {
    setSelectedButton(button);
  };

  const handleDiaryButton = () => {
    if (diaryButtonState === '작성하기') {
      setShowRecordDiary(true);
    }
  };
  if (showRecordDiary) {
    return <RecordDiary />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.dateText}>{`${currentYear}.${currentMonth}.${currentDay} ${dayOfWeek}`}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>오늘의 감정일기</Text>
          <TouchableOpacity 
            style={[
              styles.diaryButton, 
              diaryButtonState === '작성 완료' && styles.disabledButton
            ]}
            onPress={handleDiaryButton}
            disabled={diaryButtonState === '작성 완료'}
          >
            <Text style={styles.diaryButtonText}>{diaryButtonState}</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ToggleButton
        leftButton="감정일기"
        rightButton="감정 리포트"
        selectedButton={selectedButton}
        onToggle={handleToggle}
      />
      {selectedButton === 'left' ? <DiaryList /> : <DiaryReport />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  header: {
    width: '100%',
    height: 162,
    backgroundColor: '#6487E5',
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingBottom: 20,
    marginBottom: 10,
  },
  dateText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '600',
  },
  diaryButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    height: 42,
    width: 109,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  diaryButtonText: {
    color: '#6487E5',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 22,
  },
});

export default Diary;