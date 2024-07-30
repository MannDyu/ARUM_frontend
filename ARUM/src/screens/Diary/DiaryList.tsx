import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import DateDrawer from './DateDrawer';
import Icon from 'react-native-vector-icons/AntDesign';

const DiaryList: React.FC = () => {
  const [isDateDrawerVisible, setIsDateDrawerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState({ year: 2024, month: 7 });

  const handleDateSelect = (year: number, month: number) => {
    setSelectedDate({ year, month });
    setIsDateDrawerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
              {selectedDate.year}. {selectedDate.month.toString().padStart(2, '0')}
          </Text>
          <TouchableOpacity onPress={() => setIsDateDrawerVisible(true)}>  
            <Icon name="calendar" size={24} color="black" style={{marginLeft:8}} />
          </TouchableOpacity>
          {/* <View style={styles.dateArrow} /> */}
          
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabButtonText}>감정일기</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={[styles.tabButton, styles.tabButtonInactive]}>
          <Text style={styles.tabButtonText}>감정 리포트</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.diaryList}>
        <View style={styles.diaryItem}>
          <View style={styles.diaryDate}>
            <View style={styles.diaryDateDot} />
            <Text style={styles.diaryDateText}>15 (월)</Text>
          </View>
          <View style={styles.diaryContent}>
            <View style={styles.diaryEmoji}>
              <Text style={styles.diaryEmojiText}>😠</Text>
            </View>
            <View style={styles.diaryInfo}>
              <Text style={styles.diaryTitle}>2024.07.15 감정일기</Text>
              <View style={styles.diaryTags}>
                <Text style={styles.diaryTag}>#속상한</Text>
                <Text style={styles.diaryTag}>#괴로운</Text>
                <Text style={styles.diaryTag}>#슬픈한</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/home-icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/diary-icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>감정일기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/mission-icon.png')} style={styles.navIcon} />
          <Text style={styles.navText}>랜덤미션</Text>
        </TouchableOpacity>
      </View> */}

      <DateDrawer
        isVisible={isDateDrawerVisible}
        onClose={() => setIsDateDrawerVisible(false)}
        onDateSelect={handleDateSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
  },
  header: {
    width: '100%',
    height: 162,
    backgroundColor: '#6487E5',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#000000',
  },
  dateArrow: {
    width: 27,
    height: 22,
    backgroundColor: '#D9D9D9',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#000000',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tabButtonInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
  },
  tabButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
  diaryList: {
    flex: 1,
    marginTop: 20,
  },
  diaryItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  diaryDate: {
    alignItems: 'center',
    marginRight: 10,
  },
  diaryDateDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#6487E5',
  },
  diaryDateText: {
    fontFamily: 'Inter',
    fontSize: 17,
    color: '#000000',
  },
  diaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 10,
  },
  diaryEmoji: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  diaryEmojiText: {
    fontSize: 24,
  },
  diaryInfo: {
    flex: 1,
  },
  diaryTitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    color: '#000000',
  },
  diaryTags: {
    flexDirection: 'row',
    marginTop: 5,
  },
  diaryTag: {
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#000000',
    marginRight: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 73,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#000000',
  },
});

export default DiaryList;