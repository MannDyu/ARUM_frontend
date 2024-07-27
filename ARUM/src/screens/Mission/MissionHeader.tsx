import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface MissionHeaderProps {
  title: string;
  onBack?: () => void;
  rightButton?: React.ReactNode;
}

const MissionHeader: React.FC<MissionHeaderProps> = ({ title, onBack, rightButton }) => (
  <View style={styles.header}>
    {onBack && (
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={24} color="#000"/>
        {/* <Text style={styles.backButtonText}>{'<'}</Text> */}
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    {rightButton && <View style={styles.rightButton}>{rightButton}</View>}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: '#FDFDED',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightButton: {
    position: 'absolute',
    right: 15,
  },
});

export default MissionHeader;