import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, onPress, disabled = false }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#C8C8C8',
  },
  disabledButtonText: {
    color: '#888888',
  },
});
export default ActionButton;