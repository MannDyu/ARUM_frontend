import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface DateWithEmotion {
  date: string;
  emoji: string;
}

interface EmotionCalendarProps {
  datesWithEmotions: DateWithEmotion[];
}

const emojis: Record<string, any> = {
  '아주 나빠요': require('../../assets/images/emoji/emoji_01_verybad.png'),
  '나빠요': require('../../assets/images/emoji/emoji_02_bad.png'),
  '괜찮아요': require('../../assets/images/emoji/emoji_03_okay.png'),
  '좋아요': require('../../assets/images/emoji/emoji_04_good.png'),
  '아주 좋아요': require('../../assets/images/emoji/emoji_05_verygood.png'),
};

const EmotionCalendar: React.FC<EmotionCalendarProps> = ({ datesWithEmotions }) => {
  const markedDates = datesWithEmotions.reduce((acc, item) => {
    acc[item.date] = { marked: true };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container}>
      <Calendar
        dayComponent={({ date }: { date?: DateData }) => {
          const emotionForDate = datesWithEmotions.find(
            (emotionDate) => emotionDate.date === date?.dateString
          );
          const emoji = emotionForDate?.emoji || ' ';
          const day = date?.day;
          return (
            <View style={styles.dayContainer}>
              <Image 
                source={emojis[emoji]}
                style={styles.emoji}
              />
              <Text style={styles.dayText}>{day}</Text>
            </View>
          );
        }}
        markedDates={markedDates}
        style={styles.calendar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 300,
    width: 330,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 29,
    width: 29,
  },
  emoji: {
    width: 22,
    height: 22,
    marginBottom: 2,
  },
  dayText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default EmotionCalendar;



