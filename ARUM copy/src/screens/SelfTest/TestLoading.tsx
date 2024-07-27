import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import { LinearProgress } from 'react-native-elements';


const { width, height } = Dimensions.get('window');
type SelfTestScreenNavigationProp = StackNavigationProp<SelfTestStackParamList, 'SelfTest'>;


export default function TestLoading() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{fontSize: 18}}>결과 분석 중입니다...</Text>
        
        <Image
          source={require('../../assets/images/test.png')}
          style={styles.image}
        />
        <LinearProgress color="black" variant='indeterminate' style={{width:'90%', height:13, borderRadius:15}}/>
      </View>
      
    </SafeAreaView>
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.9,
    height: height * 0.3,
    resizeMode: 'contain',
  }
})