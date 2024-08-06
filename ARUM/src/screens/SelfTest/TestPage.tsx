import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, SafeAreaView } from 'react-native';
import LoadingBar from '../../components/LoadingBar';
import MissionHeader from '../Mission/MissionHeader';
import { useNavigation } from '@react-navigation/native';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Question1 from './Questions/Questions1';
import Question2 from './Questions/Questions2';
import Question3 from './Questions/Questions3';
import Question4 from './Questions/Questions4';
import Popup from '../../components/Popup';
import { QuestionProps, SelfTestScreenNavigationProp } from '../../navigation/types';
import { API_URL } from '../../api_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TestPage = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const navigation = useNavigation<SelfTestScreenNavigationProp>();
  const [totalScore, setTotalScore] = useState(0);

  const updateTotalScore = (score: number) => {
    setTotalScore(prevScore => prevScore + score);
  };

  const data = [Question1, Question2, Question3, Question4];

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    navigation.goBack();
  };

  const onProgressChange = (progressValue: number) => {
    const newIndex = Math.round(progressValue);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
    }
  };

  const onPressNext = () => {
    if (currentIndex < data.length - 1) {
      const nextIndex = currentIndex + 1;
      console.log(`currentIndex: ${currentIndex}`);
      ref.current?.scrollTo({
        index: nextIndex,
        animated: true, // Change to true to enable animation
      });
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token');
      return null;
    }
  };
  
  const onPressLast = async () => {
    // const calculatedScore = Math.floor(Math.random() * 60);
    // navigation.navigate('TestLoading', { score: calculatedScore });   //TestLoading 페이지로 이동 필요!
    // const nextIndex = currentIndex + 1;
    // console.log(`currentIndex: ${currentIndex}`);
    // console.log('로딩페이지로 이동')
    const calculatedScore = totalScore;
    try {
      const userToken = getToken();
      const response = await fetch(`${API_URL}/selfTest/getResult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${userToken}`,
        },
        body: JSON.stringify({
          test_score: calculatedScore.toString(),
        }),
      });
      if (response.ok) {
        navigation.navigate('TestLoading', { score: calculatedScore });
      } else {
        console.error(`Failed to send test score: ${calculatedScore}`)
      }
    } catch (error) {
      console.error(`Error sending test score(${calculatedScore}): `, error)
    }
  };

  const renderQuestion = ({ item: QuestionComponent, index }: { item: React.ComponentType<QuestionProps>, index: number }) => (
    <QuestionComponent
      onPressNext={index === data.length - 1 ? onPressLast : onPressNext}
      isLastQuestion={index === data.length - 1}
      updateTotalScore={updateTotalScore}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <MissionHeader
          title="우울증 자가진단 테스트"
          onBack={() => setIsPopupVisible(true)}
          rightButton={
            <Popup 
              isVisible={isPopupVisible}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              title={''}
              description={'자가진단 페이지를 벗어나시겠습니까?\n답변은 저장되지 않습니다.'}
            />
          }
        />
        <LoadingBar pageNum={currentIndex} />
      </View>
      <View style={styles.carouselContainer}>
      <Carousel
        ref={ref}
        width={width}
        height={height * 0.65}
        data={data}
        onSnapToItem={onProgressChange}
        renderItem={renderQuestion}
      />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  headerContainer: {
    paddingBottom: 10,
  },
  carouselContainer: {
    height: height * 0.65, // Carousel과 같은 높이로 설정
  },
  carouselItem: {
    flexGrow: 1,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FDFDED'
  },
});
export default TestPage;