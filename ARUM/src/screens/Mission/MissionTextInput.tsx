import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface MissionTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const MissionTextInput: React.FC<MissionTextInputProps> = ({ value, onChangeText }) => (
  <TextInput
    style={styles.textInput}
    multiline
    placeholder="어떻게 미션을 완료했는지 간단하게 기록해보세요.."
    placeholderTextColor="#AFAFAF"
    value={value}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  textInput: {
    height: 100,
    borderTopWidth: 1,
    borderColor: '#000000',
    paddingTop: 10,
    fontSize: 17,
    textAlignVertical: 'top',
  },
});

export default MissionTextInput;