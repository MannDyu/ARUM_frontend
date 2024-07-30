import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import RecordDiaryComponent from '../../components/RecordDiaryComponent';
import { RootStackScreenProps } from '../../navigation/types';
import Header from '../../components/Header'


const RecordDiary: React.FC<RootStackScreenProps<'RecordDiary'>> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('DiaryThumbnail');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const questions = [
    {
      fixedQuestion: '왜 이런 감정을 느꼈나요?',
      placeholderQuestion: '감정이 시작된 상황과 원인을 기록해보세요.',
    },
    {
      fixedQuestion: '감정을 느낀 후 했던 행동이나 순간적으로 들었던 생각을 기록해보세요.',
      placeholderQuestion: '감정을 느끼고 했던 생각과 행동들을 하나하나 돌아보아요.',
    },
    {
      fixedQuestion: '다음에도 똑같은 감정을 겪었을 때, 어떻게 해볼 것인가요?',
      placeholderQuestion: '이런 감정들을 어떻게 대하면 좋을지 생각해보아요.',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="오늘의 일기" onBack={() => navigation.goBack()} />
      <RecordDiaryComponent
        emoji="😠"
        tags={['#속상한', '#피곤한', '#씁쓸한']}
        fixedQuestion={questions[currentQuestionIndex].fixedQuestion}
        placeholderQuestion={questions[currentQuestionIndex].placeholderQuestion}
        answer={answers[currentQuestionIndex]}
        onAnswerChange={handleAnswerChange}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="이전"
          onPress={handlePrev}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title={currentQuestionIndex === questions.length - 1 ? '완료' : '다음'}
          onPress={handleNext}
          buttonStyle={[styles.button, currentQuestionIndex === questions.length - 1 && styles.completeButton]}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFEF',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
    paddingTop: 11,
    paddingBottom: 10,
  },
  button: {
    width: 150,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  completeButton: {
    backgroundColor: '#000',
    opacity: 0.5,
  },
  buttonTitle: {
    fontSize: 18,
  },
});

export default RecordDiary;