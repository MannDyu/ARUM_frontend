import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RecordDiaryComponent from '../../components/RecordDiaryComponent';

const questions = [
  '감정이 시작된 상황과 원인을 기록해보세요.',
  '감정을 느낀 후 했던 행동이나 순간적으로 들었던 생각을 기록해보세요.',
  '다음에도 똑같은 감정을 겪었을 때, 어떻게 해볼 것인가요?'
];

const RecordDiary = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);
  const tags = ['#속상한', '#피곤한', '#쓸쓸한']; // 예시 태그

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = text;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // 여기서 필요한 로직을 추가할 수 있습니다. 예를 들어, 응답을 서버에 저장하는 등의 작업
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      <RecordDiaryComponent
        emoji="😡" // 이모지 예시
        tags={tags}
        question={questions[step]}
        answer={answers[step]}
        onAnswerChange={handleAnswerChange}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecordDiary;
