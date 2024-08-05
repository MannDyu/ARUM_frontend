import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';

type RegionSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegionSelection'>;
type RegionSelectionScreenRouteProp = RouteProp<RootStackParamList, 'RegionSelection'>;

const regions = [
  '서울', '경기', '인천', '대전', '세종', '충청', '대구', '경상',
  '울산', '부산', '광주', '전라', '강원', '제주',
];

const districts: { [key: string]: string[] } = {
  서울: ['송파구', '강서구', '강남구'],
  경기: ['구리시', '수원시'],
  인천: ['남동구', '연수구', '계양구'],
  // ... (다른 지역의 구 정보)
};

const RegionSelection: React.FC = () => {
  const navigation = useNavigation<RegionSelectionScreenNavigationProp>();
  const route = useRoute<RegionSelectionScreenRouteProp>();
  const initialSelectedDistricts = route.params?.selectedDistricts || [];
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(initialSelectedDistricts);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    initialSelectedDistricts.length > 0 ? initialSelectedDistricts[0] : null
  );

  const selectRegion = (region: string) => {
    setSelectedRegion(region);
    setSelectedDistricts([]);
  };

  const selectDistrict = (district: string) => {
    if (selectedDistricts.includes(district)) {
      setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
    } else {
      setSelectedDistricts([...selectedDistricts, district]);
    }
  };

  const applySelection = () => {
    navigation.navigate('FindCenter', { selectedDistricts });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>지역 선택</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>×</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.selectedTagsContainer}>
          {selectedDistricts.map((district, index) => (
            <View key={index} style={styles.selectedTag}>
              <Text style={styles.selectedTagText}>{district} ×</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.regionDistrictContainer}>
          <ScrollView style={styles.regionList} showsVerticalScrollIndicator={false}>
            {regions.map((region, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.regionItem, selectedRegion === region && styles.selectedRegionItem]}
                onPress={() => selectRegion(region)}
              >
                <Text style={[styles.regionItemText, selectedRegion === region && styles.selectedRegionItemText]}>
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
                  style={[styles.districtItem, selectedDistricts.includes(district) && styles.selectedDistrictItem]}
                  onPress={() => selectDistrict(district)}
                >
                  <Text style={[styles.districtItemText, selectedDistricts.includes(district) && styles.selectedDistrictItemText]}>
                    {district}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDistrictsText}>해당 지역에 등록된 구가 없습니다.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applySelection}>
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
    // backgroundColor: 'red'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  selectedTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  selectedTag: {
    backgroundColor: '#EEEEEE',
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
    borderRightWidth: 1,
    borderRightColor: '#E5E5E5',
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
    fontSize: 16,
  },
  selectedRegionItemText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  districtList: {
    flex: 3,
  },
  districtItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedDistrictItem: {
    backgroundColor: '#F0F0F0',
  },
  districtItemText: {
    color: '#333',
    fontSize: 16,
  },
  selectedDistrictItemText: {
    fontWeight: 'bold',
  },
  noDistrictsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  cancelButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RegionSelection;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../navigation/types';

// type RegionSelectionScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   'RegionSelection'
// >;

// type RegionSelectionScreenRouteProp = RouteProp<
//   RootStackParamList,
//   'RegionSelection'
// >;

// const regions = [
//   '서울',
//   '경기',
//   '인천',
//   '대전',
//   '세종',
//   '충청',
//   '대구',
//   '경상',
//   '울산',
//   '부산',
//   '광주',
//   '전라',
//   '강원',
//   '제주',
// ];

// const districts: { [key: string]: string[] } = {
//   서울: ['송파구', '강서구', '강남구'],
//   경기: ['구리시', '수원시'],
//   인천: ['남동구', '연수구', '계양구'],
//   대전: ['동구', '중구', '서구'],
//   세종: ['금남면', '대평동', '부강면'],
//   충청: ['청주시', '천안시', '아산시'],
//   대구: ['중구', '동구', '서구'],
//   경상: ['포항시', '경주시', '김천시'],
//   울산: ['중구', '남구', '동구'],
//   부산: ['해운대구', '부산진구', '남구'],
//   광주: ['동구', '서구', '남구'],
//   전라: ['목포시', '순천시', '여수시'],
//   강원: ['춘천시', '원주시', '강릉시'],
//   제주: ['제주시', '서귀포시'],
//   // More regions and districts...
// };

// const RegionSelection: React.FC = () => {
//   const navigation = useNavigation<RegionSelectionScreenNavigationProp>();
//   const route = useRoute<RegionSelectionScreenRouteProp>();
//   const initialSelectedDistricts = route.params?.selectedDistricts || [];
//   const [selectedDistricts, setSelectedDistricts] = useState<string[]>(
//     initialSelectedDistricts
//   );
//   const [selectedRegion, setSelectedRegion] = useState<string | null>(
//     initialSelectedDistricts.length > 0 ? initialSelectedDistricts[0] : null
//   );

//   const selectRegion = (region: string) => {
//     setSelectedRegion(region);
//     setSelectedDistricts([]); // Reset selected districts when region changes
//   };

//   const selectDistrict = (district: string) => {
//     if (selectedDistricts.includes(district)) {
//       setSelectedDistricts(selectedDistricts.filter((d) => d !== district));
//     } else {
//       setSelectedDistricts([...selectedDistricts, district]);
//     }
//   };

//   const applySelection = () => {
//     navigation.navigate('FindCenter', {
//       selectedDistricts,
//     });
//   };

//   return (
//     <View style={styles.modalContainer}>
//       <View style={styles.modalHeader}>
//         <Text style={styles.modalTitle}>지역 선택</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.closeButton}>×</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.selectedTagsContainer}>
//         {selectedDistricts.map((district, index) => (
//           <View key={index} style={styles.selectedTag}>
//             <Text style={styles.selectedTagText}>{district} ×</Text>
//           </View>
//         ))}
//       </View>
//       <View style={styles.modalContent}>
//         <View style={styles.regionDistrictContainer}>
//           <ScrollView style={styles.regionList} showsVerticalScrollIndicator={false}>
//             {regions.map((region, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.regionItem,
//                   selectedRegion === region && styles.selectedRegionItem,
//                 ]}
//                 onPress={() => selectRegion(region)}
//               >
//                 <Text
//                   style={[
//                     styles.regionItemText,
//                     selectedRegion === region && styles.selectedRegionItemText,
//                   ]}
//                 >
//                   {region}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//           <ScrollView style={styles.districtList}>
//             {selectedRegion && districts[selectedRegion] ? (
//               districts[selectedRegion].map((district, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={[
//                     styles.districtItem,
//                     selectedDistricts.includes(district) &&
//                       styles.selectedDistrictItem,
//                   ]}
//                   onPress={() => selectDistrict(district)}
//                 >
//                   <Text
//                     style={[
//                       styles.districtItemText,
//                       selectedDistricts.includes(district) &&
//                         styles.selectedDistrictItemText,
//                     ]}
//                   >
//                     {district}
//                   </Text>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <Text style={styles.noDistrictsText}>
//                 해당 지역에 등록된 구가 없습니다.
//               </Text>
//             )}
//           </ScrollView>
//         </View>
//       </View>
//       <View style={styles.modalFooter}>
//         <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.buttonText}>취소</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.applyButton} onPress={applySelection}>
//           <Text style={styles.buttonText}>완료</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#FDFDED',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   closeButton: {
//     fontSize: 24,
//     color: '#333',
//   },
//   selectedTagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 10,
//   },
//   selectedTag: {
//     backgroundColor: '#EEEEEE',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginRight: 5,
//     marginBottom: 5,
//   },
//   selectedTagText: {
//     color: '#333',
//     fontSize: 14,
//   },
//   modalContent: {
//     flex: 1,
//   },
//   regionDistrictContainer: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   regionList: {
//     flex: 2,
//     borderRightWidth: 1,
//     borderRightColor: '#E5E5E5',
//   },
//   regionItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   selectedRegionItem: {
//     backgroundColor: '#5A82E6',
//   },
//   regionItemText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   selectedRegionItemText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   districtList: {
//     flex: 3,
//   },
//   districtItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//   },
//   selectedDistrictItem: {
//     backgroundColor: '#F0F0F0',
//   },
//   districtItemText: {
//     color: '#333',
//     fontSize: 16,
//   },
//   selectedDistrictItemText: {
//     fontWeight: 'bold',
//   },
//   noDistrictsText: {
//     fontSize: 16,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5E5',
//   },
//   cancelButton: {
//     backgroundColor: '#333',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//   },
//   applyButton: {
//     backgroundColor: '#333',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 10,
//   },
//   buttonText: {
//     color: '#FFF',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default RegionSelection;