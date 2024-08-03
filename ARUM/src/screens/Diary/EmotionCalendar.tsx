import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

interface DateWithEmotion {
  date: string;
  emoji: string;
}

interface EmotionCalendarProps {
  datesWithEmotions: DateWithEmotion[];
}

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
              <Text style={styles.emoji}>{emoji}</Text>
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
  },
  calendar: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    height: 300,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 25,
  },
  emoji: {
    fontSize: 20,
    height: 22,
    textAlign: 'center',
  },
  dayText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});

export default EmotionCalendar;



