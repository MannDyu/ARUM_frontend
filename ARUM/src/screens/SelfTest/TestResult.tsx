import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

interface TestResultProps {
  route: RouteProp<RootStackParamList, 'TestResult'>;
}

const TestResult: React.FC<TestResultProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { score } = route.params;

  const renderAdvice = () => {
    if (score <= 15) {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../../assets/happy.png')} style={styles.image} />
          <Text style={styles.score}>11점</Text>
          <Text style={styles.adviceTitle}>편안한 상태</Text>
          <Text style={styles.adviceText}>
            지속적으로 정신건강에 관심을 갖고 예방을 위해 연 1회 정기검사도 잊지 마세요.
          </Text>
        </View>
      );
    } else if (score <= 24) {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../../assets/bored.png')} style={styles.image} />
          <Text style={styles.score}>20점</Text>
          <Text style={styles.adviceTitle}>가벼운 우울감</Text>
          <Text style={styles.adviceText}>
            우울증 예방을 위해 운동, 여가활동, 대인관계 맺기 등 즐거움을 주는 활동에 참여해보세요.
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.adviceContainer}>
          <Image source={require('../../../assets/severe.png')} style={styles.image} />
          <Text style={styles.score}>51점</Text>
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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>자가진단 테스트 결과보고서</Text>
      </View>
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
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.completeButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#FDFDED',
  },
  
  headerContainer: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#ffffff',
    padding: 55,
    borderRadius: 10,
    elevation: 2,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  adviceContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  adviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  adviceText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  findCenterButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  findCenterButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  completeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  });

  export default TestResult;