import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  leftButton: string;
  rightButton: string;
  selectedButton: 'left' | 'right';
  onToggle: (button: 'left' | 'right') => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  leftButton,
  rightButton,
  selectedButton,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 'left' && styles.selectedButton,
        ]}
        onPress={() => onToggle('left')}
      >
        <Text style={[
          styles.buttonText,
          selectedButton === 'left' && styles.selectedButtonText,
        ]}>
          {leftButton}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButton === 'right' && styles.selectedButton,
        ]}
        onPress={() => onToggle('right')}
      >
        <Text style={[
          styles.buttonText,
          selectedButton === 'right' && styles.selectedButtonText,
        ]}>
          {rightButton}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  leftButton: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightButton: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#000',
  },
  unselectedButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#fff',
  },
  unselectedButtonText: {
    color: '#000',
  },
});

export default ToggleButton;