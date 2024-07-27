import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
const { width, height } = Dimensions.get('window');

type SelfTestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelfTest'>;

export default function SelfTest() {
  const navigation = useNavigation<SelfTestScreenNavigationProp>();
  const [showBubble, setShowBubble] = useState(false);
  const [isRetest, setIsRetest] = useState(false);
  
  const toggleBubble = () => {
    setShowBubble(!showBubble);
  };
  const handleStartTest = () => {
    navigation.navigate('TestStart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>우울증 자가진단</Text>
        <Text style={styles.subtitle}>1달마다 나의 마음 상태를 살펴보아요</Text>
      </View>
      
      <View style={styles.content}>
        {isRetest &&
          <View style={styles.infoBar}>
            <View style={styles.infoBarDot} />
            <Text style={styles.infoBarText}>마지막 테스트로부터 30일이 경과했어요!</Text>
          </View>
        }
        
        
        <TouchableOpacity onPress={toggleBubble}>
          <View style={{position:'relative'}}>
          <View style={styles.character}>
            <View style={styles.characterEyes}>
              <View style={styles.characterLeftEye} />
              <View style={styles.characterLeftPupil} />
              <View style={styles.characterRightPupil} />
              <View style={styles.characterRightEye} />
            </View>
          </View>
          </View>
          {showBubble && (
            <View style={{position:'absolute' , bottom:'-15%', left:'-9%'}}>
              <View style={styles.bubbleContainer}>
                <View style={styles.bubbleArrow} />
                <View style={styles.bubble}>
                  <Text style={styles.bubbleText}>자가테스트를 하면</Text>
                  <Text style={styles.bubbleText}>결과 보고서를 받을 수 있어요!</Text>
                </View>
              </View>
            </View>
            
          )}
        </TouchableOpacity>
        
        
      </View>
      <Text style={styles.timeEstimate}>소요시간 약 10분</Text>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('TestStart')}>
          <Text style={styles.startButtonText}>자가진단 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('TestReport', { score: 0 })}>
          <Text style={styles.reportButtonText}>자가진단 결과 보고서</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  header: {
    width: '100%',
    height: height * 0.25,
    backgroundColor: '#6487E5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 15,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBar: {
    width: 311,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    // 그림자 효과
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoBarDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginRight: 10,
  },
  infoBarText: {
    justifyContent:'center',
    textAlign:'center',
    fontSize: 14,
    color: '#333333',
  },


  character: {
    width: 150,
    height: 150,
    backgroundColor: '#FFD700',
    borderRadius: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50,
  },
  characterEyes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 30,
    
  },
  
  characterLeftEye: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    position:'relative'
  },
  characterLeftPupil: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    borderRadius: 15,
    position:'absolute',
    left:'10%'
  },
  characterRightEye: {
    width: 45,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    position:'relative'
  },
  characterRightPupil: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    borderRadius: 15,
    position:'absolute',
    right:'10%',
    zIndex:100
  },
  bubbleContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  bubble: {
    width: 'auto',
    minHeight: 'auto',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // position:'absolute',
    // iOS용 그림자
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android용 그림자
    elevation: 5,
  },
  bubbleArrow: {
    position: 'absolute',
    top: -15,
    left: 92,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    zIndex: 1,
  },
  bubbleText: {
    textAlign:'center',
    fontSize: 16,
    color: '#000000',
  },
  timeEstimate: {
    fontSize: 16,
    color: '#000000',
    textAlign:'center', 
    bottom: 10,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  startButton: {
    backgroundColor: '#6487E5',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  reportButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
});
