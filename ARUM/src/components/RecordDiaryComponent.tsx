import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface RecordDiaryComponentProps {
  emoji: string;
  tags: string[];
  question: string;
  answer: string;
  onAnswerChange: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const RecordDiaryComponent: React.FC<RecordDiaryComponentProps> = ({ emoji, tags, question, answer, onAnswerChange, onNext, onPrev }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.fixedQuestion}>왜 이런 감정을 느꼈나요?</Text>
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
        placeholder={isFocused ? '' : question}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholderTextColor="gray"
      />
      <View style={styles.buttonContainer}>
        <Button title="이전" onPress={onPrev} />
        <Button title="다음" onPress={onNext} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emoji: {
    marginTop: 20,
    fontSize: 50,
    marginBottom: 15,
  },
  fixedQuestion: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
    fontSize: 15,
    textAlign: 'center',
  },
  
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default RecordDiaryComponent;

