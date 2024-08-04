import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  onDayPress?: (day: DateObject) => void;
  markedDates?: { [key: string]: any };
}

const Calendar: React.FC<CalendarProps> = ({ onDayPress, markedDates }) => {
  return (
    <RNCalendar
      onDayPress={(day: DateObject) => onDayPress?.(day)}
      markedDates={markedDates} 
      style={styles.calendarContainer}
    />
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    margin: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
})

export default Calendar;



