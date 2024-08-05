import React from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import TestItem from '../TestItem';
import { Button } from '@rneui/themed';

export interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}

const Question1: React.FC<QuestionProps> = ({ onPressNext, isLastQuestion }) => {
  console.log('작동 Question1')
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TestItem question={`아무렇지도 않던 일들이 괴롭고 귀찮게 느껴졌다`} questionNum={1} />
      <TestItem question={`먹고 싶지 않고 식욕이 없다`} questionNum={2} />
      <TestItem question={`어느 누가 도와준다 하더라도\n울적한 기분을 떨쳐 버릴 수 없을 것 같다.`} questionNum={3} />
      <TestItem question={`무슨 일을 하던 정신을 집중하기가 힘들었다.`} questionNum={4} />
      <TestItem question={`비교적 잘 지냈다.`} questionNum={5} />
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




export default Question1;