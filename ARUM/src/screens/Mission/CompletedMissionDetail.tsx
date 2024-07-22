import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CompletedMissionDetail = () => {
  return (
    <View style={styles.container}>
      <Text>Completed Mission Detail Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CompletedMissionDetail;
