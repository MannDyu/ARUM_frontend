import { Text, View } from 'react-native';
import React, { Component } from 'react';
import DailyMission from './DailyMission';
import SelectSection from './SelectSection';

export default class Mission extends Component {
  //! 네비게이션이 안 돼서 Mission.tsx자체에서 select section 렌더링
  render() {
    return (
      <View>
        <Text>Mission</Text>
        <DailyMission /> 
        {/* <SelectSection /> */}
      </View>
    )
  }
}