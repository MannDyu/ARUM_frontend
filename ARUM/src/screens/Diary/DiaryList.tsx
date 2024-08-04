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

  //! 임시 데이터 -> emotion이름으로 이모지 변경
  const diaries = [
    {
      date: '15',
      dayOfWeek: '(월)',
      emotion: '슬픔',
      title: '2024.07.15 감정일기',
      tags: ['의기소침한', '공포에 질린', '불만스러운']
    },
    {
      date: '8',
      dayOfWeek: '(월)',
      emotion: '즐거움',
      title: '2024.07.08 감정일기',
      tags: ['행복한', '즐거운']
    },
    {
      date: '20',
      dayOfWeek: '(화)',
      emotion: '화남',
      title: '2024.08.20 감정일기',
      tags: ['증오스러운', '경멸하는', '소름끼치는']
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
            <View key={index}>
              <DiaryItem {...diary} />
              {diaries.length > 2 && index < diaries.length - 1 && (
              <View style={styles.verticalLine}></View>
            )}
            </View>
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
  verticalLine: {
    borderLeftWidth: 1.2,
    borderLeftColor: 'black',
    position: 'absolute',
    top: 70,
    left: '6.5%',
    height: '40%',
    width: 0,
  },
});

export default DiaryList;