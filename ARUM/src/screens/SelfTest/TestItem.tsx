import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectItem from './SelectItem';

interface TestItemProps {
  questionNum: number;
  question: string;
  onScoreChange: (score:number) => void;
}
const TestItem: React.FC<TestItemProps> = ({ questionNum, question, onScoreChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSelectItemScore = (index: number, score: number) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
    console.log(`newScores: ${newScores}`);
    onScoreChange(newScores.reduce((a, b) => a + b, 0))
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