import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FindCenter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>가까운 상담센터 찾기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FindCenter;
