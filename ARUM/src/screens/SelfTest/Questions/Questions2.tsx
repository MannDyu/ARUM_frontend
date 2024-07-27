import React from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import TestItem from '../TestItem';
import { Button } from '@rneui/themed';

interface QuestionProps {
  onPressNext: () => void;
  isLastQuestion: boolean;
}

const Question2: React.FC<QuestionProps> = ({ onPressNext, isLastQuestion }) => {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={6} />
      <TestItem question={`먹고 싶지 않고 식욕이 없다`} questionNum={7} />
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={8} />
      <TestItem question={`어느 누가 도와준다 하더라도\n울적한 기분을 떨쳐 버릴 수 없을 것 같다.`} questionNum={9} />
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={10} />
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

export default Question2;