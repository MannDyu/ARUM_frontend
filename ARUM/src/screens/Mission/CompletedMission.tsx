import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import Calendar from '../../components/Calendar';
import CompletedMissionItem from './CompletedMissionItem';
import { useMission } from '../../context/MissionContext';
import dayjs from 'dayjs';

type CompletedMissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMission'>;

type MarkedDatesType = {
  [key: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};

const CompletedMission: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const { completedMissions } = useMission();
  const navigation = useNavigation<CompletedMissionScreenNavigationProp>();

  // 임시 데이터 사용 (실제로는 completedMissions를 사용해야 함)
  const missions = [
    { id: '1', date: '2024-07-15', title: '균형있는 식사 한 끼 하기', tag: '일상' },
    // 추가 미션 데이터
  ];

  const filteredMissions = missions.filter(mission => mission.date === selectedDate);

  // 완료한 미션 날짜 표시
  const markedDates: MarkedDatesType = missions.reduce((acc, mission) => {
    acc[mission.date] = { marked: true, dotColor: '#F6BF7D' };
    return acc;
  }, {} as MarkedDatesType);

  const today = dayjs().format('YYYY-MM-DD');
  const isPastDate = dayjs(selectedDate).isBefore(today);
  const isFutureDate = dayjs(selectedDate).isAfter(today);

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: '#F6BF7D' },
        }}
      />
      <Text style={styles.sectionTitle}>완료한 미션</Text>
      {selectedDate ? (
        filteredMissions.length > 0 ? (
          <FlatList
            data={filteredMissions}
            renderItem={({ item }) => <CompletedMissionItem mission={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.message}>
            {isPastDate ? '이 날은 미션을 쉬어갔어요.' : isFutureDate ? '아직 마주하지 않은 하루에요.' : ''}
          </Text>
        )
      ) : (
        <Text style={styles.message}>날짜를 선택해주세요.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  sectionTitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 0,
    marginLeft: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginVertical: 20,
  },
});

export default CompletedMission;
