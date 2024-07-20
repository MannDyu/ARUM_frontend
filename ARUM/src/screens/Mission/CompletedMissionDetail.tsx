import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MissionStackParamList } from '../../assets/types';
import { CompletedMissionDetailProps  } from '../../assets/types';
import { useMission } from '../../context/MissionContext'; 

type CompletedMissionDetailRouteProp = RouteProp<MissionStackParamList, 'CompletedMissionDetail'>;
type CompletedMissionDetailNavigationProp = StackNavigationProp<MissionStackParamList, 'CompletedMissionDetail'>;

type Props = {
  route: CompletedMissionDetailRouteProp;
  navigation: CompletedMissionDetailNavigationProp;
};

// const CompletedMissionDetail: React.FC<Props> = ({ route, navigation }) => {
const CompletedMissionDetail: React.FC<CompletedMissionDetailProps> = ({ route }) => {
  
  const { missionId } = route.params;
  const { completedMissions } = useMission();

  const mission = completedMissions.find(m => m.id === missionId);
  
  if (!mission) {
    return (
      <View style={styles.container}>
        <Text>미션을 찾을 수 없습니다.</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{mission.title}</Text>
      {mission.imageUri && (
        <Image source={{ uri: mission.imageUri }} style={styles.image} />
      )}
      <Text style={styles.text}>{mission.text}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CompletedMissionDetail;