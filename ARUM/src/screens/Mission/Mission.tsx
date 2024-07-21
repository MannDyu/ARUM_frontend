import { Text, View } from 'react-native';
import React, { Component } from 'react';
import DailyMission from './DailyMission';

export default class Mission extends Component {
  render() {
    return (
      <View>
        <Text>Mission</Text>
        <DailyMission />
      </View>
    )
  }
}