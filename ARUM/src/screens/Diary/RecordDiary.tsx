import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import RecordDiaryComponent from '../../components/RecordDiaryComponent';
import { RootStackParamList, RootStackScreenProps } from '../../navigation/types';
import Header from '../../components/Header';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { API_URL } from '../../api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const emotions: { [key: string]: any } = {
  기쁨: require('../../assets/images/emotion/joy.png'),
  화남: require('../../assets/images/emotion/mad.png'),
  슬픔: require('../../assets/images/emotion/sad.png'),
  즐거움: require('../../assets/images/emotion/playful.png'),
  사랑: require('../../assets/images/emotion/love.png'),
  미움: require('../../assets/images/emotion/dislike.png'),
  바람: require('../../assets/images/emotion/want.png'),
};

type RecordDiaryProps = StackScreenProps<RootStackParamList, 'RecordDiary'>;

const RecordDiary: React.FC<RecordDiaryProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'RecordDiary'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'RecordDiary'>>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '']);

  // const selectedEmotionIndex = (route.params as { selectedEmotionIndex?: number }).selectedEmotionIndex ?? 0;
  // const selectedTags = (route.params as { selectedTags?: string[] }).selectedTags ?? [];

  const {incompleteData } = (route.params as {
    selectedEmotionIndex?: number;
    selectedTags?: string[];
    incompleteData?: {
      feel: string;
      emotion: string;
      tag1: string;
      tag2: string;
      tag3: string;
    };
  }) || {};

  const feel = JSON.stringify(incompleteData?.feel);
  const emotion = JSON.stringify(incompleteData?.emotion);
  const tag1 = JSON.stringify(incompleteData?.tag1);
  const tag2 = JSON.stringify(incompleteData?.tag2);
  const tag3 = JSON.stringify(incompleteData?.tag3);
  const tags = [tag1, tag2, tag3];

  const [diaryData, setDiaryData] = useState({
    feel: feel || '',
    emotion: emotion || {},
    tag1: tag1 || '',
    tag2: tag2 || '',
    tag3: tag3 || '',
    content1: '',
    content2: '',
    content3: '',
  });

  // const handleEmotionSelected = () => {
  //   setDiaryData(prevData => ({
  //     ...prevData,
  //     emotion: emotion || '',
  //     tag1: tag1 || '',
  //     tag2: tag2 || '',
  //     tag3: tag3 || '',
  //   }));
  // };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token');
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const userToken = await getToken();
      if (!userToken) {
        console.error(`Token not found`);
        return
      }

      console.log(`diaryData: ${JSON.stringify(diaryData)}`);
      console.log(`Token: ${userToken}`);
      const response = await fetch(`${API_URL}/diary/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
        body: JSON.stringify(diaryData),
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const responseData = await response.json();
      console.log('Diary saved successfully:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswerChange = (text: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = text;
    setAnswers(newAnswers);

    setDiaryData(prevData => ({
      ...prevData,
      [`content${currentQuestionIndex + 1}`]: text,
    }));
  };

  const emotionNames = [
    "기쁨",
    "화남",
    "슬픔",
    "즐거움",
    "사랑",
    "미움",
    "바람"
  ];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('DiaryThumbnail', { diaryId: 'some-diary-id' }); //! 썸네일로 정보 전송
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
      placeholderQuestion: '감정을 느끼고 했던 생각과 행동들을 돌아보아요.',
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
        emotion={emotions[emotion]}
        // tags={selectedTags.map(tag => `#${tag}`)}  // selectedTags를 해시태그로 변환하여 전달
        tags={tags.map(tag => `#${tag}`)}
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
          onPress={currentQuestionIndex === questions.length -1 ? handleSubmit : handleNext} // 수정하였음!!
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
  emoji: {
    width: 40,
    height: 40,
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
