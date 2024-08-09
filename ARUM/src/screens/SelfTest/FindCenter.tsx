import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import CenterItem from './CenterItem';
import Header from '../../components/Header';
import axios from 'axios';
import {API_URL} from '../../api_url'



interface CenterData {
  hp_name: string;
  hp_address: string;
  hp_phone: string;
}

type FindCenterNavigationProp = StackNavigationProp<RootStackParamList, 'FindCenter'>;

export default function FindCenter() {
  // const navigation = useNavigation<FindCenterScreenNavigationProp>();
  const navigation = useNavigation<FindCenterNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [centers, setCenters] = useState<CenterData[]>([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const selectCity = async (city: string) => {
    setSelectedCity(city);
    setSelectedDistricts([]);
    try {
      const response = await axios.post(`${API_URL}/selfTest/getDistrict`, { city });
      setDistricts(response.data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const selectDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const applySelection = async () => {
    toggleModal();
    if (selectedCity && selectedDistricts.length > 0) {
      try {
        const response = await axios.post<CenterData[]>(`${API_URL}/selfTest/getCenterInfo`, {
          city: selectedCity,
          district1: selectedDistricts[0],
          district2: selectedDistricts[1] || '',
          district3: selectedDistricts[2] || '',
        });
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching centers:', error);
      }
    }
  };

  const handleBackPress = () => {
    navigation.navigate('HomeMain');
  };

  useEffect(() => {
    // 초기 센터 정보 로드 (서울 강남구)
    const fetchInitialCenters = async () => {
      try {
        const response = await axios.get<CenterData[]>(`${API_URL}/selfTest/getCenterInfo`);
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching initial centers:', error);
      }
    };
    fetchInitialCenters();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="심리상담센터 찾기"
        onBack={handleBackPress}
      />
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
      <ScrollView contentContainerStyle={styles.centerList}>
        {centers.map((center, index) => (
          <CenterItem
            key={index}
            name={center.hp_name}
            address={center.hp_address}
            phone={center.hp_phone}
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
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>지역 선택</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectedTagsContainer}>
            {selectedDistricts.length === 0 &&
            <Text>지역을 선택해주세요.</Text>
            }
            {selectedDistricts.map((district, index) => (
              <View key={index} style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>{district} ×</Text>
              </View>
            ))}
          </View>
          <View style={styles.modalContent}>
            <View style={styles.regionDistrictContainer}>
              <ScrollView style={styles.regionList}>
                {['서울', '경기', '인천', '대전', '세종', '충청', '대구', '경상', '울산', '부산', '광주', '전라', '강원', '제주'].map((city, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.regionItem,
                      selectedCity === city && styles.selectedRegionItem,
                    ]}
                    onPress={() => selectCity(city)}
                  >
                    <Text
                      style={[
                        styles.regionItemText,
                        selectedCity === city && styles.selectedRegionItemText,
                      ]}
                    >
                      {city}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.districtList}>
                {districts.map((district, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.districtItem,
                      selectedDistricts.includes(district) && styles.selectedDistrictItem,
                    ]}
                    onPress={() => selectDistrict(district)}
                  >
                    <Text
                      style={[
                        styles.districtItemText,
                        selectedDistricts.includes(district) && styles.selectedDistrictItemText,
                      ]}
                    >
                      {district}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applySelection}>
              <Text style={styles.buttonText}>완료</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    paddingLeft:20,
    paddingRight:20,
    fontSize: 16,
    color: '#333',
  },
  tagsScrollView: {
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  regionButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  centerList: {
    paddingLeft:20,
    paddingBottom: 20,
    paddingRight: 20
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  modalContent: {
    flex: 1,
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
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
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
  regionDistrictContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  regionList: {
    flex: 2,
    backgroundColor: '#DEDEDE',
  },
  regionItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    flex: 3,
    backgroundColor: '#FFFFFF',
  },
  districtItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
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
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  
});