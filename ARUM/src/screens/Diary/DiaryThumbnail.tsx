// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { Button } from 'react-native-elements';
// import { RootStackScreenProps } from '../../navigation/types';

// const DiaryThumbnail: React.FC<RootStackScreenProps<'DiaryThumbnail'>> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>감정일기</Text>
//       <View style={styles.imageContainer}>
//         <Image
//           style={styles.image}
//           source={{ uri: 'https://via.placeholder.com/150' }} // 임시 이미지 URL
//         />
//       </View>
//       <Text style={styles.date}>2024. 07. 15</Text>
//       <Text style={styles.text}>감정일기 작성 완료</Text>
//       <Button
//         title="감정일기 확인하기"
//         onPress={() => navigation.navigate('DiaryDetail')}
//         buttonStyle={styles.button}
//         titleStyle={styles.buttonTitle}
//       />
//       <Button
//         title="돌아가기"
//         onPress={() => navigation.navigate('Diary')}
//         buttonStyle={[styles.button, styles.goBackButton]}
//         titleStyle={[styles.buttonTitle, styles.goBackButtonTitle]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   imageContainer: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#ccc',
//   },
//   date: {
//     fontSize: 18,
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   button: {
//     backgroundColor: 'black',
//     borderRadius: 5,
//     width: 300,
//     height: 50,
//     marginBottom: 10,
//   },
//   buttonTitle: {
//     color: 'white',
//     fontSize: 18,
//   },
//   goBackButton: {
//     backgroundColor: 'white',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   goBackButtonTitle: {
//     color: 'black',
//   },
// });

// export default DiaryThumbnail;

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStackScreenProps } from '../../navigation/types';

const DiaryThumbnail: React.FC<RootStackScreenProps<'DiaryThumbnail'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>감정일기</Text>
      <Image
        // source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3YzEXu-vFvOPNwLs1Tn4Oeo97mFazUTOvIw&s' }}
        source={require('../../assets/images/good.png')}
        style={styles.image}
      />
      <Text style={styles.date}>2024. 07. 15</Text>
      <Text style={styles.text}>감정일기 작성 완료</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="감정일기 확인하기"
          onPress={() => navigation.navigate('DiaryDetail', { diaryId: 'some-diary-id' })}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        <Button
          title="돌아가기"
          onPress={() => navigation.navigate('Diary')}
          buttonStyle={[styles.button, styles.backButton]}
          titleStyle={[styles.buttonTitle, styles.backButtonTitle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDED',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '10%',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: '5%',
    borderColor: '#000',
    borderWidth: 1,
  },
  date: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: -20,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 5,
    marginVertical: 5,
    width: '90%',
    height: 50,
    alignSelf: 'center',
  },
  buttonTitle: {
    fontSize: 18,
  },
  backButton: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
  },
  backButtonTitle: {
    color: '#000',
  },
});

export default DiaryThumbnail;
