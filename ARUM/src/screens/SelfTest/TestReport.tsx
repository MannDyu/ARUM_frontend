import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '../../navigation/types';
import Popup from '../../components/Popup';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

type TestReportProps = RootStackScreenProps<'TestReport'>;

const TestReport: React.FC<TestReportProps> = ({ route, navigation }) => {
  const score = route.params?.score ?? 0;

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const renderAdvice = () => {
    if (score <= 15) {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../assets/images/selfTest/best.png')} style={styles.image} />
          <Text style={styles.score}>{score}점</Text>
          <Text style={styles.adviceTitle}>편안한 상태</Text>
          <Text style={styles.adviceText}>
            지속적으로 정신건강에 관심을 갖고 예방을 위해 연 1회 정기검사도 잊지 마세요.
          </Text>
        </View>
      );
    } else if (score <= 24) {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../assets/images/selfTest/soso.png')} style={styles.image} />
          <Text style={styles.score}>{score}점</Text>
          <Text style={styles.adviceTitle}>가벼운 우울감</Text>
          <Text style={styles.adviceText}>
            우울증 예방을 위해 운동, 여가활동, 대인관계 맺기 등 즐거움을 주는 활동에 참여해보세요.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../assets/images/selfTest/bad.png')} style={styles.image} />
          <Text style={styles.score}>{score}점</Text>
          <Text style={styles.adviceTitle}>다양한 우울증상</Text>
          <Text style={styles.adviceText}>
            일상생활에 영향을 주고 있는 상태입니다. 이러한 상태가 2주 이상 지속된다면 반드시 전문가의 상담을 받아보세요.
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsPopupVisible(true)} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>자가진단 테스트 결과보고서</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            당신의 우울증 자가진단 결과점수는
          </Text>
          {renderAdvice()}
          {score >= 16 && (
            <TouchableOpacity
              style={styles.findCenterButton}
              onPress={() => navigation.navigate('FindCenter')}
            >
              <Text style={styles.findCenterButtonText}>가까운 상담센터 찾기</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => navigation.navigate('SelfTestMain')}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Popup
        isVisible={isPopupVisible}
        title="주의"
        description='자가진단 페이지를 벗어나시겠습니까? 답변은 저장되지 않습니다.'
        onConfirm={() => { 
          setIsPopupVisible(false);
          navigation.navigate('SelfTestMain');
        }}
        onCancel={() => {
          setIsPopupVisible(false);
        }}
      />
    </View>
  );
};

export default TestReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  header: {
    width: '100%',
    height: height * 0.2,
    backgroundColor: '#6487E5',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row', 
  },
  backButton: {
    position: 'absolute',
    left: 25,
    top: 82,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1, 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    padding: 55,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 0.7,
    elevation: 2,
    alignItems: 'center',
    marginTop: 0,
    overflow: 'hidden',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center', 
    width: '100%',
  },
  adviceContainer: {
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  adviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    textAlign: 'center', 
  },
  adviceText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center', 
  },
  findCenterButton: {
    backgroundColor: '#6487E5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 220,
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  findCenterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  completeButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    width: 220,
    height: 40,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  completeButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: 240, 
    height: 190, 
    marginBottom: 10,
    resizeMode: 'contain',
  },
});








