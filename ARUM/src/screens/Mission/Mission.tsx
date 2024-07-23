import React from 'react';
import { Text, View } from 'react-native';
import DailyMission from './DailyMission';
// import SelectSection from './SelectSection';
import MissionPopup from './MissionPopUp';

const Mission = () => {
  return (
    <View>
      <Text>Mission</Text>
      <DailyMission />
      {/* <SelectSection /> */}
    </View>
  );
};

export default Mission;