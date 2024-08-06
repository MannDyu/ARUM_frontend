import React, {useState} from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import TestItem from '../TestItem';
import { Button } from '@rneui/themed';

interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}

const Question3 : React.FC<QuestionProps> = ({ onPressNext, isLastQuestion }) => {
  console.log('작동 Question3')
  const [totalScore, setTotalScore] = useState(0);

  const handleScoreChange = (score: number) => {
    setTotalScore(prevScore => prevScore + score);
    console.log(totalScore);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TestItem question={`잠을 설쳤다.\n(잠을 잘 이루지 못했다.)`} questionNum={11}  onScoreChange={handleScoreChange}/>
      <TestItem question={`두려움을 느꼈다.`} questionNum={12}  onScoreChange={handleScoreChange}/>
      <TestItem question={`평소에 비해 말수가 적었다.`} questionNum={13}  onScoreChange={handleScoreChange}/>
      <TestItem question={`세상에 홀로 있는 듯한 외로움을 느꼈다.`} questionNum={14}  onScoreChange={handleScoreChange}/>
      <TestItem question={`생활하는데 불만이 많았다.`} questionNum={15}  onScoreChange={handleScoreChange}/>
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

export default Question3;