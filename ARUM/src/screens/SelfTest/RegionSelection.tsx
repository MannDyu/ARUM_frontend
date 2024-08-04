import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type RegionSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RegionSelection'
>;

type RegionSelectionScreenRouteProp = RouteProp<
  RootStackParamList,
  'RegionSelection'
>;

const regions = [
  '서울',
  '경기',
  '인천',
  '대전',
  '세종',
  '충청',
  '대구',
  '경상',
  '울산',
  '부산',
  '광주',
  '전라',
  '강원',
  '제주',
];

const districts: { [key: string]: string[] } = {
  서울: ['송파구', '강서구', '강남구'],
  경기: ['구리시', '수원시'],
  인천: ['남동구', '연수구', '계양구'],
  대전: ['동구', '중구', '서구'],
  세종: ['금남면', '대평동', '부강면'],
  충청: ['청주시', '천안시', '아산시'],
  대구: ['중구', '동구', '서구'],
  경상: ['포항시', '경주시', '김천시'],
  울산: ['중구', '남구', '동구'],
  부산: ['해운대구', '부산진구', '남구'],
  광주: ['동구', '서구', '남구'],
  전라: ['목포시', '순천시', '여수시'],
  강원: ['춘천시', '원주시', '강릉시'],
  제주: ['제주시', '서귀포시'],
  // More regions and districts...
};

const RegionSelection: React.FC = () => {
  const navigation = useNavigation<RegionSelectionScreenNavigationProp>();
  const route = useRoute<RegionSelectionScreenRouteProp>();
  const initialSelectedDistricts = route.params?.selectedDistricts || [];
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(
    initialSelectedDistricts
  );
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    initialSelectedDistricts.length > 0 ? initialSelectedDistricts[0] : null
  );

  const selectRegion = (region: string) => {
    setSelectedRegion(region);
    setSelectedDistricts([]); // Reset selected districts when region changes
  };

  const selectDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const applySelection = () => {
    navigation.navigate('FindCenter', {
      selectedDistricts,
    });
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>지역 선택</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectedTagsContainer}>
        {selectedDistricts.map((district, index) => (
          <View key={index} style={styles.selectedTag}>
            <Text style={styles.selectedTagText}>{district} ×</Text>
          </View>
        ))}
      </View>
      <View style={styles.modalContent}>
        <View style={styles.regionDistrictContainer}>
          <ScrollView
            style={styles.regionList}
            showsVerticalScrollIndicator={false}
          >
            {regions.map((region, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.regionItem,
                  selectedRegion === region && styles.selectedRegionItem,
                ]}
                onPress={() => selectRegion(region)}
              >
                <Text
                  style={[
                    styles.regionItemText,
                    selectedRegion === region && styles.selectedRegionItemText,
                  ]}
                >
                  {region}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView style={styles.districtList}>
            {selectedRegion && districts[selectedRegion] ? (
              districts[selectedRegion].map((district, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.districtItem,
                    selectedDistricts.includes(district) &&
                      styles.selectedDistrictItem,
                  ]}
                  onPress={() => selectDistrict(district)}
                >
                  <Text
                    style={[
                      styles.districtItemText,
                      selectedDistricts.includes(district) &&
                        styles.selectedDistrictItemText,
                    ]}
                  >
                    {district}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDistrictsText}>
                해당 지역에 등록된 구가 없습니다.
              </Text>
            )}
          </ScrollView>
          </View>
      </View>
      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={applySelection}
        >
          <Text style={styles.applyButtonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FDFDED',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 28,
    color: '#333',
  },
  modalContent: {
    backgroundColor: '#FDFDED',
    flex: 1,
    paddingHorizontal: 20,
  },
  regionDistrictContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionList: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#CCC',
  },
  regionItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#F0F0F0',
  },
  selectedRegionItem: {
    backgroundColor: '#5A82E6',
  },
  regionItemText: {
    color: '#666',
  },
  selectedRegionItemText: {
    color: '#FFF',
  },
  districtList: {
    flex: 2,
    paddingLeft: 10,
  },
  districtItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  districtItemText: {
    color: '#666',
    fontSize: 16,
  },
  selectedDistrictItem: {
    backgroundColor: '#E6E6FA',
  },
  selectedDistrictItemText: {
    fontWeight: 'bold',
    color: '#333',
  },
  noDistrictsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedTag: {
    backgroundColor: '#EEE',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  selectedTagText: {
    color: '#333',
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default RegionSelection;