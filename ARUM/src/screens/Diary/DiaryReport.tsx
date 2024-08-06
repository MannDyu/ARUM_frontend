// import React from 'react';
// import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
// import EmotionCalendar from './EmotionCalendar';
// import EmotionStats from './EmotionStats';

// const DiaryReport = () => {
//   const hasDiary = true; // 감정일기가 있다고 가정

//   const datesWithEmotions = [
//     { date: '2024-08-01', emoji: '아주 나빠요' },
//     { date: '2024-08-02', emoji: '나빠요' },
//     { date: '2024-08-03', emoji: '괜찮아요' },
//     { date: '2024-08-04', emoji: '좋아요' },
//     { date: '2024-08-05', emoji: '아주 좋아요' },
//     { date: '2024-08-06', emoji: '아주 좋아요' },
//     { date: '2024-08-27', emoji: '아주 좋아요' },
//     { date: '2024-08-28', emoji: '아주 좋아요' },
//     { date: '2024-08-29', emoji: '아주 좋아요' },
//     { date: '2024-08-30', emoji: '아주 좋아요' },
//     { date: '2024-08-31', emoji: '아주 좋아요' },
//   ];

//   const emotionStats = [
//     { emoji: '아주 나빠요', count: 1 },
//     { emoji: '나빠요', count: 1 },
//     { emoji: '괜찮아요', count: 1 },
//     { emoji: '좋아요', count: 1 },
//     { emoji: '아주 좋아요', count: 2 },
//   ];

//   if (!hasDiary) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDiaryText}>감정일기를 작성하면 리포트를 볼 수 있어요.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <EmotionCalendar datesWithEmotions={datesWithEmotions} />
//         <EmotionStats emotionData={emotionStats} />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#FDFDED',
//     paddingTop: 10,
//   },
//   noDiaryText: {
//     fontSize: 18,
//     color: 'black',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default DiaryReport;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmotionCalendar from './EmotionCalendar';
import EmotionStats from './EmotionStats';
import { API_URL } from '../../api_url';

const DiaryReport = () => {
  const [datesWithEmotions, setDatesWithEmotions] = useState([]);
  const [emotionStats, setEmotionStats] = useState([]);

  const fetchMonthlyDiary = async (month: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_URL}/diary/feel/calendar/?month=${month}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // 날짜와 이모지 정보를 담은 배열로 변환
      const datesWithEmotions = data.map((item: any) => ({
        date: item.created_at.split('T')[0],
        emoji: item.feel,
      }));

      // 이모지 통계 계산
      const emotionsCount = data.reduce((acc: Record<string, number>, item: any) => {
        acc[item.feel] = (acc[item.feel] || 0) + 1;
        return acc;
      }, {});

      const emotionStats = Object.keys(emotionsCount).map(key => ({
        emoji: key,
        count: emotionsCount[key],
      }));

      setDatesWithEmotions(datesWithEmotions);
      setEmotionStats(emotionStats);
    } catch (error) {
      console.error('Error fetching monthly diary data:', error);
    }
  };

  useEffect(() => {
    fetchMonthlyDiary('2024-08'); // 초기 로드 시 8월 데이터를 가져옵니다.
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <EmotionCalendar datesWithEmotions={datesWithEmotions} />
        <EmotionStats emotionData={emotionStats} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FDFDED',
    paddingTop: 10,
  },
  noDiaryText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiaryReport;
