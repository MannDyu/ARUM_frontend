import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity, ScrollView} from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { SelfTestStackParamList } from '../../assets/SelfTestTypes';
import CenterItem from './CenterItem';

type FindCenterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FindCenter'>;

// 샘플 데이터
const centerData = [
  {
    name: '상담센터 A',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-123-4567',
  },
  {
    name: '상담센터 B',
    address: '서울특별시 서초구 강남대로 456',
    phone: '02-987-6543',
  },
  // 추가적인 상담센터 데이터
];



export default function FindCenter() {
  const navigation = useNavigation<FindCenterScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>심리상담센터 찾기</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>가까운 상담센터를 찾아보세요</Text>
        <TouchableOpacity style={styles.regionButton}>
          <Text style={styles.regionButtonText}>지역선택</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.centerList}>
        {centerData.map((center, index) => (
          <CenterItem
            key={index}
            name={center.name}
            address={center.address}
            phone={center.phone}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
  regionButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  regionButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  centerList: {
    paddingBottom: 20,
  },
});