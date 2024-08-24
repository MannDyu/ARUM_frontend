import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';

interface RecordDiaryComponentProps {
  emotion: string;
  tags: string[];
  fixedQuestion: string;
  placeholderQuestion: string;
  answer: string;
  onAnswerChange: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const emotions: { [key: string]: any } = {
  기쁨: require('../assets/images/emotion/joy.png'),
  화남: require('../assets/images/emotion/mad.png'),
  슬픔: require('../assets/images/emotion/sad.png'),
  즐거움: require('../assets/images/emotion/playful.png'),
  사랑: require('../assets/images/emotion/love.png'),
  미움: require('../assets/images/emotion/dislike.png'),
  바람: require('../assets/images/emotion/want.png'),
};

const RecordDiaryComponent: React.FC<RecordDiaryComponentProps> = ({ emotion, tags, fixedQuestion, placeholderQuestion, answer, onAnswerChange, onNext, onPrev }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.emoji}>{emoji}</Text> */}
      <Image source={emotions[emotion]} style={styles.emoji} />
      <Text style={styles.fixedQuestion}>{fixedQuestion}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}
          </Text>
        ))}
      </View>
      <TextInput
        style={styles.textArea}
        multiline
        value={answer}
        onChangeText={onAnswerChange}
        placeholder={isFocused ? '' : placeholderQuestion}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="gray"
      />
      {/* <View style={styles.buttonContainer}>
        <Button title="이전" onPress={onPrev} />
        <Button title="다음" onPress={onNext} />
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  emoji: {
    marginTop: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
  fixedQuestion: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#fff',
    padding: 6,
    paddingVertical: 4,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000',
    marginHorizontal: 7,
    width: 70,
    fontSize: 14,
    textAlign: 'center',
  },
  
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'left',
    color: 'gray',
    flexShrink: 1,
  },
  textArea: {
    width: '100%',
    fontSize: 17,
    height: 400,
    padding: 9,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   width: '100%',
  // },
});

export default RecordDiaryComponent;

