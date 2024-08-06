// // DiaryItem.tsx
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import HashTag from './HashTag';
// import { DiaryDetailScreenNavigationProp } from '../../navigation/types';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import DiaryDetail from './DiaryDetail';
// import { RootStackParamList } from '../../types';

// interface DiaryItemProps {
//   id: string;
//   date: string;
//   dayOfWeek: string;
//   emotion: string;
//   title: string;
//   tags: string[];
// }

// const emotions: { [key: string]: any } = {
//   기쁨: require('../../assets/images/emotion/joy.png'),
//   화남: require('../../assets/images/emotion/mad.png'),
//   슬픔: require('../../assets/images/emotion/sad.png'),
//   즐거움: require('../../assets/images/emotion/playful.png'),
//   사랑: require('../../assets/images/emotion/love.png'),
//   미움: require('../../assets/images/emotion/dislike.png'),
//   바람: require('../../assets/images/emotion/want.png'),
// };

// const DiaryItem: React.FC<DiaryItemProps> = ({ date, dayOfWeek, emotion, title, tags }) => {
//   const navigation = useNavigation<DiaryDetailScreenNavigationProp>();

//   const handlePress = () => {
//     navigation.navigate('DiaryDetail', { diaryId: 'some-id' }); // 필요에 따라 diaryId를 변경하세요
//   };
//   return (
//     <View style={styles.container} >
//       <View style={styles.dateContainer} >
//         <View style={styles.dateDot} />
//         <Text style={styles.dateText}>{date}</Text>
//         <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
//       </View>
//       <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
//         <View>
//           <Image 
//             source={emotions[emotion]}
//             style={styles.emojiContainer}
//           />
//         </View>
//         <View style={styles.infoContainer}>
//           <Text style={styles.titleText}>{title}</Text>
//           <HashTag tags={tags}/>
//           {/* <View style={styles.tagsContainer}>
//             {tags.map((tag, index) => (
//               <Text key={index} style={styles.tagText}>#{tag}</Text>
//             ))}
//           </View> */}
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     paddingRight: 20,
//     paddingLeft: 10,
//     height: 100,
//   },
//   dateContainer: {
//     alignItems: 'center',
//     marginRight: 10,
//     width: 30,
//     marginTop: 15,
//   },
//   dateDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#6487E5',
//     marginBottom: 4,
//   },
//   dateText: {
//     fontFamily: 'Inter',
//     fontSize: 17,
//     fontWeight: '400',
//     color: '#000000',
//   },
//   dayOfWeekText: {
//     fontFamily: 'Inter',
//     fontSize: 12,
//     color: '#000000',
//   },
//   contentContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   emojiContainer: {
//     width: 45,
//     height: 45,
//     borderRadius: 25,
//     backgroundColor: '#F0F0F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10,
//     borderWidth: 1,
//   },
//   infoContainer: {
//     flex: 1,
//     height: 60,
//     width: '100%',
//   },
//   titleText: {
//     fontFamily: 'Inter',
//     fontSize: 17,
//     fontWeight: '400',
//     color: '#000000',
//     margin: 5,
//     marginLeft: 0,
//     marginBottom: 10,
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//   },
//   tagText: {
//     fontFamily: 'Inter',
//     fontSize: 12,
//     color: '#6487E5',
//     marginRight: 5,
//   },
//   detailButton: {
//     backgroundColor: '#6487E5',
//     borderRadius: 5,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },
//   detailButtonText: {
//     fontFamily: 'Inter',
//     fontSize: 12,
//     color: '#FFFFFF',
//   },
// });

// export default DiaryItem;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DiaryDetailScreenNavigationProp } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DiaryItemProps {
  date: string;
  dayOfWeek: string;
  emotion: string;
  title: string;
  tags: string[];
  diaryId: string;  // API에서 받은 다이어리 ID
}

const emotions: { [key: string]: any } = {
  기쁨: require('../../assets/images/emotion/joy.png'),
  화남: require('../../assets/images/emotion/mad.png'),
  슬픔: require('../../assets/images/emotion/sad.png'),
  즐거움: require('../../assets/images/emotion/playful.png'),
  사랑: require('../../assets/images/emotion/love.png'),
  미움: require('../../assets/images/emotion/dislike.png'),
  바람: require('../../assets/images/emotion/want.png'),
};

const DiaryItem: React.FC<DiaryItemProps> = ({ date, dayOfWeek, emotion, title, tags, diaryId }) => {
  const navigation = useNavigation<DiaryDetailScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('DiaryDetail', { diaryId }); // 다이어리 ID를 전달하여 상세 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <View style={styles.dateDot} />
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
      </View>
      <TouchableOpacity style={styles.contentContainer} onPress={handlePress}>
        <View>
          <Image 
            source={emotions[emotion]}
            style={styles.emojiContainer}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <Text key={index} style={styles.tagText}>#{tag}</Text>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const DiaryList = () => {
  const [diaryList, setDiaryList] = useState<DiaryItemProps[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch('${API_URL}/diary/list/month/', {
          method: 'GET',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDiaryList(data);
      } catch (error) {
        console.error('Error fetching diary list:', error);
      }
    };

    fetchDiaryList();
  }, []);

  return (
    <View>
      {diaryList.map((diary) => (
        <DiaryItem
          key={diary.diaryId}
          date={diary.date}
          dayOfWeek={diary.dayOfWeek}
          emotion={diary.emotion}
          title={diary.title}
          tags={[diary.tag1, diary.tag2, diary.tag3]} // API에서 태그 데이터를 받는다고 가정
          diaryId={diary.id}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 20,
    paddingLeft: 10,
    height: 100,
  },
  dateContainer: {
    alignItems: 'center',
    marginRight: 10,
    width: 30,
    marginTop: 15,
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
    fontWeight: '400',
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
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
  },
  emojiContainer: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
  },
  infoContainer: {
    flex: 1,
    height: 60,
    width: '100%',
  },
  titleText: {
    fontFamily: 'Inter',
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    margin: 5,
    marginLeft: 0,
    marginBottom: 10,
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
});

export default DiaryList;
