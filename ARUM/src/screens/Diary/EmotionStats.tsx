import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { API_URL } from '../../api_url';

interface EmotionData {
  emoji: string;
  count: number;
}

interface EmotionStatsProps {
  emotionData: EmotionData[];
}

const emojis: Record<string, any> = {
  '아주 나빠요': require('../../assets/images/emoji/emoji_01_verybad.png'),
  '나빠요': require('../../assets/images/emoji/emoji_02_bad.png'),
  '괜찮아요': require('../../assets/images/emoji/emoji_03_okay.png'),
  '좋아요': require('../../assets/images/emoji/emoji_04_good.png'),
  '아주 좋아요': require('../../assets/images/emoji/emoji_05_verygood.png'),
};

const grayEmojis: Record<string, any> = {
  '아주 나빠요': require('../../assets/images/emoji/gray_01_verybad.png'),
  '나빠요': require('../../assets/images/emoji/gray_02_bad.png'),
  '괜찮아요': require('../../assets/images/emoji/gray_03_okay.png'),
  '좋아요': require('../../assets/images/emoji/gray_04_good.png'),
  '아주 좋아요': require('../../assets/images/emoji/gray_05_verygood.png'),
};

const EmotionStats: React.FC<EmotionStatsProps> = ({ emotionData }) => {
  const [emojiPercentData, setEmojiPercentData] = useState<Record<string, number>>({});

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error('Error retrieving token');
      return null;
    }
  };

  useEffect(() => {
    const fetchEmojiPercentData = async () => {
      try {
        const userToken = await getToken();
        if (!userToken) {
          console.error(`Token not found`);
          return;
        }

        // 현재 월을 동적으로 가져오기
        const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-based month

        const response = await fetch(`${API_URL}/diary/feel/ratio/?month=${currentMonth}`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${userToken}`,
          },
        });

        if (!response.ok) throw new Error('Network response was not ok.');
        
        const responseData = await response.json();
        console.log('emojiPercent received', responseData);

        // Store the received data in state
        setEmojiPercentData(responseData);

      } catch (error) {
        console.error('emojiPercent error', error);
      }
    };

    fetchEmojiPercentData();
  }, []);

  const getColor = (emoji: string) => {
    switch (emoji) {
      case '아주 나빠요':
        return '#697284';
      case '나빠요':
        return '#779BED';
      case '괜찮아요':
        return '#71E065';
      case '좋아요':
        return '#BDF476';
      case '아주 좋아요':
        return '#F7E874';
      default:
        return 'transparent';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>기분분포</Text>
      <View style={styles.statsContainer}>
        <View style={styles.emojiRow}>
          {Object.entries(emojiPercentData).map(([emoji, percent], index) => {
            return (
              <View key={index} style={styles.emojiContainer}>
                <View style={[styles.emojiCircle, { backgroundColor: getColor(emoji) }]}>
                  <Image
                    source={percent === Math.max(...Object.values(emojiPercentData)) ? emojis[emoji] : grayEmojis[emoji]}
                    style={percent === Math.max(...Object.values(emojiPercentData)) ? styles.bigEmoji : styles.emoji}
                  />
                </View>
                <Text style={styles.percentText}>{Math.round(percent)}%</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.progressBarContainer}>
          {Object.entries(emojiPercentData).map(([emoji, percent], index) => {
            return (
              <View
                key={index}
                style={[
                  styles.progressBarSegment,
                  { flex: percent / 100, backgroundColor: getColor(emoji) },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
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
    width: 35,
    height: 35,
  },
  bigEmoji: {
    width: 43,
    height: 43,
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
