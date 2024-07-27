import React from 'react';
import { View, StyleSheet,  Dimensions } from 'react-native';
import { Overlay, Text, Button } from '@rneui/themed';

const { width, height } = Dimensions.get('window');


interface PopupProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title : string;
  description : string;
}


const Popup: React.FC<PopupProps> = ({ isVisible, onConfirm, onCancel, title, description }) => {
  return (
    <Overlay 
      isVisible={isVisible} 
      onBackdropPress={onCancel}
      overlayStyle={styles.overlay}
      backdropStyle={styles.backdrop}
    >
      <View style={styles.popupContainer}>
        <Text style={styles.popupTitle}>{title}</Text>
        <Text style={styles.popupText}>
          {description}
        </Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="취소" 
            onPress={onCancel} 
            type="clear" 
            titleStyle={styles.cancelButtonText}
            containerStyle={styles.button} 
          />
          <Button 
            title="확인" 
            onPress={onConfirm} 
            containerStyle={styles.button}
            buttonStyle={styles.confirmButton}
          />
        </View>
      </View>
    </Overlay>
  );
};



const styles = StyleSheet.create({
  overlay: {
    width: 310,
    height: 158,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 0,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popupTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
  },
  popupText: {
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
  confirmButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#000000',
  },
});


export default Popup;