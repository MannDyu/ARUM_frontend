import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import BottomSheet from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import EmotionPopup from './EmotionPopup';
import { DiaryStackParamList } from '../../assets/DiaryTypes';

type DiaryScreenNavigationProp = StackNavigationProp<DiaryStackParamList, 'RecordDiary'>;

const emotionAdjectives: { [key: string]: string[] } = {
  기쁨: ['행복한', '감사한', '감동적인', '만족스러운', '통쾌한', '후련한', '흐뭇한', '흥분된', '짜릿한', '벅찬'],
  화남: ['괘씸한', '기분 상하는', '불쾌한', '분노', '복수심', '모욕적', '씁쓸한', '무서운', '불만스러운', '골치 아픈', '약오르는', '실망한', '가혹한', '나쁜', '속상한', '꼴사나운', '섬뜩한'],
  슬픔: ['공허한', '고독한', '걱정되는', '서러운', '우울한', '절망적인', '마음이 무거운', '낙담한', '슬픈', '소외감', '비참한', '암담한', '애통한', '처량한', '허탈한', '의기소침한', '아쉬운', '불안한', '불편한', '불쌍한', '부끄러운', '착잡한', '공포에 질린'],
  즐거움: ['명랑한', '밝은', '신나는', '유쾌한', '당당한', '즐거운', '활발한', '희망찬', '경쾌한', '산뜻한', '가뿐한', '홀가분한', '확신 있는', '기분 좋은', '흐뭇한'],
  사랑: ['다정한', '사랑스러운', '애틋한', '상냥한', '열망하는', '로맨틱한', '친숙한', '포근한', '소중한', '화끈거리는', '뿌듯한', '두근대는', '헌신하는', '정 많은', '배려하는', '정성어린'],
  미움: ['괴로운', '귀찮은', '부담스러운', '싫은', '억울한', '싫증나는', '끔직한', '얄미운', '증오스러운', '짜증스러운', '구역질 나는', '야속한', '근심스러운', '쌀쌀맞은', '죄책감', '지겨운'],
  바람: ['간절한', '갈망하는', '기대하는', '소망하는', '절박한', '호기심', '초조한', '희망하는', '긴장한', '아쉬운', '기다리는'],
};

interface EmotionBottomSheetProps {
  selectedEmotion: string | null;
  isVisible: boolean;
  onClose: () => void;
  index: number;
  onSelected: (emotion: string | null, tags: string[], emotionIndex: number) => void;
  emoji: string;
  onSubmit: (data: {
    feel: string | null;
    emotion: string;
    tag1: string;
    tag2: string;
    tag3: string;
    content1: string;
    content2: string;
    content3: string;
  }) => void;
}

const emotions = [
  require('../../assets/images/emotion/joy.png'),
  require('../../assets/images/emotion/mad.png'),
  require('../../assets/images/emotion/sad.png'),
  require('../../assets/images/emotion/playful.png'),
  require('../../assets/images/emotion/love.png'),
  require('../../assets/images/emotion/dislike.png'),
  require('../../assets/images/emotion/want.png'),
];

const emotionNames = [
  "기쁨",
  "화남",
  "슬픔",
  "즐거움",
  "사랑",
  "미움",
  "바람"
];

const EmotionBottomSheet: React.FC<EmotionBottomSheetProps> = ({ selectedEmotion, isVisible, onClose, index, emoji, onSubmit }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const adjectives = useMemo(() => {
    if (selectedEmotion) {
      return emotionAdjectives[selectedEmotion];
    }
    return [];
  }, [selectedEmotion]);
  const [selectedAdjectives, setSelectedAdjectives] = useState<string[]>([]);
  const [selectedEmotionCategory, setSelectedEmotionCategory] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const navigation = useNavigation<DiaryScreenNavigationProp>();

  const toggleAdjective = (adjective: string) => {
    const currentEmotionCategory = Object.keys(emotionAdjectives).find(category => emotionAdjectives[category].includes(adjective)) || null;
    if (selectedEmotionCategory && selectedEmotionCategory !== currentEmotionCategory) {
      setSelectedAdjectives([adjective]);
      setSelectedEmotionCategory(currentEmotionCategory);
    } else {
      setSelectedAdjectives((prevSelected) => {
        if (prevSelected.includes(adjective)) {
          return prevSelected.filter((item) => item !== adjective);
        } else if (prevSelected.length < 3) {
          return [...prevSelected, adjective];
        } else {
          setIsPopupVisible(true);
          return prevSelected;
        }
      });
      setSelectedEmotionCategory(currentEmotionCategory);
    }
  };

  const removePopup = () => {
    setIsPopupVisible(false);
  };

  const handleSave = () => {
    const data = {
      feel: emoji,
      emotion: emotionNames[index],
      tag1: selectedAdjectives[0] || "",
      tag2: selectedAdjectives[1] || "",
      tag3: selectedAdjectives[2] || "",
      content1: "",
      content2: "",
      content3: ""
    };
    onSubmit(data);
    onClose();
  };

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  useEffect(() => {
    const newHashtags = selectedAdjectives.map(adjective => `#${adjective}`);
    setHashtags(newHashtags);
  }, [selectedAdjectives]);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['12%', '30%', '100%']}
        onClose={onClose}
        index={isVisible ? 1 : 0}
        enablePanDownToClose={true}
        animateOnMount={true}
        backgroundStyle={styles.sheetStyle}
      >
        <View style={styles.sheetContent}>
          <View>
            <Image source={emotions[index]} style={styles.image} />
          </View>
          <Text style={styles.title}>감정을 더 자세히 묘사해주세요</Text>
          <Text style={styles.comment}>감정은 세 개까지 선택할 수 있어요.</Text>
          <FlatList
            style={styles.flatStyle}
            data={adjectives}
            renderItem={({ item }) => (
              <CheckBox
                title={item}
                checked={selectedAdjectives.includes(item)}
                onPress={() => toggleAdjective(item)}
                containerStyle={{
                  ...styles.checkContainer,
                  backgroundColor: selectedAdjectives.includes(item) ? '#D9D9D9' : 'white',
                }}
                textStyle={styles.textStyle}
              />
            )}
            keyExtractor={(item) => item}
          />
          <View style={styles.hashTagContainer}>
            {hashtags.map((hashtag, index) => (
              <Text key={index} style={styles.hashtagStyle}>{hashtag}</Text>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="취소"
              onPress={() => navigation.goBack()}
              buttonStyle={styles.buttonStyle}
              containerStyle={{}}
            />
            <Button
              title="다음"
              onPress={handleSave}
              buttonStyle={styles.buttonStyle}
              containerStyle={{}}
              disabled={selectedAdjectives.length > 0 ? false : true}
            />
          </View>
        </View>
      </BottomSheet>
      <EmotionPopup isPopupVisible={isPopupVisible} removePopup={removePopup} />
    </>
  );
};

const styles = StyleSheet.create({
  sheetStyle: {},
  sheetContent: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 45,
    height: 45,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 0,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  comment: {
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  flatStyle: {
    width: '100%',
    height: '47%',
  },
  checkContainer: {
    borderWidth: 0,
    margin: 0,
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    fontWeight: '300',
    fontSize: 17,
  },
  hashTagContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 5,
    paddingBottom: 0,
  },
  hashtagStyle: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 20,
    height: 30,
    margin: 5,
    marginBottom: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '-7%',
    width: '100%',
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: 'black',
    width: 150,
    height: 35,
  },
});

export default EmotionBottomSheet;
