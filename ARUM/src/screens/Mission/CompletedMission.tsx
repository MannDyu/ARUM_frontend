import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import Calendar from '../../components/Calendar';
import CompletedMissionItem from './CompletedMissionItem';
import { useMission } from '../../context/MissionContext';

type CompletedMissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMission'>;


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
  
  return (
    <View style={styles.container}>
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
    marginVertical: 15,
  },
  tab: {
    fontSize: 20,
    padding: 5,
    
    
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
  },
  sectionTitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 20,
  },
});

export default CompletedMission;
