import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { Button, CheckBox } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 5%;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin: 10px;
`;

const SelectSection = () => {
  const [selectedArea, setSelectedArea] = React.useState<string>('none');
  type RootStackParamList = {
    DailyMission: { selectedArea: string };
  };
  const options = [
    { title: '일상', value: 'daily' },
    { title: '운동', value: 'exercise' },
    { title: '취미', value: 'hobby' },
    { title: '나', value: 'me' },
    { title: '청결', value: 'tidy' }
  ];
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SelectSection'>>(); //! 네비게이션 변수

  useFocusEffect( // 화면을 벗어나면 리셋
    React.useCallback(() => {
      setSelectedArea('none');
    }, [])
  );

  //! Back 아이콘에 navigation 존재!
  return (
    <View style={{ alignItems: 'center', backgroundColor: '#FDFDED', height: 1200 }}>
      <TitleContainer>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: -100,
          }}
        >
          <Icon name="arrow-back" size={24} color="#000"/>
        </TouchableOpacity>
        <Title>랜덤 미션 선택</Title>
      </TitleContainer>
      <View>
        {options.map((option) => {
          const isSelected = selectedArea === option.value || selectedArea === 'none';
          return (
            <CheckBox
              key={option.value}
              title={option.title}
              checked={isSelected}
              onPress={() => setSelectedArea(isSelected && selectedArea !=='none' ? 'none' : option.value)}
              containerStyle={{
                backgroundColor: isSelected ? 'white' : 'lightgrey',
                borderWidth: 1,
                borderColor: 'darkgrey',
                borderRadius: 13,
                padding: 20,
                margin: 12,
                width: 300,
                alignItems: 'center',
                ...(isSelected && selectedArea !== 'none' ? {
                  ...Platform.select({
                    ios: {
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 0.5,
                    },
                    android: {
                      elevation: 5,
                    },
                  }),
                } : {}),
              }}
              textStyle={{
                color: isSelected ? 'black' : 'grey',
                fontWeight: '300',
                fontSize: 18,
              }}
              checkedIcon={<View />} // 빈 View 컴포넌트로 아이콘 없애기
              uncheckedIcon={<View />}
            />
          );
        })}
      </View>
      <Button
        title="완료"
        onPress={() => navigation.navigate('DailyMission', { selectedArea })} //! 네비게이션 지정!!
        containerStyle={{
          marginBottom: 20,
          marginTop: 12,
          width: 300,
          height: 45,
          justifyContent: 'center',
          backgroundColor: 'black',
          borderRadius: 10,
        }}
        titleStyle={{
          color: 'white',
        }}
        buttonStyle={{
          backgroundColor: 'black',
        }}
      />
    </View>
  )
};

export default SelectSection;
