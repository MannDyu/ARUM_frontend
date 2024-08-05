import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DiaryStackParamList } from '../../assets/DiaryTypes';
import { Button } from '@rneui/themed'
import { CheckBox } from 'react-native-elements';
import Popup from '../../components/Popup';
import DiaryEmotionDrawer from './DiaryEmotionDrawer';

type DiaryScreenNavigationProp = StackNavigationProp<DiaryStackParamList, 'Diary'>;

const colors = [
  "#F6BF7D",
  "#E1656F",
  "#64B4E5",
  "#FBE89D",
  "#F8A0B3",
  "#6487E5",
  "#77E09A",
];

const unselectedColors = [
  '#FFDEB6',
  '#FFC0C5',
  '#B7E3FF',
  '#FFF7D5',
  '#FFD8E0',
  '#C4D4FF',
  '#B6FFCE',
];

const titles = [
  "기쁨",
  "화남",
  "슬픔",
  "즐거움",
  "사랑",
  "미움",
  "바람"
];

const emotions = [
  require('../../assets/images/emotion/joy.png'),
  require('../../assets/images/emotion/mad.png'),
  require('../../assets/images/emotion/sad.png'),
  require('../../assets/images/emotion/playful.png'),
  require('../../assets/images/emotion/love.png'),
  require('../../assets/images/emotion/dislike.png'),
  require('../../assets/images/emotion/want.png'),
];

interface DiaryEmotionOptionProps {
  title: string;
  color: string;
  unselectedColor: string;
  image: object;
  isSelected: boolean;
  onSelect: (index: number) => void;
  index: number;
  hasSelection: boolean;
}

const DiaryEmotionOption: React.FC<DiaryEmotionOptionProps> = ({
  title,
  color,
  unselectedColor,
  image,
  isSelected,
  onSelect,
  index,
  hasSelection,
}) => (
  <View>
    <CheckBox
      checked={isSelected}
      onPress={() => onSelect(index)}
      containerStyle={{
        ...styles.emotionOptions,
        backgroundColor: isSelected || !hasSelection ? color : unselectedColor,
        borderColor: isSelected || !hasSelection ? 'black' : 'gray',
      }}
      checkedIcon={<Image source={image} style={styles.icon} />}
      uncheckedIcon={<Image source={image} style={styles.icon} />}
      size={20}
      title={title}
      textStyle={{
        ...styles.checkboxTextStyle,
        color: isSelected || !hasSelection ? 'black' : 'gray',
      }}
    />
  </View>
);

export default function Diary() {
  const navigation = useNavigation<DiaryScreenNavigationProp>();
  const [selected, setSelected] = useState<number | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    navigation.navigate('Diary'); //! Home으로 돌아가야함!
  };

  const onSelect = (index: number) => {
    setSelected(index);
    setBottomSheetVisible(true);
  };

  const onClose = () => {
    setBottomSheetVisible(false);
  };

  const hasSelection = selected !== null;

  useFocusEffect(
    React.useCallback(() => {
      setSelected(null);
    }, [])
  );

  return (
    <View style={{ backgroundColor: '#FDFDED' }}>
      <Header title="오늘의 감정" onBack={() => setIsPopupVisible(true)} rightButton={
        <Popup 
          isVisible={isPopupVisible}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title={''}
          description={'작성 중인 페이지를 벗어나시겠습니까?\n기록은 저장되지 않습니다.'}
        />
      }
      />
      <View style={styles.selectContainer}>
        <View style={styles.selections}>
          <Text style={styles.title}>오늘 어떤 감정을 느꼈나요?</Text>
          <View style={styles.emotionsContainer}>
            {colors.map((color, index) => (
              <DiaryEmotionOption
                key={index}
                color={color}
                image={emotions[index]}
                unselectedColor={unselectedColors[index]}
                isSelected={selected === index}
                onSelect={onSelect}
                index={index}
                title={titles[index]}
                hasSelection={hasSelection}
              />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="이전"
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
            onPress={() => navigation.navigate('DiaryEmoji')}
            />
          <Button
            title="다음"
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
            onPress={() => navigation.navigate('RecordDiary')}
            disabled={selected !== null ? false : true}
          />
        </View>
        <DiaryEmotionDrawer
          selectedEmotion={selected !== null ? titles[selected] : null}
          isVisible={bottomSheetVisible}
          onClose={onClose}
          index={selected}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '27%',
  },
  buttonStyle: {
    backgroundColor: '#181818',
    height: '100%',
  },
  containerStyle: {
    width: '35%',
    height: 40,
    borderRadius: 5,
  },
  buttonTitle: {},
  selectContainer: {
    height: '105%',
    alignItems: 'center',
    marginTop: 0,
  },
  selections: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '80%',
    height: '65%',
    paddingBottom: '10%',
  },
  title: {
    fontSize: 18,
    margin: 10,
    marginTop: 60,
  },
  emotionsContainer: {
    width: '90%',
  },
  emotionOptions: {
    borderRadius: 50,
    height: 40,
    display: 'flex',
    borderWidth: 1,
    marginBottom: '2%',
  },
  icon: {
    width: 20,
    height: 20,
  },
  checkboxTextStyle: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 400,
    fontSize: 18,
  },
});
