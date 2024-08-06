import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform} from 'react-native';
import styled from 'styled-components/native';
import { Button, CheckBox } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { MissionStackScreenProps } from '../../assets/MissionTypes';
import axios from 'axios';
import { API_URL } from '../../api_url';

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 5%;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 10px;
`;

const SelectSection = () => {
  const [selectedArea, setSelectedArea] = useState<string>('none');
  type RootStackParamList = {
    DailyMission: { selectedArea: string; questData: any };
  };
  const options = [
    { title: '일상', value: 'dy' },
    { title: '운동', value: 'ex' },
    { title: '취미', value: 'hb' },
    { title: '나', value: 'me' },
    { title: '청결', value: 'cl' }
  ];
  
  const navigation = useNavigation<MissionStackScreenProps<'SelectSection'>['navigation']>();
  
  useFocusEffect(
    React.useCallback(() => {
      setSelectedArea('none');
    }, [])
  );
  
  return (
    <View style={{ flex:1, alignItems: 'center', backgroundColor: '#FDFDED', width: '100%', height: '100%',}}>
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
      <Text style={{ fontSize: 16, margin: 10 }}>어떤 영역을 시도해볼까요?</Text>
      <View>
        {options.map((option) => {
          const isSelected = selectedArea === option.value || selectedArea === 'none';
          return (
            <CheckBox
              key={option.value}
              title={option.title}
              checked={isSelected}
              onPress={() => {
                console.log(`previous SelectedArea: ${selectedArea}`);
                setSelectedArea(isSelected && selectedArea !=='none' ? 'none' : option.value);
              }}
              containerStyle={{
                backgroundColor: isSelected ? 'white' : 'lightgrey',
                borderWidth: 1,
                borderColor: 'darkgrey',
                borderRadius: 13,
                padding: 17,
                margin: 10,
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
              checkedIcon={<View />}
              uncheckedIcon={<View />}
            />
          );
        })}
      </View>
      <Button
        title="완료"
        onPress={() => {
          console.log(`SelectedArea: ${selectedArea}`);
          if (selectedArea !== 'none') {
            axios.post(`${API_URL}/quest/randomQuest/`, {
              qs_theme: selectedArea,
            }).then(response => {
              console.log(`response data: ${JSON.stringify(response.data)}`)
              // navigation.navigate('MissionMain', { selectedArea, questData: response.data }); //! mission 으로 넘어가야하나?
              navigation.navigate('DailyMission', { questData: response.data }); 
            }).catch(error => {console.log(error)});
          } else {
            console.log('선택되지 않음');
          }
        }}
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
