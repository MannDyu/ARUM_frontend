import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { CompletedItem, CompletedMission, MissionStackParamList } from '../../assets/types';
import { StackNavigationProp } from '@react-navigation/stack';



interface CompletedMissionItemProps {
  mission:  CompletedItem ;
}

interface Mission {
  id: string;
  date: string;
  title: string;
  category: string;
}
type CompletedMissionNavigationProp = StackNavigationProp<MissionStackParamList, 'CompletedMissionDetail'>;
// interface CompletedMissionItemProps {
//   mission: Mission;
// }

const CompletedMissionItem: React.FC<CompletedMissionItemProps> = ({ mission }) => {
  const navigation = useNavigation<CompletedMissionNavigationProp>();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.navigate('CompletedMissionDetail', { missionId: mission.id })}
    >
      <Text style={styles.date}>{mission.date}</Text>
      <Text style={styles.category}>{mission.tag}</Text>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.detailButton}>자세히 보기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    margin: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    marginVertical: 5,
  },
  date: {
    fontSize: 15,
    color: '#888',
    marginBottom: 13,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 5,
  },
  detailButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default CompletedMissionItem;
