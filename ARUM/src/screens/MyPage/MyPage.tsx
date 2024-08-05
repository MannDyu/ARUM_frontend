import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function MyPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>마이페이지</Text>
      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 10, marginBottom: 10 }}>회원정보</Text>
        <View style={styles.profile}>
          <Text style={styles.profileId}>{`아이디`}</Text>
          <Text style={styles.profileNickName}>{`닉네임 님`}</Text>
          <View style={styles.profileButtons}>
            <Button
              title="정보수정"
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.containerStyle}
              onPress={() => navigation.navigate('Home')}
            />
            <Button
              title="로그아웃"
              buttonStyle={styles.buttonStyle}
              containerStyle={styles.containerStyle}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        </View>
      </View>
      <View style={styles.navigating}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 10, marginBottom: 0 }}>어루만짐 {`1일째`}</Text>
        <View style={styles.navigatingButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.profileId}>감정일기</Text>
              <Icon name="chevron-forward-outline" size={24} color="#999" />
            </View>
            <Text style={styles.description}>{`1번의 감정기록`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={styles.profileId}>일일미션</Text>
              <Icon name="chevron-forward-outline" size={24} color="#999" />
            </View>
            <Text style={styles.description}>{`1번의 시도`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.advertisement}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            source={require('../../assets/images/block.png')}
            style={styles.image}
          />
          <Icon name="chevron-forward-outline" size={24} color="white" />
        </View>
        <Text style={styles.noAds}>광고 제거 상품</Text>
        <Text style={styles.noAdsDes}>어루만짐을 광고 없이 편하게 이용할 수 있어요!</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#FFFFEB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profile: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  profileId: {
    fontWeight: '600',
    fontSize: 20,
    margin: 5,
  },
  profileNickName: {
    fontSize: 17,
    fontWeight: '200',
    color: "#646464"
  },
  profileButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    width: 120,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#353535',
    marginHorizontal: 10,
    marginTop: 20,
  },
  containerStyle: {

  },
  navigating: {
    width: '100%',
    marginTop: 20,
  },
  navigatingButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    backgroundColor: 'white',
    width: '47%',
    margin: 10,
    padding: 20,
  },
  description: {
    fontSize: 17,
    margin: 5,
    fontWeight: '200',
  },
  advertisement: {
    borderRadius: 20,
    padding: 20,
    width: '100%',
    backgroundColor: '#6487E5',
    color: 'white',
  },
  image: {
    width: 24,
    height: 24,
  },
  noAds: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    marginVertical: 10,
  },
  noAdsDes: {
    color: 'white',
    fontSize: 15,
  }
})