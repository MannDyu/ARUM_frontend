import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface LoadingBarProps {
  pageNum: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ pageNum }) => {
  // Calculate the width of the loading bar based on the pageNum
  const loadingWidth:any = `${(pageNum / 4) * 100}%`;

  return (
    <View style={styles.container }>
      <Text style={styles.status}>{pageNum * 5} / 20</Text>
      <View style={styles.barContainer}>
        <View style={[styles.loadingBar, { width: loadingWidth }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#FDFDED',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  barContainer: {
    height: 15,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'black',
    position: 'relative',
  },
  loadingBar: {
    height: '100%',
    backgroundColor: '#F6BF7D',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  status: {
    position: 'absolute', 
    top: -5,
    right: 50,
  },
});

export default LoadingBar;