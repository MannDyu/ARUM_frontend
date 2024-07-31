import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

const options = [
  "극히 드물다\n(일주일 동안\n1일 이하)",
  "가끔 있었다\n(일주일 동안\n1-2일)",
  "종종 그랬다\n(일주일 동안\n3-4일)",
  "대부분 그랬다\n(일주일 동안\n5일 이상)"
];

interface SelectItemOptionProps {
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
  label: string;
}

const SelectItemOption: React.FC<SelectItemOptionProps> = ({ index, isSelected, onSelect, label }) => (
  <View style={styles.optionContainer}>
    <CheckBox
      checked={isSelected}
      onPress={() => onSelect(index)}
      containerStyle={styles.radioButton}
      checkedIcon={<View style={styles.checkedIcon} />}
      uncheckedIcon={<View style={styles.uncheckedIcon} />}
      size={30}
    />
    <Text style={styles.contentText}>{label}</Text>
  </View>
);

interface SelectItemProps {
  onSelect: (index: number) => void;
}

const SelectItem: React.FC<SelectItemProps> = ({ onSelect }) => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleSelection = (index: number) => {
    setSelectedItem(index);
    onSelect(index);  // 부모 컴포넌트에 선택된 인덱스 전달
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <SelectItemOption
          key={index}
          index={index}
          isSelected={selectedItem === index}
          onSelect={handleSelection}
          label={option}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  optionContainer: {
    alignItems: 'center',
    marginVertical: 5,
    display: 'flex',
    justifyContent: 'center'
  },
  contentText: {
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'center',
    margin: 10,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    width: 50,
    height: 50,
    position: 'relative',
  },
  checkedIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#6487E5',
    borderRadius: 50,
    position: 'absolute',
    top: -6,
    left: -6,
  },
  uncheckedIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
  },
});

export default SelectItem;