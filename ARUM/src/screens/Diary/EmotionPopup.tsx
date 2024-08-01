import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Overlay } from 'react-native-elements';

interface EmotionPopupProps {
  isPopupVisible: boolean;
  removePopup: () => void;
}

const EmotionPopup: React.FC<EmotionPopupProps> = ({ isPopupVisible, removePopup }) => {
  return (
    <Overlay
      isVisible={isPopupVisible}
      onBackdropPress={removePopup}
      overlayStyle={styles.overlay}
    >
      <View style={styles.popupContainer}>
        <Text style={styles.text}>감정은</Text>
        <Text style={styles.text}><Text style={styles.boldText}>3개까지</Text> 선택할 수 있어요!</Text>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 15,
    backgroundColor: 'black',
  },
  popupContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '300',
    margin: 5,
    color: 'white',
  },
  boldText: {
    fontWeight: '800',
  },
})

export default EmotionPopup;