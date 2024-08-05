import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { LinearProgress } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps, SelfTestScreenNavigationProp } from '../../navigation/types'; 


const { width, height } = Dimensions.get('window');

const TestLoading: React.FC<RootStackScreenProps<'TestLoading'>> = ({ route }) => {
  const navigation = useNavigation<SelfTestScreenNavigationProp>();
  const { score } = route.params;


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TestReport', { score });
    }, 6000); // 6초 후 TestReport로 이동

    return () => clearTimeout(timer);
  }, [navigation, score]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{fontSize: 18}}>결과 분석 중입니다...</Text>
        
        <Image
          source={require('../../assets/images/selfTest/loading.png')}
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
export default TestLoading;