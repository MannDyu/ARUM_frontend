import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SelectItem from './SelectItem';

interface TestItemProps {
  questionNum: number;
  question: string;
}
const TestItem: React.FC<TestItemProps> = ({ questionNum, question }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionNum}>{questionNum}</Text>
      <Text style={styles.question}>{question}</Text>
      <SelectItem onSelect={handleSelect}/>
      <View style={styles.horizontalLine}/>
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    width: '80%',
    height: 0.5,
    backgroundColor: '#DFDFDF',
  },
  container: {
    backgroundColor: '#FDFDED',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionNum: {
    fontSize: 24,
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 0,
  },
  question: {
    fontSize: 18,
    fontWeight: 'regular',
    textAlign: 'center',
  },
});

export default TestItem;