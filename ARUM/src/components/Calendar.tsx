import React from 'react';
import { Calendar as RNCalendar } from 'react-native-calendars';

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  onDayPress: (day: DateObject) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDayPress }) => {
  return (
    <RNCalendar
      onDayPress={(day) => onDayPress(day as DateObject)}
      markedDates={{
        '2024-07-15': { marked: true, dotColor: 'blue' },
        // 추가 마크된 날짜
      }}
    />
  );
};

export default Calendar;

