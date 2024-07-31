import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types'; 
import { CompletedMission } from '../../assets/MissionTypes'; 
import { useMission } from '../../context/MissionContext';
import MissionHeader from './MissionHeader';
import MissionContent from './MissionContent';

type CompletedMissionDetailRouteProp = RouteProp<RootStackParamList, 'CompletedMissionDetail'>;
type CompletedMissionDetailNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMissionDetail'>;

interface CompletedMissionDetailProps {
  route: CompletedMissionDetailRouteProp;
  navigation: CompletedMissionDetailNavigationProp;
}

const CompletedMissionDetail: React.FC<CompletedMissionDetailProps> = ({ route, navigation }) => {
  const { missionId } = route.params;
  const { completedMissions } = useMission();
  const [mission, setMission] = useState<CompletedMission | null>(null);


  useEffect(() => {
    const foundMission = completedMissions.find(m => m.id === missionId);
    setMission(foundMission || null);
  }, [completedMissions, missionId]);

  if (!mission) {
    return (
      <View style={styles.container}>
        <MissionHeader title="미션 상세" onBack={() => navigation.goBack()} />
        <MissionContent 
          title="미션을 찾을 수 없습니다."
          text={`ID: ${missionId}`} date={''}        />
      </View>
    );
  }

  const EditButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('EditCompletedMission', { missionId: mission.id })}>
      <Text style={styles.editButtonText}>수정</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <MissionHeader
        title="완료된 미션"
        onBack={() => navigation.goBack()}
        rightButton={<EditButton />}
      />
      <MissionContent
        title={mission.title}
        imageUri={mission.imageUri}
        text={mission.text}
        tag={mission.tag}
        editable={false}
        date={mission.date}
      />
      <Text style={styles.recordDate}>{mission.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  recordDate : {
    textAlign:'right', 
    padding: 20,
    marginTop: 10
  }
});

export default CompletedMissionDetail;