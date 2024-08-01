// DiaryItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import HashTag from './HashTag';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import DiaryDetail from './DiaryDetail';
import { RootStackParamList } from '../../types';
import { DiaryDetailScreenNavigationProp } from '../../navigation/types';

interface DiaryItemProps {
  date: string;
  dayOfWeek: string;
  emoji: string;
  title: string;
  tags: string[];
}

const DiaryItem: React.FC<DiaryItemProps> = ({ date, dayOfWeek, emoji, title, tags }) => {
  const navigation = useNavigation<DiaryDetailScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('DiaryDetail', { diaryId: 'some-id' }); // 필요에 따라 diaryId를 변경하세요
  };
  return (
    <View style={styles.container} >
      <View style={styles.dateContainer} >
        <View style={styles.dateDot} />
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
      </View>
      <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <HashTag tags={tags}/>
          {/* <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <Text key={index} style={styles.tagText}>#{tag}</Text>
            ))}
          </View> */}
        </View>

      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 10,
    width: 30,
  },
  dateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6487E5',
    marginBottom: 4,
  },
  dateText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000000',
  },
  dayOfWeekText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#000000',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    alignItems: 'center',
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  emojiText: {
    fontSize: 24,
  },
  infoContainer: {
    flex: 1,
  },
  titleText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#6487E5',
    marginRight: 5,
  },
  detailButton: {
    backgroundColor: '#6487E5',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailButtonText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default DiaryItem;