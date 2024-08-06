import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import Calendar from '../../components/Calendar';
import CompletedMissionItem from './CompletedMissionItem';
import { useMission } from '../../context/MissionContext';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../api_url';
import { MarkedDates } from 'react-native-calendars/src/types';

type CompletedMissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMission'>;

type MarkedDatesType = {
  [key: string]: {
    marked?: boolean;
    selected?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};

interface CompletedMission {
  id: number;
  qs_date: string;
  qs_theme: string;
  qs_content: string;
  qs_perform_yn: boolean;
}

const CompletedMission: React.FC = () => {
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  // const { completedMissions } = useMission();
  const navigation = useNavigation<CompletedMissionScreenNavigationProp>();

  useEffect(() => {
    fetchCompletedMissions();
  }, []);

  const fetchCompletedMissions = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${API_URL}/quest/monthlyQuestList`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompletedMissions(response.data);
      updateMarkedDates(response.data);
    } catch (error) {
      console.error('Error fetching completed missions:', error);
      Alert.alert('Error', 'Failed to fetch completed missions. Please try again.');
    }
  };

  const updateMarkedDates = (missions: CompletedMission[]) => {
    const marked: MarkedDates = {};
    missions.forEach(mission => {
      marked[mission.qs_date] = { 
        marked: true, 
        dotColor: mission.qs_perform_yn ? 'green' : 'red' 
      };
    });
    setMarkedDates(marked);
  };

  const filteredMissions = completedMissions.filter(mission => mission.qs_date === selectedDate);
  const isPastDate = new Date(selectedDate) < new Date();
  const isFutureDate = new Date(selectedDate) > new Date();


  

  // 임시 데이터 사용 (실제로는 completedMissions를 사용해야 함)
  // const missions = [
  //   { id: '1', date: '2024-07-15', title: '균형있는 식사 한 끼 하기', tag: '일상' },
  //   // 추가 미션 데이터
  // ];

  // const filteredMissions = missions.filter(mission => mission.date === selectedDate);

  // 완료한 미션 날짜 표시
  // const markedDates: MarkedDatesType = missions.reduce((acc, mission) => {
  //   acc[mission.date] = { marked: true, dotColor: '#F6BF7D' };
  //   return acc;
  // }, {} as MarkedDatesType);

  const today = dayjs().format('YYYY-MM-DD');
  // const isPastDate = dayjs(selectedDate).isBefore(today);
  // const isFutureDate = dayjs(selectedDate).isAfter(today);

  return (
    <View style={styles.container}>
      <Calendar 
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: { ...markedDates[selectedDate], selected: true, selectedColor: '#F6BF7D' },
        }}
      />
      <Text style={styles.sectionTitle}>완료한 미션</Text>
      {selectedDate ? (
        filteredMissions.length > 0 ? (
          <FlatList
            data={filteredMissions}
            renderItem={({ item }) => <CompletedMissionItem mission={item} />}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text style={styles.message}>
            {isPastDate ? '이 날은 미션을 쉬어갔어요.' : isFutureDate ? '아직 마주하지 않은 하루에요.' : '오늘의 미션을 완료해보세요!'}
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
