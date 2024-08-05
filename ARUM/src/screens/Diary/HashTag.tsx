import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HashTagComponentProps {
  tags: string[];
}

const HashTag: React.FC<HashTagComponentProps> = ({ tags = [] }) => {
  return (
    <View style={styles.tagsContainer}>
      {tags.map((tag, index) => (
        <View style={styles.tagBox}>
        <Text key={index} style={styles.tagText}>#{tag}</Text>
        </View>
      ))}
    </View>
  );
};

// const styles = StyleSheet.create({
//   tagsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width:'100%',
//     justifyContent: 'flex-start',
//     gap: 5,
//     textAlign: 'center'
//   },
//   tagBox:{
//     borderWidth: 1,
//     borderColor:'#000',
//     width: '30%',
//     padding: 3,
//     borderRadius:20,
//   },
//   tagText: {
//     fontFamily: 'Inter',
//     fontSize: 12,
//     color: '#000',
//     marginRight: 5,
//     textAlign:'center'
//   },
// });

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'flex-start',
    gap: 3,
    textAlign: 'center',
  },
  tagBox: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 20,
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});

export default HashTag;