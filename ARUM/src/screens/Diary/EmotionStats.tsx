import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmotionData {
  emoji: string;
  count: number;
}

interface EmotionStatsProps {
  emotionData: EmotionData[];
}

const EmotionStats: React.FC<EmotionStatsProps> = ({ emotionData }) => {
  const totalCount = emotionData.reduce((acc, item) => acc + item.count, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기분분포</Text>
      <View style={styles.statsContainer}>
        <View style={styles.emojiRow}>
          {emotionData.map((item, index) => {
            const percent = totalCount > 0 ? item.count / totalCount : 0;
            return (
              <View key={index} style={styles.emojiContainer}>
                <View style={[styles.emojiCircle, { backgroundColor: getColor(item.emoji) }]}>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                </View>
                <Text style={styles.percentText}>{Math.round(percent * 100)}%</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.progressBarContainer}>
          {emotionData.map((item, index) => {
            const percent = totalCount > 0 ? item.count / totalCount : 0;
            return (
              <View
                key={index}
                style={[
                  styles.progressBarSegment,
                  { flex: percent, backgroundColor: getColor(item.emoji) },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const getColor = (emoji: string) => {
  switch (emoji) {
    case '😭':
      return 'red';
    case '😩':
      return 'orange';
    case '😕':
      return 'yellow';
    case '😚':
      return 'green';
    case '😆':
      return 'blue';
    default:
      return '#dddddd';
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  statsContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    width: 333,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'left',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  emojiContainer: {
    alignItems: 'center',
  },
  emojiCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  percentText: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  progressBarSegment: {
    height: '100%',
  },
});

export default EmotionStats;

