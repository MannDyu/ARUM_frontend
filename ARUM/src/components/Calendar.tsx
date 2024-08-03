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
  onDayPress?: (day: DateObject) => void;
  markedDates?: { [key: string]: any };
}

const Calendar: React.FC<CalendarProps> = ({ onDayPress, markedDates }) => {
  return (
    <RNCalendar
      onDayPress={(day: DateObject) => onDayPress?.(day)}
      markedDates={markedDates} 
    />
  );
};

export default Calendar;



