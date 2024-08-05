import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import DiaryItem from './DiaryItem';
import Header from '../../components/Header';

type DiaryDetailProps = StackScreenProps<RootStackParamList, 'DiaryDetail'>;

const questions = [
  '왜 이런 감정을 느꼈나요?',
  '감정을 느낀 후 했던 행동이나 순간적으로 들었던 생각을 기록해보세요.',
  '다음에도 똑같은 감정을 겪었을 때, 어떻게 해볼 것인가요?',
];

const DiaryDetail: React.FC<DiaryDetailProps> = ({ navigation }) => {
  // 임시 데이터 설정
  const diaryId = '1';
  const emoji = '😠';
  const date = '2024.07.15';
  const tags = ['속상한', '피곤한', '씁쓸한'];
  const answers = [
    '승진 누락이 됐다. 진짜 누구보다 열심히 일했다고 말할 수 있는데, 노력이 물거품이 됐다. 나만 이렇게 열심히 한 것인지... 조용히 일하면 아무도 알아주지 않는다.',
    '울음을 꼭 참다가 집에 오자마자 억울하고 분해서 소리를 질렀다. 혼자 있어서 다행이다.',
    '다음에도 똑같은 감정을 겪었을 때, 더 차분하게 대응할 수 있도록 하자. 일단, 감정을 기록하는 것도 큰 도움이 될 것이다.'
  ];

  return (
    <View style={styles.container}>
      <Header title="감정일기 기록" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.diaryContainer}>
          <DiaryItem
            emoji={emoji}
            date={date}
            dayOfWeek="월"
            title="감정일기"
            tags={tags}
          />
          {answers.map((answer, index) => (
            <View key={index} style={styles.answerSection}>
              <Text style={styles.question}>{questions[index]}</Text>
              <Text style={styles.answer}>{answer}</Text>
            </View>
          ))}
        </View>
        <Button
          title="확인"
          onPress={() => navigation.goBack()}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFEF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  content: {
    paddingBottom: 30,
  },

  diaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    height: 550,
    overflow: 'hidden',
    padding: 15,
    marginBottom: 20,
  },

  answerContainer: {
    maxHeight: 250, // 컨테이너의 최대 높이 설정
    overflow: 'scroll', // 스크롤 가능하게 설정
  },

  answerSection: {
    marginVertical: 20,
  },
  question: {
    fontSize: 17,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 10,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  buttonTitle: {
    fontSize: 18,
  },
});

export default DiaryDetail;
