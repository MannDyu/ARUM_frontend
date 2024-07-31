// DiaryList.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import DateDrawer from './DateDrawer';
import DiaryItem from './DiaryItem';
import HashTag from './HashTag';

const DiaryList: React.FC = () => {
  const [isDateDrawerVisible, setIsDateDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ year: 2024, month: 7 });
  
  const handleDateSelect = (year: number, month: number) => {
    setSelectedDate({ year, month });
    setIsDateDrawerVisible(false);
  };

  // 임시 데이터
  const diaries = [
    {
      date: '15',
      dayOfWeek: '(월)',
      emoji: '화난 이모지',
      title: '2024.07.15 감정일기',
      tags: ['속상한', '괴로운', '슬픈']
    },
    {
      date: '8',
      dayOfWeek: '(월)',
      emoji: '웃는 이모지',
      title: '2024.07.08 감정일기',
      tags: ['행복한', '즐거운']
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {selectedDate.year}. {selectedDate.month.toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity onPress={() => setIsDateDrawerVisible(true)}>  
            <Icon name="calendar" size={24} color="black" style={{marginLeft:8}} />
          </TouchableOpacity>          
        </View>
      </View>

      <ScrollView style={styles.diaryList}>
        {diaries.length > 0 ? (
          diaries.map((diary, index) => (
            <DiaryItem 
              key={index} 
              {...diary} 
              // onPress={() => console.log('Diary item pressed')}
            />
          ))
        ) : (
          <Text style={styles.noDiaryText}>아직 작성하지 않았어요</Text>
        )}
      </ScrollView>

      <DateDrawer
        isVisible={isDateDrawerVisible}
        onClose={() => setIsDateDrawerVisible(false)}
        onDateSelect={handleDateSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  dateContainer: {
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  diaryList: {
    flex: 1,
  },
  noDiaryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#000000',
  },
});

export default DiaryList;