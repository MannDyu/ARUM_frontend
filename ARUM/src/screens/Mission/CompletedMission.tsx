import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import Calendar from '../../components/Calendar';
import CompletedMissionItem from './CompletedMissionItem';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../api_url'; 

type CompletedMissionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMission'>;

type Mission = {
  qs_date: string;
  qs_perform_yn: boolean;
  qs_content?: string; // 필요에 따라 추가 속성
};

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
  const [missions, setMissions] = useState<Mission[]>([]);
  const navigation = useNavigation<CompletedMissionScreenNavigationProp>();

  // 처음 로드될 때 GET 요청으로 기본 데이터를 가져옴
  useEffect(() => {
    const fetchInitialMissions = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch(`${API_URL}/quest/monthlyQuestList`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: Mission[] = await response.json();
        setMissions(data);
      } catch (error) {
        console.error('Error fetching initial mission list:', error);
      }
    };

    fetchInitialMissions();
  }, []);

  // 날짜가 선택될 때마다 POST 요청으로 해당 날짜 데이터를 가져옴
  useEffect(() => {
    const fetchMissionsForDate = async () => {
      if (selectedDate) {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${API_URL}/quest/specificQuestInfo`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ qs_date: selectedDate }), // 선택한 날짜를 백엔드로 전송
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data: Mission[] = await response.json();
          setMissions(data);
        } catch (error) {
          console.error('Error fetching mission list for date:', error);
        }
      }
    };

    fetchMissionsForDate();
  }, [selectedDate]);

  const filteredMissions = missions.filter(mission => mission.qs_date === selectedDate);

  // 완료한 미션 날짜 표시
  const markedDates: MarkedDatesType = missions.reduce((acc, mission) => {
    acc[mission.qs_date] = { marked: true, dotColor: mission.qs_perform_yn ? '#4CAF50' : '#FF5722' };
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
            keyExtractor={item => item.qs_date}
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