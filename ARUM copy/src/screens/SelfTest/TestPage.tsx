import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import LoadingBar from '../../components/LoadingBar';
import MissionHeader from '../Mission/MissionHeader';
import { useNavigation } from '@react-navigation/native';
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import Question1 from './Questions/Questions1';
import Question2 from './Questions/Questions2';
import Question3 from './Questions/Questions3';
import Question4 from './Questions/Questions4';
import Popup from '../../components/Popup';
import { StackNavigationProp } from '@react-navigation/stack';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const data = [<Question1 />, <Question2 />, <Question3 />, <Question4 />];
type SelfTestScreenNavigationProp = StackNavigationProp<SelfTestStackParamList, 'SelfTest'>;

const TestPage = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const navigation = useNavigation<SelfTestScreenNavigationProp>();

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

  const onPressLast = () => {
    //! navigation.navigate(); TestLoading 페이지로 이동 필요!
    const nextIndex = currentIndex + 1;
    console.log(`currentIndex: ${currentIndex}`);
    console.log('로딩페이지로 이동')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            height={height - 250}
            data={data}
            onSnapToItem={onProgressChange}
            renderItem={({ item }: { item: React.ReactNode }) => (
              <View style={styles.carouselItem}>
                {item}
              </View>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          {currentIndex===3 ? <Button
            title="완료"
            onPress={onPressLast}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          /> : <Button
            title="다음"
            onPress={onPressNext}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          /> }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: { //! 스크롤 적용 안됨
    flexGrow: 1,
  },
  headerContainer: {
    display: 'flex',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  carouselContainer: {
    flex: 1,
  },
  carouselItem: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    display: 'flex',
    marginTop: 300, // 로딩이 안되는데 1번이 안 보여서 추가해놓음!
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 5,
    height: 40,
    width: 300,
  },
  containerStyle: {
    alignItems: 'center',
    display: 'flex',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    display: 'flex',
    backgroundColor: '#FDFDED'
  },
});

export default TestPage;