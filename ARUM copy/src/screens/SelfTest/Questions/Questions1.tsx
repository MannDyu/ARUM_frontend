import React from 'react';
import { StyleSheet, View } from 'react-native';
import TestItem from '../TestItem';

const Question1 = () => {
  console.log('작동 Question1')
  return (
    <View>
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={1} />
      <TestItem question={`먹고 싶지 않고 식욕이 없다`} questionNum={2} />
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={3} />
      <TestItem question={`어느 누가 도와준다 하더라도\n울적한 기분을 떨쳐 버릴 수 없을 것 같다.`} questionNum={4} />
      <TestItem question={`아무렇지도 않던 일들이\n괴롭고 귀찮게 느껴졌다`} questionNum={5} />
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default Question1;