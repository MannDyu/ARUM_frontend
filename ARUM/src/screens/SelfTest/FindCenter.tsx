import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import CenterItem from './CenterItem';

type FindCenterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FindCenter'
>;

// Sample data
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
  // Additional data...
];

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
  서울: ['송파구', '강서구', '강남구', '중랑구', '마포구'],
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

export default function FindCenter() {
  const navigation = useNavigation<FindCenterScreenNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectRegion = (region: string) => {
    setSelectedRegion(region);
    setSelectedDistricts([]); // Reset selected districts
  };

  const selectDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const applySelection = () => {
    toggleModal();
    console.log('Selected region:', selectedRegion);
    console.log('Selected districts:', selectedDistricts);
    // Additional logic for selected region and districts
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>심리상담센터 찾기</Text>
      <View style={styles.subtitleContainer}>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={styles.tagsScrollView}
      >
        {selectedDistricts.length === 0 ? (
          <Text style={styles.subtitle}>
            가까운 상담센터를 찾아보세요
          </Text>
        ) : (
          <View style={styles.tagsContainer}>
            {selectedDistricts.map((it, index) => (
              <Text key={index} style={styles.tag}># {it}</Text>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.regionButton} onPress={toggleModal}>
        <Text style={styles.regionButtonText}>지역선택</Text>
      </TouchableOpacity>
    </View>
      {/* <View style={styles.subtitleContainer}>
        <View style={styles.subtitleTextContainer}>
          {selectedDistricts.length === 0 ? (
            <Text style={styles.subtitle}>
              가까운 상담센터를 찾아보세요
            </Text>
          ) : (
            selectedDistricts.map((it, index) => (
              <View style={styles.tagsContainer}>
               <Text key={index} style={styles.tag}># {it}</Text>
              </View> 
            ))
          )}
        </View>
        <TouchableOpacity style={styles.regionButton} onPress={toggleModal}>
          <Text style={styles.regionButtonText}>지역선택</Text>
        </TouchableOpacity>
      </View> */}
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

      {/* Region Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>지역 선택</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
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
                        selectedRegion === region &&
                          styles.selectedRegionItemText,
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
            <View style={styles.selectedTagsContainer}>
              {selectedDistricts.map((district, index) => (
                <View key={index} style={styles.selectedTag}>
                  <Text style={styles.selectedTagText}>{district} ×</Text>
                </View>
              ))}
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={toggleModal}
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
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // subtitleContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginBottom: 10,
  // },
  subtitle: {
    fontSize: 16,
    color: '#333',
  },
  // subtitleTextContainer: {
  //   flex: 1,
  // },
  // selectedDistrictText: {
  //   fontSize: 16,
  //   color: '#333',
  //   marginBottom: 5,
  // },
  // regionButton: {
  //   backgroundColor: '#333',
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  //   borderRadius: 5,
  //   marginLeft: 10, // 왼쪽 텍스트와의 간격
  // },
  regionButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagsScrollView: {
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    //   marginBottom: 10,
    //   paddingVertical: 6,
    //   paddingHorizontal: 12,
  },
  tag: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
    padding: 6,
    paddingVertical: 4,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 7,
    textAlign: 'center',
  },
  regionButton: {
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },

  centerList: {
    paddingBottom: 20,
  },
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
    backgroundColor: '#E6E6FA', // Background color for selected items
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
  // tagsContainer: {
  //   flexDirection: 'row',
  //   marginBottom: 10,
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  // },
  // tag: {
  //   fontSize: 14,
  //   color: '#333',
  //   marginBottom: 5,
  //   backgroundColor: '#fff',
  //   padding: 6,
  //   paddingVertical: 4,
  //   borderRadius: 13,
  //   borderWidth: 1,
  //   borderColor: '#000',
  //   marginHorizontal: 7,
  //   // width: 'fit-cent',
  //   // fontSize: 14,
  //   textAlign: 'center',
  // },
});


