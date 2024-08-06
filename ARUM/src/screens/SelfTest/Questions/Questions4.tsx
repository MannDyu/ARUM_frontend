import React, {useState} from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import TestItem from '../TestItem';
import { Button } from '@rneui/themed';

interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}

const Question4: React.FC<QuestionProps> = ({ onPressNext, isLastQuestion }) => {
  console.log('작동 Question3')
  const [totalScore, setTotalScore] = useState(0);

  const handleScoreChange = (score: number) => {
    setTotalScore(prevScore => prevScore + score);
    console.log(totalScore);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TestItem question={`사람들이 나에게 차갑게 대하는 것 같았다.`} questionNum={16}  onScoreChange={handleScoreChange}/>
      <TestItem question={`갑자기 울음이 나왔다.`} questionNum={17} onScoreChange={handleScoreChange}/>
      <TestItem question={`마음이 슬펐다.`} questionNum={18} onScoreChange={handleScoreChange}/>
      <TestItem question={`사람들이 나를 싫어하는 것 같았다.`} questionNum={19} onScoreChange={handleScoreChange}/>
      <TestItem question={`도무지 뭘 해 나갈 엄두가 나지 않았다.`} questionNum={20}  onScoreChange={handleScoreChange} />
      <View style={styles.buttonContainer}>
        <Button
          title={isLastQuestion ? "완료" : "다음"}
          onPress={onPressNext}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 40,
    width: 300,
  },
  containerStyle: {
    alignItems: 'center',
  },
});

export default Question4;