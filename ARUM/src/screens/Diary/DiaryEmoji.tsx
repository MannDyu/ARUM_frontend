import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {Button, CheckBox} from '@rneui/themed';
import Header from '../../components/Header';
import Popup from '../../components/Popup';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { DiaryScreenNavigationProp } from '../../navigation/types';

const emojis = [
  "😭",
  "😩",
  "😕",
  "😚",
  "😆"
];


export default function DiaryEmoji() {
  const navigation = useNavigation<DiaryScreenNavigationProp>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [isEmoji, setEmoji] = useState<number | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      setEmoji(null);
    }, [])
  );

  const handleCancel = () => {
    setIsPopupVisible(false);
  };

  const handleConfirm = () => {
    setIsPopupVisible(false);
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: '#FDFDED', height: '100%' }}>
      <Header title="오늘의 기분" onBack={() => setIsPopupVisible(true)} rightButton={
          <Popup 
            isVisible={isPopupVisible}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            title={''}
            description={'작성 중인 페이지를 벗어나시겠습니까?\n기록은 저장되지 않습니다.'}
          />
        }
      />
      <View style={styles.wholeContainer}>
        <View style={styles.emojiContainer}>
          <View style={styles.select}>
            <Text style={{ fontSize: 18, margin: 10, marginTop: 40 }}>오늘 기분이 어땠나요?</Text>
            <View style={styles.emojiImage}>
              {(isEmoji!==null) ? //! 텍스트가 아니라 View로 이미지 불러와야함
                <Text style={styles.emojiText}>
                  {emojis[isEmoji]}
                </Text> :
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{`기분을\n선택해주세요`}</Text>
              }
            </View>
            <View style={styles.horizontalLine}/>
            <View style={styles.selectEmoji}>
              <Text style={{ fontSize: 18, margin: 0 }}>기분 선택</Text>
              <View style={styles.emojis}>
                {emojis.map((emoji, index) => ( //! 텍스트가 아니라 View로 이미지 불러와야함
                  <CheckBox 
                    key={index}
                    checked={isEmoji === index}
                    onPress={() => setEmoji(isEmoji === index ? null : index)}
                    checkedIcon={<View><Text style={styles.emojiText}>{emoji}</Text></View>}
                    uncheckedIcon={<View><Text style={styles.emojiText}>{emoji}</Text></View>}
                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="이전"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          onPress={() => navigation.navigate('Diary')}
          />
        <Button
          title="다음"
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
          onPress={() => navigation.navigate('DiaryEmotion')} //! 선택되면 활성화 -> 선택되어야 넘어가야함!!
          disabled={isEmoji !== null ? false : true}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wholeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  emojiContainer: {
    backgroundColor: 'white',
    height: '90%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: -40,
  },
  select: {
    height: '75%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  emojiImage: {
    width: 200,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 300,
    margin: 5,
    backgroundColor: '#D9D9D9',
  },
  horizontalLine: {
    width: 350,
    height: 1,
    backgroundColor: '#DFDFDF',
    margin: '5%',
  },
  selectEmoji: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojis: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emojiText: {
    fontSize: 40,
    margin: -10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    textAlign: 'center',
    paddingBottom: 20, 
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
});