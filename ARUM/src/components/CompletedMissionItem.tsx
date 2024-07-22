import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

interface Mission {
  id: string;
  date: string;
  title: string;
  category: string;
}

interface CompletedMissionItemProps {
  mission: Mission;
}

const CompletedMissionItem: React.FC<CompletedMissionItemProps> = ({ mission }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => navigation.navigate('CompleteMissionDetail', { mission })}
    >
      <Text style={styles.date}>{mission.date}</Text>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.category}>{mission.category}</Text>
      <Text style={styles.detailButton}>자세히 보기</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  detailButton: {
    color: 'blue',
    marginTop: 10,
  },
});

export default CompletedMissionItem;

