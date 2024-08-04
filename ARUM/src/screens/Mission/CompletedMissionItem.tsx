import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { CompletedItem } from '../../assets/MissionTypes';



type CompletedMissionItemNavigationProp = StackNavigationProp<RootStackParamList, 'CompletedMissionDetail'>;

interface CompletedMissionItemProps {
  mission: CompletedItem;
}

const CompletedMissionItem: React.FC<CompletedMissionItemProps> = ({ mission }) => {
  const navigation = useNavigation<CompletedMissionItemNavigationProp>();

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
    paddingVertical: 15,
    margin: 15,
    borderWidth: 1, 
    borderColor: '#000', 
    borderRadius: 10, 
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  date: {
    fontSize: 15,
    color: '#888',
    marginBottom: 7,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 5,
  },
  detailButton: {
    color: 'blue',
    marginTop: 5,
  },
});

export default CompletedMissionItem;
