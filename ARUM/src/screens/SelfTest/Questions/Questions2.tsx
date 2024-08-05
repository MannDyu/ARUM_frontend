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
      <TestItem question={`상당히 우울했다.`} questionNum={6} />
      <TestItem question={`모든 일들이 힘들게 느껴졌다.`} questionNum={7} />
      <TestItem question={`앞일이 암담하게 느껴졌다.`} questionNum={8} />
      <TestItem question={`지금까지의 내 인생은 실패작이라는 생각이 들었다.`} questionNum={9} />
      <TestItem question={`적어도 보통 사람들만큼의 능력은 있었다고 생각한다.`} questionNum={10} />
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