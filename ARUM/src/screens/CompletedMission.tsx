import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Calendar from '../components/Calendar';
import CompletedMissionItem from '../components/CompletedMissionItem';

const CompletedMission = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const missions = [
    { id: '1', date: '2024-07-15', title: '균형있는 식사 한 끼 하기', category: '일상' },
    // 추가 미션 데이터
  ];

  const filteredMissions = missions.filter(mission => mission.date === selectedDate);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Text style={styles.tab}>오늘의 미션</Text>
        <Text style={[styles.tab, styles.activeTab]}>완료한 미션</Text>
      </View>
      <Calendar onDayPress={(day) => setSelectedDate(day.dateString)} />
      <Text style={styles.sectionTitle}>완료한 미션</Text>
      <FlatList
        data={filteredMissions}
        renderItem={({ item }) => <CompletedMissionItem mission={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    fontSize: 16,
    padding: 10,
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 20,
  },
});

export default CompletedMission;
