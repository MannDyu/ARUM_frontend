// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import EmotionCalendar from './EmotionCalendar';
// import EmotionStats from './EmotionStats';

// interface DiaryReportProps {
//   hasDiary: boolean;
//   datesWithEmotions: { date: string, emoji: string }[];
//   emotionStats: { emoji: string, percent: number }[];
// }

// const DiaryReport: React.FC<DiaryReportProps> = ({ hasDiary, datesWithEmotions, emotionStats }) => {
//   if (!hasDiary) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noDiaryText}>감정일기를 작성하면 리포트를 볼 수 있어요.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <EmotionCalendar datesWithEmotions={datesWithEmotions} />
//       <EmotionStats emotionData={emotionStats} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FDFDED',
//   },
//   noDiaryText: {
//     fontSize: 18,
//     color: 'black',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default DiaryReport;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EmotionCalendar from './EmotionCalendar';
import EmotionStats from './EmotionStats';

const DiaryReport = () => {
  const hasDiary = true; // 감정일기가 있다고 가정

  const datesWithEmotions = [
    { date: '2024-08-01', emoji: '😭' },
    { date: '2024-08-02', emoji: '😩' },
    { date: '2024-08-03', emoji: '😕' },
    { date: '2024-08-04', emoji: '😚' },
    { date: '2024-08-05', emoji: '😆' },
    { date: '2024-08-06', emoji: '😆' },
  ];

  const emotionStats = [
    { emoji: '😭', count: 1 },
    { emoji: '😩', count: 1 },
    { emoji: '😕', count: 1 },
    { emoji: '😚', count: 1 },
    { emoji: '😆', count: 2 },
  ];

  if (!hasDiary) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDiaryText}>감정일기를 작성하면 리포트를 볼 수 있어요.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <EmotionCalendar datesWithEmotions={datesWithEmotions} />
      <EmotionStats emotionData={emotionStats} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDFDED',
  },
  noDiaryText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DiaryReport;
